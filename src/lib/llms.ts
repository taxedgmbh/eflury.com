import fs from 'node:fs';
import path from 'node:path';
import { getNotes } from './notes';
import { LANGS, PAGES, type Lang } from './i18n';
import { SITE_URL } from './site';

/*
 * llms.txt (https://llmstxt.org) for AI assistants and answer engines.
 *   /llms.txt       the facts (content/llms.md) plus a generated list of every note
 *   /llms-full.txt  the same, followed by the full text of every note in every language
 * Both are built once per deploy, so a new note appears without editing them.
 */

const LANG_NAME: Record<Lang, string> = { en: 'English', de: 'German (Swiss High German)', fr: 'French (Swiss French)' };
const abs = (p: string) => `${SITE_URL}${p}`;
const noteUrl = (lang: Lang, slug: string) => abs(`${PAGES.notes[lang]}${slug}/`);
const day = (d: Date) => d.toISOString().slice(0, 10);

function facts() {
  return fs.readFileSync(path.join(process.cwd(), 'content', 'llms.md'), 'utf8').trim();
}

function noteList() {
  const out = ['## Notes', ''];
  for (const lang of LANGS) {
    const notes = getNotes(lang);
    if (!notes.length) continue;
    out.push(`### ${LANG_NAME[lang]}`, '');
    for (const n of notes) out.push(`- [${n.title}](${noteUrl(lang, n.slug)}) (${day(n.date)}): ${n.description}`);
    out.push('');
  }
  return out.join('\n').trim();
}

const text = (body: string) =>
  new Response(body.trim() + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });

export function llmsTxt() {
  return text(
    [
      facts(),
      noteList(),
      '## Optional',
      '',
      `- [Full text of every note](${abs('/llms-full.txt')}): all notes in English, German and French as Markdown.`,
    ].join('\n\n'),
  );
}

export function llmsFullTxt() {
  const parts = [facts(), noteList(), '# Full text of the notes'];
  for (const lang of LANGS) {
    for (const n of getNotes(lang)) {
      parts.push(
        [
          '---',
          '',
          `## ${n.title}`,
          '',
          `Source: ${noteUrl(lang, n.slug)}`,
          `Author: Emanuel Flury · Published: ${day(n.date)} · Language: ${LANG_NAME[lang]}`,
          '',
          `> ${n.description}`,
          '',
          n.body.trim(),
        ].join('\n'),
      );
    }
  }
  return text(parts.join('\n\n'));
}
