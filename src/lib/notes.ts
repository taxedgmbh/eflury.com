import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import type { Lang } from './i18n';

/*
 * Notes: short articles, one Markdown file each.
 *   English: content/notes/<slug>.md     -> /en/notes/<slug>/
 *   German:  content/notes/de/<slug>.md  -> /de/notizen/<slug>/
 *
 * Front matter:
 *   title:       required
 *   description: required, one or two sentences (feed, search results, newsletter preview)
 *   date:        required, YYYY-MM-DD (publication date)
 *   draft:       optional; true keeps the note off the site, the feed and the sitemap
 *   en:          German notes only: slug of the English original (language switch, hreflang)
 */
const DIRS: Record<Lang, string> = {
  en: path.join(process.cwd(), 'content', 'notes'),
  de: path.join(process.cwd(), 'content', 'notes', 'de'),
};

const FrontMatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  draft: z.boolean().optional().default(false),
  en: z.string().optional(),
});

export type Note = {
  lang: Lang;
  slug: string;
  title: string;
  description: string;
  date: Date;
  body: string;
  /** Slug of the same note in the other language, if it exists. */
  twin?: string;
};

function read(lang: Lang, file: string) {
  const { data, content } = matter(fs.readFileSync(path.join(DIRS[lang], file), 'utf8'));
  const fm = FrontMatter.parse(data);
  return { lang, slug: file.replace(/\.md$/, ''), ...fm, body: content };
}

function all(lang: Lang) {
  const dir = DIRS[lang];
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md')
    .map((f) => read(lang, f))
    .filter((n) => !n.draft);
}

/** Published notes in one language, newest first. Drafts are never returned. */
export function getNotes(lang: Lang = 'en'): Note[] {
  const de = all('de');
  return all(lang)
    .sort((a, b) => b.date.getTime() - a.date.getTime() || a.slug.localeCompare(b.slug))
    .map((n) => ({
      lang: n.lang,
      slug: n.slug,
      title: n.title,
      description: n.description,
      date: n.date,
      body: n.body,
      twin: lang === 'de' ? n.en : de.find((d) => d.en === n.slug)?.slug,
    }));
}

export function getNote(slug: string, lang: Lang = 'en'): Note | undefined {
  return getNotes(lang).find((n) => n.slug === slug);
}
