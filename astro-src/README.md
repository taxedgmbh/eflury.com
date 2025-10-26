# Emanuel Flury - Astro Website

Modern, performant website built with Astro 5.15.1, featuring bilingual support (EN/DE), Three.js animations, and optimized for production deployment on Hostinger.

## 🚀 Quick Start

```bash
cd astro-src
npm install
npm run dev    # Development server at localhost:4321
npm run build  # Production build to ./dist/
```

## 📁 Project Structure

```
astro-src/
├── src/
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts
│   ├── pages/            # File-based routing (en/, de/)
│   ├── scripts/          # TypeScript modules (Three.js, etc.)
│   ├── styles/           # Global CSS
│   └── i18n/             # Translations (en.json, de.json)
├── public/               # Static assets
└── astro.config.mjs      # Astro configuration
```

## 🌍 Features

- ✅ **Bilingual**: EN/DE with language selector
- ✅ **Dark Mode**: Persistent theme with localStorage
- ✅ **Three.js**: 2000-particle animated background
- ✅ **Animated Counters**: Scroll-triggered statistics
- ✅ **SEO Optimized**: Meta tags, structured data
- ✅ **Google Analytics**: G-6320666588
- ✅ **Mobile Responsive**: Mobile-first design
- ✅ **Accessibility**: WCAG 2.1 compliant

## 🚀 Deployment

**Automatic**: Push to `main` → GitHub Actions builds → Deploys to Hostinger

See `.github/workflows/deploy-astro.yml` for workflow details.

## 📊 Performance

- **Build**: 3.93s
- **EN/DE Pages**: ~20KB each
- **Three.js Bundle**: 115KB gzipped
- **Core Web Vitals**: LCP <2s, INP <200ms, CLS <0.1

## 🛠️ Tech Stack

- Astro 5.15.1 + Vite + TypeScript
- Three.js for 3D graphics
- Google Analytics 4
- EmailJS (configured)
- Font Awesome 6.4.0

## 📝 Documentation

Full migration documentation in commit history.
Contact: me@eflury.com | +41 79 910 77 87

---

**Built with Astro** 🚀 | **Made in Switzerland** 🇨🇭
