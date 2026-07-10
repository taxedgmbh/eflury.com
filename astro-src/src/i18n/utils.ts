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
    home: '/en/',
    about: '/en/#about',
    services: '/en/services/',
    industries: '/en/industries/',
    industriesTreuhand: '/en/industries/treuhand-accounting/',
    industriesFinanceTeams: '/en/industries/finance-teams/',
    industriesProfessionalServices: '/en/industries/professional-services/',
    servicesAiAudit: '/en/services/ai-audit/',
    servicesClaudeSkills: '/en/services/claude-skills/',
    servicesMcpIntegration: '/en/services/mcp-integration/',
    servicesFinanceAutomation: '/en/services/finance-automation/',
    servicesPowerBi: '/en/services/power-bi/',
    servicesDataQuality: '/en/services/data-quality/',
    servicesManagedOps: '/en/services/managed-ai-operations/',
    portfolio: '/en/#portfolio',
    contact: '/en/contact/',
    privacy: '/en/privacy/',
    terms: '/en/terms/',
    cookies: '/en/cookies/',
    disclaimer: '/en/disclaimer/',
    codeOfConduct: '/en/code-of-conduct/',
    imprint: '/en/imprint/',
    trust: '/en/trust/',
    method: '/en/method/',
  },
  de: {
    home: '/de/',
    about: '/de/#about',
    services: '/de/services/',
    industries: '/de/branchen/',
    industriesTreuhand: '/de/branchen/treuhand/',
    industriesFinanceTeams: '/de/branchen/finanzteams/',
    industriesProfessionalServices: '/de/branchen/dienstleister/',
    servicesAiAudit: '/de/services/ki-audit/',
    servicesClaudeSkills: '/de/services/claude-skills/',
    servicesMcpIntegration: '/de/services/mcp-integration/',
    servicesFinanceAutomation: '/de/services/finanzen-automatisierung/',
    servicesPowerBi: '/de/services/power-bi/',
    servicesDataQuality: '/de/services/datenqualitaet/',
    servicesManagedOps: '/de/services/ki-betrieb/',
    portfolio: '/de/#portfolio',
    contact: '/de/kontakt/',
    privacy: '/de/datenschutz/',
    terms: '/de/nutzungsbedingungen/',
    cookies: '/de/cookies/',
    disclaimer: '/de/haftungsausschluss/',
    codeOfConduct: '/de/verhaltenskodex/',
    imprint: '/de/impressum/',
    trust: '/de/sicherheit/',
    method: '/de/methode/',
  },
};
