#!/bin/bash

echo "🚀 Deploying to Railway..."
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found"
    echo ""
    echo "Install with:"
    echo "  npm install -g @railway/cli"
    echo ""
    echo "Or use the Railway web interface:"
    echo "  https://railway.app"
    exit 1
fi

# Check login status
echo "🔐 Checking Railway login status..."
railway whoami

if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Railway"
    echo "Running login..."
    railway login
fi

echo ""
echo "📦 Deploying project..."
railway up

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "📊 Deployment status:"
    railway status
    echo ""
    echo "🔗 View your deployment:"
    railway open
else
    echo "❌ Deployment failed"
    exit 1
fi
