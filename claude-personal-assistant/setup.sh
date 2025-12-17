#!/bin/bash

echo "🚀 Setting up Claude Personal Assistant..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create logs directory
mkdir -p logs
echo "✅ Created logs directory"

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Copying .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env with your API keys"
    echo ""
    echo "Required API keys:"
    echo "  - ANTHROPIC_API_KEY"
    echo "  - OPENAI_API_KEY"
    echo "  - GOOGLE_CLIENT_ID"
    echo "  - GOOGLE_CLIENT_SECRET"
    echo "  - GOOGLE_REFRESH_TOKEN"
else
    echo "✅ .env file already exists"
fi

# Install MCP servers globally (optional)
echo ""
echo "🔧 MCP servers can be installed with:"
echo "  npm install -g @modelcontextprotocol/inspector"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your API keys"
echo "2. Run 'npm run dev' to start development server"
echo "3. Test with: curl http://localhost:3000/health"
