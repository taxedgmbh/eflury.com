import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const de = JSON.parse(readFileSync('astro-src/src/i18n/de.json', 'utf8'));
const missing = new Set();
const t = (key) => {
  let v = de;
  for (const k of key.split('.')) { v = v?.[k]; }
  if (v === undefined) { missing.add(key); return null; }
  return v;
};

const DIR = 'astro-src/src/pages/de/services';
const files = readdirSync(DIR).filter(f => f.endsWith('.astro') && f !== 'index.astro');
const out = {};
for (const f of files) {
  const src = readFileSync(join(DIR, f), 'utf8');
  const m = src.match(/const serviceData\s*=\s*(\{[\s\S]*?\n\});/);
  if (!m) { console.error('no serviceData in', f); continue; }
  out[f.replace('.astro','')] = new Function('lang','t', `return ${m[1]}`)('de', t);
}
console.log('extracted:', Object.keys(out).length, 'services:', Object.keys(out).join(', '));
console.log('union of keys:', [...new Set(Object.values(out).flatMap(Object.keys))].join(', '));
if (missing.size) { console.log('\nMISSING i18n keys (' + missing.size + '):'); [...missing].slice(0,12).forEach(k=>console.log('  ' + k)); }
writeFileSync('/tmp/services.json', JSON.stringify(out, null, 2));
