const fs = require('fs').promises;
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

class SkillOrchestrator {
  constructor() {
    this.skillsDir = path.join(__dirname, '../skills');
    this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async listSkills() {
    const categories = await fs.readdir(this.skillsDir);
    const skills = [];

    for (const category of categories) {
      const categoryPath = path.join(this.skillsDir, category);
      const stats = await fs.stat(categoryPath);

      if (!stats.isDirectory()) continue;

      const files = await fs.readdir(categoryPath);

      for (const file of files) {
        if (file.endsWith('.skill.md')) {
          skills.push({
            category,
            name: file.replace('.skill.md', ''),
            path: path.join(categoryPath, file)
          });
        }
      }
    }

    return skills;
  }

  async loadSkill(skillName) {
    const skills = await this.listSkills();
    const skill = skills.find(s => s.name === skillName);

    if (!skill) throw new Error(`Skill not found: ${skillName}`);

    const content = await fs.readFile(skill.path, 'utf-8');
    return { ...skill, content };
  }

  async run(skillName, params = {}) {
    const startTime = Date.now();
    console.log(`🎯 Executing skill: ${skillName}`);

    const skill = await this.loadSkill(skillName);

    // Send skill definition + params to Claude
    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Execute this skill with the given parameters:

SKILL DEFINITION:
${skill.content}

PARAMETERS:
${JSON.stringify(params, null, 2)}

Execute the skill steps and return the result.`
      }]
    });

    const executionTime = Date.now() - startTime;

    return {
      result: response.content[0].text,
      executionTime: `${executionTime}ms`,
      cost: response.usage
    };
  }
}

module.exports = new SkillOrchestrator();
