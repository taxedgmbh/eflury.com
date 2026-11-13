import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import type { Lang } from './i18n';

/*
 * Notes: short articles, one Markdown file each.
 *   English: content/notes/<slug>.md     -> /en/notes/<slug>/
 *   German:  content/notes/de/<slug>.md  -> /de/notizen/<slug>/
 *   French:  content/notes/fr/<slug>.md  -> /fr/notes/<slug>/
 *
 * Front matter:
 *   title:       required
 *   description: required, one or two sentences (feed, search results, newsletter preview)
 *   date:        required, YYYY-MM-DD (publication date)
 *   draft:       optional; true keeps the note off the site, the feed and the sitemap
 *   en:          German and French notes: slug of the English original (language switch, hreflang)
 */
const DIRS: Record<Lang, string> = {
  en: path.join(process.cwd(), 'content', 'notes'),
  de: path.join(process.cwd(), 'content', 'notes', 'de'),
  fr: path.join(process.cwd(), 'content', 'notes', 'fr'),
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
  /** Slug of the same note in each language that has it (including this one). */
  twins: Partial<Record<Lang, string>>;
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
  const translations = { de: all('de'), fr: all('fr') };
  // The English slug ties a note to its translations.
  const twinsOf = (enSlug?: string): Partial<Record<Lang, string>> => {
    if (!enSlug) return {};
    const t: Partial<Record<Lang, string>> = {};
    if (all('en').some((n) => n.slug === enSlug)) t.en = enSlug;
    for (const l of ['de', 'fr'] as const) {
      const hit = translations[l].find((n) => n.en === enSlug);
      if (hit) t[l] = hit.slug;
    }
    return t;
  };
  return all(lang)
    .sort((a, b) => b.date.getTime() - a.date.getTime() || a.slug.localeCompare(b.slug))
    .map((n) => ({
      lang: n.lang,
      slug: n.slug,
      title: n.title,
      description: n.description,
      date: n.date,
      body: n.body,
      twins: { ...twinsOf(lang === 'en' ? n.slug : n.en), [lang]: n.slug },
    }));
}

export function getNote(slug: string, lang: Lang = 'en'): Note | undefined {
  return getNotes(lang).find((n) => n.slug === slug);
}
