---
description: Run canonical verify checks (lint + typecheck + build)
---

Run the complete verification suite for De Raedt Growth OS.

Execute these commands in order and report results:

1. **Lint**: `pnpm lint`
2. **TypeCheck**: `pnpm tsc --noEmit`
3. **Build**: `pnpm build`

For each step:
- Show the command being run
- Report success or failure
- On failure: show the error output and suggest fixes

Summary at end:
- ✅ or ❌ for each check
- Overall: PASS or FAIL
