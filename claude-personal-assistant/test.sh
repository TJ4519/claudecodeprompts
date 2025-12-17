#!/bin/bash

echo "🧪 Running test suite..."
echo ""

# Check if server is running
SERVER_URL="http://localhost:3000"

# Test health endpoint
echo "1️⃣  Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s ${SERVER_URL}/health)

if [ $? -eq 0 ]; then
    echo "✅ Health endpoint responding"
    echo "$HEALTH_RESPONSE" | json_pp 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo "❌ Server not responding. Is it running?"
    echo "   Start server with: npm run dev"
    exit 1
fi

echo ""

# Test skill listing
echo "2️⃣  Testing skill listing..."
SKILLS_RESPONSE=$(curl -s ${SERVER_URL}/api/skills)

if [ $? -eq 0 ]; then
    echo "✅ Skills endpoint responding"
    echo "$SKILLS_RESPONSE" | json_pp 2>/dev/null || echo "$SKILLS_RESPONSE"
else
    echo "❌ Skills endpoint failed"
fi

echo ""

# Test status endpoint
echo "3️⃣  Testing status endpoint..."
STATUS_RESPONSE=$(curl -s ${SERVER_URL}/api/status)

if [ $? -eq 0 ]; then
    echo "✅ Status endpoint responding"
    echo "$STATUS_RESPONSE" | json_pp 2>/dev/null || echo "$STATUS_RESPONSE"
else
    echo "❌ Status endpoint failed"
fi

echo ""

# Run skill tests
echo "4️⃣  Running skill tests..."
npm run test

echo ""
echo "✅ Tests complete"
