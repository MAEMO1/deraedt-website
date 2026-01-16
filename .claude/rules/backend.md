# Backend Rules

## API Routes

Location: `app/api/[resource]/route.ts`

```tsx
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    // Business logic here

    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Validation

- Always validate with Zod on server
- Return structured error responses
- Never trust client-side validation alone

## Error Shape

```ts
// Success
{ success: true, data: T }

// Validation Error (400)
{ success: false, errors: ZodError[] }

// Auth Error (401/403)
{ success: false, error: 'Unauthorized' }

// Server Error (500)
{ success: false, error: 'Internal server error' }
```

## Database

- Use Supabase client from `@/lib/supabase`
- Use Row Level Security (RLS) policies
- Never expose raw database errors to client

## Rate Limiting

- Apply rate limits to public endpoints
- Limits: 10 req/min for forms, 100 req/min for reads

## Logging

- Log all errors with context
- Log authentication events
- Log slow queries (>500ms)
