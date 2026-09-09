import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';

/**
 * Long-form content pages.
 *
 * Bodies are cleaned semantic HTML extracted from the built Astro output
 * (migration/extract-pages.mjs), then shifted to third person
 * (migration/voice-to-third-person.mjs). The Astro sources were 400–2,185 lines
 * each and mostly scoped CSS that the redesign discards, so the built markup was
 * the cleaner input.
 *
 * Titles and descriptions are authored here rather than scraped, because the old
 * ones were written for a company voice and for pages that no longer exist in
 * the same shape.
 */
export interface ContentPage {
  /** File in src/content/pages, with "/" written as "__". */
  file: string;
  route: string;
  title: string;
  description: string;
  /** Shown under the title. */
  standfirst?: string;
  priority: number;
}

export const CONTENT_PAGES = {
  about: {
    file: 'about',
    route: '/de/about/',
    title: 'Profil',
    description:
      'Emanuel Flury — vom Buchhalter über 13 Jahre Fortune-500-Automatisierung zum Unternehmer in Grenchen.',
    standfirst:
      'Vom Buchhalter, der in Excel versank, über dreizehn Jahre Automatisierung im Konzern, zurück in die eigene Firma.',
    priority: 0.8,
  },
  methode: {
    file: 'methode',
    route: '/de/methode/',
    title: 'Methode',
    description:
      'Fünf Phasen von der Analyse bis zum Betrieb — mit einem ehrlichen Go/No-Go am Ende der ersten.',
    standfirst: 'Wie ein Projekt abläuft, und woran Sie merken, dass es nicht laufen sollte.',
    priority: 0.7,
  },
  sicherheit: {
    file: 'sicherheit',
    route: '/de/sicherheit/',
    title: 'Sicherheit',
    description:
      'Wie in Projekten mit Ihren Daten gearbeitet wird: Lesezugriff statt Kopien, menschliche Freigabe für Änderungen.',
    standfirst: 'Vollständig offengelegt, damit Sie es prüfen können statt es glauben zu müssen.',
    priority: 0.6,
  },
  leitfaeden: {
    file: 'leitfaeden',
    route: '/de/leitfaeden/',
    title: 'Leitfäden',
    description:
      'Schriftliche Leitfäden zu revDSG, EU AI Act, Datenqualität und Automatisierung — als PDF zum Mitnehmen.',
    priority: 0.6,
  },
  skopaai: {
    file: 'skopaai',
    route: '/de/skopaai/',
    title: 'SkopaAI',
    description:
      'Vorkonfigurierte KI-Assistenz als Gerät. Auspacken, anschliessen, per Nachricht bedienen. Made in Switzerland.',
    standfirst: 'Eine eigenständige Firma — die vollständige Geschichte steht auf skopa.ai.',
    priority: 0.6,
  },
  pricing: {
    file: 'pricing',
    route: '/de/pricing/',
    title: 'Preise',
    description:
      'Fixpreise statt Tagessätze. Was Automatisierung kostet, steht hier — nicht erst nach einem Verkaufsgespräch.',
    standfirst: 'Weil Schweizer KMU Transparenz schätzen und versteckte Preise Zeit kosten.',
    priority: 0.8,
  },
  kontakt: {
    file: 'kontakt',
    route: '/de/kontakt/',
    title: 'Kontakt',
    description:
      'Kostenloses 30-Minuten-Gespräch, unverbindlich und vertraulich — oder direkt per E-Mail und Telefon.',
    priority: 0.8,
  },
  karriere: {
    file: 'karriere',
    route: '/de/karriere/',
    title: 'Karriere',
    description:
      'Derzeit keine ausgeschriebenen Stellen — Initiativbewerbungen sind ausdrücklich willkommen.',
    priority: 0.4,
  },
  'karriere__initiativbewerbung': {
    file: 'karriere__initiativbewerbung',
    route: '/de/karriere/initiativbewerbung/',
    title: 'Initiativbewerbung',
    description:
      'Spezialisten-Netzwerk für KI-, BI- und Finanz-Automatisierungsprojekte. Jede Bewerbung wird persönlich gelesen.',
    priority: 0.4,
  },
  'branchen__dienstleister': {
    file: 'branchen__dienstleister',
    route: '/de/branchen/dienstleister/',
    title: 'Dienstleister',
    description:
      'Posteingang, Telefon und Terminvereinbarung automatisieren — für Dienstleister mit viel Kundenkontakt.',
    priority: 0.7,
  },
  'branchen__finanzteams': {
    file: 'branchen__finanzteams',
    route: '/de/branchen/finanzteams/',
    title: 'Finanzteams',
    description:
      'Monatsabschluss, Reporting und die Datenarbeit darunter — automatisiert für Finanz- und Back-Office-Teams.',
    priority: 0.7,
  },
  'branchen__reporting-daten': {
    file: 'branchen__reporting-daten',
    route: '/de/branchen/reporting-daten/',
    title: 'Reporting & Daten',
    description:
      'Systeme verbinden, Daten bereinigen, Reports automatisieren — damit Zahlen stimmen, bevor sie jemand liest.',
    priority: 0.7,
  },
  'case-studies__taxed-gmbh': {
    file: 'case-studies__taxed-gmbh',
    route: '/de/case-studies/taxed-gmbh/',
    title: 'Taxed GmbH',
    description:
      'Wie Emanuel Flury seine eigene Treuhandfirma automatisierte — 18 Stunden Verwaltung pro Woche auf 3 reduziert.',
    standfirst: 'Die eigene Firma als erster Kunde. Das Treuhandwesen ist stark reguliert — funktioniert es hier, funktioniert es auch bei Ihnen.',
    priority: 0.8,
  },
  'case-studies__finance-automation': {
    file: 'case-studies__finance-automation',
    route: '/de/case-studies/finance-automation/',
    title: 'Finanzautomatisierung',
    description:
      'Abstimmung, Abweichungsanalyse und Abschlusskalender automatisiert — Präzisionsfertiger im Raum Zürich.',
    priority: 0.7,
  },
  'case-studies__power-bi-reporting': {
    file: 'case-studies__power-bi-reporting',
    route: '/de/case-studies/power-bi-reporting/',
    title: 'Power-BI-Reporting',
    description:
      'Von verstreuten Excel-Dateien zu einem Reporting, dem das Team traut — Dienstleister im Raum Bern.',
    priority: 0.7,
  },
  'case-studies__llm-pipeline-showcase': {
    file: 'case-studies__llm-pipeline-showcase',
    route: '/de/case-studies/llm-pipeline-showcase/',
    title: 'Mahnlauf-Pipeline',
    description:
      'Ein vollständiger Mahnlauf über 40 Posten: Risikobewertung, Priorisierung und 21 E-Mail-Entwürfe in drei Sprachen.',
    standfirst: 'Die Beispielbriefe auf dieser Seite stehen unverändert so, wie das Modell sie abgelegt hat.',
    priority: 0.7,
  },
} as const satisfies Record<string, ContentPage>;

export type ContentPageKey = keyof typeof CONTENT_PAGES;

export const getPageHtml = cache(async (file: string): Promise<string> => {
  return readFile(path.join(process.cwd(), 'src/content/pages', `${file}.html`), 'utf8');
});
