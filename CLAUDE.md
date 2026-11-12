# CLAUDE.md

Guidance for Claude Code in this repository.

## What this is

eflury.com: the personal website of Emanuel Flury, entrepreneur (Skopa AG,
Taxed GmbH, EF Real Estate). English only. Three pages: `/en/` (homepage),
`/en/imprint/`, `/en/privacy/`. `/` redirects to `/en/`.

eFlury Consulting closed on 2026-11-12. Its German site, blog, forms and server
routes were removed; every old URL (`/de/*`, legacy `/en/*`, `/offerte/`,
`/offer/`, `/demo/`, `/downloads/*`) 301s to `/en/` (see `next.config.ts`).

## Stack and deploy

- Next.js 15 (App Router), static except `/en/`, which revalidates every 6 h for
  the YouTube feed (`src/lib/youtube.ts`).
- Firebase App Hosting, project `eflury-com-prod`, backend `eflury-com-prod`,
  region europe-west4. **Push to `main` deploys to production automatically.**
- DNS is at Hostinger (A records for `@` and `www` → 35.219.200.109). Mail is
  iCloud; never touch the MX, SPF, `apple-domain` or `sig1._domainkey` records.
- Use only the `eaflury@gmail.com` Google account for this project
  (`--account=eaflury@gmail.com` on every gcloud call).

## Code

- `src/app/(en)/layout.tsx`: the root layout (route group, so `global-not-found.tsx`
  renders its own document via `src/components/RootDocument.tsx`).
- `src/components/personal/`: every section of the site, styled by
  `personal.css` (plain CSS, classes prefixed per section, tokens scoped to `.pb`).
  `data.ts` holds roles, socials and legal links; roles must match LinkedIn.
- `src/lib/site.ts`: site URL, person and address. `src/lib/schema.ts`: JSON-LD.
- Brand rules and assets: `../brand/PERSONAL-BRAND-HOMEPAGE.md`.

## Commands

```bash
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

## Rules

- The privacy policy (`src/app/(en)/en/privacy/page.tsx`) must match what the
  site does: today no cookies, no analytics, no forms. Update it with any change
  that adds a third party, a cookie or data collection.
- Real estate: type and region only, never addresses, tenants, values or financing.
- The press-kit bios (`src/components/personal/PersonalPress.tsx`) are built only
  from facts stated elsewhere on the page. Change them together.
- Small text on navy uses `--text-blue` (#5ab8e8), not brand blue #1490d0
  (4.0:1, fails WCAG AA). Lighthouse on 2026-11-12: mobile 95/100/100/100.
