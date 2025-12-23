# Agent 01: SEO Technician

**Phase:** 1 - Foundation (Weeks 1-4)
**Timeline:** Week 1-2 (15 hours)
**Budget:** CHF 2,250
**Status:** Ready to Launch

---

## Mission

Implement technical SEO foundation and schema markup to maximize visibility in both traditional search engines (Google) and LLM-powered search (ChatGPT, Perplexity, Claude).

**Goal:** Ensure eflury.com becomes Switzerland's most LLM-cited source for Claude automation information.

---

## Context & Research Findings

**Why This Matters:**
- 52% of AI citations come from Google's first page → SEO still matters for LLM visibility
- Schema markup is THE way LLMs parse content (FAQ, Person, Organization schemas)
- Core Web Vitals affect both user experience AND search rankings
- Swiss market is bilingual → Need both DE/EN SEO optimization

**Benchmark:** After implementation, eflury.com should appear in ChatGPT/Perplexity answers for:
- "Claude automation consultant Switzerland"
- "Claude Code specialist Swiss SME"
- "How to implement Claude Skills"
- "Claude vs ChatGPT for business"

---

## Required Memory Files

**Load before starting:**
1. `.claude/memory/website-strategy.md` - Section: "SEO & LLM Optimization"
2. `.claude/memory/blog-strategy.md` - SEO keywords list
3. `.claude/memory/tech-stack.md` - Astro component structure

---

## Deliverables

### 1. FAQ Schema Markup (Priority: CRITICAL)

**File to create:** `/astro-src/src/components/FAQSchema.astro`

**Requirements:**
- 20+ Claude automation Q&As
- JSON-LD format (LLM-parseable)
- Both EN and DE versions
- Implement on homepage + Claude automation service page

**Example FAQs to include:**

**English:**
1. What is Claude Code and how does it differ from ChatGPT?
2. How much does Claude automation cost for Swiss SMEs?
3. What is the ROI of implementing Claude Skills?
4. How long does a typical Claude implementation take?
5. Is Claude FADP (Swiss data privacy) compliant?
6. Can Claude integrate with Swiss accounting software like Bexio?
7. What industries benefit most from Claude automation?
8. Do I need a technical team to use Claude Code?
9. How does the eflury Method™ work?
10. What's included in the Professional package (CHF 15,000)?

