---
description: Show the next failing story from prd.json
---

Read `scripts/ralph/prd.json` and find the next story to work on.

Selection criteria:
1. `passes` must be `false`
2. Lowest `priority` number wins

Display:
- **ID**: [story id]
- **Priority**: [number]
- **Title**: [title]
- **Description**: [description]
- **Acceptance Criteria**:
  - [ ] criterion 1
  - [ ] criterion 2
  - ...
- **Notes**: [if any]

If all stories have `passes: true`, say:
"🎉 All stories complete! Run `/sales-demo` to prepare for client presentation."
