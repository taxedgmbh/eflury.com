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
};

/**
 * Get the translated slug for a blog post
 */
export function getTranslatedSlug(currentSlug: string): string | null {
  return blogTranslationMap[currentSlug] || null;
}
