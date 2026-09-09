# Migration artifacts — Astro/Hostinger → Next.js/Firebase App Hosting

Phase 0 prep. These files land on `main` (the live Astro site); the rebuild happens
on a `next` branch.

## `legacy-redirects.ts`

The frozen `/en/*` → `/de/*` map, 52 routes. **Generated once, checked in, never
regenerated.** The site is going German-only, so every English URL needs a 301 to
its German counterpart — but once the English content is deleted the pairing can no
longer be derived from anything. Hence: freeze it now, while both trees exist.

Consumed by `next.config.ts` in the new app:

```ts
import { LEGACY_EN_TO_DE } from '@/lib/legacy-redirects';

async redirects() {
  return [
    { source: '/', destination: '/de', permanent: true },
    ...LEGACY_EN_TO_DE.map(([source, destination]) => ({ source, destination, permanent: true })),
    { source: '/en/:path*', destination: '/de', permanent: true },  // last-resort net
  ];
}
```

Paths carry no trailing slash — Next normalises before matching when
`trailingSlash: true`. Verify with `curl -sI` that `/en/about/` yields exactly one
301, not a 308→301 chain.

## `gen-redirects.mjs`

The generator, kept for auditability. Cross-checks three independent sources and
**fails rather than guessing**:

1. the built route tree (`en/**/index.html`) — the authoritative set of live URLs;
2. `translationKey` frontmatter — pairs the 17 blog post translations;
3. a hand-verified slug table for pages whose German slug differs
   (`/en/contact/` → `/de/kontakt/`, `/en/industries/finance-teams/` →
   `/de/branchen/finanzteams/`, …).

Only five of those 20 slug pairs appear in `MainLayout.astro`'s `localizedPaths`,
which is why hreflang is currently wrong on the pages missing from it — and on every
blog post, which falls through to a naive `/en/`→`/de/` path swap.

Re-running it requires both trees to exist:

```bash
node migration/gen-redirects.mjs "$PWD"
```

It exits non-zero if any English route resolves to a German URL that isn't live, so
it doubles as a coverage assertion. Wire it into CI in the new app.

## Not yet handled — production data on Hostinger

`api/annahmen/` (contract-acceptance evidence trail) and `api/bewerbungen/` (job
applications, including uploaded CVs) are created at runtime by `accept.php` and
`apply.php`. They live **only on the Hostinger filesystem** — not in git, not in any
backup this repo controls. Decommissioning the host destroys them.

Both are protected by generated `.htaccess` files, which are Apache-specific and
have no equivalent on Firebase; the replacement is Cloud Storage with IAM.

**Export both directories before the DNS cutover, not after.**
