# SKILL: save_to_file

## Purpose
Save data to a markdown file for later reference

## Tools Required
- File system access

## Input Schema
```json
{
  "filename": "string",
  "content": "string",
  "append": "boolean (default: false)",
  "directory": "string (default: ./output)"
}
```

## Steps
1. Validate filename (sanitize dangerous characters)
2. Create directory if it doesn't exist
3. Write or append content to file
4. Confirm write success
5. Return file path and metadata

## Output Schema
```json
{
  "success": "boolean",
  "path": "string",
  "size": "number (bytes)",
  "timestamp": "ISO string"
}
```

## Example Usage
Input: `{ "filename": "meeting-notes.md", "content": "# Meeting Notes\n\n- Action item 1\n- Action item 2" }`
Output: `{ "success": true, "path": "./output/meeting-notes.md", "size": 54, "timestamp": "2024-12-17T10:00:00Z" }`

## Error Handling
- If filename invalid: sanitize and warn user
- If directory not writable: return permission error
- If disk full: return storage error
