# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All development happens in `astro-src/`:

```bash
cd astro-src
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:4321)
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build
```

Run Playwright tests (requires dev server running):
```bash
cd astro-src
npx playwright test                    # Run all tests
npx playwright test visual-issues      # Run specific test file
npx playwright test --project=chromium # Run single browser
```

## Architecture

**Framework**: Astro 5.x with static output (`output: 'static'`)

**Key directories (in `astro-src/src/`):**
- `components/` - Astro components (Hero, About, Services, Portfolio, Contact, FAQ, Header, Footer, etc.)
- `layouts/` - Single `MainLayout.astro` wrapping all pages with SEO schema, GA4, PWA support
- `pages/` - File-based routing with `/en/` and `/de/` subdirectories for i18n
- `i18n/` - Translation system: `en.json`, `de.json`, and `utils.ts`
- `scripts/` - Client-side TypeScript (GSAP animations, Three.js backgrounds, form validation)
- `styles/` - Global CSS and Apple Design System components

**Tech stack:**
- GSAP + ScrollTrigger for scroll-based animations
- Three.js with WebGPU fallback for 3D particle backgrounds
- Lucide icons (tree-shakeable)
- EmailJS for contact form submission

## i18n Pattern

Use `useTranslations(lang)` from `src/i18n/utils.ts`:
```typescript
import { useTranslations, type Language } from '../i18n/utils';

const t = useTranslations(lang);
const text = t('section.key');  // Dot-notation lookup in en.json/de.json
```

Translation keys use dot notation matching JSON structure: `hero.title`, `services.automation.description`, `nav.home`.

Routes are defined in `src/i18n/utils.ts` (routes object) with language-specific paths for legal pages.

## Build & Deployment

**Build output**: Static HTML files (`en.html`, `de.html`, `index.html`) plus `_astro/` bundles. Manual chunking configured in `astro.config.mjs` for three, gsap, emailjs, lucide.

**Deployment model**: Built files are committed to repo root (not gitignored) for Hostinger static hosting. After building locally or via CI, `dist/` contents are copied to repo root.

## File Conventions

- Components: PascalCase (`Hero.astro`, `Contact.astro`)
- Schema components for SEO: `OrganizationSchema.astro`, `FAQSchema.astro`, `PersonSchema.astro`, `BreadcrumbSchema.astro`
- Legal pages: localized filenames (EN: `privacy.astro`, DE: `datenschutz.astro`)
- All pages require both `/en/` and `/de/` versions

## Testing

Playwright tests in `astro-src/tests/` verify:
- Mobile visual issues (overlapping elements, touch targets, safe areas)
- Text overflow detection
- Navigation visibility
- Component layout consistency

Tests run against multiple viewports: Desktop Chrome, Pixel 5, iPhone 13, iPad Pro.
