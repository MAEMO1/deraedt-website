# Frontend Rules

## Component Structure

```tsx
// 1. Imports (external → internal)
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// 2. Types
interface Props {
  title: string
  onSubmit: () => void
}

// 3. Component
export function MyComponent({ title, onSubmit }: Props) {
  // hooks first
  const [state, setState] = useState(false)

  // handlers
  const handleClick = () => { ... }

  // render
  return (...)
}
```

## Styling

- Use Tailwind classes exclusively
- Use `cn()` for conditional classes
- Follow mobile-first approach
- Respect design tokens in globals.css

## Components

- Use `@/components/ui/*` for base components
- Keep components small and focused
- Extract reusable logic to hooks
- Use Server Components by default

## Client Components

Only use `'use client'` when you need:
- useState, useEffect, or other hooks
- Event handlers (onClick, onChange, etc.)
- Browser APIs

## Forms

- Use react-hook-form + zod
- Show inline validation errors
- Disable submit button while loading
- Show success/error toast (sonner)

## Accessibility

- Use semantic HTML
- Add aria-labels where needed
- Ensure keyboard navigation
- Maintain focus management
- Color contrast: WCAG AA minimum
