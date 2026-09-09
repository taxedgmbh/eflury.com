# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Migration in progress.** This site is moving to Next.js on Firebase App Hosting
> (joining taxed.ch and skopa.ai), going German-only, and being repositioned as an
> entrepreneur portfolio hub. Phase 0 prep lands on `main`; the rebuild happens on a
> `next` branch. See `migration/` and the plan referenced there before making
> structural changes.

## Repository shape

This repo is **both** the Astro source and the deployed static site. Source lives in `astro-src/`; the built output is committed to the repo root (`index.html`, `404.html`, `en/`, `de/`, `_astro/`, `sitemap.xml`, …) because Hostinger serves the repo root directly.

**Never hand-edit files at the repo root** — they are overwritten by `cp -R astro-src/dist/* .` in CI. Edit `astro-src/src/` and let the build regenerate them.

## Development Commands

```bash
cd astro-src
npm install
npm run dev          # Dev server at http://localhost:4321
npm run build        # Production build -> astro-src/dist/
npm run preview      # Serve the built dist/
```

Playwright (config has a `webServer` block, so it starts `npm run dev` itself — no need to have it running):

```bash
cd astro-src
npx playwright test                       # All specs, all 4 device projects
npx playwright test visual-issues         # One spec file
npx playwright test --project=chromium    # One device project
npx playwright test -g "touch targets"    # One test by title
npx playwright show-report                # Open the HTML report
```

Projects: `chromium` (Desktop Chrome), `Mobile Chrome` (Pixel 5), `Mobile Safari` (iPhone 13), `iPad` (iPad Pro).

There is no linter and no typecheck script; `npm run build` is the only static gate.

## Architecture

Astro 5 with `output: 'static'`, `format: 'directory'`, `trailingSlash: 'always'` — every route emits `<path>/index.html` and every internal link must end with a slash. Currently ~52 routes per language, EN and DE.

`astro-src/src/`:
- `pages/` — file-based routing, fully duplicated under `en/` and `de/`. Root `index.astro` is a client-side redirect shim to `/en/`; the real `/` → `/en/` 301 is configured in the Hostinger control panel and **exists nowhere in this repo**.
- `layouts/` — `MainLayout.astro` (head, SEO, hreflang, GA4) plus `BlogLayout`, `ServiceLayout`, `ContentPageLayout`, which all wrap it.
- `components/` — sections and JSON-LD emitters (`OrganizationSchema`, `PersonSchema`, `FAQSchema`, `BlogPostingSchema`, `LocalBusinessSchema`).
- `content/blog/` — the only wired content collection (34 posts, EN and DE side by side, separated by the `lang` frontmatter field). `content/case-studies/` and `content/services/` are orphans — nothing imports them; those pages are hand-written `.astro`.
- `i18n/` — `en.json`, `de.json`, `utils.ts`, `blogTranslationMap.ts`.
- `scripts/` — only `hubspot-forms.ts` is live (5 importers). The other seven (`three-background`, `webgpu-background`, `enhanced-animations`, `form-validation`, `loading-states`, `scroll-indicator`, `apple-interactions`) have **zero importers** despite `three` and `gsap` still being in `package.json` and `manualChunks`.
- `styles/` — `global.css` holds all the CSS custom properties; ~95% of the site's CSS is scoped inside individual `.astro` files and duplicated between each EN/DE pair.

## The PHP backend

`astro-src/public/api/` holds three PHP endpoints, copied verbatim into the deploy output and executed by Hostinger's PHP runtime. `npm run dev` does not execute PHP, so none of them work locally.

| File | What it does |
|---|---|
| `chat.php` | DeepSeek proxy for the site chatbot, with a `submit_lead` tool call |
| `apply.php` | Careers intake: multipart upload, writes CVs to `api/bewerbungen/`, mirrors to HubSpot Forms v3 |
| `accept.php` | Offer acceptance via signed link; writes an evidence trail to `api/annahmen/`, attaches the versioned AGB/GTC PDF, upserts to HubSpot via a Private App token |

**`api/annahmen/` and `api/bewerbungen/` exist only on the Hostinger filesystem.** They are created at runtime, are not in git, and hold contract-acceptance records and job applications. Treat them as production data.

Secrets come from `api/config.php`, which is gitignored (`**/api/config.php`); `config.example.php` is the template.

## i18n

```typescript
import { useTranslations, type Language } from '../i18n/utils';
const t = useTranslations(lang);      // lang is 'en' | 'de'
t('hero.title')                       // dot-notation path into en.json / de.json
```

Missing keys return the key string rather than throwing, so typos fail silently — check rendered output. `{year}` in any string is substituted with the current year.

Many German routes use localized slugs (`/de/kontakt/`, `/de/branchen/finanzteams/`, `/de/services/ki-audit/`, `/de/datenschutz/`, …). Those pairings live in **three** places that must stay in sync:

1. `src/i18n/utils.ts` → `routes` — nav and footer links.
2. `src/layouts/MainLayout.astro` → `localizedPaths` — drives `<link rel="alternate" hreflang>`. Pages absent from this map fall through to a naive `/en/`→`/de/` path swap at line 85, which is **wrong for every blog post** (their slugs differ). Pages can pass `hreflangEn`/`hreflangDe` props instead.
3. `src/pages/sitemap.xml.ts` → the `staticPages` array.

The sitemap generates blog URLs dynamically and pairs them via `translationKey`, so blog posts need no sitemap edit — but adding a *page* means touching all three, plus both `en/` and `de/` page files.

## Adding a blog post

1. Create `src/content/blog/<slug>.md` with frontmatter matching `src/content.config.ts`: `title`, `description`, `pubDate`, `lang` (`'en' | 'de'`), `translationKey`, and optional `updatedDate`, `author`, `image`, `imageAlt`, `tags`, `draft`.
2. Write the German counterpart as its own file with `lang: de` and a German slug.
3. Give **both files the same `translationKey`.** This is what pairs them for the sitemap's hreflang alternates and for the frozen redirect map in `migration/`.
4. Also add the pair to `src/i18n/blogTranslationMap.ts`, which still drives the on-page language switcher.

Routing comes from `src/pages/{en,de}/blog/[...slug].astro`, filtering `getCollection('blog', ...)` on `data.lang` and `!data.draft`.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` (Node 20) runs `npm ci && npm run build` in `astro-src/`, copies `dist/` to the repo root, commits it as `Auto-build: Deploy Astro site`, then POSTs to `HOSTINGER_WEBHOOK_URL`. Expect an auto-build commit on top of yours after every merge; pull before continuing work on `main`.

`.github/workflows/claude-review.yml` posts an automated review comment on every PR.

## Conventions

- Components and layouts: PascalCase `.astro`.
- Every new page needs an `/en/` and a `/de/` version, plus its entries in the three sync points above.
- Branches follow `content/…`, `fix(...)`, `feat: …`; work happens on branches and merges to `main`.
