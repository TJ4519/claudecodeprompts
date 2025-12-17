# Claude Personal Assistant

Voice-controlled AI assistant with MCP integration and modular skills system.

## Features

- 🎤 Voice command processing (Whisper)
- 🤖 Claude AI integration for intelligent responses
- 📧 Gmail integration
- 📅 Calendar management
- 💬 Telegram notifications
- 🧩 Modular skills system
- 💰 Cost tracking
- 🚀 Railway deployment ready

## Quick Start

### 1. Setup

```bash
./setup.sh
```

This will:
- Check for Node.js installation
- Install all dependencies
- Create logs directory
- Copy .env.example to .env

### 2. Configure

Edit `.env` with your API keys:

**Required:**
- `ANTHROPIC_API_KEY` - Get from https://console.anthropic.com
- `OPENAI_API_KEY` - Get from https://platform.openai.com
- `GOOGLE_CLIENT_ID` - Google OAuth credentials
- `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `GOOGLE_REFRESH_TOKEN` - Google OAuth refresh token

**Optional:**
- `TELEGRAM_BOT_TOKEN` - For notifications
- `TELEGRAM_CHAT_ID` - Your Telegram chat ID
- Twilio credentials for SMS notifications
- Cloudflare R2 for storage

### 3. Run

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 4. Test

```bash
./test.sh
```

Or manually:
```bash
curl http://localhost:3000/health
```

## Project Structure

```
claude-personal-assistant/
├── server/              # Express API server
│   ├── index.js        # Main server file
│   └── routes/         # API routes
│       ├── voice.js    # Voice command processing
│       ├── skills.js   # Skills management
│       └── status.js   # System status
├── lib/                # Core infrastructure
│   ├── costTracker.js      # API cost tracking
│   ├── googleAuth.js       # Google OAuth handling
│   ├── skillOrchestrator.js # Skills execution engine
│   ├── skillTester.js      # Testing framework
│   └── mcpManager.js       # MCP server management
├── skills/             # Modular AI skills
│   ├── research/       # Research-related skills
│   ├── communication/  # Email, messaging skills
│   ├── calendar/       # Calendar management
│   └── utilities/      # Helper skills
└── tests/              # Test suites
```

## Skills System

Skills are defined in `/skills` as markdown files with:
- Purpose and description
- Required tools/APIs
- Input/output schemas
- Execution steps
- Error handling

### Available Skills

**Communication:**
- `search_gmail` - Search Gmail messages
- `draft_email` - Draft email in Gmail
- `send_telegram` - Send Telegram notification

**Calendar:**
- `find_conflicts` - Find scheduling conflicts
- `create_event` - Create calendar event

**Research:**
- `find_instagram_accounts` - Find Instagram accounts
- `scrape_instagram_posts` - Scrape Instagram posts
- `parse_event_images` - Extract event details from images

**Utilities:**
- `save_to_file` - Save data to markdown file
- `notify_user` - Send multi-channel notifications

### Run a skill:

```bash
curl -X POST http://localhost:3000/api/skills/run \
  -H "Content-Type: application/json" \
  -d '{"skillName": "search_gmail", "params": {"query": "urgent"}}'
```

### Test a skill:

```bash
npm run test:skill search_gmail
```

### Create a new skill:

1. Create a new `.skill.md` file in the appropriate category folder
2. Define the skill structure (see existing skills for examples)
3. Test with `npm run test:skill <skill_name>`

## API Endpoints

### Health Check
```
GET /health
```

### System Status
```
GET /api/status
GET /api/status/costs
```

### Voice Commands
```
POST /api/voice/command
Content-Type: multipart/form-data
Body: audio file
```

### Skills
```
GET /api/skills              # List all skills
POST /api/skills/run         # Execute a skill
POST /api/skills/test        # Test a skill
```

## Development

### Start with auto-reload:
```bash
npm run dev
```

### Run tests:
```bash
npm test
```

### Test specific skill:
```bash
npm run test:skill <skill_name>
```

## Cost Tracking

The system automatically tracks API usage costs for:
- OpenAI Whisper (voice transcription)
- Claude API (AI processing)
- Claude Vision (image analysis)

Monitor costs:
```bash
curl http://localhost:3000/api/status/costs
```

Cost rates are configurable in `lib/costTracker.js`

## Deployment

### Deploy to Railway:

```bash
./deploy.sh
```

Or manually:
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Environment Variables

Set these in Railway dashboard:
- All variables from `.env.example`
- `PORT` (automatically set by Railway)
- `RAILWAY_URL` (your deployment URL)

## Error Handling

The system includes comprehensive error handling:
- Automatic retry with exponential backoff
- Fallback channels for notifications
- Detailed error logging
- Cost tracking even on failures

## Security

- API keys stored in environment variables
- Helmet.js for HTTP security headers
- CORS configured
- Input validation on all endpoints
- Filename sanitization for file operations

## Contributing

1. Create a new skill in `/skills`
2. Test thoroughly
3. Document input/output schemas
4. Add error handling

## Monitoring

Check system health:
```bash
curl http://localhost:3000/api/status
```

Returns:
- System uptime
- Memory usage
- Cost statistics
- API health

## Troubleshooting

### Server won't start
- Check that all required environment variables are set
- Verify Node.js version (18+)
- Check that port 3000 is available

### Skills failing
- Verify API keys are valid
- Check cost limits in `.env`
- Review logs in `/logs` directory

### Voice commands not working
- Verify OpenAI API key
- Check audio file format (must be supported by Whisper)
- Ensure sufficient API credits

## Next Steps

After setup:
1. Create custom skills for your workflows
2. Set up MCP servers for browser automation
3. Configure notification channels
4. Deploy to Railway for 24/7 operation
5. Build voice interface (iOS Shortcuts, Android Tasker)

## Resources

- [Anthropic API Docs](https://docs.anthropic.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Railway Docs](https://docs.railway.app)

## License

MIT

---

Built with Claude Code