**German (Swiss):**
1. Was ist Claude Code und wie unterscheidet es sich von ChatGPT?
2. Wie viel kostet Claude-Automatisierung für Schweizer KMU?
3. Welcher ROI lässt sich mit Claude Skills erzielen?
4. Wie lange dauert eine typische Claude-Implementierung?
5. Ist Claude FADP-konform (Schweizer Datenschutz)?
6. Kann Claude in Schweizer Buchhaltungssoftware wie Bexio integriert werden?
7. Welche Branchen profitieren am meisten von Claude-Automatisierung?
8. Brauche ich ein technisches Team, um Claude Code zu nutzen?
9. Wie funktioniert die eflury Method™?
10. Was ist im Professional-Paket (CHF 15'000) enthalten?

**Implementation:**
```astro
---
// FAQSchema.astro
interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
  lang: 'en' | 'de';
}

const { faqs, lang } = Astro.props;

const schemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(schemaData)} />
```

**Where to add:**
- `/astro-src/src/pages/en/index.astro` (English homepage)
- `/astro-src/src/pages/de/index.astro` (German homepage)
- `/astro-src/src/pages/en/services/claude-automation.astro`
- `/astro-src/src/pages/de/services/claude-automation.astro`

**Validation:**
1. Test with Google Rich Results Test: https://search.google.com/test/rich-results
2. Verify JSON-LD syntax: https://validator.schema.org/
3. Target: 100% validation pass

**Success Criteria:**
- [ ] 20+ FAQs created (10+ EN, 10+ DE)
- [ ] Schema validates 100%
- [ ] Implemented on 4+ pages
- [ ] Answers cite Taxed case study data where relevant

---

### 2. Person Schema (Emanuel Aaron Flury)

**File to create:** `/astro-src/src/components/PersonSchema.astro`

**Purpose:** Help LLMs understand WHO Emanuel is when answering "Who is the best Claude consultant in Switzerland?"

**Data to include:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Emanuel Aaron Flury",
  "jobTitle": "Claude Code & AI Automation Specialist",
  "worksFor": {
    "@type": "Organization",
    "name": "Taxed GmbH",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Aegertenstrasse 10",
      "addressLocality": "Biel/Bienne",
      "postalCode": "2540",
      "addressCountry": "CH"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Keltenweg 4",
    "addressLocality": "Grenchen",
    "postalCode": "2540",
    "addressCountry": "CH"
  },
  "email": "me@eflury.com",
  "telephone": "+41799107787",
  "url": "https://eflury.com",
  "sameAs": [
    "https://www.linkedin.com/in/emanuelflury",
    "[GitHub URL if available]",
    "[Twitter/X URL if available]"
  ],
  "knowsAbout": [
    "Claude Code",
    "Claude Skills",
    "Claude MCP",
    "AI Automation",
    "Swiss SME Consulting",
    "Accounting Automation",
    "Process Optimization"
  ],
  "alumniOf": "[University if want to add]",
  "description": "Switzerland's leading Claude Code and AI automation specialist, helping Swiss SMEs implement end-to-end Claude solutions. Founder of Taxed GmbH, where he achieved 27.5 hours/week automation savings using Claude."
}
```

**Where to add:**
- Homepage (both EN/DE)
- About page (when created by Agent 02)

**Validation:**
- Test with Google Rich Results Test
- Verify "sameAs" URLs are live and correct

**Success Criteria:**
- [ ] Person schema implemented
- [ ] Validates 100%
- [ ] LinkedIn URL included (verify it's correct)
- [ ] "knowsAbout" includes all Claude-related keywords

---

### 3. Organization Schema (Taxed GmbH + eflury.com)

**File to create:** `/astro-src/src/components/OrganizationSchema.astro`

**Purpose:** Establish eflury.com as THE authority for Claude automation in Switzerland

**Data to include:**

**For eflury.com (primary):**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "eflury.com",
  "alternateName": "Emanuel Flury Claude Automation",
  "description": "Switzerland's first Claude Code, Claude Skills, and MCP specialist for SMEs. End-to-end implementation of Claude automation at transparent pricing.",
  "url": "https://eflury.com",
  "logo": "https://eflury.com/images/logo.png",
  "image": "https://eflury.com/images/og-image.png",
  "telephone": "+41799107787",
  "email": "me@eflury.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Keltenweg 4",
    "addressLocality": "Grenchen",
    "addressRegion": "SO",
    "postalCode": "2540",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.1919,
    "longitude": 7.3965
  },
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  },
  "priceRange": "CHF 8,000 - CHF 25,000",
  "founder": {
    "@type": "Person",
    "name": "Emanuel Aaron Flury"
  },
  "knowsAbout": [
    "Claude Code",
    "Claude Skills Development",
    "Model Context Protocol (MCP)",
    "AI Automation for SMEs",
    "Swiss Business Process Optimization"
  ],
  "serviceType": [
    "AI Automation Consulting",
    "Claude Implementation",
    "Process Optimization",
    "Custom Claude Skills Development"
  ]
}
```

**For Taxed GmbH (secondary - shows credibility):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Taxed GmbH",
  "description": "Swiss accounting and fiduciary firm, pioneer in Claude automation. Achieved 27.5 hours/week savings through AI implementation.",
  "url": "https://taxed.ch",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Aegertenstrasse 10",
    "addressLocality": "Biel/Bienne",
    "postalCode": "2540",
    "addressCountry": "CH"
  },
  "founder": {
    "@type": "Person",
    "name": "Emanuel Aaron Flury"
  }
}
```

**Where to add:**
- eflury.com schema: Homepage, all major pages
- Taxed schema: Case study page only

**Success Criteria:**
- [ ] Both organizations schema implemented
- [ ] Validates 100%
- [ ] "areaServed" = Switzerland (geo-targeting)
- [ ] "priceRange" matches service packages

---

### 4. BreadcrumbList Schema

**File to create:** `/astro-src/src/components/BreadcrumbSchema.astro`

**Purpose:** Help search engines understand site structure

**Dynamic implementation:**
```astro
---
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const { items } = Astro.props;
const baseUrl = "https://eflury.com";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${baseUrl}${item.url}`
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(schemaData)} />
```

**Example usage:**
```astro
---
// In /astro-src/src/pages/en/services/claude-automation.astro
import BreadcrumbSchema from '@components/BreadcrumbSchema.astro';

const breadcrumbs = [
  { name: "Home", url: "/en" },
  { name: "Services", url: "/en/services" },
  { name: "Claude Automation", url: "/en/services/claude-automation" }
];
---

<BreadcrumbSchema items={breadcrumbs} />
```

