const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../database');
const User = require('../models/User');
const PR = require('../models/PR');
const Exercise = require('../models/Exercise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let token;
let userId;
let exerciseId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create test user
  const password_hash = await bcrypt.hash('testpass', 10);
  const user = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password_hash,
    gender: 'male',
    weight_class: '70kg',
    role: 'user'
  });
  userId = user.user_id;

  // Create test exercise
  const exercise = await Exercise.create({
    name: 'Bench Press',
    category: 'Push',
    units: 'weight'
  });
  exerciseId = exercise.exercise_id;

  // JWT token
  token = jwt.sign(
    { user_id: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  await sequelize.close();
});

describe('PR Endpoints', () => {
  test('Create a PR', async () => {
    const res = await request(app)
      .post('/prs')
      .set('Authorization', `Bearer ${token}`)
      .send({ exercise_id: exerciseId, weight: 100, reps: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('pr_id');
    expect(res.body.weight).toBe(100);
  });

  test('Get PRs for user', async () => {
    const res = await request(app)
      .get(`/prs/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('exercise_id', exerciseId);
  });

  test('Get PR percentiles', async () => {
    const res = await request(app)
      .get(`/prs/${userId}/percentiles`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty('percentile_general');
    expect(res.body[0]).toHaveProperty('percentile_lifters');
  });
});