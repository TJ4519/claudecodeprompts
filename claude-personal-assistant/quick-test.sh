#!/bin/bash

echo "🧪 Quick System Test (No Audio Required)"
echo "=========================================="
echo ""

echo "1️⃣  Health Check..."
curl -s http://localhost:3000/health | json_pp
echo ""

echo "2️⃣  System Status..."
curl -s http://localhost:3000/api/status | json_pp
echo ""

echo "3️⃣  Available Skills..."
curl -s http://localhost:3000/api/skills | json_pp | grep -E '"name"|"category"' | head -20
echo ""

echo "=========================================="
echo "✅ Basic endpoints working!"
echo ""
echo "Next steps:"
echo "  • Record audio: 'test.m4a' (use Voice Memos/Recorder)"
echo "  • Test voice: ./test-voice.sh test.m4a"
echo "  • See TESTING.md for full guide"
