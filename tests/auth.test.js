const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../database');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Endpoints', () => {
  test('Register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        gender: 'female',
        weight_class: '60kg'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user_id');
    expect(res.body.name).toBe('Jane Doe');
  });

  test('Login user', async () => {
    const password_hash = await bcrypt.hash('password123', 10);
    await User.create({
      name: 'Login Test',
      email: 'login@example.com',
      password_hash,
      gender: 'male',
      weight_class: '70kg',
      role: 'user'
    });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'login@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});