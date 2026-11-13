# CLAUDE.md

Guidance for Claude Code in this repository.

## What this is

eflury.com: the personal website of Emanuel Flury, entrepreneur (Skopa AG,
Taxed GmbH, EF Real Estate). English, German (Swiss High German) and French
(Swiss French), all since 2026-11-13. English: `/en/`, `/en/notes/`, `/en/imprint/`, `/en/privacy/`,
`/en/terms/`. German: `/de/`, `/de/notizen/`, `/de/impressum/`, `/de/datenschutz/`,
`/de/nutzungsbedingungen/`. French: `/fr/`, `/fr/notes/`, `/fr/mentions-legales/`,
`/fr/confidentialite/`, `/fr/conditions-utilisation/`. `/` redirects to `/en/`.

## Languages

- `src/lib/i18n.ts`: `Lang` (en, de, fr), `pick(lang, en, de)`, `PAGES` (twin
  URLs for the EN · DE · FR switch and hreflang), `alternates()`. Components take
  a `lang` prop and hold English and German side by side; French comes from
  `src/lib/fr.ts`, keyed by the English text. **A missing French entry fails the
  build** — after changing an English string, update its key in fr.ts. To list
  missing keys: `FR_COLLECT=1 npm run build` and grep the log for FRMISSING.
- Three root layouts: `src/app/(en)`, `(de)` (lang de-CH) and `(fr)` (lang fr-CH). Shared views: `HomeView`, `NotesViews`, `NewsletterStatus`.
  Legal pages are separate files per language (the German privacy policy and
  terms say the German version prevails).
- German style: Swiss High German, "ss" never "ß", «Guillemets», CHF 1'000,
  "das E-Mail", formal "Sie". Brand words (BUILD, GROW …) stay English.
- German notes: `content/notes/de/<slug>.md`, French: `content/notes/fr/<slug>.md`,
  both with `en: <english-slug>`. The radar card slugs per language are in
  PersonalRadar (German) and fr.ts (French).
- French style: vous, Swiss usage (e-mail, CHF 120'000, Granges/Bienne in running
  text), typographic apostrophe ’. The legal pages say the German version prevails.

eFlury Consulting closed on 2026-11-12. Its blog, forms and server routes were
removed; old URLs 301 to the homepage of their language (legacy `/de/*` to
`/de/`; legacy `/en/*`, `/offerte/`, `/offer/`, `/demo/`, `/downloads/*` to `/en/`;
see `next.config.ts`).

## Stack and deploy

- Next.js 15 (App Router), static except the newsletter API and `/en/`, which revalidates every 6 h for
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
  site does: today no cookies, no analytics; one form, the newsletter sign-up.
  Update it with any change that adds a third party, a cookie or data collection.

## Notes, RSS and newsletter

- Notes are Markdown files in `content/notes/` (format in its README); `draft: true`
  keeps one offline. They render at `/en/notes/` and feed `/rss.xml` and the sitemap.
- Newsletter (`src/lib/newsletter.ts`, `src/app/api/newsletter/*`): in-house.
  Subscribers in Firestore `(default)`, europe-west6, collection `subscribers`
  (doc id = sha256(email)); double opt-in; TTL on `expireAt` deletes pending
  sign-ups after 7 days and `ratelimits` after 2. Client rules deny everything;
  only the App Hosting service account reads and writes.
- Mail goes out from me@eflury.com via iCloud SMTP; the login lives in Secret
  Manager (`newsletter-smtp-user`, `newsletter-smtp-pass`). The form only shows
  when `NEXT_PUBLIC_NEWSLETTER=on` (apphosting.yaml); otherwise an RSS button.
- Send a published note: `node scripts/newsletter-send.mjs <note> [--test|--send]`
  (`de/<note>` for a German note; it goes only to German subscribers).
- Real estate: type and region only, never addresses, tenants, values or financing.
- The press-kit bios (`src/components/personal/PersonalPress.tsx`) are built only
  from facts stated elsewhere on the page. Change them together.
- `public/llms.txt` summarises the same facts for AI assistants. Update it with
  any change to roles, ventures, education or contact details.
- Small text on navy uses `--text-blue` (#5ab8e8), not brand blue #1490d0
  (4.0:1, fails WCAG AA). Lighthouse on 2026-11-12: mobile 95/100/100/100.
