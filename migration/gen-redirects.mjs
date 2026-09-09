#!/usr/bin/env node
/**
 * Phase 0b — freeze the /en/* -> /de/* redirect map.
 *
 * Must run while the English tree still exists. Cross-checks three sources:
 *   1. the built route list (en/**\/index.html)  — authoritative set of live URLs
 *   2. translationKey frontmatter pairs          — blog post pairing
 *   3. localizedPaths in MainLayout.astro        — static pages whose slugs differ
 *
 * Emits a checked-in TS module. Never regenerate after the EN content is deleted.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const REPO = process.argv[2];
if (!REPO) { console.error('usage: gen-redirects.mjs <repo-root>'); process.exit(1); }

const BLOG = join(REPO, 'astro-src/src/content/blog');
const OUT = join(REPO, 'migration/legacy-redirects.ts');

// --- source 3: static pages whose German slug differs ---
// The five marked (*) are the only ones MainLayout.astro:23-36 knows about; the
// rest were recovered by diffing the built en/ and de/ trees. That gap is why
// hreflang is currently wrong on ~15 page pairs as well as on every blog post.
const SLUG_OVERRIDES = {
  '/en/privacy/': '/de/datenschutz/',                                    // *
  '/en/terms/': '/de/nutzungsbedingungen/',                              // *
  '/en/disclaimer/': '/de/haftungsausschluss/',                          // *
  '/en/code-of-conduct/': '/de/verhaltenskodex/',                        // *
  '/en/services/finance-automation/': '/de/services/finanzen-automatisierung/', // *
  '/en/imprint/': '/de/impressum/',
  '/en/contact/': '/de/kontakt/',
  '/en/careers/': '/de/karriere/',
  '/en/careers/spontaneous-application/': '/de/karriere/initiativbewerbung/',
  '/en/guides/': '/de/leitfaeden/',
  '/en/method/': '/de/methode/',
  '/en/trust/': '/de/sicherheit/',
  '/en/industries/': '/de/branchen/',
  '/en/industries/finance-teams/': '/de/branchen/finanzteams/',
  '/en/industries/professional-services/': '/de/branchen/dienstleister/',
  '/en/industries/reporting-data/': '/de/branchen/reporting-daten/',
  '/en/industries/treuhand-accounting/': '/de/branchen/treuhand/',
  '/en/services/ai-audit/': '/de/services/ki-audit/',
  '/en/services/data-quality/': '/de/services/datenqualitaet/',
  '/en/services/managed-ai-operations/': '/de/services/ki-betrieb/',
};

// --- source 1: the live route list, from the committed build output ---
function walkRoutes(base, prefix) {
  const out = [];
  (function rec(dir, url) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) rec(join(dir, e.name), `${url}${e.name}/`);
      else if (e.name === 'index.html') out.push(url);
    }
  })(join(REPO, base), prefix);
  return out.sort();
}
const enRoutes = walkRoutes('en', '/en/');
const deRoutes = new Set(walkRoutes('de', '/de/'));

// --- source 2: blog pairing via translationKey ---
const fm = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  const o = {};
  for (const line of (m?.[1] ?? '').split('\n')) {
    const kv = line.match(/^([a-zA-Z]+):\s*"?([^"]*?)"?\s*$/);
    if (kv) o[kv[1]] = kv[2];
  }
  return o;
};

const byKey = new Map();
for (const f of readdirSync(BLOG).filter((f) => f.endsWith('.md'))) {
  const d = fm(readFileSync(join(BLOG, f), 'utf8'));
  const slug = f.replace(/\.md$/, '');
  if (!d.translationKey) { console.error(`FATAL: ${f} has no translationKey`); process.exit(1); }
  if (!byKey.has(d.translationKey)) byKey.set(d.translationKey, {});
  byKey.get(d.translationKey)[d.lang] = slug;
}

const blogPairs = new Map(); // /en/blog/<slug>/ -> /de/blog/<slug>/
for (const [key, g] of byKey) {
  if (!g.en || !g.de) { console.error(`FATAL: translationKey "${key}" is unpaired:`, g); process.exit(1); }
  blogPairs.set(`/en/blog/${g.en}/`, `/de/blog/${g.de}/`);
}

// --- resolve every EN route ---
const rows = [];
const unresolved = [];
for (const en of enRoutes) {
  let de = SLUG_OVERRIDES[en] ?? blogPairs.get(en) ?? en.replace(/^\/en\//, '/de/');
  if (!deRoutes.has(de)) unresolved.push([en, de]);
  rows.push([en, de]);
}

if (unresolved.length) {
  console.error('FATAL: these /en/ routes resolve to a non-existent German URL:');
  for (const [en, de] of unresolved) console.error(`  ${en}  ->  ${de}`);
  process.exit(1);
}

// --- German routes with no English source (informational) ---
const covered = new Set(rows.map(([, de]) => de));
const orphanDe = [...deRoutes].filter((d) => !covered.has(d)).sort();

const body = rows
  .map(([en, de]) => `  ['${en.replace(/\/$/, '')}', '${de.replace(/\/$/, '')}'],`)
  .join('\n');

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `/**
 * GENERATED ${new Date().toISOString().slice(0, 10)} by migration/gen-redirects.mjs — DO NOT EDIT.
 *
 * Frozen /en/* -> /de/* map, produced while the English tree still existed.
 * Regenerating after the English content is deleted is impossible, which is
 * why this is checked in rather than derived at build time.
 *
 * ${rows.length} routes. Paths are written WITHOUT a trailing slash: Next
 * normalises before matching when \`trailingSlash: true\` is set.
 */
export const LEGACY_EN_TO_DE: ReadonlyArray<readonly [string, string]> = [
${body}
] as const;
`);

console.log(`Wrote ${OUT}`);
console.log(`  ${rows.length} redirects, all destinations verified against the live /de/ tree`);
console.log(`  ${blogPairs.size} blog pairs from translationKey`);
console.log(`  ${Object.keys(SLUG_OVERRIDES).length} static slug overrides`);
if (orphanDe.length) {
  console.log(`\n  German URLs with no English counterpart (${orphanDe.length}) — expected, no action:`);
  for (const d of orphanDe) console.log(`    ${d}`);
}
