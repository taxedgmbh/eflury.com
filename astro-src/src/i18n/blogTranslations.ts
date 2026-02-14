/**
 * Blog Translation Utility
 * Finds the translated version of a blog post based on translationKey
 */

import { getCollection } from 'astro:content';
import type { Language } from './utils';

interface BlogPost {
  slug: string;
  data: {
    translationKey?: string;
    lang: Language;
    [key: string]: any;
  };
}

/**
 * Get the translated slug for a blog post
 * @param currentSlug - The slug of the current blog post
 * @param currentLang - The language of the current blog post
 * @param targetLang - The target language to switch to
 * @returns The slug of the translated post, or null if not found
 */
export async function getTranslatedBlogSlug(
  currentSlug: string,
  currentLang: Language,
  targetLang: Language
): Promise<string | null> {
  // If same language, return current slug
  if (currentLang === targetLang) {
    return currentSlug;
  }

  try {
    // Get all blog posts
    const allPosts = await getCollection('blog');

    // Debug logging
    console.log('[BlogTranslation] Looking for:', currentSlug);
    console.log('[BlogTranslation] Available IDs:', allPosts.map(p => p.id).slice(0, 5));

    // Find the current post (using id, not slug)
    const currentPost = allPosts.find(post => post.id === currentSlug);

    if (!currentPost) {
      console.log('[BlogTranslation] Current post not found');
      return null;
    }

    if (!currentPost.data.translationKey) {
      console.log('[BlogTranslation] No translationKey on current post');
      return null;
    }

    console.log('[BlogTranslation] Current post translationKey:', currentPost.data.translationKey);

    // Find the translated post with the same translationKey but different language
    const translatedPost = allPosts.find(
      post =>
        post.data.translationKey === currentPost.data.translationKey &&
        post.data.lang === targetLang
    );

    console.log('[BlogTranslation] Found translation:', translatedPost?.id || 'none');

    return translatedPost ? translatedPost.id : null;
  } catch (error) {
    console.error('Error finding translated blog post:', error);
    return null;
  }
}

/**
 * Get the language switch URL for a blog post
 * @param currentSlug - The slug of the current blog post
 * @param currentLang - The language of the current blog post
 * @param targetLang - The target language to switch to
 * @returns The URL to switch to, falls back to blog index if translation not found
 */
export async function getBlogLanguageSwitchUrl(
  currentSlug: string,
  currentLang: Language,
  targetLang: Language
): Promise<string> {
  const translatedSlug = await getTranslatedBlogSlug(currentSlug, currentLang, targetLang);

  // If translation found, return the translated blog post URL
  if (translatedSlug) {
    return `/${targetLang}/blog/${translatedSlug}`;
  }

  // Fallback to blog index in target language
  return `/${targetLang}/blog`;
}
