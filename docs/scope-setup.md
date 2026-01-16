# Setup Scope — De Raedt Growth OS (Fase 1 + Fase 2)

## Doel
Een **verkoopbaar platform** dat publiek + intern "live" kan draaien en direct waarde toont:
- Publieke conversieflows
- Admin cockpit
- Tender/lead/recruitment workflows
- Compliance vault + expiry radar
- Seed demo data + demo script

## In scope (setup)
### Publiek
- IA/sitemap + SEO baseline
- Services + cases/referenties (CMS-ready)
- Procurement hub + tender pack request
- Jobs + job detail + apply flow + JobPosting schema
- Project intake + facility intake + partner intake flows
- Analytics events

### Intern admin
- Auth + RBAC + audit log basis
- Cockpit v1 (KPI tiles + alerts)
- Tender hub v1 (TED RSS ingest + list + go/no-go)
- Lead hub v1 (pipeline + assignment)
- Recruitment hub v1 (jobs CRUD + applications)
- Compliance vault v1 (docs + expiry + templates)
- Facility desk v1 (tickets + SLA due + statuses)
- Partner prequal v1 (intake + checklist + review)

### Tech & quality
- Verify harness (lint/typecheck/tests/build)
- Seed demo data
- Logging & error handling
- Rate limiting / input validation
- Basis GDPR: consent + retention defaults (configurable)

## Out of scope (setup)
- VDAB live publiceren (credentials) → wel adapter stub + mapping
- Volledig e‑Procurement automatische ingest → v1 manual/forwarder
- ERP/boekhouding integraties
- SSO / klantportaal met uitgebreide externe rollen

## Deliverables
- Werkend platform (public + admin)
- Documentatie (AGENTS.md + demo script)
- Roadmap/backlog voor retainer

## Acceptatie (setup)
- Alle flows leiden tot records in admin
- Cockpit toont data uit seed + live submissions
- Tender ingest via TED RSS werkt end-to-end
- Compliance expiry radar werkt op echte datumvelden
- Security: admin routes beschermd; RBAC enforced
