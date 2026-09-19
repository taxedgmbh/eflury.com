#!/usr/bin/env node
/**
 * Spell-check the German prose, not the code around it.
 *
 * Running hunspell over source files directly is useless — every className,
 * import path and hex colour comes back as a misspelling. This pulls out only
 * what a visitor reads:
 *
 *   .tsx   JSX text nodes, plus string literals that look like prose
 *   .html  text between tags
 *   .ts    string literal values in the data modules
 *   .md    body prose, minus frontmatter and code blocks
 *
 * "Looks like prose" means: contains a space and at least one German word
 * character, and is not a class attribute, URL, or import specifier. A one-word
 * literal like 'sunken' is a prop value, not copy.
 *
 * Usage: node scripts/spellcheck.mjs <file|dir> …
 */
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execFileSync } from 'node:child_process';

/** Technical vocabulary and proper nouns the dictionary cannot be expected to know. */
const ALLOW = new Set(
  `Claude Anthropic MCP bexio Zapier Skopa SkopaAI eflury eFlury Flury Emanuel Aaron Taxed
   GmbH Grenchen Solothurn Biel Bern Schweiz UiPath Aberdeen Gartner Power BI Excel SAP
   Slack Workspace Google Microsoft Copilot OpenAI Fortune Deployment Development Discovery
   Optimization Onboarding Dashboard Dashboards Reporting Workshop Workshops Sprints Skill
   Skills Gates Gate Audit Audits Compliance Governance Stack Supports Support Team Teams
   Cloud Firebase Vertex Gemini API APIs URL URLs SEO ROI KPI KPIs CHF MWST revDSG DSG
   DSGVO Act Agentic Agents Automation Framework Frameworks Pipeline Pipelines Prompt
   Prompts Token Tokens Repos Write ups Go No Mahnlauf Treuhand Einzelunternehmen
   Handelsregister Zefix UID CHE Impressum Newsletter Turnstile Resend Hostinger Astro
   Next js TypeScript Python Node npm Git GitHub Effi Initiativbewerbung Lebenslauf
   Kennzahlenbericht Backlog Monitoring Micro Starter Professional Enterprise Method
   Metrics biz LinkedIn WhatsApp Voice KMU KMUs Amortisation
   Managed Operations Remote REMOTE METHODE EFLURY Lifecycle Orbit Console
   Kreditorenerfassung Offertanfragen Switzerland Integrationen Mapping Guide
   Checkliste Playbook Musterbericht Leitfaden Leitfäden`
    .split(/\s+/)
    .filter(Boolean)
);

/**
 * Comments are the dominant false positive: this codebase comments heavily, in
 * English, and every word of it came back flagged against a German dictionary.
 * Strip them before looking for prose.
 */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');
}

/**
 * Is this string something a visitor reads, or is it code?
 *
 * One test for both JSX text nodes and string literals, because both leak the
 * same way. Tailwind values contain brackets — text-[var(--text-muted)] — so a
 * shape test like /^[\w-]+$/ never rejects them; and a JSX text-node pattern
 * that allows newlines will happily capture the attribute block of a multi-line
 * <path>, which is how "strokeLinecap" came to be checked against a German
 * dictionary.
 */
