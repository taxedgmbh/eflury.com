#!/usr/bin/env node
/**
 * One-off: shift the extracted service copy from the company "wir" to third
 * person, for the repositioning of eflury.com onto Emanuel personally.
 *
 * A naive pronoun swap corrupts this text, because three different voices use
 * the same words:
 *
 *   1. Quoted client speech — «Wir müssten etwas mit KI machen» — is something a
 *      prospect says, not something Emanuel says.
 *   2. FAQ *questions* are asked by the reader, so "Sind unsere Daten sicher?"
 *      and "Wie viel Zeit kostet es unser Team?" are the client's "wir".
 *   3. Only the remaining prose is Emanuel's voice.
 *
 * German also conjugates, so "wir entwerfen" becomes "er entwirft", not
 * "er entwerfen". Irregulars (entwerfen, übernehmen, helfen) are listed
 * explicitly; the regular -en → -t rule covers the rest.
 *
 * Run: node migration/voice-to-third-person.mjs [--write]
 * Without --write it reports what it would change and what it cannot handle.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const WRITE = process.argv.includes('--write');
const FILES = process.argv.slice(2).filter((a) => a !== '--write');
if (FILES.length === 0) FILES.push('src/data/services.ts');

/** Verbs whose 3rd-person singular is not the regular stem + t. */
const IRREGULAR = {
  entwerfen: 'entwirft',
  übergeben: 'übergibt',
  überprüfen: 'überprüft',
  übernehmen: 'übernimmt',
  helfen: 'hilft',
  sind: 'ist',
  haben: 'hat',
  geben: 'gibt',
  nehmen: 'nimmt',
  sehen: 'sieht',
  laufen: 'lässt laufen',
  wachsen: 'wächst',
  tragen: 'trägt',
  halten: 'hält',
  lassen: 'lässt',
};

/**
 * Phrase-level rewrites, applied before the general rule. These are the cases
 * where a mechanical conjugation would produce stilted or wrong German and the
 * sentence needs restructuring instead.
 */
const PHRASES = [
  ['Wir laufen alte und neue Prozesse parallel, dann schulen wir Ihr Team.',
   'Alte und neue Prozesse laufen eine Zeit lang parallel, danach schult Emanuel Ihr Team.'],
  ['Lassen Sie uns besprechen, wie',
   'Besprechen Sie mit Emanuel, wie'],
  ['Den Rest übernehmen wir',
   'Den Rest übernimmt Emanuel'],
  ['nutzbar mit uns oder mit jedem anderen',
   'nutzbar mit Emanuel oder mit jedem anderen'],
  ['Machen Sie mit uns weiter',
   'Machen Sie mit Emanuel weiter'],
  ['Agenten und wir greifen über MCP-Konnektoren',
   'Agenten und Emanuel greifen über MCP-Konnektoren'],
  ['bevor wir starten', 'bevor die Arbeit beginnt'],
  ['die wir anbieten', 'die Emanuel anbietet'],
  ['Wir schauen Ihre Situation gemeinsam an',
   'Sie gehen Ihre Situation gemeinsam durch'],
  ['Wir schauen gemeinsam auf einen Ihrer Datensätze — und wir sagen Ihnen ehrlich',
   'Sie schauen gemeinsam auf einen Ihrer Datensätze — und Emanuel sagt Ihnen ehrlich'],
  ['Wir gehen den Bericht gemeinsam durch und fällen einen Go/No-Go-Entscheid',
   'Sie gehen den Bericht gemeinsam durch und fällen einen Go/No-Go-Entscheid'],
  ['auf Basis der Zahlen, nicht unseres Eindrucks',
   'auf Basis der Zahlen, nicht eines Bauchgefühls'],
  ['wie alle unsere Arbeit', 'wie die gesamte Arbeit'],
  ['unserer Methode', 'seiner Methode'],
  ['Wir sind spezialisiert auf', 'Emanuel ist spezialisiert auf'],
  ['Sprechen wir über', 'Sprechen Sie mit Emanuel über'],
  ['Fallstudie Meine eigene Firma', 'Fallstudie: die eigene Firma'],
  ['Wie ich meine eigene Treuhandfirma mit Claude AI automatisierte',
   'Wie Emanuel Flury seine eigene Treuhandfirma mit Claude AI automatisierte'],

  // Hand-resolved residuals from the extracted page content. Each needs a
  // clause restructured or an irregular preterite the general rules do not
  // reach, so they are listed rather than guessed at.
  ['entwarf ich Automatisierungen', 'entwarf er Automatisierungen'],
  ['Mit wem ich gearbeitet habe', 'Mit wem er gearbeitet hat'],
  ['Wo wir heute helfen', 'Wo er heute hilft'],
  ['Wenn ich nicht gerade Prozesse automatisiere, finden Sie mich in',
   'Wenn er nicht gerade Prozesse automatisiert, finden Sie ihn in'],
  ['Was wir rund um Reporting', 'Was Emanuel rund um Reporting'],
  ['Was wir rund um Posteingang', 'Was Emanuel rund um Posteingang'],
  ['Was wir in Finanzen', 'Was Emanuel in Finanzen'],
  ['ertrank ich in repetitiver Arbeit', 'ertrank er in repetitiver Arbeit'],
  ['Mir wurde klar, dass ich', 'Ihm wurde klar, dass er'],
  ['kann ich Ihres automatisieren', 'kann er Ihres automatisieren'],
  ['die ich für Taxed GmbH nutzte', 'die er für Taxed GmbH nutzte'],
  ['weil wir Projekte mit Spezialisten besetzen',
   'weil Emanuel Projekte mit Spezialisten besetzt'],
  ['weil wir gute Leute lieber kennenlernen, <em>bevor</em> wir sie brauchen',
   'weil er gute Leute lieber kennenlernt, <em>bevor</em> er sie braucht'],
  ['bevor wir sie brauchen', 'bevor er sie braucht'],
  ['<h2>Wie wir arbeiten</h2>', '<h2>Wie Emanuel arbeitet</h2>'],
  // A CTA addressed to the reader: the object is Emanuel, not a company "us".
  ['Kontaktieren Sie uns</a>', 'Kontaktieren Sie ihn</a>'],
  ['bei uns wie in', 'bei ihm wie in'],
  ['melden uns, sobald', 'meldet sich, sobald'],
  // reflexive: "auf den wir uns stützen" -> "auf den er sich stützt"
  ['Jeder Dienst, auf den wir uns stützen, ist auf unserer Seite Sicherheit & Vertrauen offengelegt.',
   'Jeder Dienst, auf den er sich stützt, ist auf der Seite Sicherheit & Vertrauen offengelegt.'],
];

