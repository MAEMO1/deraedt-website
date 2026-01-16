# De Raedt Growth OS — PRD v1.0

> Documentdoel: Deze PRD stuurt de (Claude/Ralph) iteratieve bouw van een **"levend organisme"**: publieke website + intern portaal + integraties.
> Dit is géén "marketingwebsite". Dit is een **groei‑ en control platform** dat administratie verlaagt, groei stimuleert, en directie-inzichten geeft.

---

## 0) TL;DR (voor bestuurders)

### Wat bouwen we?
**De Raedt Growth OS** = 1 platform met 2 lagen:
- **Publiek Growth Front (Fase 1):** vertrouwen + bewijs + conversie (project intake, facility, partner, jobs)
- **Intern Growth & Control Portaal (Fase 2):** tender intelligence + lead/CRM + recruitment hub + facility desk + partner prequal + directie cockpit

### Waarom doen we dit?
Omdat De Raedt expliciet groeit op:
- **ontzorging, flexibiliteit, procesbeheersing en digitalisatie**
- én omdat **publieke klanten** (raamcontracten/aanbestedingen) vragen om **compliance, snelheid en bewijs**.

### Wat moet het opleveren?
Binnen 6–12 maanden:
- Minder admin (minder mail-chaos, minder "zoek die pdf", minder dubbel invoer)
- Meer instroom (leads + sollicitanten + partners)
- Meer controle (pipeline, deadlines, risico's, tenderflow, certificaten die vervallen)
- Een platform dat "doorleeft" via retainer

### Commercial packaging
- **Setup (Fase 1 + Fase 2): €79.000 – €109.000** (excl. btw)
- **Retainer: €1.950/maand** (doorontwikkeling + support + optimalisatie)

---

## 1) Bedrijfscontext (inputs die we respecteren)

### 1.1 Positionering & waarden (tone of voice)
De Raedt is een familiale onderneming (sinds 1930), actief in:
- bouw, renovatie en interventies
- publieke én private sector

Kernwoorden die we in copy, flows en UI moeten reflecteren:
- kwaliteit, procesbeheersing, digitalisatie, opleiding, teamwork
- klantentevredenheid, ontzorging, flexibiliteit
- "5 V's": Verantwoordelijkheid, Veiligheid, Vrijheid, Vertrouwen, Vooruitgang

### 1.2 Kernservices (voor conversieflows)
We ondersteunen minstens deze leadtypes:
- Bouw & renovatie (incl. dak/gevel; complexe projecten; kritische infrastructuur)
- Facility: onderhoud & herstellingen (snelle interventies, duidelijke communicatie, opvolging)
- (Optioneel in demo-copy: erfgoed/monumenten als aparte service, zolang dit klopt met referenties/cases)

### 1.3 Certificaten & compliance
De publieke laag moet procurement-ready zijn:
- ISO 9001, VCA**
- CO₂‑Prestatieladder 3.1 – Niveau 3 (scope: bouw/dak/infrastructuur + onderhoud/interventies/energetische renovaties)
- Document library met geldigheid/versies + 1‑klik "Tender Pack" export

**Specifiek (v1 in data-model):**
- CO₂‑certificaat geldig van 4 aug 2025 t.e.m. 14 jan 2028 (moet als datum in compliance module kunnen)

### 1.4 Doelpublieken
- Overheden & aanbestedende diensten (procurement officers, raamcontract managers)
- Facility managers (interventies, SLA/rapportering)
- Private opdrachtgevers (projecten, renovaties)
- Architecten/studiebureaus (partnership + tenders)
- Kandidaten (vakmannen, werfleiders, projectleiding)
- Onderaannemers/partners (prekwalificatie + documenten)

---

## 2) Visie: "Website als levend organisme"

### North Star
"De Raedt Growth OS is de digitale motor die:
- **elke opportuniteit sneller ziet** (tenders, leads, kandidaten),
- **elke aanvraag beter structureert** (intake → workflow),
- en **de directie dagelijks grip geeft** (cockpit + alerts)."

### Productprincipes
1) **Single Source of Truth**
   - jobs, cases, certificaten, referenties: 1 plek → public + intern
2) **Workflow > Contactformulier**
   - elk formulier is een intake met routing, status, SLA, en next step
3) **Meetbaarheid**
   - alles heeft events + KPI's → cockpit toont progress
4) **Compliance by design**
   - procurement pack in 1 klik, documenten altijd up-to-date, audit trail
5) **Security & GDPR**
   - least privilege + retention + consent + logging

---

## 3) Huidige baseline (demo-site) — wat is er al?

### Reeds aanwezig (baseline UI)
- Publieke pagina's: Home, Over ons, Diensten, Projecten, Voor Overheden (Procurement Hub), Werken bij, Contact
- "Projectplanner" intake flow (minimaal: stap 1 zichtbaar)
- Basis "Procurement Hub" met certificaat-sectie en raamcontract-opsomming
- Jobs pagina met vacatures (demo content)
- Contact formulier (zonder bewezen backend workflow)