**Where to add:**
- All service pages
- All blog posts
- Case study pages
- About page

**Success Criteria:**
- [ ] Breadcrumb component created
- [ ] Implemented on 10+ pages
- [ ] Validates with Google Rich Results Test

---

### 5. robots.txt Optimization

**File to edit:** `/astro-src/public/robots.txt`

**Current status:** Basic robots.txt exists
**Goal:** Optimize for crawling efficiency

**New content:**
```txt
# eflury.com - Switzerland's Claude Automation Specialist
# Updated: December 2025

User-agent: *
Allow: /

# Prioritize Claude-related content for crawlers
Crawl-delay: 0

# Sitemap location
Sitemap: https://eflury.com/sitemap.xml

# Block admin/test paths (if any exist in future)
Disallow: /admin/
Disallow: /_test/

# Allow AI crawlers (ChatGPT, Claude, Perplexity)
User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Allow: /

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
```

**Success Criteria:**
- [ ] robots.txt updated
- [ ] Sitemap URL correct
- [ ] LLM crawlers explicitly allowed
- [ ] Test with Google Search Console

---

### 6. sitemap.xml with Priority Scores

**File to create:** `/astro-src/src/pages/sitemap.xml.ts`

**Purpose:** Tell search engines which pages are most important

**Implementation:**
```typescript
// sitemap.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://eflury.com';

  const pages = [
    // Priority 1.0 - Most important
    { url: '/en', priority: '1.0', changefreq: 'weekly' },
    { url: '/de', priority: '1.0', changefreq: 'weekly' },
    { url: '/en/services/claude-automation', priority: '1.0', changefreq: 'monthly' },
    { url: '/de/services/claude-automation', priority: '1.0', changefreq: 'monthly' },

    // Priority 0.9 - Core services
    { url: '/en/services/packages', priority: '0.9', changefreq: 'monthly' },
    { url: '/de/services/packages', priority: '0.9', changefreq: 'monthly' },
    { url: '/en/case-studies/taxed-gmbh', priority: '0.9', changefreq: 'monthly' },
    { url: '/de/case-studies/taxed-gmbh', priority: '0.9', changefreq: 'monthly' },

    // Priority 0.8 - About/Process
    { url: '/en/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/de/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/en/process', priority: '0.8', changefreq: 'monthly' },

    // Priority 0.7 - Tools
    { url: '/en/tools/roi-calculator', priority: '0.7', changefreq: 'monthly' },
    { url: '/en/tools/assessment', priority: '0.7', changefreq: 'monthly' },

    // Priority 0.6 - Blog posts (will be dynamic later)
    { url: '/en/blog', priority: '0.6', changefreq: 'weekly' },
    { url: '/de/blog', priority: '0.6', changefreq: 'weekly' },

    // Priority 0.5 - Legal
    { url: '/en/legal/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/en/legal/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  const lastmod = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
```

**Success Criteria:**
- [ ] sitemap.xml generated at https://eflury.com/sitemap.xml
- [ ] Priority scores reflect business priorities
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools

---

### 7. Core Web Vitals Optimization

**Goal:** All metrics in green zone
- Largest Contentful Paint (LCP): <2.0 seconds
- Interaction to Next Paint (INP): <200 milliseconds
- Cumulative Layout Shift (CLS): <0.1

**Current status (from memory):**
- Site already optimized during Astro migration
- Need to verify current scores

**Tasks:**

**a) Run PageSpeed Insights:**
```bash
# Test homepage performance
# URL: https://pagespeed.web.dev/
# Test: https://eflury.com/en
# Test: https://eflury.com/de
```

**b) If any metrics yellow/red, optimize:**

**LCP optimization:**
- Preload hero fonts
- Optimize Three.js particle background (already done, but verify)
- Use WebP images with fallback
- Implement image lazy loading (already done)

**INP optimization:**
- Minimize JavaScript execution time
- Use event delegation for click handlers
- Defer non-critical scripts

**CLS optimization:**
- Set explicit width/height on images
- Reserve space for dynamic content (like Three.js canvas)
- Avoid layout shifts from fonts (already using font-display: swap)

