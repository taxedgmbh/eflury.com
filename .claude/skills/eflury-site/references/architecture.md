# Site architecture — current state (target achieved July 2026)

Owner-approved July 2026; fully built as of July 10, 2026 (PRs #33–#44).
New pages must land where this tree says; if a page doesn't fit, ask the
owner instead of improvising a location.

Every content page exists in BOTH `/en/` and `/de/`. DE uses localized
slugs where noted; case-study slugs stay English in DE.

## Current architecture (was the target; now built)

```
eflury.com                              ~100 built pages / 98 sitemap locs
│
├── HOME ─ short: Hero · TrustSignals · ProofStrip · ServiceLifecycle
│          (Advise/Build/Run) · IndustriesRouter · MethodTrustBand ·
│          TechPartners · About · value props · LeadMagnet · Contact
│          (anchors #services #industries #method #about #contact)
│
├── services/                        « WHAT WE DO » — lifecycle
│   ├── overview                            (AI Audit first, Managed Ops last)
│   ├── ai-audit                            (de: ki-audit)   Advise tier
│   ├── claude-skills
│   ├── mcp-integration
│   ├── finance-automation                  (de: finanzen-automatisierung)
│   ├── power-bi
│   ├── data-quality                        (de: datenqualitaet)
│   └── managed-ai-operations               (de: ki-betrieb)  Run tier
│
├── industries/                             (de: branchen/)  « WHO WE SERVE »
│   ├── treuhand-accounting                 (de: treuhand)
│   ├── finance-teams                       (de: finanzteams)
│   └── professional-services               (de: dienstleister)
│
├── case-studies/                    « PROOF »
│   ├── overview — aggregated results strip (~220 h/month · ~CHF 108K ·
│   │              2.8–4.1 mo, all qualified "estimated", basis line)
│   └── taxed-gmbh · finance-automation · power-bi-reporting
│
├── blog/  « INSIGHTS hub »  17 post pairs, 5 curated topics
│   │      (i18n/blog-topics.ts; chips filter client-side; #<topic>
│   │       hash deep-links; real computed reading times)
│   └── guides                              (de: leitfaeden)
│       3 ungated 2-page PDF playbooks × EN/DE in /downloads/
│       (sample-deliverables still ⊕ parked — owner will trigger)
│
├── company pages                    « WHO WE ARE »
│   ├── about · method|methode · trust|sicherheit
│   └── careers                             (de: karriere)
│       initiative applications only; no advertised roles — the page
│       says so explicitly; update lastUpdated when role status changes
│
├── skopaai · pricing
├── contact                                 (de: kontakt)
│
└── legal/  privacy|datenschutz · terms|nutzungsbedingungen · cookies
            disclaimer|haftungsausschluss · code-of-conduct|verhaltenskodex
            imprint|impressum
```

Retired (deleted July 2026 — do not resurrect): homepage components
`Services`, `EfluryMethod`, `HowIWork`, `IdealClient` and i18n namespaces
`services`, `method`, `process`, `ideal_client`, `portfolio`. Their
replacements are `ProofStrip`, `ServiceLifecycle`, `IndustriesRouter`,
`MethodTrustBand` (all take a `lang` prop, strings inline).

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
