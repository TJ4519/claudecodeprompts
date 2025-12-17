# SKILL: notify_user

## Purpose
Send notification to user via configured channel (Telegram, SMS, or email)

## Tools Required
- Telegram Bot API (primary)
- Twilio API (fallback for SMS)
- Gmail API (fallback for email)

## Input Schema
```json
{
  "message": "string (notification text)",
  "urgent": "boolean (default: false)",
  "channel": "string (telegram, sms, email, all)",
  "retryOnFailure": "boolean (default: true)"
}
```

## Steps
1. Determine notification channel(s)
2. Format message based on urgency level
3. Send via primary channel (Telegram)
4. If urgent and primary fails, try fallback channels
5. Confirm delivery and return status

## Output Schema
```json
{
  "sent": "boolean",
  "channels": ["telegram", "sms"],
  "timestamp": "ISO string",
  "messageIds": {
    "telegram": "string",
    "sms": "string"
  }
}
```

## Example Usage
Input: `{ "message": "Your meeting starts in 10 minutes", "urgent": true, "channel": "all" }`
Output: Notification sent via all configured channels

## Error Handling
- If primary channel fails: try fallback channels
- If all channels fail: log error and return detailed failure info
- If urgent message fails: retry up to 3 times with exponential backoff
