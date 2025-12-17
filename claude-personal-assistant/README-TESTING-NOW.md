# How to Test RIGHT NOW

## Current Status

✅ Server is running
✅ Code is working
❌ Need to add real API keys

## Quick Setup

### 1. Add Your API Keys

```bash
# Edit .env file
nano .env

# Add real keys (get from links below)
ANTHROPIC_API_KEY=sk-ant-api03-XXXXX  # Get from console.anthropic.com
OPENAI_API_KEY=sk-proj-XXXXX          # Get from platform.openai.com
```

### 2. Restart Server

```bash
# Stop current server (Ctrl+C or)
pkill -f "node server/index.js"

# Start again
npm start
```

### 3. Test Without Audio First

```bash
# Test basic endpoints
./quick-test.sh

# Test skill execution (will call Claude API)
curl -X POST http://localhost:3000/api/skills/run \
  -H "Content-Type: application/json" \
  -d '{
    "skillName": "save_to_file",
    "params": {
      "filename": "test.md",
      "content": "# Hello from Claude!\n\nThis works!"
    }
  }' | json_pp
```

### 4. Test With Audio

```bash
# Record 3-second audio saying "Hello world"
# Save as test.m4a

# Test it
./test-voice.sh test.m4a
```

## What Works Right Now (Without Keys)

✅ Health check: `curl http://localhost:3000/health`
✅ Skills listing: `curl http://localhost:3000/api/skills`
✅ Status check: `curl http://localhost:3000/api/status`

## What Needs API Keys

❌ Voice transcription (needs OPENAI_API_KEY)
❌ Skill execution (needs ANTHROPIC_API_KEY)
❌ Gmail/Calendar (needs Google OAuth - optional for now)

## No API Keys? Test the Structure

You can explore the code structure without keys:

```bash
# View a skill definition
cat skills/communication/search_gmail.skill.md

# See how skills are loaded
cat lib/skillOrchestrator.js

# Check cost tracking logic
cat lib/costTracker.js
```

## Get API Keys

**Anthropic (Claude):**
https://console.anthropic.com/settings/keys

**OpenAI (Whisper):**
https://platform.openai.com/api-keys

Both have free tiers to start!