/** Pronouns, applied after verbs so "übernehmen wir" is already gone. */
const PRONOUNS = [
  [/\bmit uns\b/g, 'mit Emanuel'],
  [/\bunsere\b/g, 'seine'],
  [/\bunserer\b/g, 'seiner'],
  [/\bunseren\b/g, 'seinen'],
  [/\bunseres\b/g, 'seines'],
  [/\bunserem\b/g, 'seinem'],
  [/\bunser\b/g, 'sein'],
  [/\bUnsere\b/g, 'Seine'],
  [/\bUnser\b/g, 'Sein'],
];

function conjugate(verb) {
  if (IRREGULAR[verb]) return IRREGULAR[verb];
  // -eln / -ern verbs drop only the final n: entwickeln -> entwickelt
  if (/[el]n$/.test(verb) && /(eln|ern)$/.test(verb)) return `${verb.slice(0, -1)}t`;
  const stem = verb.replace(/en$/, '');
  // stems ending in d/t take -et (arbeiten -> arbeitet)
  if (/[dt]$/.test(stem)) return `${stem}et`;
  return `${stem}t`;
}

/**
 * First person singular -> third person. Preterite ("ich startete") and modals
 * ("ich kann") are already identical in both persons, so only the present tense
 * of regular and strong verbs needs mapping.
 */
const ICH_TO_ER = {
  habe: 'hat', bin: 'ist', werde: 'wird', weiss: 'weiss', weiß: 'weiß',
  sehe: 'sieht', gebe: 'gibt', nehme: 'nimmt', lese: 'liest', spreche: 'spricht',
  helfe: 'hilft', laufe: 'läuft', fahre: 'fährt', halte: 'hält', lasse: 'lässt',
  trage: 'trägt', esse: 'isst', vergesse: 'vergisst', empfehle: 'empfiehlt',
  treffe: 'trifft', breche: 'bricht', tue: 'tut', mache: 'macht',
  // modals and preterite forms are unchanged in the third person
  kann: 'kann', will: 'will', muss: 'muss', soll: 'soll', mag: 'mag', darf: 'darf',
  wollte: 'wollte', konnte: 'konnte', musste: 'musste', wusste: 'wusste',
  hatte: 'hatte', war: 'war', wurde: 'wurde', sah: 'sah', ging: 'ging',
  kam: 'kam', fand: 'fand', begann: 'begann', baute: 'baute', startete: 'startete',
};

