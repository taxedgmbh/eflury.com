// i18n utility functions for Astro
import en from './en.json';
import de from './de.json';

export type Language = 'en' | 'de';

export const languages = {
  en,
  de,
};

export const defaultLang: Language = 'en';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = languages[lang];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    // Replace {year} placeholder with current year
    if (typeof value === 'string') {
      return value.replace('{year}', new Date().getFullYear().toString());
    }

    return value || key;
  };
}

export const routes = {
  en: {
    home: '/en',
    services: '/en#services',
    portfolio: '/en#portfolio',
    blog: '/en#blog',
    contact: '/en#contact',
    privacy: '/en/privacy.html',
    terms: '/en/terms.html',
    cookies: '/en/cookies.html',
  },
  de: {
    home: '/de',
    services: '/de#services',
    portfolio: '/de#portfolio',
    blog: '/de#blog',
    contact: '/de#contact',
    privacy: '/de/privacy.html',
    terms: '/de/terms.html',
    cookies: '/de/cookies.html',
  },
};
