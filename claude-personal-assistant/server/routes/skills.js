const express = require('express');
const router = express.Router();
const skillOrchestrator = require('../../lib/skillOrchestrator');

router.get('/', async (req, res) => {
  const skills = await skillOrchestrator.listSkills();
  res.json({ skills });
});

router.post('/run', async (req, res) => {
  try {
    const { skillName, params } = req.body;

    console.log(`🎯 Running skill: ${skillName}`);

    const result = await skillOrchestrator.run(skillName, params);

    res.json({
      success: true,
      result,
      executionTime: result.executionTime,
      cost: result.cost
    });

  } catch (error) {
    console.error('❌ Skill execution failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/test', async (req, res) => {
  const { skillName } = req.body;
  const tester = require('../../lib/skillTester');

  const result = await tester.testSkill(skillName);
  res.json(result);
});

module.exports = router;
