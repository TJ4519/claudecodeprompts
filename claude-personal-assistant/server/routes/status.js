const express = require('express');
const router = express.Router();
const costTracker = require('../../lib/costTracker');

router.get('/', (req, res) => {
  const stats = costTracker.getStats();
  res.json({
    status: 'operational',
    costs: stats,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

router.get('/costs', (req, res) => {
  const costs = costTracker.getDetailedStats();
  res.json(costs);
});

module.exports = router;
