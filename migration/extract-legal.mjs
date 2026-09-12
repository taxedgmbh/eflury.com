import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const PAGES = {
  impressum: 'Impressum',
  datenschutz: 'Datenschutzerklärung',
  nutzungsbedingungen: 'Nutzungsbedingungen',
  cookies: 'Cookie-Richtlinie',
  haftungsausschluss: 'Haftungsausschluss',
  verhaltenskodex: 'Verhaltenskodex',
};

// dl/dt/dd matter: the Impressum's provider details are a definition list, and
// flattening them turns a legally-required UWG notice into a run-on sentence.
const KEEP = new Set(['h2','h3','h4','p','ul','ol','li','strong','em','b','i','a','table','thead','tbody','tr','th','td','blockquote','br','code','dl','dt','dd']);

function clean(html) {
  // SVG is masked out and restored intact: the attribute cleaning below would
  // destroy it, and these pages carry real icons (15 in the privacy policy
  // alone). extract-pages.mjs got this fix; this one had been missed.
  const svgs = [];
  html = html.replace(/<svg[\s\S]*?<\/svg>/gi, (m) => {
    svgs.push(m);
    return `\u0000SVG${svgs.length - 1}\u0000`;
  });

  // drop scripts, styles, nav, header, footer, and the page's own h1
  html = html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, '');
  html = html.replace(/<h1[\s\S]*?<\/h1>/i, '');
  // the in-page "back to home" link is chrome, not content
  html = html.replace(/<a[^>]*href="\/de\/"[^>]*>[\s\S]*?<\/a>/i, '');
  // a stripped <div> should become a paragraph break, not vanish and join its
  // neighbours into one run-on line
  html = html.replace(/<\/div>/gi, '\n\n');
  // strip every attribute except href on <a>
  html = html.replace(/<([a-zA-Z][a-zA-Z0-9]*)((?:\s[^>]*)?)>/g, (m, tag, attrs) => {
    const t = tag.toLowerCase();
    if (!KEEP.has(t)) return '';
    if (t === 'a') {
      const href = attrs.match(/href\s*=\s*"([^"]*)"/i);
      return href ? `<a href="${href[1]}">` : '<a>';
    }
    return `<${t}>`;
  });
  html = html.replace(/<\/([a-zA-Z][a-zA-Z0-9]*)>/g, (m, tag) =>
    KEEP.has(tag.toLowerCase()) ? `</${tag.toLowerCase()}>` : ''
  );
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  html = html.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');

  // Wrap orphan text — content whose wrapper was a <div> we removed — so it
  // renders as a paragraph rather than colliding with the next block.
  html = html
    .split(/\n\n+/)
    .map((chunk) => {
      const t = chunk.trim();
      if (!t) return '';
      if (/^<(p|h[234]|ul|ol|dl|table|blockquote)[\s>]/i.test(t)) return t;
      if (/^<\/(dl|ul|ol|table)>/i.test(t)) return t;
      // a chunk that both starts and ends outside a tag is loose prose
      if (/^</.test(t)) return t;
      return `<p>${t}</p>`;
    })
    .filter(Boolean)
    .join('\n');

  return html
    .trim()
    .replace(/\u0000SVG(\d+)\u0000/g, (_, i) => svgs[Number(i)])
    // after restore: the masked SVG blocks carry the attributes too
    .replace(/\sdata-astro-cid-[\w-]+(?:="[^"]*")?/g, '');
}

for (const [slug, title] of Object.entries(PAGES)) {
  let raw;
  try {
    raw = execSync(`git show phase0/migration-prep:de/${slug}/index.html`, { encoding: 'utf8', maxBuffer: 20e6 });
  } catch { console.error('missing build output for', slug); continue; }

  const main = raw.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) { console.error('no <main> in', slug); continue; }
  const body = clean(main[1]);
  const words = body.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  writeFileSync(`src/content/legal/${slug}.html`, body + '\n');
  console.log(`${slug.padEnd(22)} ${String(words).padStart(5)} words`);
}
