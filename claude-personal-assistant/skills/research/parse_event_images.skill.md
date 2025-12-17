# SKILL: parse_event_images

## Purpose
Extract event details from images using Claude Vision

## Tools Required
- Claude Vision API
- Image processing

## Input Schema
```json
{
  "imageUrls": "array of strings",
  "extractFields": "array of strings (optional: date, time, location, organizer, title)"
}
```

## Steps
1. Load images from URLs
2. Send to Claude Vision API
3. Extract structured event information
4. Validate and normalize dates/times
5. Return parsed event details

## Output Schema
```json
{
  "events": [
    {
      "title": "string",
      "date": "ISO string",
      "time": "string",
      "location": "string",
      "organizer": "string",
      "description": "string",
      "confidence": "number (0-1)"
    }
  ],
  "count": "number"
}
```

## Example Usage
Input: `{ "imageUrls": ["https://example.com/event-flyer.jpg"], "extractFields": ["date", "time", "location", "title"] }`
Output: Structured event details extracted from flyer image

## Error Handling
- If image URL invalid: skip and log error
- If image doesn't contain event info: return low confidence score
- If date parsing fails: return raw text with note
