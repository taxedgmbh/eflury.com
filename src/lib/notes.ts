import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

/*
 * Notes: short articles, one Markdown file each in content/notes/.
 * The file name is the URL: content/notes/why-i-build.md -> /en/notes/why-i-build/.
 *
 * Front matter:
 *   title:       required
 *   description: required, one or two sentences (feed, search results, newsletter preview)
 *   date:        required, YYYY-MM-DD (publication date)
 *   draft:       optional; true keeps the note off the site, the feed and the sitemap
 */
const DIR = path.join(process.cwd(), 'content', 'notes');

const FrontMatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  draft: z.boolean().optional().default(false),
});

export type Note = {
  slug: string;
  title: string;
  description: string;
  date: Date;
  body: string;
};

function read(file: string): Note & { draft: boolean } {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const fm = FrontMatter.parse(data);
  return { slug: file.replace(/\.md$/, ''), ...fm, body: content };
}

/** Published notes, newest first. Drafts are never returned. */
export function getNotes(): Note[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md')
    .map(read)
    .filter((n) => !n.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((n) => ({ slug: n.slug, title: n.title, description: n.description, date: n.date, body: n.body }));
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((n) => n.slug === slug);
}

export const fmtNoteDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