function isProse(v) {
  if (!/\s/.test(v)) return false;
  if (/-\[|var\(|--|calc\(|#[0-9a-f]{3,}|\d(px|rem|vw|vh)/i.test(v)) return false;
  if (/(^|\s)(sm|md|lg|xl|2xl|hover|focus|group|dark|supports|peer|aria|data):/.test(v)) return false;
  if (/^https?:|^\/|^@\/|\.(tsx?|css|svg|png|webp|html|md)$/.test(v)) return false;
  if (/=["']|\/>|<\/|className|strokeW|viewBox/.test(v)) return false;
  // Font stacks read like prose — commas and words — but nobody proofreads them.
  if (/monospace|sans-serif|-apple-system|Helvetica|Segoe|Roboto|SFMono|Menlo/i.test(v)) return false;

  const words = v.trim().split(/\s+/);
  // A run of hyphenated tokens with no sentence punctuation is a utility list.
  const hyphenish = words.filter((w) => /^[a-z][\w]*-/.test(w)).length;
  if (hyphenish >= 2 && !/[.,!?;:]/.test(v)) return false;
  // Real copy has at least two ordinary words in it.
  return words.filter((w) => /^[A-Za-zÄÖÜäöüß’'-]{3,}[.,!?;:]?$/.test(w)).length >= 2;
}

function jsxAndStringProse(raw, { jsx }) {
  const src = stripComments(raw);
  const out = [];

  if (jsx) {
    for (const m of src.matchAll(/>([^<>{}]{3,})</g)) {
      if (isProse(m[1])) out.push(m[1]);
    }
  }

  /*
   * Each quote type gets its own body class, and neither may span a newline. A
   * shared class — [^'"\\] — forbids a double quote inside a single-quoted
   * string, so one apostrophe in the copy shifted every pairing after it and a
   * single "match" swallowed whole blocks of code. Backticks are excluded
   * entirely: a template literal's delimiters are not balanced this way.
   */
  const literals = [
    ...src.matchAll(/'((?:[^'\\\n]|\\.){6,})'/g),
    ...src.matchAll(/"((?:[^"\\\n]|\\.){6,})"/g),
  ];
  for (const m of literals) {
    if (isProse(m[1])) out.push(m[1]);
  }

  return out;
}

function htmlProse(src) {
  return [
    src
      /*
       * code and pre too: the LLM-pipeline case study prints a Python prompt
       * template as a sample, and "PROMPT_BEURTEILEN.format" is not a typo a
       * proofreader should be shown.
       */
      .replace(/<(script|style|svg|code|pre)[\s\S]*?<\/\1>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;|&#\d+;/g, ' '),
  ];
}

function mdProse(src) {
  return [
    src
      .replace(/^---[\s\S]*?^---/m, ' ')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`[^`]*`/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/https?:\/\/\S+/g, ' '),
  ];
}

function extract(file) {
  const src = readFileSync(file, 'utf8');
  switch (extname(file)) {
    case '.tsx':
      return jsxAndStringProse(src, { jsx: true });
    case '.ts':
      return jsxAndStringProse(src, { jsx: false });
    case '.html':
      return htmlProse(src);
    case '.md':
      return mdProse(src);
    default:
      return [];
  }
}

function walk(target) {
  if (statSync(target).isFile()) return [target];
  return readdirSync(target).flatMap((e) => walk(join(target, e)));
}

const files = process.argv
  .slice(2)
  .flatMap(walk)
  .filter((f) => ['.tsx', '.ts', '.html', '.md'].includes(extname(f)))
  .filter((f) => !f.includes('node_modules'));

let total = 0;
for (const file of files) {
  const text = extract(file).join('\n');
  if (!text.trim()) continue;

  const flagged = execFileSync('hunspell', ['-d', 'de_CH', '-l'], {
    input: text,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
    .split('\n')
    // hunspell returns the token as it found it, so a sentence-final word
    // arrives with its full stop attached and then fails every later rule —
    // the hyphen-compound check above all. Trim punctuation first.
    .map((w) => w.trim().replace(/^[^\wÄÖÜäöüß]+|[^\wÄÖÜäöüß]+$/g, ''))
    .filter(Boolean);

  const real = [...new Set(flagged)].filter(
    (w) =>
      !ALLOW.has(w) &&
      !/^\d/.test(w) &&
      // hyphenated compounds: accept if every part is known or allowed
      !w.split('-').every((part) => !part || ALLOW.has(part) || isKnown(part))
  );

  if (real.length) {
    total += real.length;
    console.log(`\n${file}`);
    for (const w of real.sort()) console.log(`  ${w}`);
  }
}

function isKnown(word) {
  try {
    return (
      execFileSync('hunspell', ['-d', 'de_CH', '-l'], { input: word, encoding: 'utf8' }).trim() === ''
    );
  } catch {
    return false;
  }
}

console.log(total ? `\n${total} word(s) to review` : '\nNothing flagged.');
