# De Raedt Growth OS — Agent Instructions

## Product Context

**De Raedt Growth OS** is een groei‑ en control platform voor Bouwwerken De Raedt Ivan NV:
- **Publiek Front (Fase 1):** vertrouwen + bewijs + conversie (project intake, facility, partner, jobs)
- **Intern Portaal (Fase 2):** tender intelligence + lead/CRM + recruitment hub + facility desk + partner prequal + directie cockpit

**Commercieel:**
- Setup: €79.000 – €109.000
- Retainer: €1.950/maand

## Werkafspraken

1. **1 story per iteratie** — werk nooit aan meerdere stories tegelijk
2. **Tests groen** — elke iteratie eindigt met passing verify
3. **Geen secrets** — nooit .env, tokens, keys, credentials lezen of schrijven
4. **Geen scope creep** — alleen wat in de story staat
5. **Discoveries → AGENTS.md** — elke ontdekking vastleggen
6. **Commit format:** `feat: [STORY_ID] - [Title]`

## Commando's

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Lint (ESLint)
pnpm lint

# TypeCheck (momenteel niet als script, use directly)
pnpm tsc --noEmit

# Build
pnpm build

# Tests (niet geconfigureerd - TODO: add vitest)
# pnpm test

# Verify (all checks)
pnpm lint && pnpm tsc --noEmit && pnpm build
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.1.1 (App Router) |
| React | 19.2.3 |
| Data | Supabase + Sanity CMS |
| Styling | Tailwind CSS v4 |
| Components | Radix UI + custom ui/ |
| Forms | react-hook-form + zod |
| Animations | framer-motion |

## Codebase Structure

```
app/
├── (marketing)/     # Public pages: home, diensten, projecten, procurement, etc.
├── (portal)/        # Admin: login, dashboard
├── (wizard)/        # Multi-step flows: projectplanner
├── api/             # API routes
├── layout.tsx       # Root layout
└── globals.css      # Global styles

components/
├── marketing/       # Public page components
├── portal/          # Admin components
├── shared/          # Shared components
├── ui/              # Base UI components (Radix-based)
└── structured-data.tsx  # JSON-LD schemas

lib/
├── constants.ts     # App constants
├── utils.ts         # Utility functions
├── sanity/          # Sanity client & queries
├── supabase/        # Supabase client
└── validations/     # Zod schemas
```

## Patterns & Gotchas

### Routing
- Route groups: `(marketing)`, `(portal)`, `(wizard)` — parentheses = no URL segment
- Dynamic routes: `[slug]` for project detail pages

### Components
- Use `@/components/ui/*` for base components
- Marketing components in `@/components/marketing/*`
- All components use TypeScript with explicit types

### Data Fetching
- Server Components by default
- Use `'use client'` only when needed (interactivity, hooks)
- Supabase for structured data, Sanity for content

### Styling
- Tailwind v4 (CSS-first config in globals.css)
- Use `cn()` from `@/lib/utils` for conditional classes
- Design tokens in Tailwind config

## Data Model (Planned)

### Core Entities
- User, Role, Session
- AuditLog
- MediaAsset
- Service, CaseStudy
- ComplianceDoc
- Lead, LeadNote
- FacilityTicket, TicketUpdate
- JobPosting, JobApplication
- PartnerCompany, PartnerDocument
- TenderNotice, TenderOpportunity, TenderDecision
- Notification

## Sales Narrative Hooks (UI → Value)

| Screen | Value Proposition |
|--------|-------------------|
| Procurement Hub | "Alle certificaten in 1 klik — geen zoektocht naar PDFs" |
| Projectplanner | "Gestructureerde intake → automatisch in pipeline" |
| Directie Cockpit | "1 scherm = bedrijfssituatie (tenders, leads, deadlines)" |
| Tender Hub | "Opportuniteiten sneller zien → nooit een deadline missen" |
| Expiry Radar | "Certificaten die vervallen: 30/60/90 dagen waarschuwing" |

## Discoveries Log

_Append new discoveries here as you work._

---
_Last updated: 2026-01-16_
