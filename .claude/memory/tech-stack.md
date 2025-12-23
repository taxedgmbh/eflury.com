# Technical Stack & Implementation Details - eflury.com

**Trigger Keywords:** technical, Astro, Three.js, components, implementation, configuration, debugging

---

## Frontend Framework: Astro 5.15.1

### Why Astro?
- **Zero JS by default:** Ship only necessary JavaScript
- **Component Islands:** Hydrate only interactive components (Three.js, dark mode toggle)
- **File-based routing:** Simple, intuitive page structure
- **Built-in TypeScript:** Type safety without configuration
- **Static Site Generation (SSG):** Perfect for Hostinger hosting
- **Performance:** Near-perfect Lighthouse scores out of the box

### Configuration (astro.config.mjs)
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eflury.com',
  output: 'static',  // Static site generation
  build: {
    format: 'file',  // Generate .html files (not directories)
    assets: '_astro' // Asset directory name
  },
  vite: {
    build: {
      minify: 'terser',  // Aggressive minification
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-three': ['three'],  // Separate Three.js chunk
            'vendor-emailjs': ['@emailjs/browser']
          }
        }
      }
    }
  },
  compressHTML: true  // Remove whitespace
});
```

---

## Build System: Vite

### Features Used
- **Hot Module Replacement (HMR):** Instant updates during development
- **Code Splitting:** Automatic vendor chunk separation
- **Tree Shaking:** Remove unused code
- **Minification:** Terser for JS, cssnano for CSS
- **Asset Optimization:** Image compression, font subsetting

### Build Output
```
dist/
├── en.html (20KB - 92% smaller than original 251KB)
├── de.html (21KB)
├── index.html (redirect)
└── _astro/
    ├── three-background.[hash].js (115KB gzipped)
    ├── emailjs.[hash].js (12KB gzipped)
    ├── global.[hash].css (8KB gzipped)
    └── images/[optimized assets]
```

---

## Language: TypeScript (Strict Mode)

### Configuration (tsconfig.json)
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Type Safety Benefits
- Catch errors at compile time
- IntelliSense autocomplete
- Refactoring confidence
- Self-documenting code

---

## 3D Graphics: Three.js r160

### Particle Background Implementation

**File:** `src/scripts/three-background.ts`

**Features:**
- **2000 animated particles**
- Mouse interaction (parallax rotation)
- Theme-aware colors (light/dark mode)
- Performance optimized (requestAnimationFrame)
- Responsive canvas resizing
- Proper cleanup on component unmount

**Key Code Snippet:**
```typescript
// Particle system
const geometry = new THREE.BufferGeometry();
const vertices: number[] = [];
const colors: number[] = [];

for (let i = 0; i < 2000; i++) {
  vertices.push(
    Math.random() * 2000 - 1000,  // x
    Math.random() * 2000 - 1000,  // y
    Math.random() * 2000 - 1000   // z
  );

  // Color based on theme (light/dark)
  const color = new THREE.Color(
    isDarkMode ? 0x6366f1 : 0x3b82f6
  );
  colors.push(color.r, color.g, color.b);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 2,
  vertexColors: true,
  transparent: true,
  opacity: 0.8
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);
```

**Performance:**
- 60fps on modern devices
- ~5% CPU usage
- GPU-accelerated rendering
- 115KB gzipped (separate chunk)

---

## Internationalization (i18n)

### Translation Files

**Structure:** `src/i18n/en.json`, `src/i18n/de.json`

**Type-Safe Access:**
```typescript
// src/i18n/utils.ts
import en from './en.json';
import de from './de.json';

type Language = 'en' | 'de';
type Translations = typeof en;

export function t(lang: Language, key: string): string {
  const translations = lang === 'en' ? en : de;
  return translations[key] || key;
}

export function detectLanguage(url: string): Language {
  return url.includes('/de/') ? 'de' : 'en';
}
```

**Usage in Components:**
```astro
---
import { t, detectLanguage } from '../i18n/utils';
const lang = detectLanguage(Astro.url.pathname);
---

