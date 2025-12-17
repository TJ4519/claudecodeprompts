# SKILL: find_conflicts

## Purpose
Find scheduling conflicts in Google Calendar

## Tools Required
- Google Calendar API (via Google Auth)

## Input Schema
```json
{
  "startDate": "ISO date string",
  "endDate": "ISO date string",
  "calendarId": "string (default: primary)"
}
```

## Steps
1. Authenticate with Google Calendar API
2. Fetch events in date range
3. Analyze for overlapping time slots
4. Return list of conflicts with details

## Output Schema
```json
{
  "conflicts": [
    {
      "event1": {
        "id": "string",
        "title": "string",
        "start": "ISO string",
        "end": "ISO string"
      },
      "event2": {
        "id": "string",
        "title": "string",
        "start": "ISO string",
        "end": "ISO string"
      },
      "overlapMinutes": "number"
    }
  ],
  "count": "number"
}
```

## Example Usage
Input: `{ "startDate": "2024-12-17", "endDate": "2024-12-24" }`
Output: List of conflicting events in the next week

## Error Handling
- If not authenticated: return error with auth instructions
- If invalid date range: return validation error
- If no events found: return empty array with message
