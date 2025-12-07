const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// Get all exercises
router.get('/', async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (err) { next(err); }
});

module.exports = router;