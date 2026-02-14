/**
 * Static Blog Translation Map
 * Maps English blog post slugs to their German equivalents and vice versa
 */

export const blogTranslationMap: Record<string, string> = {
  // English -> German
  'ap-automation-ai-swiss-smes': 'kreditoren-automatisierung-ki-schweizer-kmu',
  'shadow-ai-security-swiss-smes': 'schatten-ki-sicherheit-schweizer-kmu',
  'eu-ai-act-swiss-smes-2026': 'eu-ki-gesetz-schweizer-kmu-2026',
  'ai-roi-measurement-swiss-smes': 'ki-roi-messung-schweizer-kmu',
  'agentic-ai-swiss-business-2026': 'agentic-ki-schweizer-unternehmen-2026',
  'ai-automation-swiss-smes': 'ki-automatisierung-schweizer-kmu',
  'rpa-vs-ai-comparison': 'rpa-vs-ki-vergleich',
  'power-bi-finance-teams': 'power-bi-finanzteams',
  'accounting-automation-switzerland': 'buchhaltung-automatisieren-schweiz',
  'excel-to-power-bi-migration': 'excel-zu-power-bi-migration',
  'ai-for-accounting-firms': 'ki-fuer-treuhand',
  'openclaw-setup-service-swiss-sme': 'openclaw-setup-service-schweizer-kmu',
  'ai-email-triage-agent-professionals': 'ki-email-triage-agent-professionals',
  'ai-client-onboarding-accounting-firms': 'ki-kunden-onboarding-treuhand',
  'voice-ai-receptionist-swiss-sme': 'voice-ki-rezeptionist-schweizer-kmu',
  'enterprise-ai-consulting-fortune500-experience': 'enterprise-ki-beratung-fortune500-erfahrung',

  // German -> English (reverse mapping)
  'kreditoren-automatisierung-ki-schweizer-kmu': 'ap-automation-ai-swiss-smes',
  'schatten-ki-sicherheit-schweizer-kmu': 'shadow-ai-security-swiss-smes',
  'eu-ki-gesetz-schweizer-kmu-2026': 'eu-ai-act-swiss-smes-2026',
  'ki-roi-messung-schweizer-kmu': 'ai-roi-measurement-swiss-smes',
  'agentic-ki-schweizer-unternehmen-2026': 'agentic-ai-swiss-business-2026',
  'ki-automatisierung-schweizer-kmu': 'ai-automation-swiss-smes',
  'rpa-vs-ki-vergleich': 'rpa-vs-ai-comparison',
  'power-bi-finanzteams': 'power-bi-finance-teams',
  'buchhaltung-automatisieren-schweiz': 'accounting-automation-switzerland',
  'excel-zu-power-bi-migration': 'excel-to-power-bi-migration',
  'ki-fuer-treuhand': 'ai-for-accounting-firms',
  'openclaw-setup-service-schweizer-kmu': 'openclaw-setup-service-swiss-sme',
  'ki-email-triage-agent-professionals': 'ai-email-triage-agent-professionals',
  'ki-kunden-onboarding-treuhand': 'ai-client-onboarding-accounting-firms',
  'voice-ki-rezeptionist-schweizer-kmu': 'voice-ai-receptionist-swiss-sme',
  'enterprise-ki-beratung-fortune500-erfahrung': 'enterprise-ai-consulting-fortune500-experience',
};

/**
 * Get the translated slug for a blog post
 */
export function getTranslatedSlug(currentSlug: string): string | null {
  return blogTranslationMap[currentSlug] || null;
}
