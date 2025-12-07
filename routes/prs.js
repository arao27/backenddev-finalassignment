const express = require('express');
const router = express.Router();
const PR = require('../models/PR');
const { authenticate } = require('../middleware/auth');

// Add PR
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { exercise_id, weight, reps } = req.body;
    const pr = await PR.create({ user_id: req.user.user_id, exercise_id, weight, reps });
    res.status(201).json(pr);
  } catch (err) { next(err); }
});

// Get user PRs
router.get('/:user_id', authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user.user_id != req.params.user_id)
      return res.status(403).json({ error: 'Forbidden' });

    const prs = await PR.findAll({ where: { user_id: req.params.user_id } });
    res.json(prs);
  } catch (err) { next(err); }
});

// Update PR
router.put('/:pr_id', authenticate, async (req, res, next) => {
  try {
    const pr = await PR.findByPk(req.params.pr_id);
    if (!pr) return res.status(404).json({ error: 'PR not found' });
    if (req.user.role !== 'admin' && req.user.user_id != pr.user_id)
      return res.status(403).json({ error: 'Forbidden' });

    await pr.update(req.body);
    res.json(pr);
  } catch (err) { next(err); }
});

// Delete PR
router.delete('/:pr_id', authenticate, async (req, res, next) => {
  try {
    const pr = await PR.findByPk(req.params.pr_id);
    if (!pr) return res.status(404).json({ error: 'PR not found' });
    if (req.user.role !== 'admin' && req.user.user_id != pr.user_id)
      return res.status(403).json({ error: 'Forbidden' });

    await pr.destroy();
    res.json({ message: 'PR deleted' });
  } catch (err) { next(err); }
});

// GET /prs/:user_id/percentiles
router.get('/:user_id/percentiles', authenticate, async (req, res, next) => {
  try {
    // Only allow user to view their own percentiles unless admin
    if (req.user.role !== 'admin' && req.user.user_id != req.params.user_id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const prs = await PR.findAll({ where: { user_id: req.params.user_id } });

    // Add placeholder percentiles
    const prsWithPercentiles = prs.map(pr => ({
      pr_id: pr.pr_id,
      exercise_id: pr.exercise_id,
      weight: pr.weight,
      reps: pr.reps,
      date_recorded: pr.date_recorded,
      percentile_general: Math.floor(Math.random() * 100),
      percentile_lifters: Math.floor(Math.random() * 100)
    }));

    res.json(prsWithPercentiles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;