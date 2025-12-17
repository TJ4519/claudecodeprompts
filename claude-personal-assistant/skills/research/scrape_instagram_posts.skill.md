# SKILL: scrape_instagram_posts

## Purpose
Scrape recent posts from an Instagram account

## Tools Required
- Browser automation (MCP server)
- Image analysis (Claude Vision)

## Input Schema
```json
{
  "username": "string",
  "maxPosts": "number (default: 10)",
  "analyzeImages": "boolean (default: false)"
}
```

## Steps
1. Navigate to Instagram profile
2. Scroll and load posts
3. Extract post data (captions, images, dates, engagement)
4. If analyzeImages=true, use Claude Vision to describe images
5. Return structured post data

## Output Schema
```json
{
  "posts": [
    {
      "id": "string",
      "caption": "string",
      "imageUrl": "string",
      "imageDescription": "string (if analyzed)",
      "likes": "number",
      "comments": "number",
      "postedAt": "ISO string"
    }
  ],
  "count": "number"
}
```

## Example Usage
Input: `{ "username": "techcrunch", "maxPosts": 5, "analyzeImages": true }`
Output: 5 most recent posts with AI-generated image descriptions

## Error Handling
- If account doesn't exist: return error with suggestion
- If account is private: return error explaining limitation
- If rate limited: implement exponential backoff
