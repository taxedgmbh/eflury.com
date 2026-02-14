import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'de']),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    translationKey: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
