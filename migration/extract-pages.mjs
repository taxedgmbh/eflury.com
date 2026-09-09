#!/usr/bin/env node
/**
 * Extract the German prose from the built Astro output for the remaining
 * content pages, the same way the legal pages were done.
 *
 * The source .astro files are 400–2,185 lines each and are mostly scoped CSS we
 * are discarding, so the built HTML is the cleaner input: it has the final
 * structure with no Astro directives. Attributes are stripped and semantics kept.
 *
 * Run from a checkout that still has the built /de tree (branch
 * phase0/migration-prep), which is why it reads through `git show`.
 */
import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const REF = 'phase0/migration-prep';
const PAGES = [
  'about', 'methode', 'sicherheit', 'leitfaeden', 'skopaai', 'pricing',
  'kontakt', 'karriere', 'karriere/initiativbewerbung',
  'branchen/dienstleister', 'branchen/finanzteams', 'branchen/reporting-daten',
  'case-studies/taxed-gmbh', 'case-studies/finance-automation',
  'case-studies/power-bi-reporting', 'case-studies/llm-pipeline-showcase',
];

const KEEP = new Set(['h2','h3','h4','p','ul','ol','li','strong','em','b','i','a',
  'table','thead','tbody','tr','th','td','blockquote','br','code','dl','dt','dd','figure','figcaption']);

function clean(html) {
  html = html.replace(/<(script|style|noscript|svg|form|button|iframe)[\s\S]*?<\/\1>/gi, '');
  html = html.replace(/<h1[\s\S]*?<\/h1>/i, '');
  html = html.replace(/<a[^>]*href="\/de\/"[^>]*>[\s\S]*?<\/a>/i, '');
  html = html.replace(/<\/(div|section|article|header|footer|aside)>/gi, '\n\n');
  html = html.replace(/<([a-zA-Z][a-zA-Z0-9]*)((?:\s[^>]*)?)\/?>/g, (m, tag, attrs) => {
    const t = tag.toLowerCase();
    if (!KEEP.has(t)) return '';
    if (t === 'a') {
      const href = attrs.match(/href\s*=\s*"([^"]*)"/i);
      if (!href) return '<a>';
      // internal links keep working; external ones keep their host
      return `<a href="${href[1]}">`;
    }
    return `<${t}>`;
  });
  html = html.replace(/<\/([a-zA-Z][a-zA-Z0-9]*)>/g, (m, tag) =>
    KEEP.has(tag.toLowerCase()) ? `</${tag.toLowerCase()}>` : ''
  );
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  html = html.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');

  return html
    .split(/\n\n+/)
    .map((chunk) => {
      const t = chunk.trim();
      if (!t) return '';
      if (/^</.test(t)) return t;
      return `<p>${t}</p>`;
    })
    .filter(Boolean)
    .join('\n')
    .trim();
}

mkdirSync('src/content/pages', { recursive: true });
let total = 0;
for (const page of PAGES) {
  let raw;
  try {
    raw = execSync(`git show ${REF}:de/${page}/index.html`, { encoding: 'utf8', maxBuffer: 40e6 });
  } catch { console.error('  MISSING build output:', page); continue; }

  const main = raw.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) { console.error('  no <main>:', page); continue; }

  const body = clean(main[1]);
  const words = body.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const file = `src/content/pages/${page.replace(/\//g, '__')}.html`;
  writeFileSync(file, body + '\n');
  console.log(`  ${page.padEnd(34)} ${String(words).padStart(5)} words`);
  total += words;
}
console.log(`\n${total} words extracted across ${PAGES.length} pages`);
