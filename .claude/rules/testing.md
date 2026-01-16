# Testing Rules

## Verify Command

The canonical verify command is:
```bash
pnpm lint && pnpm tsc --noEmit && pnpm build
```

This must pass before any commit.

## Test Levels

### Unit Tests (TODO: setup vitest)
- Test utility functions
- Test Zod schemas
- Test pure components

### Integration Tests
- Test API routes with mocked Supabase
- Test form submissions

### E2E Tests (future)
- Critical user flows: intake → submission → admin view
- Use Playwright when ready

## What to Test

- All new utility functions
- All Zod validation schemas
- Critical business logic (lead routing, tender matching)
- Form validation behavior

## Test File Location

- Co-locate with source: `foo.ts` → `foo.test.ts`
- Or in `__tests__/` directory

## Mocking

- Mock Supabase client for API tests
- Mock Sanity client for content tests
- Never call real external services in tests
