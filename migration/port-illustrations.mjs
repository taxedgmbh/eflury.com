#!/usr/bin/env node
/**
 * Port the illustration components from Astro to React.
 *
 * These are 14 hand-drawn SVGs Emanuel built — one per page — and the first
 * rebuild missed the whole directory. They are converted, not redrawn: geometry,
 * timing and token names are untouched, and only the mechanical differences
 * between Astro and JSX are resolved.
 *
 *   - Astro frontmatter is stripped, but any data defined there (label arrays,
 *     coordinates) is carried into the component body, because several of the
 *     illustrations drive their geometry from it.
 *   - `lang` was the only prop, so `de ? 'Deutsch' : 'English'` collapses to the
 *     German branch and the prop disappears. The site is German-only.
 *   - SVG attribute names become camelCase.
 *   - `<style>` blocks move inside the component, so the animation and
 *     reduced-motion rules travel with the artwork.
 *
 * Run: node migration/port-illustrations.mjs
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'astro-src/src/components/illustrations';
const OUT = 'src/components/illustrations';

const ATTRS = {
  'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity',
  'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin', 'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset', 'stroke-opacity': 'strokeOpacity',
  'fill-opacity': 'fillOpacity', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule',
  'clip-path': 'clipPath', 'font-size': 'fontSize', 'font-weight': 'fontWeight',
  'font-family': 'fontFamily', 'text-anchor': 'textAnchor',
  'letter-spacing': 'letterSpacing', 'dominant-baseline': 'dominantBaseline',
  'marker-end': 'markerEnd', 'marker-start': 'markerStart',
  'gradientUnits': 'gradientUnits', 'patternUnits': 'patternUnits',
  'class': 'className', 'xlink:href': 'xlinkHref',
};

function toJsx(markup) {
  let out = markup;
  for (const [a, b] of Object.entries(ATTRS)) {
    out = out.replace(new RegExp(`(?<=\\s)${a.replace(':', '\\:')}=`, 'g'), `${b}=`);
  }
  // HTML comments are not valid JSX children
  out = out.replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/* ${c.trim().replace(/\*\//g, '*\\/')} */}`);
  return out;
}

/** German-only: `de ? 'x' : 'y'` keeps the German branch. */
function resolveLang(text) {
  let prev;
  do {
    prev = text;
    text = text.replace(
      /\bde\s*\?\s*(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\s*:\s*(?:`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g,
      '$1'
    );
  } while (text !== prev);
  return text;
}

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => f.endsWith('.astro'));
const vars = new Set();
let ported = 0;

for (const file of files) {
  const name = file.replace('.astro', '');
  const raw = readFileSync(join(SRC, file), 'utf8');

  const fmEnd = raw.indexOf('---', 3);
  const frontmatter = raw.startsWith('---') ? raw.slice(3, fmEnd) : '';
  let body = raw.startsWith('---') ? raw.slice(fmEnd + 3) : raw;

  // pull the <style> block out of the markup
  let css = '';
  body = body.replace(/<style>([\s\S]*?)<\/style>/g, (_, c) => {
    css += c;
    return '';
  });

  // keep frontmatter data, drop Astro plumbing
  const kept = frontmatter
    .split('\n')
    .filter((l) => {
      const t = l.trim();
      if (!t) return false;
      if (t.startsWith('import ')) return false;
      if (t.startsWith('interface Props')) return false;
      if (t.startsWith('lang:') || t === '}') return false;
      if (t.includes('Astro.props')) return false;
      if (t.startsWith('const de =')) return false;
      if (t.startsWith('/**') || t.startsWith('*') || t.startsWith('*/')) return false;
      return true;
    })
    .join('\n');

  const usesBrand = /<IllustrationBrand/.test(body);
  body = toJsx(resolveLang(body)).trim();
  const data = resolveLang(kept).trim();

  for (const m of raw.matchAll(/var\((--[a-z0-9-]+)\)/g)) vars.add(m[1]);

  const doc = (raw.match(/\/\*\*([\s\S]*?)\*\//) || [, ''])[1]
    .split('\n').map((l) => l.replace(/^\s*\*?\s?/, '').trimEnd())
    .filter(Boolean).join('\n * ');

  if (name === 'IllustrationBrand') {
    writeFileSync(join(OUT, `${name}.tsx`), `/**
 * ${doc}
 */
export function IllustrationBrand({ x, y }: { x: number; y: number }) {
  return (
    ${toJsx(body)}
  );
}
`);
    ported++;
    continue;
  }

  writeFileSync(join(OUT, `${name}.tsx`), `${usesBrand ? "import { IllustrationBrand } from './IllustrationBrand';\n\n" : ''}/**
 * ${doc}
 *
 * Ported from ${file}. Geometry and timing unchanged; the lang prop is gone
 * because the site is German-only, so its label ternaries resolve to German.
 */
export function ${name}() {
${data ? `  ${data.split('\n').join('\n  ')}\n` : ''}  return (
    <>
${css.trim() ? `      <style>{\`${css.trim().replace(/`/g, '\\`')}\`}</style>\n` : ''}      ${body.split('\n').join('\n      ')}
    </>
  );
}
`);
  ported++;
}

console.log(`ported ${ported} illustration(s)`);
console.log(`css variables referenced: ${[...vars].sort().join(' ')}`);