### Gaten (wat ontbreekt voor "Growth OS")
- Geen CMS / admin om content en bewijs te beheren
- Geen auth/roles
- Geen data-opslag (leads/tenders/jobs/applicaties/tickets)
- Geen tender ingestion (TED / e-Procurement alerts)
- Geen recruitment integraties (VDAB/Google Jobs)
- Geen cockpit/KPI's
- Geen audit trail / retention / privacy controls

---

## 4) Productscope

## 4A) Fase 1 — Publiek Growth Front (trust + conversie)

### 4A.1 Sitemap (publiek)
- /
- /over-ons
- /diensten
  - /diensten/bouw-renovatie
  - /diensten/facility
  - (optioneel) /diensten/erfgoed (alleen als bewijs/cases bestaan)
- /projecten (cases + filters)
  - /projecten/[slug]
- /procurement (Voor Overheden) — "Procurement Hub"
  - /procurement/documentatie (Tender Pack aanvraag + downloads)
- /duurzaamheid (CO₂, reductieplan, communicatieplan)
- /werken-bij
  - /jobs/[slug]
- /contact
- /privacy, /cookies

### 4A.2 Content requirements (publiek)
Doel: procurement + facility + kandidaten moeten in 30 sec "ja" kunnen zeggen.

Minimum content sets:
- 8–12 referenties/cases (met opdrachtgever, scope, locatie, jaar, foto's)
- 2 servicepagina's met duidelijke "scope boundaries" (wat doen we wel/niet)
- "Procurement readiness": certificaten, erkenningen, KBO/BTW, contact, aanpak, tender pack
- Employer branding: cultuur, veiligheid, opleiding, doorgroei, projecten, voordelen

### 4A.3 Conversieflows (publiek → workflow)
#### Flow 1: Project intake (bouw/renovatie)
Multi-step intake met:
- type opdrachtgever (publiek/privaat)
- type werken
- locatie
- timing
- budget band (optioneel)
- upload bestek/plannen
- extra vragen
Output: lead record + status + owner assignment

#### Flow 2: Facility interventie (nieuw of bestaand contract)
- urgentie
- locatie + foto's
- type issue
- toegang/instructies
Output: facility ticket + dispatch workflow

#### Flow 3: Procurement "Tender Pack"
- aanvrager + organisatie
- doel (aanbesteding / preselectie / raamcontract)
Output: download links + tracking + follow-up (sales)

#### Flow 4: Jobs → solliciteren / spontaan
- job select
- persoonsgegevens + CV upload
- GDPR consent + retention info
Output: application record + HR queue

#### Flow 5: Partner / onderaannemer aanmelden
- competenties, regio, capaciteit
- certificaten upload
Output: partner prequal record

### 4A.4 SEO & structured data
- Organization schema (logo, adres, contact)
- JobPosting schema op job detail pages
- OpenGraph, canonical, robots, sitemap.xml, performant images
- "Procurement Hub" content gericht op zoekintentie: raamcontract dakwerken, onderhoud publieke gebouwen, etc.

### 4A.5 Analytics events (minimaal)
- lead_submit (per flow type)
- tenderpack_request
- job_view / job_apply
- partner_apply
- facility_ticket_create
- contact_submit

---

## 4B) Fase 2 — Intern Growth & Control Portaal

### 4B.1 Rollen (RBAC)
- DIRECTIE (read‑all + export board pack)
- SALES/BD (leads + tenders)
- HR (jobs + applications)
- OPERATIONS (facility tickets + dispatch)
- ADMIN (content + compliance docs)
- PARTNER (later: partner portal toegang)

### 4B.2 Modules & schermen (functioneel)

#### Module A — Directie Cockpit (startscherm)
Doel: 1 scherm = "bedrijfssituatie"
Widgets:
- Tender pipeline (nieuw → analyse → go/no‑go → in opmaak → ingediend → gewonnen/verloren)
- Lead pipeline (per service)
- Facility backlog + SLA (open/overdue)
- Recruitment funnel (views → applies → first response)
- Certificaten: expiry radar (30/60/90 dagen)
- Alerts (deadlines, overdue items)
- Export: "Board pack" (PDF/CSV)

#### Module B — Tender Hub (tender intelligence)
Doel: opportuniteiten sneller zien + workflow organiseren.

Features (v1):
- Ingest:
  - TED RSS feeds (landen/CPV filters)
  - TED API search (voor verrijking/zoeken)
  - Manual ingest (e-Procurement alert: via forward/upload; later parser)
- Tender record:
  - metadata (publicatie, deadline, opdrachtgever, CPV, regio, waarde band indien bekend)
  - bijlagen upload/links
  - "Match score" + tags
- Go/No-Go workflow:
  - checklist (capaciteit, risico, marge, planning, referenties)
  - decision log + owner
  - reminders (deadline)
- Dossier generator:
  - "Tender Pack" samenstellen: certificaten + referenties + standaardteksten
  - export map/zip

**Let op:** e‑Procurement API zekerheid ontbreekt; in v1 bouwen we een ingest interface + manual/forwarder.

#### Module C — Lead Hub (CRM-lite)
- Alle intakes op 1 plek
- Pipeline stages + assignment
- Notes + next action + reminders
- Link met cases/services zodat lead kwalitatief wordt

#### Module D — Recruitment Hub
- Vacatures beheren (CRUD)
- Publiceren:
  - Public site is source of truth
  - Adapter interface voor VDAB publishing (stub zonder credentials)
- Kandidaten:
  - applications list
  - tags (ervaring, regio, rol)
  - status (new → screening → interview → offer → hired/rejected)
  - retention policy + export

#### Module E — Facility Desk (tickets)
- Ticket create (van public flow of intern)
- Dispatch (owner + planning)
- Status updates (open/in behandeling/wachten/afgerond)
- SLA flags (overdue)
- Optioneel: klantstatuspagina via secure link (later)

#### Module F — Partner Portal (prequal)
- Partner intake review
- Document checklist (VCA, verzekeringen, referenties)
- Expiry reminders
- Partner status (pending/approved/blocked)

#### Module G — Content & Evidence (CMS)
- Cases/referenties beheren
- Diensten beheren
- Procurement documenten beheren (certificaten, policies)
- Versioning + "public toggle"
- "Evidence score": elke service heeft min. # cases / # referenties

#### Module H — Compliance Vault
- Document types (ISO, VCA, CO₂, etc.)
- Geldigheid, issuer, scope, file
- Reminders
- "Tender Pack templates": welke docs horen bij welke tendersoort

#### Module I — Audit log & security
- Audit log entries bij: login, create/update/delete critical records, exports
- Rate limiting op publieke forms
- Role enforcement + least privilege

---

## 5) Integraties (v1 vs later)

### 5.1 Tender bronnen
- TED RSS feeds (v1)
- TED API search (v1 — anonymous access voor gepubliceerde notices; API key alleen voor niet-gepubliceerde flows)
- e‑Procurement alert service (v1: manual ingest/forwarder; later: indien haalbaar automatiseren)

### 5.2 Recruitment
- JobPosting structured data (v1)
- VDAB Vacature Posting API adapter (v1: stub/interface + mapping; live later met credentials & onboarding)

### 5.3 Email & notificaties
- Transactionele mail (confirmations, alerts) — provider keuze later
- In-app notifications (v1)

### 5.4 Analytics & privacy
- Privacyvriendelijke analytics (events + dashboards)
- Consent management (cookie banner) — v1 basis

---

## 6) Data model (v1 — high level)

### Core entities
- User, Role, Session
- AuditLog
- MediaAsset (uploads)
- Service (public)
- CaseStudy (public + admin)
- ComplianceDoc (certificaat/policy)
- Lead (intake)
- LeadNote / LeadTask
- FacilityTicket + TicketUpdate
- JobPosting + JobApplication
- PartnerCompany + PartnerDocument + PartnerReview
- TenderNotice (raw ingest)
- TenderOpportunity (normalized)
- TenderDecision (go/no-go)
- Notification

### Minimal fields (indicatief)
- ComplianceDoc: type, issuer, valid_from, valid_to, scope, file_url, public_flag
- TenderOpportunity: source, title, buyer, cpv[], location, deadline_at, url, attachments[], match_score, status, owner_id
- Lead: lead_type, organisation, contact, location, budget_band?, message, attachments, status, owner_id
- FacilityTicket: urgency, location, description, photos, status, sla_due_at, owner_id

---

## 7) KPI's & definities (wat cockpit moet tonen)

### Growth KPI's
- # leads / maand per type (bouw/renovatie/facility/procurement/partner)
- lead → offerte conversie
- time-to-first-response (lead/facility/job)

### Tender KPI's
- # nieuwe tenders gezien (per week)
- # go/no-go beslissingen
- # ingediend
- # gewonnen / verloren (ratio)
- avg dagen vóór deadline dat dossier "ready" is

### Recruitment KPI's
- job views → applies (per job)
- time-to-first-response
- "dropoff" per sollicitatiestap

### Admin reductie (proxy KPI's)
- # handmatige stappen vervangen door workflow
- # "tender pack" exports (vs mail threads)
- # documenten die vervallen zonder warning = 0 target

---

## 8) Niet-functioneel (hard requirements)

### Security
- RBAC enforced server-side
- Rate limiting op forms
- Input validation & file scanning policy (minimaal file type + size limits)
- Audit trail op kritische acties

### GDPR
- Data minimization
- Retention policies:
  - job applications: standaard 12 maanden (configurable)
  - leads: 24 maanden (configurable)
- Consent checkbox + privacy statement per flow
- Right-to-access/export/delete workflows (admin tooling)

### Performance & UX
- Lighthouse targets (mobile): performance 85+, accessibility 90+
- Image optimization
- Fast-first contentful paint

### Accessibility
- WCAG AA basis (labels, keyboard, contrast)

### Observability
- Error logging
- "Form submit failure" alerts

---

## 9) Definition of Done (project niveau)

Een story is "done" als:
- Acceptance criteria gehaald
- Tests/typecheck/build groen
- Security & validation niet regressief
- Documentatie of AGENTS.md discovery geüpdatet (indien relevant)
- Demo data seed beschikbaar als nodig voor sales demo

---

## 10) Implementatieplan (epics + scope mapping naar prijs)

### Setup scope (Fase 1 + Fase 2) — €79k–€109k
MVP dat verkoopbaar is:
- Publiek: volledig, snel, conversion-ready
- Admin: auth + cockpit + tender hub (v1) + lead hub (v1) + recruitment hub (v1) + compliance vault (v1) + seed demo data
- Integraties: TED RSS + TED API search, JobPosting schema, VDAB adapter stub
- Governance: analytics events, audit log basis

### Retainer scope — €1.950/maand
- Doorontwikkeling (prioritized backlog)
- Support + bugfixes
- Performance/SEO optimalisatie
- Tender filters tuning (CPV/keywords)
- Kwartaal review (KPI's + roadmap)

---

## 11) Story Backlog (input voor prd.json generator)

> Richtlijn: maak stories klein genoeg voor 1 iteratie.

### Foundation (prio 1–20)
- [FND-001] Verificatie harness: canonical install/lint/typecheck/test/build commando's + docs in AGENTS.md
- [FND-002] Data layer + migrations + seed demo data (tenders/leads/jobs/cases)
- [FND-003] Auth + RBAC skeleton + /admin protect
- [FND-004] Uploads & media asset handling (size/type limits)
- [FND-005] Audit log basis (login + CRUD critical)

### Publiek (prio 21–60)
- [PUB-010] SEO baseline (metadata, sitemap, robots, OG)
- [PUB-020] Diensten structuur aligneren met "Bouw & Renovatie" en "Facility" + CTA flows
- [PUB-030] Cases CMS model + listing + detail + filters
- [PUB-040] Procurement hub: "Tender Pack" request flow + download page
- [PUB-050] Jobs: job detail + apply flow + JobPosting schema
- [PUB-060] Contact flow → lead record (geen enkel "email only")

### Admin (prio 61–140)
- [ADM-010] Cockpit v1: tiles + alerts + export
- [ADM-020] Lead hub v1: pipeline + assignment + reminders
- [ADM-030] Tender hub v1: TED RSS ingest + normalized opportunity list
- [ADM-040] Tender go/no-go + checklist + decision log
- [ADM-050] Compliance vault: document types + expiry radar + tender pack templates
- [ADM-060] Recruitment hub v1: jobs CRUD + applications queue + retention controls
- [ADM-070] VDAB adapter stub + mapping (no credentials)
- [ADM-080] Facility desk v1: tickets + SLA due + statuses
- [ADM-090] Partner prequal v1: intake + doc checklist + review workflow
- [ADM-100] Analytics dashboard v1 (events → KPI tiles)

---

## 12) Sales demo script (5 minuten)

### Setup (voor meeting)
- Gebruik seed demo data.
- Open / (publiek) + /procurement + /werken-bij
- Log in op /admin als DIRECTIE

### Script
1) Publiek: "Procurement Hub"
   - toon certificaten/erkenningen + "Tender Pack" aanvraag
2) Publiek: "Start Project" / "Facility interventie"
   - toon multi-step intake (geen contactformulier)
3) Publiek: "Werken bij"
   - toon job detail + sollicitatie flow
4) Admin: Cockpit
   - toon tender pipeline + deadlines + expiry radar
5) Admin: Tender hub
   - toon nieuwe TED tenders + match score + go/no-go
6) Admin: Lead hub
   - toon intake submissions met assignment en next actions
7) Admin: Compliance vault
   - toon certificaten met geldigheid + export tender pack

Einde: "Dit is waarom het een investering is: minder admin + meer instroom + meer controle."

---

## 13) Risico's & dependencies

- VDAB API live publishing vereist onboarding + credentials (v1 = stub/interface)
- e‑Procurement ingest is v1 manual/forwarder tenzij API zekerheid is
- Klantportaal (externe toegang) en SSO zijn later uitbreidingen (retainer)

---
Einde PRD.
