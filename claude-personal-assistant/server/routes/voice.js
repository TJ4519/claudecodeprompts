const express = require('express');
const multer = require('multer');
const router = express.Router();
const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const costTracker = require('../../lib/costTracker');

const upload = multer({ dest: 'temp/' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post('/command', upload.single('audio'), async (req, res) => {
  try {
    console.log('📥 Received voice command');

    // 1. Transcribe audio
    const transcription = await openai.audio.transcriptions.create({
      file: req.file,
      model: 'whisper-1'
    });

    console.log('📝 Transcription:', transcription.text);
    costTracker.logUsage('whisper', req.file.size);

    // 2. Send to Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: transcription.text
      }]
    });

    const result = response.content[0].text;
    costTracker.logUsage('claude', response.usage);

    console.log('✅ Response generated');

    res.json({
      transcription: transcription.text,
      response: result,
      cost: costTracker.getLastRunCost()
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
