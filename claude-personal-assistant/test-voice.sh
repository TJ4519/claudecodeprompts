#!/bin/bash

# Test voice command endpoint
# Usage: ./test-voice.sh path/to/audio.mp3

if [ -z "$1" ]; then
    echo "❌ Please provide an audio file"
    echo "Usage: ./test-voice.sh path/to/audio.mp3"
    echo ""
    echo "Supported formats: mp3, mp4, mpeg, mpga, m4a, wav, webm"
    exit 1
fi

AUDIO_FILE="$1"

if [ ! -f "$AUDIO_FILE" ]; then
    echo "❌ File not found: $AUDIO_FILE"
    exit 1
fi

echo "🎤 Testing voice command with: $AUDIO_FILE"
echo ""

curl -X POST http://localhost:3000/api/voice/command \
  -F "audio=@$AUDIO_FILE" \
  -w "\n\n📊 HTTP Status: %{http_code}\n" \
  | json_pp 2>/dev/null || cat

echo ""
