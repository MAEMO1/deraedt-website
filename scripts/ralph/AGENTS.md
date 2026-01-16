# Ralph Loop — Agent Instructions

## What is Ralph?

Ralph is an iterative development loop that processes user stories one at a time.
Each iteration:
1. Picks the highest-priority story with `passes: false`
2. Implements the story
3. Runs verify (lint + typecheck + build)
4. Commits with format: `feat: [STORY_ID] - [Title]`
5. Updates `prd.json` to set `passes: true`
6. Appends to `progress.txt`

## Rules

### 1. One Story Per Iteration
- Never work on multiple stories at once
- Complete the current story before moving to the next
- If blocked: document as BLOCK in notes and move to next story

### 2. Verify Before Commit
```bash
pnpm lint && pnpm tsc --noEmit && pnpm build
```
All checks must pass before committing.

### 3. Update AGENTS.md
- Every discovery → append to root AGENTS.md
- New patterns, gotchas, decisions
- Keep it as living documentation

### 4. Progress Log
After each story, append to `progress.txt`:
```
[STORY_ID] - [Title]
Status: DONE | BLOCKED
Notes: [any relevant info]
---
```

### 5. Stop Conditions
- If all stories have `passes: true`: print `<promise>COMPLETE</promise>`
- If a story needs splitting: update prd.json, print `<promise>NEEDS_SPLIT</promise>`
- If blocked by credentials/external: mark as BLOCK, move to next

### 6. No Secrets
- Never read `.env` or credential files
- Create stubs/interfaces instead
- Document what's needed in notes

## Commit Format

```
feat: [FND-001] - Verification harness setup

- Added verify script
- Documented commands in AGENTS.md
```

## Story Selection

Priority order:
1. Foundation (FND-*) — setup, infrastructure
2. Public (PUB-*) — public-facing features
3. Admin (ADM-*) — internal portal features

Within same prefix: lower number = higher priority.
