const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, gender, weight_class } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash, gender, weight_class });
    res.status(201).json({ user_id: user.user_id, name: user.name });
  } catch (err) { next(err); }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) { next(err); }
});

module.exports = router;