# Content rules — the honesty constitution

The site's positioning is **"Beweise, keine Versprechen"** (proof, not
promises). It competes with big consultancies on radical verifiability:
we publish our method, disclose our services, and state what we do NOT
claim. One invented number destroys that positioning. These rules are
absolute.

## Standing owner directives (quoted, still in force)

- **Johnson & Johnson:** "dont use Johnson and Johnson on my page - they
  are not my friends nor partners - thats only a place i work." → J&J may
  appear ONLY as employment history context (e.g. CV-style mention on
  About), NEVER as partner, client, logo, or implied endorsement.
- **Taxed GmbH:** "hold off we dont want to put too much taxed gmbh here -
  dont mix up the business too much." → The existing case study stays;
  do not amplify Taxed GmbH further (no homepage feature, no extra
  placements) without a new owner go.
- **Insurance:** owner has NO Berufshaftpflicht (professional liability
  insurance). Never claim or imply insurance coverage.
- **Certifications:** no ISO 27001 or any certification. The trust pages
  explicitly say so ("What we deliberately do not claim") — keep that
  section truthful and current.
- **UID:** "dont ask me about UID - we dont have this yet." → Imprint has
  no UID number. Do not add one, do not ask again; owner will provide it
  when it exists.
- **Comparison page** ("Boutique vs Grossberatung"): owner said "skip that
  for now" — parked, build only on explicit request.

## Claims policy

- **Only verifiable statements.** If you cannot point to a source or to
  something the owner confirmed, it does not go on the site.
- Illustrative examples (mock data, projected metrics) must be **labeled
  illustrative** in the visible copy — see `DataQualityShowcase.astro`
  ("Zahlen illustrativ").
- Client names/logos: only engagements that exist as published case
  studies. No logo walls, no invented testimonials.
- The About-page counters ("15+ projects", "500+ hours") are
  owner-provided; do not extend or embellish them.

## Verified facts already sourced (safe to reuse, keep wording tight)

- Gartner: ~60% of AI projects will be abandoned through 2026 without
  AI-ready data (2025); >40% of agentic AI projects to be cancelled by
  end-2027; DQ category renamed "Augmented Data Quality Solutions" (2024).
- 2025 Gartner Magic Quadrant, Augmented Data Quality: Leaders =
  Ataccama, Informatica, Qlik (+9 evaluated vendors named on the DQ page).
  We do NOT use or resell these tools — the site says so explicitly.
- Claude context windows: 200K–1M tokens (≈300–2,500 pages / ≈4K–50K
  spreadsheet rows); long-context caveats (Lost in the Middle, NVIDIA
  RULER, Chroma "context rot" 2025) justify the curated-context approach.
- Anthropic does not train on commercial API data by default; EU hosting
  via AWS Bedrock (Frankfurt) where residency is required.
- n8n: $5.2B valuation, SAP investment (May 2026).

## Banned "zombie statistics" (widely quoted, unverifiable — never use)

- "Bad data costs the US $3.1 trillion" (attributed IBM — untraceable)
- "Data scientists spend 80% of their time cleaning data"
- "Gartner: 83% of data migrations fail"
- The "1-10-100 rule" of data quality costs

## Language rules

- **DE is Swiss German:** `ss` never `ß`; Sie-form throughout; natural
  Swiss business vocabulary (Treuhand, KMU, Offerte).
- EN and DE must carry the same meaning — translate the message, not
  word-for-word. Both files change in the same PR, always.
- Voice: precise, concrete, calm. State numbers with their basis. Avoid
  superlatives ("leading", "best-in-class") — they read as unverifiable.
- Owner's brand spellings: "eFlury Consulting" (company), "eflury Method™"
  (methodology), "SkopaAI" (product).
