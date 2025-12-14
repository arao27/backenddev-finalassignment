const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
require('dotenv').config();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, gender, weight_class, role } = req.body;
    if (!name || !email || !password || !gender || !weight_class)
      return res.status(400).json({ error: 'Missing required fields' });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ error: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash, gender, weight_class, role: role || 'user' });
    res.status(201).json({ user_id: user.user_id, name: user.name, role: user.role });
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) { next(err); }
});

// Profile
router.get('/profile', authenticateToken, async (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

// Admin-only: get all users
router.get('/', authenticateToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password_hash'] } });
    res.json(users);
  } catch (err) { next(err); }
});

module.exports = router;