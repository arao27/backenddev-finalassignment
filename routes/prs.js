const express = require('express');
const router = express.Router();
const PR = require('../models/PR');
const Exercise = require('../models/Exercise');
const { authenticateToken } = require('../middleware/auth');

// Create PR
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const pr = await PR.create({
      user_id: req.user.user_id,
      exercise_id: req.body.exercise_id,
      weight: req.body.weight,
      reps: req.body.reps,
      date_recorded: new Date()
    });
    res.status(201).json(pr);
  } catch (err) { next(err); }
});

// Get PRs for user
router.get('/:userId', authenticateToken, async (req, res, next) => {
  try {
    const prs = await PR.findAll({ where: { user_id: req.params.userId }, include: Exercise });
    res.json(prs);
  } catch (err) { next(err); }
});

// Get PR percentiles (dummy 50/50)
router.get('/:userId/percentiles', authenticateToken, async (req, res, next) => {
  try {
    const prs = await PR.findAll({ where: { user_id: req.params.userId } });
    const result = prs.map(pr => ({ ...pr.toJSON(), percentile_general: 50, percentile_lifters: 50 }));
    res.json(result);
  } catch (err) { next(err); }
});

module.exports = router;