function ichToEr(verb) {
  if (ICH_TO_ER[verb]) return ICH_TO_ER[verb];
  if (/te$/.test(verb)) return verb;            // preterite: identical
  if (/[dt]e$/.test(verb)) return `${verb}t`;   // arbeite -> arbeitet
  if (/e$/.test(verb)) return `${verb.slice(0, -1)}t`; // mache -> macht
  return null;                                   // unknown: leave for review
}

const MEIN = [
  [/\bmeines\b/g, 'seines'], [/\bmeinem\b/g, 'seinem'], [/\bmeinen\b/g, 'seinen'],
  [/\bmeiner\b/g, 'seiner'], [/\bmeine\b/g, 'seine'], [/\bmein\b/g, 'sein'],
  [/\bMeines\b/g, 'Seines'], [/\bMeinem\b/g, 'Seinem'], [/\bMeinen\b/g, 'Seinen'],
  [/\bMeiner\b/g, 'Seiner'], [/\bMeine\b/g, 'Seine'], [/\bMein\b/g, 'Sein'],
  [/\bmir\b/g, 'ihm'], [/\bmich\b/g, 'ihn'],
];

/** Matches -en, -eln and -ern infinitives. */
const VERB = '[a-zäöüß]+(?:eln|ern|en)';

/**
 * Regions that are never Emanuel's voice and must survive untouched:
 *
 *   «…»                 quoted client speech.
 *   <figure>…</figure>  verbatim sample output. The LLM-pipeline case study
 *                       prints generated dunning letters and states they are
 *                       "unveraendert, wie das Modell sie abgelegt hat". Those
 *                       letters say "wir" and "auf unser Konto" because a
 *                       creditor wrote them — rewriting them would make the
 *                       case study untrue.
 *   "…"                 short quoted phrases, e.g. statt "Kontaktieren Sie
 *                       uns". HTML files only: in the TS data file double
 *                       quotes are string delimiters, not quotation.
 */
function withProtectedRegions(text, fn, { protectDoubleQuotes = false, protectQuestions = false } = {}) {
  const saved = [];
  // The sentinel must not occur in prose. A bare number in spaces does: the
  // text contains "13 Jahre" and "10 Tage", which the restore step then
  // replaced with undefined.
  const stash = (m) => {
    saved.push(m);
    return `\u0000${saved.length - 1}\u0000`;
  };

  // <blockquote> is attributed speech. "Bevor ich meinen Kunden Automatisierung
  // predige, automatisierte ich mein eigenes Geschäft." is signed by Emanuel, and
  // a signed quote stays in the speaker's own words even on a third-person page.
  let masked = text
    .replace(/<svg[\s\S]*?<\/svg>/gi, stash)
    .replace(/<figure[\s\S]*?<\/figure>/gi, stash)
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, stash)
    .replace(/«[^»]*»/g, stash);
  if (protectDoubleQuotes) masked = masked.replace(/"[^"]{1,120}"/g, stash);

  // Interrogatives are the reader speaking. "Brauche ich technisches Know-how in
  // meinem Team?" and "Kann ich in Raten zahlen?" are questions a prospect asks,
  // so their "ich" and "mein" mean the client, not Emanuel. Protect any sentence
  // ending in a question mark — this used to be handled per line, which stopped
  // working once HTML began to be processed whole.
  if (protectQuestions) {
    masked = masked.replace(
      /(?:<(h[234]|p|summary|strong)>)?[^<>?]{4,180}\?(?:<\/\1>)?/g,
      (m) => (/\b(ich|mein\w*|mir|mich|wir|uns|unser\w*)\b/i.test(m) ? stash(m) : m)
    );
  }

  return fn(masked).replace(/\u0000(\d+)\u0000/g, (_, i) => saved[Number(i)]);
}

