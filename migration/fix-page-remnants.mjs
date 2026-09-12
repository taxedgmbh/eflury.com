#!/usr/bin/env node
/**
 * Remnants left behind when the extractor strips <form> elements.
 *
 * The Initiativbewerbung page is a form page. With the form gone, what survived
 * was the form's *success state*, rendered unconditionally — every visitor was
 * thanked for an application they never sent. That is worse than a missing
 * form: it reads as a bug to exactly the audience you want to impress.
 *
 * Scripted rather than hand-edited so re-extraction cannot bring it back.
 * Run after voice-to-third-person.mjs.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const EDITS = {
  'src/content/pages/karriere__initiativbewerbung.html': [
    [
      '<h2>Vielen Dank für Ihre Bewerbung!</h2> <p>Ihre Unterlagen sind eingegangen. Sie werden persönlich gelesen und beantwortet — von der Person, die mit Ihnen arbeiten würde.</p>\n',
      '',
    ],
  ],
};

let applied = 0;
const misses = [];
for (const [file, pairs] of Object.entries(EDITS)) {
  let src = readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!src.includes(from)) { misses.push(`${file}: ${from.slice(0, 60)}`); continue; }
    src = src.split(from).join(to);
    applied++;
  }
  writeFileSync(file, src);
}
console.log(`${applied} remnant(s) removed`);
if (misses.length) console.log(`${misses.length} already absent (safe on re-run)`);
