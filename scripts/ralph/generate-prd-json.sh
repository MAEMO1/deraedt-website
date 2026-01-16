#!/bin/bash
# Generate prd.json from PRD.md using Claude

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PRD_FILE="$REPO_ROOT/PRD.md"
OUTPUT_FILE="$SCRIPT_DIR/prd.json"

if [ ! -f "$PRD_FILE" ]; then
    echo "Error: PRD.md not found at $PRD_FILE"
    exit 1
fi

echo "Generating prd.json from PRD.md..."

# JSON Schema for the output
SCHEMA='{
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "branchName": { "type": "string" },
    "userStories": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "priority": { "type": "integer" },
          "title": { "type": "string" },
          "description": { "type": "string" },
          "acceptanceCriteria": {
            "type": "array",
            "items": { "type": "string" }
          },
          "passes": { "type": "boolean" },
          "pathsTouched": {
            "type": "array",
            "items": { "type": "string" }
          },
          "commands": {
            "type": "array",
            "items": { "type": "string" }
          },
          "notes": { "type": "string" }
        },
        "required": ["id", "priority", "title", "description", "acceptanceCriteria", "passes"]
      }
    }
  },
  "required": ["title", "branchName", "userStories"]
}'

PROMPT="Read the PRD.md file and extract user stories.

Create a JSON object with:
- title: 'De Raedt Growth OS'
- branchName: 'growth-os-dev'
- userStories: array of stories from the PRD

For each story in section 11 (Story Backlog):
- id: the story ID (e.g., 'FND-001')
- priority: numeric priority (FND=1-20, PUB=21-60, ADM=61-140)
- title: story title
- description: detailed description of what needs to be done
- acceptanceCriteria: array of specific, testable criteria
- passes: false (default for all stories)
- pathsTouched: (optional) files likely to be modified
- commands: (optional) commands to run for verification
- notes: (optional) any special notes or blockers

Foundation stories (FND-*) should have priority 1-20.
Public stories (PUB-*) should have priority 21-60.
Admin stories (ADM-*) should have priority 61-140.

Be thorough: include ALL stories from the backlog."

# Use claude CLI to generate JSON
claude -p "$PROMPT" \
    --allowedTools Read,Bash \
    --output-format json \
    --json-schema "$SCHEMA" \
    > "$OUTPUT_FILE"

echo "Generated: $OUTPUT_FILE"
echo "Stories: $(jq '.userStories | length' "$OUTPUT_FILE")"