function toThirdPerson(text, opts) {
  return withProtectedRegions(text, (t) => {
    for (const [from, to] of PHRASES) t = t.split(from).join(to);

    // "Wir <verb>en ..." at the start of a clause -> "Emanuel <verb>t ..."
    t = t.replace(new RegExp(`(^\\s*|["“(>]\\s*|[.:;!?]\\s+|—\\s+)Wir\\s+(${VERB})\\b`, 'g'), (m, lead, verb) =>
      `${lead}Emanuel ${conjugate(verb)}`
    );
    // relative clauses: "die wir für Sie bauen" -> "die er für Sie baut";
    // the verb sits at the end of the clause, after intervening words
    t = t.replace(
      // The middle group must end on a word boundary. Without the required
      // space it could stop mid-word — "Wie wir in Projekten ... arbeiten"
      // matched mid="in P" and verb="rojekten", producing "in P rojektet".
      new RegExp(
        `\\b(die|das|was|den|dem|wie|Was|Wie|Die|Das)\\s+wir\\s+(?:([^,.;!?]{0,60}?)\\s+)?(${VERB})\\b`,
        'g'
      ),
      (m, rel, mid, verb) =>
        `${rel} ${/^[A-Z]/.test(rel) ? 'Emanuel' : 'er'} ${mid ? mid + ' ' : ''}${conjugate(verb)}`
    );
    // remaining lowercase "wir <verb>en"
    t = t.replace(new RegExp(`\\bwir\\s+(${VERB})\\b`, 'g'), (m, verb) => `Emanuel ${conjugate(verb)}`);
    // perfect: "was wir gebaut haben" -> "was er gebaut hat"
    t = t.replace(/\bwir\s+(ge[a-zäöüß]+)\s+haben\b/g, (m, part) => `er ${part} hat`);
    t = t.replace(/\bohne uns\b/g, 'ohne Emanuel');

    // trailing "..., schulen wir" style inversions
    t = t.replace(new RegExp(`\\b(${VERB})\\s+wir\\b`, 'g'), (m, verb) => `${conjugate(verb)} Emanuel`);

    for (const [rx, to] of PRONOUNS) t = t.replace(rx, to);

    // "Ich habe ..." -> "Emanuel hat ..."; unknown verbs are left in place so
    // the leftover report surfaces them instead of guessing.
    // "meine" is both a verb form and a possessive; after "ich" in this corpus
    // it is always the possessive ("wie ich meine eigene Firma automatisierte"),
    // so it must not be conjugated into "meint".
    const POSSESSIVE = /^(mein|meine|meinen|meinem|meiner|meines)$/;
    t = t.replace(/\b(Ich|ich)\s+([a-zäöüß]+)\b/g, (m, _p, verb) => {
      if (POSSESSIVE.test(verb)) return `Emanuel ${verb}`;
      const third = ichToEr(verb);
      return third ? `Emanuel ${third}` : m;
    });
    // inversions: "..., sagte ich" -> "..., sagte Emanuel"
    t = t.replace(/\b([a-zäöüß]+te)\s+ich\b/g, (m, verb) => `${verb} Emanuel`);
    for (const [rx, to] of MEIN) t = t.replace(rx, to);

    return t;
  }, opts);
}

/**
 * A question is the reader's voice, whether it arrives as a JSON "question"
 * field in the service data or as an interrogative heading in extracted page
 * HTML. Either way its "wir" means the client, so it is left alone.
 */
function isReaderQuestion(line) {
  if (/^\s*"?question"?:/.test(line)) return true;
  const text = line.replace(/<[^>]*>/g, ' ').trim();
  return /\?\s*$/.test(text) && /\b(wir|uns|unser\w*)\b/i.test(text);
}

// ---------------------------------------------------------------------------
let totalChanged = 0;
const allLeftovers = [];

for (const file of FILES) {
  const isHtml = file.endsWith('.html');
  const opts = { protectDoubleQuotes: isHtml, protectQuestions: isHtml };
  // HTML is processed as one unit: <figure> sample output spans several lines,
  // and line-by-line masking would expose its interior to the rules.
  const raw = readFileSync(file, 'utf8');
  const lines = isHtml ? [raw] : raw.split('\n');
  let changed = 0;

  const out = lines.map((line) => {
    if (isReaderQuestion(line)) return line;
    if (!/\b(Wir|wir|uns|unser\w*|Unser\w*|Ich|ich|mir|mich|mein\w*)\b/.test(line)) return line;

    const next = toThirdPerson(line, opts);
    if (next !== line) changed++;
    const bare = next
      .replace(/<figure[\s\S]*?<\/figure>/gi, '')
      .replace(/«[^»]*»/g, '')
      .replace(isHtml ? /"[^"]{1,120}"/g : /(?!)/g, '');
    if (/\b(Wir|wir|uns|unser\w*|Unser\w*|Ich|ich|mir|mich|mein\w*)\b/.test(bare)) {
      allLeftovers.push(`${file}: ${next.trim().slice(0, 130)}`);
    }
    return next;
  });

  if (changed) console.log(`  ${file}: ${changed} line(s)`);
  totalChanged += changed;
  if (WRITE) writeFileSync(file, isHtml ? out[0] : out.join('\n'));
}

console.log(`\n${totalChanged} line(s) rewritten across ${FILES.length} file(s)`);
if (allLeftovers.length) {
  console.log(`\n${allLeftovers.length} line(s) still contain first-person-plural — review by hand:`);
  for (const l of allLeftovers) console.log(`  · ${l}`);
}
if (!WRITE) console.log('\n(dry run — pass --write to apply)');
