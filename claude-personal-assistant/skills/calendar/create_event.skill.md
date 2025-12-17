# SKILL: create_event

## Purpose
Create a new event in Google Calendar

## Tools Required
- Google Calendar API (via Google Auth)

## Input Schema
```json
{
  "title": "string",
  "startTime": "ISO string",
  "endTime": "ISO string",
  "description": "string (optional)",
  "location": "string (optional)",
  "attendees": "array of email strings (optional)",
  "calendarId": "string (default: primary)"
}
```

## Steps
1. Authenticate with Google Calendar API
2. Validate time slot availability
3. Create event with provided details
4. Send invites if attendees specified
5. Return event ID and link

## Output Schema
```json
{
  "eventId": "string",
  "eventLink": "string",
  "success": "boolean",
  "invitesSent": "number"
}
```

## Example Usage
Input: `{ "title": "Team Standup", "startTime": "2024-12-18T10:00:00Z", "endTime": "2024-12-18T10:30:00Z" }`
Output: Event created with link

## Error Handling
- If not authenticated: return error with auth instructions
- If time slot conflict: return conflict details and ask for confirmation
- If attendee email invalid: skip invalid emails and log warning
