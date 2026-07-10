/**
 * eflury.com structure & consistency audit.
 *
 * Run via `npm run audit` (from astro-src/, after `npm run build`) or:
 *   node .claude/skills/eflury-site/scripts/audit.mjs [--root <dir>]
 *
 * Audits the BUILT site (default: astro-src/dist if present, else the
 * committed dist at the repo root) plus the SOURCE tree for token
 * discipline.
 *
 * ERRORS (exit 1): broken internal links · orphan pages · missing head
 * tags (title/description/canonical/og:image/hreflang) · EN/DE page
 * parity · breadcrumb policy (0 on home, exactly 1 on subpages) ·
 * sitemap consistency (both directions) · missing expected files.
 *
 * WARNINGS (exit 0): raw hex colors in component/page <style> blocks —
 * a ratchet: legacy hits are tolerated, new code must not add to them.
 */
import { readFile, readdir } from 'fs/promises';
import { join, relative, dirname } from 'path';
import { existsSync, statSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..', '..', '..');
const SRC = join(REPO, 'astro-src', 'src');

const argRoot = process.argv.indexOf('--root');
const ROOT =
  argRoot !== -1
    ? process.argv[argRoot + 1]
    : existsSync(join(REPO, 'astro-src', 'dist'))
      ? join(REPO, 'astro-src', 'dist')
      : REPO;

// When auditing the repo root, skip non-site directories.
const SKIP_DIRS = new Set(['astro-src', 'node_modules', '.git', '.github', '.claude', 'api', 'downloads', '_astro', 'images']);

async function findFiles(dir, ext, out = [], top = dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (dir === top && SKIP_DIRS.has(e.name)) continue;
      await findFiles(join(dir, e.name), ext, out, top);
    } else if (ext.some((x) => e.name.endsWith(x))) {
      out.push(join(dir, e.name));
    }
  }
  return out;
}

const errors = [];
const warnings = [];

// ---------------------------------------------------------------- pages
const pages = await findFiles(ROOT, ['.html']);
const pageSet = new Set(pages);
const inbound = new Map(pages.map((p) => [p, 0]));

function resolveInternal(href) {
  let p = href.replace(/^https?:\/\/(www\.)?eflury\.com/, '').split('#')[0].split('?')[0];
  if (p === '') return [join(ROOT, 'index.html')];
  if (!p.startsWith('/')) return null;
  const cands = [];
  if (p.endsWith('/')) cands.push(join(ROOT, p, 'index.html'));
  else {
    cands.push(join(ROOT, p));
    cands.push(join(ROOT, p + '.html'));
    cands.push(join(ROOT, p, 'index.html'));
  }
  return cands;
}

