---
description: Seed demo data for director cockpit, tenders, leads, and jobs
---

Create demo seed data for the De Raedt Growth OS sales demo.

This command sets up realistic-looking data in Supabase for:

## 1. Tenders (5-8 records)
- Mix of CPV codes (bouw, dakwerken, facility)
- Various statuses: new, analyzing, go, no-go, submitted, won, lost
- Realistic deadlines (some urgent, some future)
- Match scores between 60-95%

## 2. Leads (8-10 records)
- Mix of lead types: project, facility, partner
- Various pipeline stages
- Realistic organizations (gemeentes, scholen, bedrijven)

## 3. Jobs (3-5 records)
- Current vacancies: werfleider, dakwerker, projectleider, etc.
- With structured data for JobPosting schema

## 4. Cases/Referenties (6-8 records)
- Mix of sectors: publiek, onderwijs, zorg, industrie
- With project details, photos, KPIs

## 5. Compliance Docs
- ISO 9001 (valid)
- VCA** (valid)
- CO₂-Prestatieladder niveau 3 (valid 4 aug 2025 - 14 jan 2028)
- Some expiring soon (for radar demo)

## Notes
- If Supabase connection is not available, create JSON seed files in `scripts/seed/`
- Document seed structure in AGENTS.md
