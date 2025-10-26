# Project Configuration - eflury.com

## Project Information
- **Project Name**: Emanuel Flury Professional Website
- **Domain**: eflury.com
- **Primary Email**: me@eflury.com
- **Owner**: Emanuel Aaron Flury
- **Personal Address**: Keltenweg 4, 2540 Grenchen, Switzerland
- **Company (Asset)**: Taxed GmbH, Aegertenstrasse 10, 2540 Biel/Bienne, Switzerland

## Technical Stack - ASTRO MIGRATION (Oct 2025)
- **Framework**: Astro 5.15.1 (migrated from vanilla HTML)
- **Bundler**: Vite
- **Language**: TypeScript (strict mode)
- **Build System**: GitHub Actions → Hostinger
- **Hosting**: Hostinger
- **Email Service**: Hostinger Titan Mail (smtp.titan.email)
- **Version Control**: GitHub (https://github.com/taxedgmbh/eflury.com)
- **Analytics**: Google Analytics (G-6320666588)
- **Contact Form**: EmailJS
- **3D Graphics**: Three.js
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Inter, JetBrains Mono

## EmailJS Configuration
- **Service ID**: service_7o5qkdh (Titan Mail SMTP)
- **Template ID**: template_yw4ehjl
- **Public Key**: t1Qe1Zg5U3m8sqLGE
- **SMTP Server**: smtp.titan.email
- **SMTP Ports**: 587 (STARTTLS) / 465 (SSL)
- **Sender Email**: me@eflury.com
- **Recipient Email**: me@eflury.com

## Deployment - ASTRO AUTOMATED (GitHub Actions)
- **Method**: GitHub Actions → Auto-build → Hostinger Deploy
- **Workflow**: `.github/workflows/deploy-astro.yml`
- **Webhook URL**: https://webhooks.hostinger.com/deploy/51ae7d20804b82893b9142d79f1e3cdd
- **Branch**: main
- **Trigger**: Push to main with changes in `astro-src/**`
- **Build Time**: ~3.93 seconds
- **Output**: Static HTML files to repository root

## Astro Project Structure
```
astro-src/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Statistics.astro
│   │   └── DarkModeToggle.astro
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── en/index.astro
│   │   └── de/index.astro
│   ├── scripts/
│   │   ├── three-background.ts
│   │   └── animated-counters.ts
│   ├── styles/
│   │   └── global.css
│   └── i18n/
│       ├── en.json
│       ├── de.json
│       └── utils.ts
├── public/
│   ├── images/
│   ├── favicon.svg
│   └── robots.txt
└── dist/ (generated on build)
```

## Site Structure
- **Languages**: English (/en/) and German (/de/)
- **i18n System**: Type-safe translations with JSON files
- **Routing**: File-based (en.html, de.html, index.html)
- **Legal Pages**: Ready for migration (Terms, Privacy, Cookies)

## Current Features (Astro Migration - Phase 3 Complete)
### ✅ Implemented
- Dark mode toggle with localStorage persistence
- Three.js animated particle background (2000 particles, mouse-responsive)
- Animated statistics counters (Intersection Observer)
- 4 service cards (Automation, Tax, Analytics, Consulting)
- Responsive navigation with mobile hamburger menu
- Language selector (EN/DE with country flags)
- Google Analytics event tracking
- SEO optimized (meta tags, structured data)
- WCAG 2.1 accessibility (keyboard nav, ARIA labels)
- Mobile-responsive design
- Code splitting (Three.js separate 115KB gzipped chunk)
- Bilingual footer with social links

### 🔄 Optional (Can add later)
- Portfolio component with filtering
- Client testimonials carousel
- Client logo wall
- Contact form UI (EmailJS configured, needs frontend)
- Back-to-top floating button
- Blog section
- Legal pages full migration

## Swiss Legal Compliance
- **Data Protection**: Swiss FADP compliant
- **Jurisdiction**: Canton of Solothurn, Switzerland
- **Professional Insurance**: Taxed GmbH maintains required coverage
- **Tax Records Retention**: 10 years as per Swiss law

## Contact Information
**Personal:**
Emanuel Aaron Flury
Keltenweg 4
2540 Grenchen
Switzerland

**Company (Asset):**
Taxed GmbH
Aegertenstrasse 10
2540 Biel/Bienne
Switzerland

**Contact:**
Email: me@eflury.com
Phone: +41 79 910 77 87
Website: https://eflury.com
GitHub: https://github.com/taxedgmbh
LinkedIn: https://linkedin.com/in/emanuelflury

## Astro Migration Performance Metrics
**Before (Vanilla HTML):**
- en/index.html: 251KB (7,014 lines, monolithic)
- de/index.html: 251KB (7,014 lines, monolithic)
- Inline CSS: 4,612 lines
- Inline JavaScript: 2,300+ lines
- No build process
- Manual deployment

**After (Astro 5.15.1):**
- en.html: 20KB (92% reduction!)
- de.html: 21KB (92% reduction!)
- Three.js bundle: 472KB raw → 115KB gzipped
- Code splitting: Vendor chunks separated
- Build time: 3.93 seconds
- Automated deployment via GitHub Actions

**Core Web Vitals (Expected):**
- LCP: <2s (Largest Contentful Paint)
- INP: <200ms (Interaction to Next Paint)
- CLS: <0.1 (Cumulative Layout Shift)
- Lighthouse Score: 90+

## Development Notes - ASTRO WORKFLOW
- **Source Code**: All changes in `astro-src/` directory
- **Build Command**: `npm run build` (run from astro-src/)
- **Dev Server**: `npm run dev` (localhost:4321)
- **Deployment**: Push to main → GitHub Actions builds → Auto-deploys
- **Branch Strategy**: Work on `feature/*` branches, merge to `main`
- **i18n**: Update both `en.json` and `de.json` for bilingual content
- **Components**: Create in `src/components/`, import in pages
- **Styling**: Global CSS in `src/styles/global.css`, scoped styles in components
- **Legal Pages**: Require Swiss FADP compliance review
- **IMPORTANT: Email domain is eflury.com (not emanuelflury.com)**

## Migration Commits (feature/astro-migration branch)
1. **770e97f** - Phase 1: Project Foundation (Astro init, config, structure)
2. **c4f15c9** - Phase 2: Core Layouts & Components (Header, Footer, Hero, i18n)
3. **c86cea6** - Phase 3: Working Bilingual Homepage (Services, Statistics, build success)
4. **2f0eb1b** - Phase 4: GitHub Actions Auto-Deploy (CI/CD complete)

**Status**: ✅ MIGRATION COMPLETE - Ready to merge to main
