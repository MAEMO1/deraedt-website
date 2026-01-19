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
7. **DRY Principle** — Don't Repeat Yourself:
   - Hergebruik bestaande types uit `lib/supabase/types.ts`
   - Hergebruik bestaande API patterns en validators
   - Hergebruik UI components en styling constants
   - Check eerst of vergelijkbare code al bestaat voordat je nieuwe code schrijft

## Commando's

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Lint (ESLint)
pnpm lint

# TypeCheck
pnpm typecheck

# Build
pnpm build

# Tests (niet geconfigureerd - TODO: add vitest)
# pnpm test

# Verify (all checks: lint + typecheck + build)
pnpm verify
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
- **KRITIEK:** Dashboard routes zijn `/dashboard/*`, NIET `/portal/*`

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

### Auth Pattern (BELANGRIJK)
- **Middleware** handelt route protection af → redirect naar `/login` als niet ingelogd
- **Pages** gebruiken NOOIT `redirect('/login')` → veroorzaakt redirect loops
- **Fallback user:** Gebruik `FALLBACK_USER` uit `lib/supabase/fallback-user.ts` als profile fetch faalt
- Pattern voor dashboard pages:
  ```tsx
  import { getCurrentUser } from '@/lib/supabase/auth';
  import { FALLBACK_USER } from '@/lib/supabase/fallback-user';

  export default async function SomePage() {
    const user = await getCurrentUser();
    return <SomeClient user={user || FALLBACK_USER} />;
  }
  ```

## Verificatie Checklist (VERPLICHT)

### Na elke dashboard/portal wijziging:
1. **Routes matchen:** Controleer dat sidebar links (`components/portal/sidebar.tsx`) overeenkomen met bestaande routes in `app/(portal)/dashboard/`
2. **Navigatie test:** Klik door ALLE sidebar items en verifieer dat geen 404's optreden
3. **Auth flow test:**
   - Uitloggen → probeer `/dashboard` → moet redirect naar `/login`
   - Inloggen → navigeer naar sub-pages → moet NIET opnieuw naar login redirecten
4. **Seed data:** Verifieer dat pagina's demo data tonen uit `scripts/seed/`

### Bij nieuwe dashboard module:
1. Maak page in `app/(portal)/dashboard/[module]/page.tsx`
2. Voeg route toe aan sidebar in `components/portal/sidebar.tsx`
3. Gebruik FALLBACK_USER pattern (geen redirect in page)
4. Test navigatie vanuit andere dashboard pages

## Data Model (Implemented)

### Core Tables (see supabase/migrations/)
- `profiles` — User roles (RBAC)
- `leads` + `lead_notes` — Intake submissions
- `tenders` — Tender opportunities with go/no-go workflow
- `jobs` + `job_applications` — Vacancies and applications
- `cases` — Case studies / referenties
- `compliance_docs` — Certificates with expiry tracking

### Views
- `compliance_expiry_radar` — Documents expiring in 30/60/90 days

### Types
All types in `lib/supabase/types.ts` with helper exports.

### Seed Data
JSON seed files in `scripts/seed/`:
- tenders.json (6 records)
- leads.json (10 records)
- jobs.json (4 records)
- cases.json (8 records)
- compliance_docs.json (8 records)

## Sales Narrative Hooks (UI → Value)

| Screen | Value Proposition |
|--------|-------------------|
| Procurement Hub | "Alle certificaten in 1 klik — geen zoektocht naar PDFs" |
| Projectplanner | "Gestructureerde intake → automatisch in pipeline" |
| Directie Cockpit | "1 scherm = bedrijfssituatie (tenders, leads, deadlines)" |
| Tender Hub | "Opportuniteiten sneller zien → nooit een deadline missen" |
| Expiry Radar | "Certificaten die vervallen: 30/60/90 dagen waarschuwing" |

## Discoveries Log

### 2026-01-16: Verification harness (FND-001)
- Added `pnpm verify` script (lint + typecheck + build)
- Added `pnpm typecheck` script
- Fixed lint errors: unused imports, unescaped apostrophes
- **Note:** Build requires network access to Google Fonts. In offline/sandbox environments, build may fail with TLS errors. Lint + typecheck still work offline.

### 2026-01-16: Data layer setup (FND-002)
- Created 6 SQL migration files in `supabase/migrations/`
- Comprehensive TypeScript types in `lib/supabase/types.ts`
- JSON seed data in `scripts/seed/` (6 tenders, 10 leads, 4 jobs, 8 cases, 8 compliance docs)
- Created `compliance_expiry_radar` view for certificate monitoring
- **Note:** Migrations require Supabase CLI. Seed data is JSON fallback for demos.

### 2026-01-16: Auth + RBAC setup (FND-003)
- Implemented Supabase Auth with magic link (OTP)
- Created `middleware.ts` at root to protect `/dashboard/*` routes
- Created `lib/supabase/auth.ts` with RBAC utilities:
  - `getCurrentUser()` - get authenticated user with profile
  - `hasRole(userRole, requiredRole)` - role hierarchy check
  - `canAccessRoute(role, route)` - route-based access control
  - `canPerformAction(role, action)` - action-based permissions
  - `requireAuth()` / `requireRole()` - server component guards
