# Testing Guide

## Quick Start: Testing Voice Commands

### Step 1: Record Test Audio

**On Mac:**
```bash
# Record 3 seconds of audio using your microphone
sox -d -r 16000 test.wav trim 0 3
# OR use Voice Memos app and export
```

**On iPhone/Android:**
1. Open Voice Memos / Voice Recorder
2. Record: "What's the weather in San Francisco?"
3. Share/Export the file
4. Transfer to your computer in this directory

**On Linux:**
```bash
arecord -d 3 -f cd test.wav
```

### Step 2: Test the Endpoint

```bash
./test-voice.sh test.wav
```

**Expected Output:**
```json
{
  "transcription": "What's the weather in San Francisco?",
  "response": "I don't have access to real-time weather data...",
  "cost": "0.0234"
}
```

## Alternative: Test Without Audio (Skip Whisper)

Test just Claude directly:

```bash
curl -X POST http://localhost:3000/api/voice/command \
  -H "Content-Type: application/json" \
  -d '{"text": "What is 2+2?"}'
```

## What Each Endpoint Does

### 1. Voice Command (Whisper + Claude)
```bash
POST /api/voice/command
Content-Type: multipart/form-data
Body: audio file

Flow:
1. Whisper transcribes audio → text
2. Text sent to Claude → response
3. Cost tracked and returned
```

### 2. Direct Skill Execution
```bash
curl -X POST http://localhost:3000/api/skills/run \
  -H "Content-Type: application/json" \
  -d '{
    "skillName": "notify_user",
    "params": {
      "message": "Test notification",
      "urgent": false
    }
  }'
```

### 3. List All Skills
```bash
curl http://localhost:3000/api/skills
```

### 4. System Status
```bash
curl http://localhost:3000/api/status
```

## Testing Skills

Each skill can be tested individually:

```bash
# Test with dry run (no actual execution)
npm run test:skill search_gmail

# Test with real parameters
curl -X POST http://localhost:3000/api/skills/test \
  -H "Content-Type: application/json" \
  -d '{"skillName": "save_to_file"}'
```

## Troubleshooting

**"File format not supported"**
- Whisper supports: mp3, mp4, mpeg, mpga, m4a, wav, webm
- Convert with: `ffmpeg -i input.xxx output.mp3`

**"API key not found"**
- Check `.env` file has `OPENAI_API_KEY` and `ANTHROPIC_API_KEY`
- Restart server: `npm start`

**"Cost exceeded"**
- Check `MAX_COST_PER_RUN` in `.env`
- View costs: `curl http://localhost:3000/api/status/costs`

## Quick Audio Recording Examples

**macOS (QuickTime):**
1. Open QuickTime Player
2. File → New Audio Recording
3. Click record button
4. Save as `test.m4a`

**Windows (Voice Recorder):**
1. Open Voice Recorder app
2. Click microphone icon
3. Export/Share file

**Online (Browser):**
1. Visit https://online-voice-recorder.com
2. Record and download as MP3
