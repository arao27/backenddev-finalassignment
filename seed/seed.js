const { sequelize } = require('../database');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const PR = require('../models/PR');
const bcrypt = require('bcryptjs');

async function seed() {
  await sequelize.sync({ force: true });

  // Users
  const adminPassword = await bcrypt.hash('adminpass', 10);
  const userPassword = await bcrypt.hash('userpass', 10);

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password_hash: adminPassword,
    gender: 'male',
    weight_class: '80kg',
    role: 'admin'
  });

  const user1 = await User.create({
    name: 'User One',
    email: 'user1@example.com',
    password_hash: userPassword,
    gender: 'female',
    weight_class: '60kg',
    role: 'user'
  });

  // Exercises
  const bench = await Exercise.create({ name: 'Bench Press', category: 'Push', units: 'weight' });
  const squat = await Exercise.create({ name: 'Squat', category: 'Legs', units: 'weight' });

  // PRs
  await PR.create({ user_id: user1.user_id, exercise_id: bench.exercise_id, weight: 80, reps: 1 });
  await PR.create({ user_id: user1.user_id, exercise_id: squat.exercise_id, weight: 100, reps: 1 });

  console.log('Seeding completed!');
  process.exit();
}

seed();