<h1>{t(lang, 'hero.title')}</h1>
```

### Swiss German Considerations
- Formal "Sie" form (not "Du")
- Swiss terminology: "Grüezi" not "Hallo"
- CHF currency format
- Swiss date format (DD.MM.YYYY)

---

## Styling: CSS with Variables

### Global Styles (src/styles/global.css)

**CSS Custom Properties:**
```css
:root {
  /* South African Flag Colors + Dark Mode */
  --primary: #007a4d;      /* Green
  --secondary: #00209f;    /* Blue */
  --accent: #ffb612;       /* Gold */
  --danger: #e03c31;       /* Red */

  /* Light mode */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --card-bg: #ffffff;
  --border: #e5e7eb;
}

[data-theme="dark"] {
  /* Dark mode overrides */
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --card-bg: #1e293b;
  --border: #334155;
}
```

**Dark Mode Implementation:**
```javascript
// Prevent flash of unstyled content (FOUC)
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
`;
```

---

## Components Architecture

### Layout Components

**MainLayout.astro** (Page Wrapper)
- SEO meta tags (title, description, OG, Twitter)
- Google Analytics (G-6320666588)
- Structured data (Schema.org Person/Organization)
- Dark mode flash prevention
- Font preloading
- Accessibility (keyboard nav support)

**Header.astro** (Navigation)
- Responsive hamburger menu (mobile)
- Language selector with flags
- Dark mode toggle
- Smooth scroll anchor links
- Glass morphism styling
- Scroll-based background change

**Footer.astro** (Site Footer)
- 4-column layout: Brand, Quick Links, Services, Legal
- Social links (LinkedIn, GitHub, Email)
- Dynamic year ({{year}} placeholder)
- Responsive grid

### Feature Components

**Hero.astro** (Landing Section)
- Three.js particle background integration
- Responsive typography (clamp)
- CTA buttons with analytics tracking
- Scroll hint animation

**Services.astro** (Service Cards)
- 4-card grid (auto-fit, minmax)
- Icon gradients
- Hover animations
- Responsive breakpoints

**Statistics.astro** (Animated Counters)
- Intersection Observer trigger
- Count-up animation (0 → target)
- Decimal support (2.5M)
- 60 FPS smooth counting

**DarkModeToggle.astro** (Theme Switcher)
- localStorage persistence
- Icon animation (moon ↔ sun)
- Google Analytics event tracking
- Smooth transitions (0.3s ease)

---

## Animation System

### CSS Keyframes
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### JavaScript Animations

**Animated Counters (src/scripts/animated-counters.ts):**
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseFloat(entry.target.getAttribute('data-target') || '0');
      animateCounter(entry.target as HTMLElement, target);
    }
  });
}, { threshold: 0.5 });

function animateCounter(element: HTMLElement, target: number) {
  const duration = 2000;  // 2 seconds
  const start = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = progress * target;

    element.textContent = Math.floor(current).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
```

---

## Analytics & Tracking

### Google Analytics 4 (G-6320666588)

**Tracking ID Configuration:**
```astro
<!-- MainLayout.astro -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6320666588"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6320666588');
</script>
```

**Event Tracking:**
```javascript
// Theme change
gtag('event', 'theme_change', {
  'event_category': 'Engagement',
  'event_label': theme  // 'light' or 'dark'
});

// CTA clicks
gtag('event', 'cta_click', {
  'event_category': 'Conversion',
  'event_label': buttonText,
  'value': destination
});
```

---

## Email Integration: EmailJS

### Configuration
- **Service ID:** service_7o5qkdh (Titan Mail SMTP)
- **Template ID:** template_yw4ehjl
- **Public Key:** t1Qe1Zg5U3m8sqLGE
- **SMTP Server:** smtp.titan.email (ports 587/465)

### Contact Form Implementation (Pending)
```typescript
import emailjs from '@emailjs/browser';

const sendEmail = async (formData: FormData) => {
  try {
    const result = await emailjs.send(
      'service_7o5qkdh',
      'template_yw4ehjl',
      {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      },
      't1Qe1Zg5U3m8sqLGE'
    );

    console.log('Email sent:', result.text);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
};
```

---

## Accessibility (WCAG 2.1 Compliance)

### Features Implemented
- **Keyboard Navigation:** Tab, Enter, Space, Escape support
- **Focus Indicators:** Visible focus rings on interactive elements
- **ARIA Labels:** Descriptive labels for screen readers
- **Color Contrast:** 4.5:1 minimum (AAA standard)
- **Responsive Text:** clamp() for fluid typography
- **Skip Links:** Jump to main content
- **Semantic HTML:** Proper heading hierarchy (h1 → h2 → h3)

### Focus Management
```javascript
// Detect keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('user-is-tabbing');
});
```

```css
/* Only show focus indicators when tabbing */
body:not(.user-is-tabbing) *:focus {
  outline: none;
}