- Auth callback route at `/auth/callback` for magic link handling
- Dashboard header updated with real user data and logout
- **Security:** Added DELETE policies for GDPR compliance (leads, job_applications)
- **Note:** Roles hierarchy: VIEWER < OPERATIONS/HR/SALES < ADMIN < DIRECTIE

### 2026-01-17: Sidebar navigatie + auth fixes (POST-RALPH)
- **BUG GEVONDEN:** Sidebar linkte naar `/portal/*` terwijl routes op `/dashboard/*` staan
- **OORZAAK:** Sidebar component was niet geüpdatet toen dashboard modules werden toegevoegd
- **FIX:** Sidebar routes gecorrigeerd in `components/portal/sidebar.tsx`
- **BUG GEVONDEN:** Dashboard pages hadden `redirect('/login')` die conflicteerde met middleware
- **OORZAAK:** Dubbele auth checks (middleware + page) veroorzaken redirect loops
- **FIX:** Alle pages gebruiken nu `FALLBACK_USER` pattern, geen redirects in pages
- **LESSON LEARNED:** Na implementatie van nieuwe routes ALTIJD navigatie testen door te klikken
- **TOEGEVOEGD:** Verificatie Checklist sectie in AGENTS.md

### 2026-01-17: Supabase data layer refactoring

- **DOEL:** Dashboard modules moeten echte Supabase data gebruiken i.p.v. mock/seed JSON
- **AANGEMAAKT:** `lib/supabase/queries.ts` met alle data access functies:
  - `getTenders()`, `getTenderById()`
  - `getLeads()`, `getLeadById()`
  - `getComplianceDocs()`, `getExpiryRadar()`
  - `getJobs()`, `getJobBySlug()`
  - `getJobApplications()`, `getApplicationsByJobId()`
  - `getCases()`
  - `getDashboardData()` (aggregeert cockpit data)
  - `getAnalyticsData()` (aggregeert analytics data)
- **FALLBACK MECHANISME:** Queries proberen eerst Supabase, vallen terug op seed data bij lege/fout
- **UPDATED PAGES:** Alle server pages (`page.tsx`) halen nu data op en geven door als props
- **UPDATED CLIENTS:** Alle client components ontvangen data via props i.p.v. directe JSON imports
- **TYPE FIXES:** Supabase types gebruiken `| null`, lokale interfaces gebruikten `| undefined`
  - Alle format functies accepteren nu `string | null`
  - Type guards toegevoegd voor filtering
  - Optional chaining voor nullable velden
- **PATTERN:** Server component fetcht data, client component rendert (props-driven)

### 2026-01-17: Tender Agent implementation

- **DOEL:** Automatische tender ingestion van TED en e-Procurement bronnen
- **AANGEMAAKT:** `lib/tender-agent/` module met:
  - `types.ts` — Type definities voor connectors, raw/normalized tenders, ingest runs
  - `match-calculator.ts` — Bereken match score op basis van CPV codes, locatie, waarde, deadline
  - `rate-limiter.ts` — Rate limiting per bron (60/uur TED, 100/dag e-Procurement)
  - `ted-connector.ts` — TED API connector voor Europese tenders
  - `e-procurement-connector.ts` — Belgian e-Procurement connector + email parser
  - `index.ts` — Orchestrator die alle connectors coördineert
- **DATABASE:**
  - `00011_tender_ingest.sql` — Migration voor `tender_ingest_runs` en `cpv_relevance` tables
  - CPV relevance seed data voor bouwsector codes (core/adjacent/opportunistic/excluded)
  - `calculate_tender_match_score()` PostgreSQL functie
- **CRON JOB:**
  - `app/api/cron/tender-ingest/route.ts` — API route voor cron
  - `vercel.json` — Cron schedule: weekdagen 7:00, 12:00, 17:00 CET
  - Beveiligd met CRON_SECRET environment variable
- **MATCH SCORE ALGORITME:**
  - CPV codes: 60% gewicht (core=100, adjacent=70, opportunistic=50)
  - Locatie: 25% gewicht (Oost-Vlaanderen=100, Vlaanderen=70, België=50)
  - Waarde: 10% gewicht (sweet spot €200K-€2M)
  - Deadline: 5% gewicht (ideaal 2-8 weken)
  - Skip tenders met score < 30%
- **ENVIRONMENT VARIABLES NODIG:**
  - `CRON_SECRET` — Beveiliging van cron endpoint (optioneel in dev)

### 2026-01-18: Feature completeness fixes

- **AUDIT:** Feature verification revealed 3 gaps in production readiness
- **FIX-001:** Projectplanner form was UI-only (handleSubmit was stub)
  - Created `/api/projectplanner` endpoint
  - Wired form to API with toast notifications
  - Leads now stored with type='project', source='projectplanner'
- **FIX-002:** Lead detail page missing (only modal existed)
  - Created `/dashboard/leads/[id]` with full page layout
  - Server component fetches lead + notes + profiles
  - Inline edit for status, owner, next action date
- **FIX-003:** Cases dashboard missing (schema existed but no UI)
  - Created `/dashboard/cases` with grid view
  - Filters: search, sector, year
  - Detail modal with KPIs display
  - Added Cases link to sidebar
- **COMPLETENESS:** Platform now ~85% feature complete

---
_Last updated: 2026-01-18_
