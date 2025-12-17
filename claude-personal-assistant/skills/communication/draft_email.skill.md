# SKILL: draft_email

## Purpose
Draft an email message in Gmail

## Tools Required
- Gmail API (via Google Auth)

## Input Schema
```json
{
  "to": "string (email address)",
  "subject": "string",
  "body": "string",
  "cc": "string (optional)",
  "bcc": "string (optional)"
}
```

## Steps
1. Authenticate with Gmail API
2. Format email with headers
3. Create draft in Gmail
4. Return draft ID and preview link

## Output Schema
```json
{
  "draftId": "string",
  "previewUrl": "string",
  "success": "boolean"
}
```

## Example Usage
Input: `{ "to": "colleague@example.com", "subject": "Meeting Follow-up", "body": "Thanks for the meeting..." }`
Output: Draft created with preview link

## Error Handling
- If not authenticated: return error with auth instructions
- If invalid email address: return validation error
- If API error: return detailed error message
