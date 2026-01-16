#!/bin/bash
# Ralph Loop - Iterative story processor

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PRD_JSON="$SCRIPT_DIR/prd.json"
PROGRESS_FILE="$SCRIPT_DIR/progress.txt"
PROMPT_TEMPLATE="$SCRIPT_DIR/prompt-claude.md"
AGENTS_FILE="$REPO_ROOT/AGENTS.md"
RALPH_AGENTS="$SCRIPT_DIR/AGENTS.md"

MAX_ITERATIONS=${1:-10}

if [ ! -f "$PRD_JSON" ]; then
    echo "Error: prd.json not found. Run generate-prd-json.sh first."
    exit 1
fi

echo "=== Ralph Loop Starting ==="
echo "Max iterations: $MAX_ITERATIONS"
echo ""

for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo "--- Iteration $i ---"

    # Find next story with passes=false, lowest priority
    NEXT_STORY=$(jq -r '
        .userStories
        | map(select(.passes == false))
        | sort_by(.priority)
        | first
        // empty
    ' "$PRD_JSON")

    if [ -z "$NEXT_STORY" ] || [ "$NEXT_STORY" = "null" ]; then
        echo "All stories complete!"
        echo "<promise>COMPLETE</promise>"
        exit 0
    fi

    STORY_ID=$(echo "$NEXT_STORY" | jq -r '.id')
    STORY_TITLE=$(echo "$NEXT_STORY" | jq -r '.title')

    echo "Working on: $STORY_ID - $STORY_TITLE"

    # Build context for Claude
    CONTEXT="# Current Story

\`\`\`json
$NEXT_STORY
\`\`\`

# Project Context

$(cat "$AGENTS_FILE")

# Ralph Rules

$(cat "$RALPH_AGENTS")

# Progress So Far

$(tail -20 "$PROGRESS_FILE")

# Instructions

$(cat "$PROMPT_TEMPLATE" | sed "s/{{STORY_JSON}}/$NEXT_STORY/g")
"

    # Run Claude with the context
    RESULT=$(echo "$CONTEXT" | claude -p \
        --allowedTools "Read,Edit,Write,Bash(git:*),Bash(pnpm:*),Bash(npm:*),Glob,Grep" \
        --max-turns 50 \
        2>&1)

    echo "$RESULT"

    # Check for completion signals
    if echo "$RESULT" | grep -q "<promise>COMPLETE</promise>"; then
        echo "=== All Stories Complete ==="
        exit 0
    fi

    if echo "$RESULT" | grep -q "<promise>NEEDS_SPLIT</promise>"; then
        echo "=== Story needs splitting. Review prd.json and restart. ==="
        exit 1
    fi

    # Small delay between iterations
    sleep 2
done

echo "=== Max iterations reached ==="
exit 0
