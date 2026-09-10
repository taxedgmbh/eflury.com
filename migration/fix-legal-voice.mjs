#!/usr/bin/env node
/**
 * Hand-resolved voice fixes for the legal pages.
 *
 * A mechanical third-person conversion is wrong for this genre — a cookie
 * policy reading "Besucher seine Website" is an error, not a style. These are
 * resolved toward the passive or the entity name instead, and the now-vestigial
 * definitional clauses are dropped because the body no longer says "wir".
 *
 * Scripted rather than applied by hand so re-extraction does not silently lose
 * them, which is exactly what happened once already.
 *
 * Run after voice-to-third-person.mjs and update-legal-for-new-stack.mjs.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FIXES = {
  'cookies.html': [
    ['Helfen uns zu verstehen, wie Besucher seine Website nutzen',
     'Helfen zu verstehen, wie Besucher diese Website nutzen'],
    ['Diese Cookies helfen uns zu verstehen, wie Besucher mit seiner Website interagieren',
     'Diese Cookies helfen zu verstehen, wie Besucher mit dieser Website interagieren'],
    ['Bei Fragen zur Verwendung von Cookies kontaktieren Sie uns bitte:',
     'Bei Fragen zur Verwendung von Cookies wenden Sie sich bitte an:'],
    [/wie Emanuel Flury \((?:&quot;|")wir(?:&quot;|"), (?:&quot;|")uns(?:&quot;|") oder (?:&quot;|")unser(?:&quot;|")\)/, 'wie Emanuel Flury'],
  ],
  'datenschutz.html': [
    ['oder rufen Sie uns an', 'oder rufen Sie an'],
    ['welche Daten wir über Sie bearbeiten', 'welche Daten über Sie bearbeitet werden'],
    ['Wir speichern Chatverläufe nicht', 'Chatverläufe werden nicht gespeichert'],
    ['Wir behalten Daten nur, solange', 'Daten werden nur so lange aufbewahrt, wie'],
  ],
  'haftungsausschluss.html': [
    ['Solche externen Links werden von uns nicht auf Genauigkeit',
     'Solche externen Links werden nicht auf Genauigkeit'],
    ['Bei Fragen zu diesem Haftungsausschluss kontaktieren Sie uns bitte:',
     'Bei Fragen zu diesem Haftungsausschluss wenden Sie sich bitte an:'],
    [/\((?:&quot;|")wir(?:&quot;|"), (?:&quot;|")uns(?:&quot;|") oder (?:&quot;|")unser(?:&quot;|")\)/, ''],
  ],
  'impressum.html': [
    ['Welche Daten wir wie bearbeiten, steht in der',
     'Welche Daten wie bearbeitet werden, steht in der'],
  ],
  'nutzungsbedingungen.html': [
    ['dass er berechtigt ist, uns die bereitgestellten Daten',
     'dass er berechtigt ist, die bereitgestellten Daten'],
    [/Die von Emanuel Flury \((?:&quot;|")wir(?:&quot;|"), (?:&quot;|")uns(?:&quot;|") oder (?:&quot;|")unser(?:&quot;|")\)/, 'Die von Emanuel Flury'],
    [/Keltenweg 4, 2540 Grenchen \(«wir»\)\. Seine Angebote/, 'Keltenweg 4, 2540 Grenchen. Seine Angebote'],
  ],
  'verhaltenskodex.html': [
    ['auch wenn es uns den Auftrag kostet', 'auch wenn es den Auftrag kostet'],
  ],
};

let applied = 0;
const misses = [];
for (const [file, pairs] of Object.entries(FIXES)) {
  const path = `src/content/legal/${file}`;
  let src = readFileSync(path, 'utf8');
  for (const [from, to] of pairs) {
    const before = src;
    src = typeof from === 'string' ? src.split(from).join(to) : src.replace(from, to);
    if (src === before) misses.push(`${file}: ${String(from).slice(0, 62)}`);
    else applied++;
  }
  writeFileSync(path, src.replace(/  +/g, ' '));
}

console.log(`${applied} fix(es) applied`);
if (misses.length) {
  console.log(`\n${misses.length} pattern(s) did not match:`);
  for (const m of misses) console.log(`  · ${m}`);
}
