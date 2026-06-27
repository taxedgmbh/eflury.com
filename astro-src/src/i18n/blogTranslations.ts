/**
 * Blog Translation Utility
 *
 * Resolves the EN <-> DE counterpart of a blog post from the shared
 * `translationKey` frontmatter field, so the pairing has a single source of
 * truth (post frontmatter) rather than a separately-maintained slug map.
 *
 * Two posts are translations of each other when they share the same
 * `translationKey` and have different `lang` values.
 */

import { getCollection } from 'astro:content';
import type { Language } from './utils';

/**
 * Get the slug (id) of the translated version of a blog post.
 * @param currentSlug - The id of the current blog post
 * @param currentLang - The language of the current blog post
 * @param targetLang - The target language to switch to
 * @returns The id of the translated post, or null if not found
 */
export async function getTranslatedBlogSlug(
  currentSlug: string,
  currentLang: Language,
  targetLang: Language
): Promise<string | null> {
  if (currentLang === targetLang) {
    return currentSlug;
  }

  const allPosts = await getCollection('blog');

  const currentPost = allPosts.find((post) => post.id === currentSlug);
  if (!currentPost?.data.translationKey) {
    return null;
  }

  const translatedPost = allPosts.find(
    (post) =>
      post.data.translationKey === currentPost.data.translationKey &&
      post.data.lang === targetLang
  );

  return translatedPost ? translatedPost.id : null;
}

/**
 * Get the language switch URL for a blog post.
 * Falls back to the blog index in the target language when no translation exists.
 */
export async function getBlogLanguageSwitchUrl(
  currentSlug: string,
  currentLang: Language,
  targetLang: Language
): Promise<string> {
  const translatedSlug = await getTranslatedBlogSlug(
    currentSlug,
    currentLang,
    targetLang
  );

  if (translatedSlug) {
    return `/${targetLang}/blog/${translatedSlug}`;
  }

  return `/${targetLang}/blog`;
}
