---
name: eflury-site
description: >
  Design system, site architecture, and content rules for eflury.com.
  Use BEFORE creating or modifying any page, component, style, or copy on
  this website — new pages, redesigns, copy changes, nav/footer edits,
  new services, blog posts. Also defines the mandatory pre-commit audit.
---

# eflury.com — Site Skill

This skill is the single source of truth for how eflury.com is built. It
exists because sessions are stateless: without it, every future session
re-invents design decisions, drifts from the Apple-derived design system,
and risks inventing claims. **Rules here override improvisation.**

## The four hard rules

1. **Never invent claims.** Every statement on the site must be true and
   verifiable. Read `references/content-rules.md` before writing ANY copy.
   It contains the owner's standing directives (quoted verbatim) and the
   list of verified facts vs. banned statistics.
2. **Never invent design.** Use existing tokens, components, and layouts.
   No raw hex colors, no new one-off CSS patterns without explicit owner
   approval. Read `references/design-system.md` before writing any style.
3. **Never invent structure.** New pages go where the target architecture
   says they go — both languages, registered in all five places (routes,
   localizedPaths, sitemap, nav/footer, breadcrumbs). Read
   `references/architecture.md` before adding or moving a page.
4. **Never claim done past a red audit.** Run the audit before committing:

   ```bash
   cd astro-src && npm run build && npm run audit
   ```

   The audit checks the built output (link graph, EN/DE parity, head tags,
   breadcrumbs, token discipline). Fix every violation it reports.

## Reference files — when to read which

| You are about to…                          | Read first                        |
|--------------------------------------------|-----------------------------------|
| Write or edit any visible copy             | `references/content-rules.md`     |
| Write or edit any CSS / component markup   | `references/design-system.md`     |
| Add, move, rename, or remove a page        | `references/architecture.md`      |
| Build a new page (choose layout, structure)| `references/page-templates.md`    |

## New-page checklist (the most common drift point)

Creating one logical page means ALL of these, in one PR:

1. Create the **EN page** and the **DE page** (Swiss German: `ss` never `ß`,
   Sie-form). Localized DE slug where natural (see architecture doc).
2. EN/DE pairs share **one verbatim-identical stylesheet** — copy the
   `<style>` block exactly; divergence between languages is a defect.
3. Register the pair in `astro-src/src/i18n/utils.ts` → `routes` (drives
   the header language switcher).
4. Register localized slugs in `astro-src/src/layouts/MainLayout.astro` →
   `localizedPaths` (drives hreflang).
5. Add the pair to `astro-src/src/pages/sitemap.xml.ts` → `staticPages`.
6. Link it: nav flyout and/or footer per the nav spec in the architecture
   doc. A page nothing links to is an orphan — the audit flags it.
7. Breadcrumbs come from the layout (`ContentPageLayout` / `ServiceLayout`
   provide them). Exactly one breadcrumb bar per subpage; zero on home.
8. `npm run build` (in `astro-src/`), then `npm run audit` — zero violations.
9. Render-check both languages locally with Playwright (Chromium at
   `/opt/pw-browsers/chromium`) against a local static server on the dist
   folder. Playwright CANNOT reach the live site through the proxy — verify
   live pages with `curl` only.

## Deployment model (do not fight it)

- Source of truth: `astro-src/`. Built output is committed to the **repo
  root** for Hostinger.
- The GitHub Action (`.github/workflows/deploy.yml`) builds on push to
  `main` when `astro-src/**` changes, commits the dist to root, and pings
  the Hostinger webhook. **Do not commit a locally built dist to root
  yourself unless the workflow is broken** — and never edit root HTML
  directly; it gets overwritten.
- Builds must stay deterministic: any list rendered into output (sitemap,
  RSS, blog indexes, related posts) needs a stable sort with an explicit
  tie-break (post id). Two consecutive clean builds must be byte-identical.

## Working style expected by the owner

- One PR per logical change, descriptive branch name (`claude/<topic>`).
- Verify with rendered screenshots / measured text rects — not element
  boxes alone, and not grep line-counts on minified HTML (`grep -o | wc -l`
  for occurrence counts).
- Advisory questions get analysis first, not immediate code. Implementation
  starts on an explicit "go".