const hrefRe = /(?:href|src)=["']([^"']+)["']/g;

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const rel = relative(ROOT, page);
  const isHome = ['index.html', 'en/index.html', 'de/index.html'].includes(rel);
  const is404 = rel === '404.html';

  // ---- internal links resolve
  const seen = new Set();
  for (const m of html.matchAll(hrefRe)) {
    const href = m[1];
    if (seen.has(href)) continue;
    seen.add(href);
    if (/^(https?:\/\/(?!(www\.)?eflury\.com)|mailto:|tel:|javascript:|data:|#)/.test(href)) continue;
    // The 404 page's canonical/og:url self-reference (/404/) is synthetic —
    // the page is served for arbitrary URLs. Its body links still get checked.
    if (is404 && /^(https?:\/\/(www\.)?eflury\.com)?\/404\/?$/.test(href)) continue;
    const cands = resolveInternal(href);
    if (!cands) continue;
    const hit = cands.find((c) => { try { return statSync(c).isFile(); } catch { return false; } });
    if (!hit) errors.push(`broken link: ${rel} -> ${href}`);
    else if (hit.endsWith('.html') && pageSet.has(hit) && hit !== page) {
      inbound.set(hit, (inbound.get(hit) || 0) + 1);
    }
  }

  // 404 is an error page; root index.html is the noindex language-redirect
  // stub — neither carries the full social/hreflang head.
  if (is404 || rel === 'index.html') continue;

  // ---- head checks
  const head = html.slice(0, html.indexOf('</head>') + 7);
  const has = (re) => re.test(head);
  if (!has(/<title[^>]*>[^<]+<\/title>/)) errors.push(`no <title>: ${rel}`);
  if (!has(/<meta\s[^>]*name=["']description["'][^>]*>/) && !has(/<meta\s[^>]*content=["'][^"']*["']\s[^>]*name=["']description["']/))
    errors.push(`no meta description: ${rel}`);
  if (!has(/<link\s[^>]*rel=["']canonical["']/)) errors.push(`no canonical: ${rel}`);
  if (!has(/property=["']og:image["']/)) errors.push(`no og:image: ${rel}`);
  if ((rel.startsWith('en/') || rel.startsWith('de/')) && !has(/hreflang=/))
    errors.push(`no hreflang: ${rel}`);

  // ---- breadcrumb policy: 0 on home pages, exactly 1 on subpages
  const crumbCount = (html.match(/aria-label="Breadcrumb"/g) || []).length;
  if (isHome && crumbCount > 0) errors.push(`breadcrumbs on homepage: ${rel} (${crumbCount})`);
  if (!isHome && (rel.startsWith('en/') || rel.startsWith('de/')) && crumbCount !== 1)
    errors.push(`breadcrumb count ${crumbCount} (want 1): ${rel}`);
}

// ---------------------------------------------------------------- orphans
for (const p of pages) {
  const rel = relative(ROOT, p);
  if (['index.html', '404.html'].includes(rel)) continue;
  if ((inbound.get(p) || 0) === 0) errors.push(`orphan (no inbound links): ${rel}`);
}

// ---------------------------------------------------------------- EN/DE parity
// DE slugs that legitimately differ from their EN twin.
const localizedMap = {
  'privacy': 'datenschutz',
  'terms': 'nutzungsbedingungen',
  'disclaimer': 'haftungsausschluss',
  'code-of-conduct': 'verhaltenskodex',
  'imprint': 'impressum',
  'method': 'methode',
  'trust': 'sicherheit',
  'contact': 'kontakt',
  'industries': 'branchen',
  'industries/treuhand-accounting': 'branchen/treuhand',
  'industries/finance-teams': 'branchen/finanzteams',
  'industries/professional-services': 'branchen/dienstleister',
  'services/finance-automation': 'services/finanzen-automatisierung',
  'services/data-quality': 'services/datenqualitaet',
};
const norm = (p) => relative(ROOT, p).replace(/\/index\.html$/, '').replace(/\.html$/, '');
const enPages = new Set(pages.map(norm).filter((p) => p.startsWith('en/')).map((p) => p.slice(3)));
const dePages = new Set(pages.map(norm).filter((p) => p.startsWith('de/')).map((p) => p.slice(3)));
for (const p of enPages) {
  if (p.startsWith('blog/')) continue; // blog slugs differ; paired via translationKey
  if (!dePages.has(p) && !dePages.has(localizedMap[p])) errors.push(`EN page without DE twin: en/${p}`);
}
const deLocalized = new Set(Object.values(localizedMap));
for (const p of dePages) {
  if (p.startsWith('blog/')) continue;
  if (!enPages.has(p) && !deLocalized.has(p)) errors.push(`DE page without EN twin: de/${p}`);
}

// ---------------------------------------------------------------- sitemap
const sitemapPath = join(ROOT, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  errors.push('sitemap.xml missing');
} else {
  const sm = await readFile(sitemapPath, 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const locPaths = new Set(locs.map((l) => l.replace(/^https?:\/\/(www\.)?eflury\.com/, '')));
  for (const l of locPaths) {
    const cands = resolveInternal(l);
    if (!cands?.some((c) => existsSync(c))) errors.push(`sitemap loc has no file: ${l}`);
  }
  for (const p of pages) {
    const rel = relative(ROOT, p);
    if (['index.html', '404.html'].includes(rel)) continue;
    const urlPath = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
    if (!locPaths.has(urlPath)) errors.push(`page not in sitemap: ${rel}`);
  }
}

// ---------------------------------------------------------------- expected files
for (const f of ['en/rss.xml', 'de/rss.xml', 'robots.txt']) {
  if (!existsSync(join(ROOT, f))) errors.push(`expected file missing: ${f}`);
}

// ---------------------------------------------------------------- token discipline (warn-only ratchet)
if (existsSync(SRC)) {
  const srcFiles = await findFiles(SRC, ['.astro'], [], SRC);
  const hexRe = /#[0-9a-fA-F]{3,8}\b/g;
  const perFile = [];
  for (const f of srcFiles) {
    const text = await readFile(f, 'utf8');
    const styles = [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
    const hits = (styles.match(hexRe) || []).length;
    if (hits > 0) perFile.push(`${relative(SRC, f)}: ${hits}`);
  }
  if (perFile.length) {
    warnings.push(`raw hex colors in <style> blocks (use tokens from global.css; do not add new ones):`);
    warnings.push(...perFile.map((s) => `  ${s}`));
  }
}

// ---------------------------------------------------------------- report
console.log(`audited: ${ROOT}`);
console.log(`pages: ${pages.length}`);
if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.filter((w) => w.startsWith('  ')).length}):`);
  for (const w of warnings) console.log(`  ${w}`);
}
if (errors.length) {
  console.log(`\nERRORS (${errors.length}):`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  process.exit(1);
}
console.log('\n✓ audit clean');
