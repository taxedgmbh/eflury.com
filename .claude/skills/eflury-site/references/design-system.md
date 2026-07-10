# Design system — Apple-derived, brand-adapted

The site's visual language is Apple HIG applied to the eFlury brand. All
tokens live in `astro-src/src/styles/global.css` (`:root` + `[data-theme="dark"]`),
Apple-style components in `astro-src/src/styles/apple-components.css`.

## Rule zero

**No raw hex colors in component `<style>` blocks.** Use tokens. If a hue
genuinely doesn't exist in the palette, stop and ask the owner — do not
add one. The audit script flags non-token hex values in source components.

## Color tokens — what to use when

| Purpose                          | Token |
|----------------------------------|-------|
| Headings, primary text, primary buttons | `--eflury-navy` (#022554) / semantic `--primary`, `--text-primary` |
| Hover/dark variant               | `--eflury-navy-dark` |
| Accent highlights, chips, labels | `--eflury-teal` (#0d9488) / `--accent-teal` |
| Links, secondary accent          | `--eflury-blue` (#1490D0) / `--primary-light` |
| Body/secondary text              | `--text-secondary` (grey #4D596D) |
| Page background                  | `--bg-primary`; alternating sections `--bg-secondary` (warm #f5f5f4) |
| Cards                            | `--card-bg` + `--shadow-sm`, hover `--shadow-md` |
| Borders/separators               | `--separator`, `--border-color` |
| Success/teal scale               | `--success-*`, `--primary-50/100/500/600/700` (corporate teal scale) |
| Warnings                         | `--warning-500/700` |

Dark mode redefines the same tokens under `[data-theme="dark"]` — using
tokens (not hex) is what makes dark mode work for free. Never write
`@media (prefers-color-scheme)` styles per-component.

## Layout tokens

- Spacing scale: `--spacing-xs|sm|md|lg|xl|2xl|3xl|4xl|5xl` (4→120px). No
  magic pixel margins.
- Radii: `--radius-sm|md|lg|xl|full` (8→20px, pill).
- Shadows: `--shadow-xs…xl`. Motion: `--transition-fast|base|slow`,
  easings `--ease-out`, `--spring`.
- `--header-height: 76px` — fixed header offset. Subpage top spacing comes
  from `Breadcrumbs.astro` (`margin-top: var(--header-height)`); never
  hand-pad page tops.

## Typography

- Hero/display: `clamp()`-based sizes already defined in global.css
  (h1 `clamp(2.5rem, 5vw, 4.5rem)` etc.). Apple text styles available as
  `.ios-large-title`, `.ios-headline`, `.ios-body`, `.ios-footnote`, …
- Buttons and inputs: 17px (iOS standard).
- Tone of scale: one huge headline per page, generous whitespace, short
  lines. Do not shrink type to fit more in — cut copy instead.

## The Apple page template (applies to every marketing page)

1. **One idea per section.** A section makes exactly one claim, then
   supports it. If a section needs two headlines, it is two sections.
2. **Typography-led hero:** big headline (one line if possible), one
   supporting sentence, one primary CTA. No decoration for its own sake.
3. **Progressive disclosure:** detail lives behind scroll or
   `<details>/<summary>` accordions (see pricing FAQ). Never a wall of text.
4. **Deference:** content over chrome. Reuse existing components before
   inventing markup. No new gradients, animations, or visual gimmicks
   without owner approval ("vibe code style" is the failure mode — the
   owner has flagged it before).

## Component catalog — reuse before you build

| Component / class | Use for |
|---|---|
| `layouts/ContentPageLayout.astro` | Prose pages (legal, trust, method, imprint). Provides hero, breadcrumbs, `lastUpdated`. |
| `layouts/ServiceLayout.astro` | Service detail pages. Props contract: problem/solution/benefits/process/faqs/cta/relatedCaseStudy; optional `slot="showcase"`. |
| `layouts/MainLayout.astro` | Everything (SEO schema, GA4, hreflang via `localizedPaths`). |
| `components/Breadcrumbs.astro` | The ONLY breadcrumb implementation. Never hand-roll crumbs. |
| `.info-box` / `.warning-box` | Callouts in ContentPageLayout pages (key principle / deliberate non-claims). |
| `.stack-card` / `.stack-row` / `.stack-label` / `.stack-chip` | Capability-matrix pattern (see `TechPartners.astro`). |
| `components/DataQualityShowcase.astro` | Worked-example visual pattern; template for future service showcases. |
| `.ios-card`, `.ios-button`, `.ios-list*` | Apple primitives from apple-components.css. |

## Known traps (each caused a real production bug — do not rediscover them)

1. **The 44px rule:** global CSS enforces Apple's 44×44px minimum touch
   target on `button, a, …`. Text links inside that box render at the TOP
   unless the link is `display: inline-flex; align-items: center`. This
   caused the long-lived "Services sits lower in the nav" bug. Any new
   inline text link in a bar/nav needs the inline-flex fix.
2. **No attribute-wildcard selectors.** `[class*="card"]` once styled
   half the site by accident. Enumerate classes explicitly.
3. **Never reference an undefined CSS variable.** Undefined vars fail
   silently (transparent backgrounds, invisible badges). If you introduce
   a token, define it in `:root` AND `[data-theme="dark"]`.
4. **EN/DE stylesheet drift:** page pairs must share a verbatim-identical
   `<style>` block. Drift produced visibly different EN vs DE pages.
5. **Measure text, not boxes.** When verifying alignment, compare rendered
   text rects / screenshots; element bounding boxes can be equal while the
   text inside sits differently.
