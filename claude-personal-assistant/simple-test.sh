#!/bin/bash

# Simple test without audio - just test Claude response

echo "🤖 Testing Claude Response (No Audio)"
echo "======================================"
echo ""

PROMPT="${1:-What is the capital of France?}"

echo "📝 Sending prompt: $PROMPT"
echo ""

# For now, we'll test a skill instead since voice requires audio
echo "Testing skill execution instead..."
curl -X POST http://localhost:3000/api/skills/run \
  -H "Content-Type: application/json" \
  -d "{
    \"skillName\": \"notify_user\",
    \"params\": {
      \"message\": \"Test from CLI\",
      \"urgent\": false
    }
  }" | json_pp

echo ""
echo "======================================"
echo "✅ Test complete!"
