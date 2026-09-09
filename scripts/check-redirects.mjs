#!/usr/bin/env node
/**
 * Build gate. Runs before `next build` via the "build" script.
 *
 * The Astro site's sitemap was a hand-maintained array that silently rotted to 18
 * of 72 live URLs, and its hreflang map knew 5 of 20 slug pairs. Both failures
 * were invisible because nothing asserted them. These checks make the equivalent
 * mistakes fail the build instead.
 *
 * Reads the TS sources textually rather than importing them: App Hosting builds
 * on Node 20, which cannot strip types.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const errors = [];
const notes = [];

// ---------------------------------------------------------------- redirects --
const redirectsSrc = readFileSync(join(ROOT, 'src/lib/legacy-redirects.ts'), 'utf8');
const pairs = [...redirectsSrc.matchAll(/\['([^']+)',\s*'([^']+)'\]/g)].map((m) => [m[1], m[2]]);

if (pairs.length === 0) errors.push('legacy-redirects.ts parsed to zero rules.');

const sources = new Map();
for (const [from, to] of pairs) {
  if (sources.has(from)) errors.push(`Duplicate redirect source: ${from}`);
  sources.set(from, to);
}

// A destination that is itself a source produces a 301 chain. Google follows
// them, but each hop leaks equity and the plan calls for single-hop only.
const normalize = (u) => (u.length > 1 ? u.replace(/\/$/, '') : u);
for (const [from, to] of pairs) {
  if (sources.has(normalize(to))) {
    errors.push(`Redirect chain: ${from} -> ${to} -> ${sources.get(normalize(to))} (collapse to the final target)`);
  }
}

for (const [from, to] of pairs) {
  if (from.startsWith('/en/') === false && from !== '/en' && !from.startsWith('/de/')) {
    notes.push(`Unexpected redirect source outside /en/ and /de/: ${from}`);
  }
  if (!to.startsWith('/de')) errors.push(`Redirect target is not German: ${from} -> ${to}`);
}

// ----------------------------------------------------------------- sitemap ---
const routesSrc = readFileSync(join(ROOT, 'src/lib/routes.ts'), 'utf8');
const declared = new Set([...routesSrc.matchAll(/path:\s*'([^']+)'/g)].map((m) => m[1]));

// STATIC_ROUTES spreads the long-form content pages in from pages.ts. This
// parser is textual — App Hosting builds on Node 20, which cannot strip types —
// so it has to follow that derivation explicitly rather than evaluate it.
if (/\.\.\.Object\.values\(CONTENT_PAGES\)/.test(routesSrc)) {
  const pagesSrc = readFileSync(join(ROOT, 'src/lib/pages.ts'), 'utf8');
  for (const m of pagesSrc.matchAll(/route:\s*'([^']+)'/g)) declared.add(m[1]);
}

/** Every non-dynamic page.tsx under src/app/de must be registered in STATIC_ROUTES. */
function walkPages(dir, urlPath, out) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry.startsWith('[')) continue; // dynamic — enumerated from content instead
      if (entry.startsWith('(') || entry.startsWith('_')) {
        walkPages(full, urlPath, out); // route group: no URL segment
        continue;
      }
      walkPages(full, `${urlPath}${entry}/`, out);
    } else if (entry === 'page.tsx' || entry === 'page.ts') {
      out.add(urlPath);
    }
  }
  return out;
}

const onDisk = walkPages(join(ROOT, 'src/app/de'), '/de/', new Set());
for (const route of onDisk) {
  if (!declared.has(route)) {
    errors.push(`Page exists but is missing from STATIC_ROUTES in src/lib/routes.ts: ${route}`);
  }
}
for (const route of declared) {
  if (!onDisk.has(route)) {
    errors.push(`STATIC_ROUTES lists ${route}, but no page.tsx exists for it.`);
  }
}

// A redirect must never point at a URL the site does not serve, and must never
// need a second hop to get there. Blog targets are
// checked against the content directory; everything else against the page tree.
const postSlugs = new Set(
  readdirSync(join(ROOT, 'src/content/blog'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
);
for (const [from, to] of pairs) {
  if (!to.endsWith('/')) {
    errors.push(`Redirect destination must end in a slash or trailingSlash adds a second hop: ${from} -> ${to}`);
    continue;
  }
  const blog = to.match(/^\/de\/blog\/([^/]+)\/$/);
  if (blog) {
    if (!postSlugs.has(blog[1])) errors.push(`Redirect ${from} targets a missing post: ${to}`);
  } else if (!onDisk.has(to)) {
    notes.push(`Redirect target not yet built (expected until Phase 2 lands): ${from} -> ${to}`);
  }
}

// ------------------------------------------------------------------ report ---
if (notes.length) {
  console.log(`check-redirects: ${notes.length} note(s)`);
  for (const n of notes.slice(0, 8)) console.log(`  · ${n}`);
  if (notes.length > 8) console.log(`  · …and ${notes.length - 8} more`);
}

if (errors.length) {
  console.error(`\ncheck-redirects: ${errors.length} error(s)\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error('');
  process.exit(1);
}

console.log(
  `check-redirects: OK — ${pairs.length} redirects, ${declared.size} static routes, ${postSlugs.size} posts`
);
