# SKILL: search_gmail

## Purpose
Search Gmail for messages matching a query

## Tools Required
- Gmail API (via Google Auth)

## Input Schema
```json
{
  "query": "string (Gmail search query)",
  "maxResults": "number (default: 10)"
}
```

## Steps
1. Authenticate with Gmail API
2. Execute search with query
3. Parse results
4. Return structured list of messages

## Output Schema
```json
{
  "messages": [
    {
      "id": "string",
      "subject": "string",
      "from": "string",
      "date": "ISO string",
      "snippet": "string"
    }
  ],
  "count": "number"
}
```

## Example Usage
Input: `{ "query": "from:boss urgent", "maxResults": 5 }`
Output: List of 5 most recent urgent emails from boss

## Error Handling
- If not authenticated: return error with auth instructions
- If query invalid: return error with valid query examples
- If no results: return empty array with message
