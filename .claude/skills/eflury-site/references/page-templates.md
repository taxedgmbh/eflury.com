# Page templates — how to build each page type

Pick the template; do not design from scratch. Copy structure from the
named exemplar page, keep its section rhythm, and share one verbatim
stylesheet between the EN and DE versions.

## Prose / policy page (trust, method, legal, imprint)

- Layout: `ContentPageLayout.astro`
  (props: title, description, lang, heroTitle, heroSubtitle, lastUpdated, keywords).
- Exemplars: `en/trust.astro`, `en/method.astro`.
- Structure: numbered `<h2>` sections, `.info-box` for the core principle
  up top, `.warning-box` for "what we deliberately do not claim".
- Update `lastUpdated` on every substantive edit.

## Service detail page

- Layout: `ServiceLayout.astro` with the full `serviceData` props contract:
  title/description/keywords/lang/serviceType/hero*/problem*/solution*/
  benefits/process*/faqs/cta*/relatedCaseStudy.
- Exemplars: `en/services/data-quality.astro` + `de/services/datenqualitaet.astro`
  (the most complete pair, incl. a showcase component via
  `<Component slot="showcase" />`).
- 4–6 FAQs minimum, written from real buyer objections (cost, security,
  vs-big-tools, hype).
- `relatedCaseStudy` must point at a real case study.

## Worked-example showcase (visual proof inside a service page)

- Exemplar: `components/DataQualityShowcase.astro` — before/after data
  table, human review gate, metrics labeled illustrative, pipeline diagram.
- Pattern: single `.astro` component taking `lang` prop, all strings in a
  `const t = de ? {...} : {...}` object, tokens only, review-gate step
  always shown (human-in-the-loop is a brand claim).

## Hub / index page (services overview, case-studies index, future hubs)

- Structure: typography-led intro (one headline + one sentence), then a
  card grid of children using `.card`/`.ios-card` + `--shadow-sm`.
- Every child page gets a card; no dead-end hubs.

## Case study

- Exemplar: `en/case-studies/taxed-gmbh.astro` (post-cleanup version).
- Numbers must be real and owner-confirmed; if a metric is projected,
  label it. Respect the Taxed-GmbH-amplification hold (content-rules.md).

## Blog post

- Markdown in `astro-src/src/content/blog/`, schema in
  `src/content.config.ts` (the ACTIVE config — `src/content/config.ts` was
  legacy and is deleted).
- Frontmatter: `title, description, pubDate, lang, translationKey` —
  `translationKey` MUST match between the EN and DE file or hreflang and
  the language switcher break.
- Always create both language files in the same PR.

## Homepage sections

- The homepage is composed of section components (`Hero`, `About`,
  `Services`, `TechPartners`, `Testimonials`, `Contact`, …) included from
  `en/index.astro` / `de/index.astro`. Edit the component, never one
  language's page inline — components take `lang` and serve both.

## Verification recipe (all page types)

```bash
cd astro-src && npm run build && npm run audit
```

Then render locally (Playwright cannot reach the live site through the
proxy):

```js
// serve the dist folder on :4399 with a tiny node static server, then
// chromium at /opt/pw-browsers/chromium → screenshot EN + DE,
// desktop (1280px) + mobile (390px)
```

Live verification after merge: `curl -s https://eflury.com/... | grep -o
'<needle>' | wc -l` (occurrence counts, not line counts — HTML is minified).
Deploys land ~20–30s after merge to main.