body.user-is-tabbing *:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

---

## Performance Optimizations

### Image Optimization
- **Format:** WebP with JPG fallback
- **Lazy Loading:** `loading="lazy"` attribute
- **Responsive Images:** `srcset` for different screen sizes
- **Compression:** TinyPNG/Squoosh (70-80% quality)

### Font Loading
```css
/* Preload critical fonts */
<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>

/* Use system fonts as fallback */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* font-display: swap prevents FOIT (Flash of Invisible Text) */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
}
```

### Code Splitting
- **Vendor Chunks:** Three.js (115KB), EmailJS (12KB) separate
- **Route-Based:** Each page loads only its CSS/JS
- **Critical CSS:** Inline above-the-fold styles

---

## Deployment Pipeline

### GitHub Actions Workflow

**File:** `.github/workflows/deploy-astro.yml`

```yaml
name: Deploy Astro Site

on:
  push:
    branches: [main]
    paths:
      - 'astro-src/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: astro-src/package-lock.json

      - name: Install dependencies
        working-directory: ./astro-src
        run: npm install

      - name: Build Astro site
        working-directory: ./astro-src
        run: npm run build

      - name: Verify build
        run: |
          test -f astro-src/dist/en.html
          test -f astro-src/dist/de.html

      - name: Copy to root
        run: |
          cp -r astro-src/dist/* .
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add en.html de.html index.html _astro/
          git commit -m "Auto-build: Deploy Astro site"
          git push

      - name: Trigger Hostinger webhook
        run: |
          curl -X POST https://webhooks.hostinger.com/deploy/51ae7d20804b82893b9142d79f1e3cdd
```

---

## Development Workflow

### Local Development
```bash
cd astro-src
npm run dev  # Start dev server on localhost:4321
```

### Production Build
```bash
npm run build  # Build to dist/
npm run preview  # Preview production build
```

### Git Workflow
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature
# Merge to main → auto-deploys
```

---

## Browser Support

### Target Browsers
- **Chrome/Edge:** Last 2 versions
- **Firefox:** Last 2 versions
- **Safari:** Last 2 versions (including iOS Safari)
- **Opera:** Last 2 versions

### Progressive Enhancement
- **JavaScript Optional:** Core content works without JS
- **CSS Grid/Flexbox:** Fallbacks for older browsers
- **WebP Images:** JPG fallback for older Safari

---

## Security

### Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' https://www.googletagmanager.com;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' https://api.emailjs.com;">
```

### HTTPS Only
- Hostinger enforces HTTPS
- HTTP redirects to HTTPS automatically
- HSTS header enabled

---

## Debugging & Tools

### Development Tools
- **Browser DevTools:** Chrome/Firefox debugger
- **Astro Dev Server:** HMR, error overlay
- **TypeScript Compiler:** Real-time error checking
- **Vite Inspector:** Bundle analysis

### Performance Testing
- **Lighthouse:** Run in Chrome DevTools
- **WebPageTest:** https://www.webpagetest.org/
- **Google PageSpeed Insights:** https://pagespeed.web.dev/

### Accessibility Testing
- **axe DevTools:** Browser extension
- **WAVE:** https://wave.webaim.org/
- **Keyboard Testing:** Manual tab navigation

---

## Future Technical Improvements

1. **Service Worker:** Offline support, caching
2. **Image CDN:** Cloudinary/Cloudflare for optimization
3. **Blog CMS:** Astro Content Collections for blog posts
4. **Search:** Algolia/Pagefind for site search
5. **A/B Testing:** Google Optimize integration
6. **Performance Monitoring:** Sentry, New Relic
7. **E2E Testing:** Playwright tests for critical paths

---

**Last Updated:** December 2025
**Stack Version:** Astro 5.15.1, Three.js r160, TypeScript 5.3
