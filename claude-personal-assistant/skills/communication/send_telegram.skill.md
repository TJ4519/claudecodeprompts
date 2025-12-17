# SKILL: send_telegram

## Purpose
Send notification to user via Telegram

## Tools Required
- Telegram Bot API

## Input Schema
```json
{
  "message": "string (notification text)",
  "urgent": "boolean (default: false)",
  "parseMode": "string (optional: Markdown, HTML)"
}
```

## Steps
1. Format message based on urgency
2. Add emoji prefix if urgent (🚨)
3. Send via Telegram Bot API to configured chat ID
4. Confirm delivery

## Output Schema
```json
{
  "sent": "boolean",
  "timestamp": "ISO string",
  "messageId": "string"
}
```

## Example Usage
Input: `{ "message": "Your meeting starts in 10 minutes", "urgent": true }`
Output: `{ "sent": true, "timestamp": "2024-12-17T10:30:00Z", "messageId": "123" }`

## Error Handling
- If Telegram token not configured: return setup instructions
- If send fails: retry up to 3 times with backoff
- If all retries fail: log error and return failure
