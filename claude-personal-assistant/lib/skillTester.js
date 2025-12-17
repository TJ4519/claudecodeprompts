const skillOrchestrator = require('./skillOrchestrator');

class SkillTester {
  async testSkill(skillName, testParams = {}) {
    console.log(`\n🧪 Testing skill: ${skillName}\n`);

    const startTime = Date.now();

    try {
      const result = await skillOrchestrator.run(skillName, testParams);
      const duration = Date.now() - startTime;

      console.log('✅ Test passed');
      console.log(`⏱️  Duration: ${duration}ms`);
      console.log(`💰 Cost: ${JSON.stringify(result.cost)}`);
      console.log('\n📤 Result:');
      console.log(result.result);

      return {
        success: true,
        duration,
        result: result.result
      };

    } catch (error) {
      console.error('❌ Test failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async runAllTests() {
    const skills = await skillOrchestrator.listSkills();
    const results = [];

    for (const skill of skills) {
      const result = await this.testSkill(skill.name);
      results.push({ skill: skill.name, ...result });
    }

    console.log('\n📊 Test Summary:');
    const passed = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Total: ${results.length}`);

    return results;
  }
}

module.exports = new SkillTester();

// CLI support
if (require.main === module) {
  const skillName = process.argv[3];
  const tester = new SkillTester();

  if (skillName) {
    tester.testSkill(skillName);
  } else {
    tester.runAllTests();
  }
}
