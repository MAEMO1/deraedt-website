# VDAB Integratie - TODO

## Aanmeldproces

- [ ] **Stap 1:** Online aanvraag indienen op [werkgevers.vdab.be/data-uitwisseling](https://werkgevers.vdab.be/data-uitwisseling)
- [ ] **Stap 2:** Verkennend gesprek met VDAB plannen
- [ ] **Stap 3:** Technische onboarding - API docs en credentials ontvangen

## Na goedkeuring VDAB

- [ ] Environment variables toevoegen aan `.env.local` en Vercel:
  ```
  VDAB_CLIENT_ID=xxx
  VDAB_CLIENT_SECRET=xxx
  VDAB_API_KEY=xxx
  VDAB_API_URL=https://api.vdab.be/vacatures  # te bevestigen
  ```

- [ ] `lib/adapters/vdab.ts` updaten:
  - [ ] OAuth2 authenticatie implementeren
  - [ ] Echte fetch calls naar VDAB API
  - [ ] Error handling voor API responses
  - [ ] Rate limiting respecteren (100/min, 1000/uur)

- [ ] Sync status persisteren in database:
  - [ ] `vdab_sync_status` kolom gebruiken op `jobs` tabel
  - [ ] `vdab_external_id` opslaan na succesvolle publish
  - [ ] `vdab_last_sync_at` timestamp bijhouden

- [ ] Testen:
  - [ ] Publish nieuwe vacature
  - [ ] Update bestaande vacature
  - [ ] Verwijder vacature van VDAB

## Wat al klaar staat

- [x] Adapter structuur (`lib/adapters/vdab.ts`)
- [x] Mapping naar VDAB formaat (ISCO-codes, contracttypes)
- [x] Validatie voordat vacatures verstuurd worden
- [x] UI in dashboard met "Naar VDAB" knoppen
- [x] Database kolommen voor sync status

## Referenties

- VDAB Data-uitwisseling: https://werkgevers.vdab.be/data-uitwisseling
- ISCO-08 beroepencodes: https://www.ilo.org/public/english/bureau/stat/isco/isco08/
- NACE sectorcodes: 41.20 (Bouw van gebouwen)

## Notities

- API is **gratis**
- Vacatures moeten voldoen aan VDAB kwaliteitsrichtlijnen
- Contact: jobs@deraedt.be voor VDAB correspondentie
