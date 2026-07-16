/**
 * Curated topic grouping for the blog/insights hub.
 *
 * Topics are assigned explicitly by translationKey (not derived from tags —
 * tags are per-language and too noisy to filter on). When adding a new post
 * pair, add its translationKey here; unmapped posts fall back to 'strategy'.
 */

export type TopicKey = 'strategy' | 'treuhand' | 'practice' | 'powerbi' | 'security';

export const topicOrder: TopicKey[] = ['strategy', 'treuhand', 'practice', 'powerbi', 'security'];

export const topicLabels: Record<TopicKey, { en: string; de: string }> = {
  strategy: { en: 'AI Strategy & ROI', de: 'KI-Strategie & ROI' },
  treuhand: { en: 'Accounting & Finance', de: 'Buchhaltung & Finanzen' },
  practice: { en: 'Automation in Practice', de: 'Automatisierung in der Praxis' },
  powerbi: { en: 'Power BI & Reporting', de: 'Power BI & Reporting' },
  security: { en: 'Security & Compliance', de: 'Sicherheit & Compliance' },
};

const byTranslationKey: Record<string, TopicKey> = {
  'accounting-automation': 'treuhand',
  'ai-accounting-firms': 'treuhand',
  'ai-client-onboarding': 'treuhand',
  'ap-automation-2026': 'treuhand',
  'power-bi-finance': 'powerbi',
  'excel-power-bi-migration': 'powerbi',
  'shadow-ai-security-2026': 'security',
  'eu-ai-act-2026': 'security',
  'ai-email-triage': 'practice',
  'voice-ai-receptionist': 'practice',
  'whatsapp-business-automation': 'practice',
  'openclaw-setup-service': 'practice',
  'agentic-ai-2026': 'strategy',
  'ai-automation-swiss-smes': 'strategy',
  'ai-roi-measurement-2026': 'strategy',
  'rpa-vs-ai': 'strategy',
  'enterprise-ai-consulting': 'strategy',
};

export function topicFor(translationKey: string | undefined): TopicKey {
  return (translationKey && byTranslationKey[translationKey]) || 'strategy';
}

/** Honest per-post reading time from the markdown body (~200 words/min). */
export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}
