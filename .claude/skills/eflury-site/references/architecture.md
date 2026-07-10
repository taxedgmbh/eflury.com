# Site architecture — current state and agreed target

Owner-approved July 2026. New pages must land where this tree says; if a
page doesn't fit, ask the owner instead of improvising a location.

Every content page exists in BOTH `/en/` and `/de/`. DE uses localized
slugs where noted; case-study slugs stay English in DE.

## Target architecture (agreed with owner)

```
eflury.com
│
├── HOME ─ short: positioning, proof strip (real numbers only),
│          entry points into the hubs below
│
├── services/                        « WHAT WE DO »
│   ├── overview ─ grouped: Advise / Build / Run
│   ├── ai-audit                 ⊕ planned  productized fixed-price entry offer
│   ├── claude-skills                       (exists)
│   ├── mcp-integration                     (exists)
│   ├── finance-automation                  (exists; de: finanzen-automatisierung)
│   ├── power-bi                            (exists)
│   ├── data-quality                        (exists; de: datenqualitaet)
│   └── managed-ai-operations    ⊕ planned  the "Run" tier (matches pricing retainer)
│
├── industries/                  ⊕ planned  « WHO WE SERVE »
│   ├── treuhand-accounting                 (build from existing verified content)
│   ├── finance-teams
│   └── professional-services
│
├── case-studies/                    « PROOF »  (URLs stay as-is)
│   ├── overview ⊕ planned: measured-results strip (real numbers from the studies)
│   └── taxed-gmbh · finance-automation · power-bi-reporting   (exist)
│
├── insights/                    ⊕ planned hub  « THOUGHT LEADERSHIP »
│   ├── blog/                               (exists, 17 post pairs; URLs unchanged)
│   ├── guides                   ⊕ planned  playbooks repackaged from existing posts
│   └── sample-deliverables      ⊕ parked   fictional-data artifacts (owner will trigger)
│
├── company/                         « WHO WE ARE »
│   ├── about                               (exists)
│   ├── method                              (exists; de: methode)  eflury Method™
│   ├── trust                               (exists; de: sicherheit)
│   └── careers                  ⊕ parked   only when owner commits to posting roles
│
├── skopaai                             (exists) « PRODUCT »
├── pricing                             (exists)
├── contact                  ⊕ planned  real page, not an #anchor
│
└── legal/                              (exists, complete)
    privacy|datenschutz · terms|nutzungsbedingungen · cookies
    disclaimer|haftungsausschluss · code-of-conduct|verhaltenskodex
    imprint|impressum
```

Build order agreed with owner: (1) contact page + case-studies results
strip + insights regrouping → (2) industries hub → (3) ai-audit +
managed-ai-operations → (4) careers (only on owner go) → (5) guides +
sample deliverables.

## Navigation spec (Apple pattern — hard rules)

- **Header: max 6 items + contact button.**
  Target: `Services · Industries · Case Studies · Insights · Company · Pricing`
  (+ Contact as button). Until a hub exists, keep the current item set —
  do NOT add a 7th item; a new destination goes into a flyout or the footer.
- Depth lives in **flyout menus** (Services dropdown already exists —
  extend that pattern), not in more top-level items.
- **Footer is the full directory** (Apple pattern): every public page is
  reachable from the footer, grouped Services / Company / Legal. A page
  missing from nav AND footer is an orphan — the audit flags it.
- Header language switcher is driven by the `routes` table in
  `src/i18n/utils.ts` — a page pair missing there breaks EN↔DE switching
  on that page.

## Breadcrumb policy

- Homepage: **no** breadcrumbs.
- Every subpage: **exactly one** breadcrumb bar, rendered by
  `components/Breadcrumbs.astro` via the page's layout. Never add a second
  hand-rolled crumb row in a hero (this happened; it was a bug).

## URL policy

- Existing URLs are load-bearing (indexed, linked): renames require 301s
  in `astro-src/public/.htaccess` and owner sign-off. Prefer reframing
  content at the same URL (e.g. case-studies stays `/case-studies/`).
- Blog post URLs: `/{lang}/blog/{slug}/`, EN↔DE paired via
  `translationKey` frontmatter (active config: `src/content.config.ts`).

## Registration points for every page pair (all five, one PR)

1. `src/i18n/utils.ts` → `routes` (language switcher)
2. `src/layouts/MainLayout.astro` → `localizedPaths` (hreflang) — needed
   whenever EN/DE slugs differ
3. `src/pages/sitemap.xml.ts` → `staticPages`
4. Nav flyout and/or `components/Footer.astro`
5. Layout with breadcrumbs (`ContentPageLayout` / `ServiceLayout`)
