const { sequelize } = require('../database');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const PR = require('../models/PR');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const adminPassword = await bcrypt.hash('adminpass', 10);
    const userPassword = await bcrypt.hash('userpass', 10);

    const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password_hash: adminPassword, gender: 'male', weight_class: '80kg', role: 'admin' });
    const user1 = await User.create({ name: 'User One', email: 'user1@example.com', password_hash: userPassword, gender: 'female', weight_class: '60kg' });
    const user2 = await User.create({ name: 'User Two', email: 'user2@example.com', password_hash: userPassword, gender: 'male', weight_class: '70kg' });

    const bench = await Exercise.create({ name: 'Bench Press', category: 'Push', units: 'weight' });
    const squat = await Exercise.create({ name: 'Squat', category: 'Legs', units: 'weight' });
    const deadlift = await Exercise.create({ name: 'Deadlift', category: 'Pull', units: 'weight' });

    await PR.create({ user_id: user1.user_id, exercise_id: bench.exercise_id, weight: 80, reps: 1, percentile_general: 50, percentile_lifters: 60, date_recorded: new Date() });
    await PR.create({ user_id: user1.user_id, exercise_id: squat.exercise_id, weight: 100, reps: 1, percentile_general: 55, percentile_lifters: 65, date_recorded: new Date() });
    await PR.create({ user_id: user2.user_id, exercise_id: deadlift.exercise_id, weight: 120, reps: 1, percentile_general: 60, percentile_lifters: 70, date_recorded: new Date() });

    console.log('Seeding complete');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();