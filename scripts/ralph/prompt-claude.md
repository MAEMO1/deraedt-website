# Ralph Iteration Prompt

You are working on the De Raedt Growth OS project.
You must complete EXACTLY ONE story per iteration.

## Current Story

{{STORY_JSON}}

## Instructions

1. **Read** the story carefully (id, title, description, acceptanceCriteria)
2. **Plan** what changes are needed
3. **Implement** the changes
4. **Verify** with: `pnpm lint && pnpm tsc --noEmit && pnpm build`
5. **Commit** with format: `feat: [STORY_ID] - [Title]`
6. **Update** prd.json: set this story's `passes: true`
7. **Append** to progress.txt
8. **Update** AGENTS.md if you discovered something new

## Quality Checks

Before marking done:
- [ ] All acceptance criteria met
- [ ] Verify command passes (lint + typecheck + build)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Code follows patterns in AGENTS.md

## Blocking Issues

If you encounter:
- Missing credentials → create stub/interface, mark as BLOCK
- Unclear requirements → document question in notes, mark as BLOCK
- Story too large → split into smaller stories, print `<promise>NEEDS_SPLIT</promise>`

## Completion

When this story is done and verified:
1. Commit the changes
2. Update prd.json
3. Append to progress.txt
4. Return control to the loop

If ALL stories in prd.json have `passes: true`:
Print exactly: `<promise>COMPLETE</promise>`
