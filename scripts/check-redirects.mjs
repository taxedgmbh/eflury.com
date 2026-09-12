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
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
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
const serviceSlugs = new Set(
  [
    ...readFileSync(join(ROOT, 'src/data/services.ts'), 'utf8').matchAll(
      /^\s*slug: ["']([^"']+)["']/gm
    ),
  ].map((m) => m[1])
);

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
  } else if (serviceSlugs.has(to.replace(/^\/de\/services\/|\/$/g, ''))) {
    // dynamic family: /de/services/[slug] — enumerated from data, not page.tsx
  } else if (!onDisk.has(to)) {
    errors.push(`Redirect target does not exist: ${from} -> ${to}`);
  }
}

// ------------------------------------------------- non-HTML URLs & anchors ---
/*
 * The route walk above only sees page.tsx files, which is how /de/rss.xml,
 * /llms.txt and /llms-full.txt were missed: all three return 200 on the live
 * site and 404d here, and the "53/53 routes covered" check never looked at
 * anything that was not an index.html.
 */
const NON_HTML_ROUTES = ['/de/rss.xml', '/llms.txt', '/llms-full.txt', '/robots.txt', '/sitemap.xml'];
for (const route of NON_HTML_ROUTES) {
  const segment = route.replace(/^\//, '');
  const asRoute = join(ROOT, 'src/app', segment, 'route.ts');
  const asFile = join(ROOT, 'public', segment);
  const generated = /^\/(robots|sitemap)/.test(route)
    ? existsSync(join(ROOT, 'src/app', `${segment.replace(/\.(txt|xml)$/, '')}.ts`))
    : false;
  if (!existsSync(asRoute) && !existsSync(asFile) && !generated) {
    errors.push(`Live site serves ${route}, but nothing here does (no route.ts, no public file)`);
  }
}

/*
 * public/ still contains pages carried over from Astro. They were POSTing to
 * /api/accept.php long after the PHP backend was gone, so the whole offer flow
 * 404d — and a grep for "/api/accept" matched it as a substring, which is how
 * it was reported as working.
 */
function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}
const phpRefs = new Map();
for (const file of walkFiles(join(ROOT, 'public'))) {
  if (!/\.(html|js|json|txt)$/.test(file)) continue;
  for (const m of readFileSync(file, 'utf8').matchAll(/["'`]([^"'`\s]*\.php)\b/g)) {
    const rel = file.replace(`${ROOT}/`, '');
    if (!redirectsSrc.includes(m[1]) && !readFileSync(join(ROOT, 'next.config.ts'), 'utf8').includes(m[1])) {
      phpRefs.set(`${rel} -> ${m[1]}`, true);
    }
  }
}
for (const ref of phpRefs.keys()) {
  errors.push(`public file references a .php path with no rewrite: ${ref}`);
}

/*
 * In-page anchors. Five were dangling — #bewerben pointed at a form that had
 * been stripped out, #pricing and #solution at sections that never came across.
 */
const contentFiles = [
  ...walkFiles(join(ROOT, 'src/content/pages')),
  ...walkFiles(join(ROOT, 'src/content/legal')),
].filter((f) => f.endsWith('.html'));

const ids = new Set();
for (const file of [...contentFiles, ...walkFiles(join(ROOT, 'src/app')).filter((f) => f.endsWith('.tsx'))]) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/\bid=["'{`]?([A-Za-z][\w-]*)/g)) ids.add(m[1]);
}
for (const file of contentFiles) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/href="#([\w-]+)"/g)) {
    if (!ids.has(m[1])) {
      errors.push(`Dangling anchor #${m[1]} in ${file.replace(`${ROOT}/`, '')}`);
    }
  }
}

/* trailingSlash: true means a slashless internal link costs an extra 308 hop. */
for (const file of contentFiles) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/href="(\/de\/[^"#?]*[^/"#?])"/g)) {
    if (!/\.[a-z0-9]{2,5}$/.test(m[1])) {
      notes.push(`Internal link without trailing slash (extra 308): ${m[1]} in ${file.split('/').pop()}`);
    }
  }
}

/*
 * The Impressum is extracted HTML and cannot import LEGAL_ENTITY, so the two can
 * drift. If the entity ever moves into a GmbH, flipping the flag in site.ts
 * without rewriting the Impressum would leave a false legal statement on a page
 * whose whole job is to be accurate — so make that fail the build.
 */
const siteSrc = readFileSync(join(ROOT, 'src/lib/site.ts'), 'utf8');
const registered = /registered:\s*true/.test(siteSrc);
const impressum = readFileSync(join(ROOT, 'src/content/legal/impressum.html'), 'utf8');
const saysUnregistered = /nicht im Handelsregister eingetragen/.test(impressum);

if (registered && saysUnregistered) {
  errors.push(
    'LEGAL_ENTITY.registered is true but the Impressum still says "nicht im Handelsregister eingetragen"'
  );
}
if (!registered && !saysUnregistered) {
  errors.push(
    'LEGAL_ENTITY.registered is false but the Impressum no longer states the non-registration'
  );
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
