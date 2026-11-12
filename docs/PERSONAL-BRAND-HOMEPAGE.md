# eflury.com — Personal brand homepage (handover)

Status: first version, built 12 Nov 2026 in a Claude chat session, approved
section by section by Emanuel. **Built on the Astro site** (`astro-src/`,
merged to `main` via PR #135). **Not live**: Hostinger has not pulled from
GitHub since 20 Jul 2026, and the planned stack is Next.js on Firebase App
Hosting (`next` branch, see `migration/`). This document describes the design
so it can be ported to the `next` stack 1:1.

## Positioning (owner decisions — do not change without asking)

- The site is **Emanuel Flury, Entrepreneur** — not "CEO", never "Swiss
  entrepreneur" as a label. Brand name "Emanuel Flury" (not "Emanuel Aaron").
- **Three businesses**: Skopa AG (technology), Taxed GmbH (tax), EF Real
  Estate (real estate). Header/menu/ventures say "Three businesses. One
  standard." Only the real estate card changes wording.
- **EF Real Estate** is *not a company*; it is labelled **private equity**
  ("Residential property held as private equity"). Role: **Owner**.
- Roles must match LinkedIn exactly:
  - Skopa AG — **Managing Director**
  - Taxed GmbH — **Managing Director (Mandate)**
  - EF Real Estate — **Owner**
- Keep the early path light: no apprenticeship, no army. No employer names
  (say "large organisations").
- Real estate: **type + region only**. Never addresses, postcodes, tenants,
  values, financing. The three cards:
  1. Own home — Lebern district · Canton of Solothurn
  2. Rental house — Wasseramt district · Canton of Solothurn
  3. Apartment — Seeland · Canton of Bern
- No faces inside the photo-filled letters (scenery only).
- Personal photos that show people stay off the public repo except the
  existing website portrait (`images/portraits/emanuel-aaron-flury-portrait.webp`).
- No exclamation marks in copy.

## Visual system

- **Dark navy everywhere** (`--surface-navy`), alternating sections with a
  ~18% black overlay; thin `rgb(255 255 255 / .06)` dividers. White
  backgrounds were rejected as too harsh.
- Accent text/eyebrows: brand blue `--eflury-blue` (#1490D0), bold, ≥1.2rem
  when used for the large "ENTREPRENEUR" line (AA on navy).
- Buttons: `--action-teal` fill, or white 30% outline on navy.
- Display font: **Montserrat 800** (`public/fonts/montserrat-latin-800-normal.woff2`),
  same as the social media word rows. Body: site default.
- **Brand lines**: horizontal line ending in a dot (two staggered lines), from
  the social banners. Used top-left/bottom-right of the hero, top of the
  footer CTA, about card, real estate note, menu strip.
- **Photo-in-letters words** (`background-clip: text`, slow pan + zoom):
  the signature of the brand, same as Instagram/TikTok rows.

| Word | Section | Image (`public/images/hero/`) |
|---|---|---|
| EMANUEL FLURY | Hero (cycles palms → sky → arches → city, 6 s each) | palms, sky, arches, city |
| BUILD | Ventures (also in the mega menu) | palms |
| GROW | EF Real Estate | jungle |
| FOCUS | YouTube | city |
| LEARN | Writing | beams |
| LEAD | About | arches |
| DREAM | Follow along | sky |
| EMANUEL FLURY | Footer bottom (35% opacity) | sky |

## Page structure (EN homepage `/en/`)

1. **Header + mega menu** (`PersonalHeader`): EF white mark + "Emanuel Flury";
   Ventures / Writing / About open full-width navy panels on hover/click;
   Contact button. Panels:
   - Ventures: BUILD word + "Three businesses. One standard." + 3 cards
     (real logos, tag, one-line text, role + URL), strip "TECH · TAX · REAL
     ESTATE" + "Start a conversation".
   - Writing: featured newest article (image, date, reading time), next two,
     topics with counts, "All articles (n)".
   - About: portrait card (full head visible), My story / Writing / Consulting
     archive, six socials with handles, email.
   - Mobile: full-screen menu with fold-outs. Esc closes, keyboard accessible.
2. **Hero** (`BrandHero`): EF mark, EMANUEL FLURY photo letters, ENTREPRENEUR,
   "I build companies where finance, tax and technology meet.", buttons
   "What I build" / "Get in touch". Background: **Three.js** node network
   (`src/scripts/hero-network.ts`, lazy-loaded, pauses off-screen, still frame
   for reduced motion). Name size uses `min(13vw, 16vh)` so it fits 1280×800.
3. **Ventures** — BUILD; three cards with roles.
4. **EF Real Estate** (`RealEstate`) — GROW; logo (EF mark under a roof line
   with dots, `images/brands/ef-real-estate-mark.svg`) + "EF / REAL ESTATE";
   lead "Private equity in residential property."; three cards (photos
   pending from Emanuel — crop/blur house numbers and street signs);
   note "Deliberately without addresses, tenants or figures."
5. **YouTube** (`MediaYouTube`) — FOCUS; latest 3 public videos from the
   channel RSS (`src/lib/youtube.ts`, channel `UCB9BT6IbSYMkjvL6ZOyIVcw`),
   fetched **at build time**, no API key; click-to-play via
   `youtube-nocookie.com`. Empty state "The channel is launching soon."
   (all current uploads are unlisted/private). Later: property videos go into
   the real estate cards (retitle neutrally, check frames for addresses).
6. **Writing** — LEARN; newest three blog posts.
7. **About** (`PersonalAbout`) — LEAD; portrait card with badge; three
   chapters: Finance (MA Finance-Economics Aberdeen, exchange year Wisconsin-
   La Crosse, tax specialist certificate) / Automation (years in large
   organisations) / Entrepreneur (the three roles).
8. **Follow along** — DREAM; social pill links.
9. **Footer** (`PersonalFooter`): "Let's talk." band (email + LinkedIn),
   brand column (logo, tagline, email, 6 social icons), Ventures with logos +
   roles, Writing (latest article card), About links; bottom bar with legal
   links inline (Imprint, Privacy, Terms, Cookies), TECH · TAX · REAL ESTATE,
   EN/DE, back-to-top; giant EMANUEL FLURY word.

## Links / handles

LinkedIn in/emanuelflury · Instagram @emanuelaaronflury · TikTok @emanuelflury
· YouTube @emanuelflury · Facebook emanuelflury · GitHub emanuelflury ·
email me@eflury.com · skopa.ai · taxed.ch

## Files (Astro)

```
astro-src/src/components/personal/
  PersonalHeader.astro   mega menu + mobile menu
  BrandHero.astro        hero
  PersonalHome.astro     ventures, writing, follow + section order
  RealEstate.astro       EF Real Estate
  MediaYouTube.astro     YouTube section
  PersonalAbout.astro    about
  PersonalFooter.astro   footer
  BrandWord.astro        reusable photo-in-letters word
astro-src/src/scripts/hero-network.ts   Three.js background
astro-src/src/lib/youtube.ts            build-time RSS
astro-src/public/images/hero/*.webp     letter-fill scenery
astro-src/public/images/brands/         skopa-white.svg, taxed-icon.webp, ef-real-estate-mark.svg
astro-src/public/images/ef-mark-white.svg
astro-src/public/fonts/montserrat-latin-800-normal.woff2
astro-src/src/pages/en/index.astro      wires it together
```

## Open items

- Port to the `next` stack (Next.js / Firebase) — the migration plan says
  German-only; decide EN/DE/FR there.
- German and French homepage; rewritten About page; legal pages still say
  eFlury Consulting (imprint must name Emanuel Flury correctly).
- "eFlury Consulting (archive)" section — links currently point to
  `/en/services/`.
- Real estate building photos; property videos.
- Instagram/TikTok post grid (optional live Instagram feed needs a
  professional account + Meta consent banner).
- Hostinger deploy has been stale since 20 Jul 2026 (webhook returns 200
  but files are not pulled) — moot if DNS moves to Firebase.
