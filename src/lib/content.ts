import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import { z } from 'zod';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

/**
 * Mirrors the Astro collection schema, minus `lang` (the site is German-only now,
 * so the field is tolerated on legacy files but carries no meaning) and with
 * `image`/`imageAlt` renamed for the redesign.
 *
 * `translationKey` is retained because the frozen redirect map was derived from
 * it; keeping it on the posts keeps that derivation auditable after the fact.
 */
export const postSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Emanuel Flury'),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  translationKey: z.string().optional(),
  draft: z.boolean().default(false),
  lang: z.string().optional(),
});

export type PostFrontmatter = z.infer<typeof postSchema>;
export type Post = PostFrontmatter & { slug: string; body: string };

/**
 * Unlike Astro's `useTranslations`, which returned the key string on a miss and
 * let a broken page ship, this throws. A malformed post fails the build.
 */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const parsed = postSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `Invalid frontmatter in src/content/blog/${file}:\n${z.prettifyError(parsed.error)}`
        );
      }
      return { slug: file.replace(/\.md$/, ''), body: content, ...parsed.data };
    })
  );

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
});

export const getPost = cache(async (slug: string): Promise<Post | undefined> => {
  return (await getAllPosts()).find((p) => p.slug === slug);
});

export const getAllTags = cache(async (): Promise<string[]> => {
  const tags = new Set<string>();
  for (const post of await getAllPosts()) for (const t of post.tags) tags.add(t);
  return [...tags].sort((a, b) => a.localeCompare(b, 'de'));
});

/**
 * URL slug for a tag: lowercased, umlauts transliterated, everything else
 * collapsed to hyphens. Matching is done on this rather than the raw tag, so a
 * change of casing does not move the URL.
 */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Reading time in minutes, German-tuned (~200 wpm for technical prose). */
export function readingTime(body: string): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-CH', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
