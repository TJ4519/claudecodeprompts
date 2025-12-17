# SKILL: find_instagram_accounts

## Purpose
Find Instagram accounts based on search criteria

## Tools Required
- Browser automation (MCP server)
- Web scraping capabilities

## Input Schema
```json
{
  "searchQuery": "string",
  "maxResults": "number (default: 10)",
  "filters": {
    "verified": "boolean (optional)",
    "minFollowers": "number (optional)"
  }
}
```

## Steps
1. Use browser automation to search Instagram
2. Parse search results
3. Filter by criteria (verified, follower count)
4. Extract account details
5. Return structured list

## Output Schema
```json
{
  "accounts": [
    {
      "username": "string",
      "displayName": "string",
      "bio": "string",
      "followers": "number",
      "verified": "boolean",
      "profileUrl": "string"
    }
  ],
  "count": "number"
}
```

## Example Usage
Input: `{ "searchQuery": "tech startup SF", "maxResults": 5, "filters": { "minFollowers": 1000 } }`
Output: List of 5 tech startup accounts in SF with 1000+ followers

## Error Handling
- If browser automation fails: retry with backoff
- If Instagram blocks request: implement rate limiting
- If no results: return empty array with suggestion to broaden search