**c) Performance budget:**
```
Max JavaScript size: 500KB total (Three.js is 115KB gzipped, good)
Max CSS size: 50KB
Max HTML size: 25KB
Max image size per page: 500KB total
```

**Success Criteria:**
- [ ] LCP: <2.0s (Target: <1.5s)
- [ ] INP: <200ms (Target: <100ms)
- [ ] CLS: <0.1 (Target: <0.05)
- [ ] PageSpeed score: 90+ (mobile and desktop)
- [ ] Test on 3G connection: Still usable

---

### 8. Mobile-First Responsive Audit

**Goal:** Perfect mobile experience (60% of Swiss traffic is mobile)

**Audit checklist:**

**a) Viewport sizes to test:**
```
- 375px (iPhone SE, 13 mini)
- 390px (iPhone 13, 14)
- 428px (iPhone 14 Pro Max)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1440px (Desktop)
```

**b) Touch targets:**
- All buttons: Minimum 44x44px
- All links: Minimum 44x44px
- Spacing between touch targets: Minimum 8px

**c) Text readability:**
- Minimum font size: 16px (no smaller, even on mobile)
- Line height: 1.5-1.6 for body text
- Contrast ratio: 4.5:1 minimum (WCAG AA)

**d) Navigation:**
- Hamburger menu works smoothly
- No horizontal scroll
- Forms are easy to fill on mobile

**e) Performance on mobile:**
- Test on real device if possible (iPhone or Android)
- Or use Chrome DevTools device emulation

**Success Criteria:**
- [ ] All pages responsive 375px-1440px
- [ ] Touch targets 44x44px minimum
- [ ] No horizontal scroll on any page
- [ ] Mobile PageSpeed score: 85+
- [ ] Forms work on mobile (test EmailJS)

---

### 9. Swiss German SEO Keyword Mapping

**Goal:** Rank for German keywords (Swiss market is 63% German-speaking)

**Keyword research:**

**High-value keywords (from blog-strategy.md):**
```
German (Swiss):
- "Claude Automatisierung Schweiz" (automation Switzerland)
- "KMU Automatisierung" (SME automation)
- "AI für KMU" (AI for SMEs)
- "Claude Code Schweiz" (Claude Code Switzerland)
- "ChatGPT Alternative für Unternehmen" (ChatGPT alternative for companies)
- "Prozessautomatisierung KMU" (process automation SME)
- "Claude Skills entwickeln" (develop Claude Skills)
- "Buchhaltung automatisieren" (automate accounting)
- "ROI AI Automatisierung" (ROI AI automation)
- "Schweizer Datenschutz AI" (Swiss data privacy AI)

English (for international + Swiss English speakers):
- "Claude automation Switzerland"
- "Claude Code consultant"
- "Claude Skills development"
- "AI automation Swiss SME"
- "ChatGPT vs Claude for business"
- "Claude MCP implementation"
- "Swiss AI consultant"
```

**Keyword mapping to pages:**
```
Homepage (/de):
  Primary: "Claude Automatisierung Schweiz"
  Secondary: "KMU Automatisierung", "AI für KMU"

Service page (/de/services/claude-automation):
  Primary: "Claude Code Schweiz"
  Secondary: "Claude Skills entwickeln", "Prozessautomatisierung KMU"

Case study (/de/case-studies/taxed-gmbh):
  Primary: "ROI AI Automatisierung"
  Secondary: "Buchhaltung automatisieren"

About page (/de/about):
  Primary: "Claude Berater Schweiz" (Claude consultant Switzerland)
  Secondary: "AI Experte Schweiz" (AI expert Switzerland)
```

**Implementation tasks:**
- Update meta descriptions with keywords
- Add keywords naturally to H1, H2 headings
- Include in FAQ schema answers
- Create German blog posts targeting these keywords

**Success Criteria:**
- [ ] 10+ German pages optimized
- [ ] Keywords in: title, H1, H2, meta description
- [ ] Keyword density: 1-2% (natural, not stuffed)
- [ ] Track rankings in Google Search Console (Week 4+)

---

## Implementation Order

**Day 1-2: Schema Foundation**
1. Create FAQ Schema component
2. Create Person Schema component
3. Create Organization Schema component
4. Implement on homepage (EN/DE)
5. Validate all 3 schemas

**Day 3: Site Structure**
1. Create BreadcrumbList Schema component
2. Optimize robots.txt
3. Create sitemap.xml generator
4. Submit sitemap to Google/Bing

