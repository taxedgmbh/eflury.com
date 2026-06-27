import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Emanuel Flury'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'de']),
    draft: z.boolean().default(false),
    // Shared key linking an EN post to its DE counterpart (and vice versa).
    translationKey: z.string().optional(),
  }),
});

export const collections = { blog };