**Day 4: Performance Audit**
1. Run PageSpeed Insights (EN/DE homepages)
2. Fix any red/yellow metrics
3. Test mobile responsiveness
4. Verify Core Web Vitals

**Day 5: Keyword Optimization**
1. Update meta descriptions (German pages)
2. Add keywords to H1/H2
3. Create keyword tracking spreadsheet
4. Document work for Primary Coordinator

**Day 6-7: Quality Assurance**
1. Re-validate all schemas (100% pass required)
2. Cross-browser testing (Chrome, Firefox, Safari)
3. Mobile device testing
4. Create completion report

---

## Quality Gates

**Before marking complete, verify:**

**Schema Validation:**
- [ ] FAQ Schema: 100% pass (Google Rich Results Test)
- [ ] Person Schema: 100% pass
- [ ] Organization Schema: 100% pass
- [ ] BreadcrumbList Schema: 100% pass

**Performance:**
- [ ] PageSpeed Mobile: 85+ score
- [ ] PageSpeed Desktop: 90+ score
- [ ] LCP <2.0s
- [ ] INP <200ms
- [ ] CLS <0.1

**Responsive:**
- [ ] 375px: Perfect
- [ ] 768px: Perfect
- [ ] 1440px: Perfect
- [ ] No horizontal scroll on any page

**SEO:**
- [ ] robots.txt updated
- [ ] sitemap.xml live
- [ ] Submitted to Google Search Console
- [ ] 10+ pages with German keywords optimized

---

## Tools & Resources

**Validation Tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- PageSpeed Insights: https://pagespeed.web.dev/
- Google Search Console: https://search.google.com/search-console

**Browser DevTools:**
- Chrome: Inspect > Lighthouse > Run audit
- Firefox: Inspect > Accessibility
- Safari: Develop > Show Web Inspector

**Testing:**
- Real device testing (iPhone/Android if available)
- BrowserStack (if budget allows, not required)

---

## Success Metrics

**Immediate (Week 2):**
- 4 schema types implemented and validated
- Core Web Vitals all green
- Sitemap submitted to Google

**Short-term (Week 8):**
- eflury.com indexed in Google for 20+ pages
- First appearance in "Claude automation Switzerland" results (position tracking starts)

**Medium-term (Week 16):**
- Top 20 for 5+ German keywords
- Top 30 for 10+ English keywords
- LLMs (ChatGPT, Perplexity) start citing eflury.com

**Long-term (Month 6):**
- Top 10 for 15+ keywords (benchmark from website-strategy.md)
- eflury.com is THE source LLMs cite for "Claude consultant Switzerland"

---

## Handoff to Next Agent

**After completion, provide to Primary Coordinator:**

1. **Links to validate work:**
   - https://eflury.com/en (view source → check schema)
   - https://eflury.com/de (view source → check schema)
   - https://eflury.com/sitemap.xml
   - PageSpeed report screenshot

2. **Metrics summary:**
   ```
   ✅ Schemas implemented: 4/4 (FAQ, Person, Organization, Breadcrumb)
   ✅ Validation: 100% pass
   ✅ PageSpeed Mobile: XX score
   ✅ PageSpeed Desktop: XX score
   ✅ Core Web Vitals: LCP X.Xs, INP XXXms, CLS 0.0X
   ✅ Responsive: 375px-1440px tested
   ```

3. **Files created:**
   - `/astro-src/src/components/FAQSchema.astro`
   - `/astro-src/src/components/PersonSchema.astro`
   - `/astro-src/src/components/OrganizationSchema.astro`
   - `/astro-src/src/components/BreadcrumbSchema.astro`
   - `/astro-src/src/pages/sitemap.xml.ts`
   - `/astro-src/public/robots.txt` (edited)

4. **Dependencies resolved for next agents:**
   - Agent 02 (Trust Signals) can now proceed → Person schema exists
   - Agent 04 (ROI Calculator) can proceed → Core Web Vitals optimized for calculator performance
   - Agent 07 (Content Writer) can proceed → FAQ schema provides template for blog Q&As

---

**Status:** ✅ Ready to Execute
**Estimated Completion:** 7 days (15 hours total)
**Blocker Risk:** Low (no external dependencies)
**Launch Command:** Primary Coordinator says "Launch Agent 01"

---

**Agent Type:** Specialized - Technical SEO
**Phase:** 1 - Foundation
**Created:** December 2025
