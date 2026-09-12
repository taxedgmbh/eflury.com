/**
 * Pricing, as data.
 *
 * This page was the worst casualty of the Astro extraction. The original had
 * styled cards — a struck-through reference price, the price, a savings badge,
 * an inclusions list — and the extractor flattened all of it into prose, so
 * what shipped was `<p>CHF 19'200 CHF 9'900 einmalig + 8,1% MWST 48% sparen</p>`
 * and three packages rendered as unlabelled paragraph runs. The worked example
 * for the audit credit ended up above the packages it refers to, and a second
 * page header sat in the middle of the page.
 *
 * Prices and inclusions are carried over verbatim from what the live site
 * serves. The presentation of the reference price is not: see `reference`.
 *
 * The comparison table is derived from these objects rather than written out a
 * second time. The Astro site kept the cards and the table as two independent
 * lists of the same numbers, which is how "Team-Training 4 Stunden" in one and
 * "4-Stunden-Workshop" in the other came to disagree in wording.
 */

export interface PricingPackage {
  slug: string;
  name: string;
  /** One line on who it is for. Not a slogan. */
  fit: string;
  price: number;
  /**
   * What the same scope costs at Swiss consultancy day rates, per the footnote
   * on the live page (CHF 2'400/day, Metrics.biz 2025).
   *
   * Presented as a comparison, never as a struck-through "was" price. The old
   * card showed "CHF 19'200  CHF 9'900  48% sparen", which reads as a limited
   * sale — on a page whose entire argument is that the price is knowable in
   * advance, fake-discount optics cost more credibility than the number gains.
   */
  reference?: number;
  weeks: number;
  skills: string;
  integrations: string;
  training: string;
  support: string;
  /**
   * Always framed as an estimate; these are targets, not guarantees. null where
   * the scope is too small to put a number on — Micro is a single process, and
   * inventing a range for it would be the opposite of what this page promises.
   *
   * The value carries no "angestrebt"/"geschätzt" wording of its own: the label
   * that renders it already says so, and having both produced "Angestrebte
   * Ersparnis: 5–8 Std./Woche angestrebt".
   */
  roiHours: string | null;
  roiPayback: string;
  includes: string[];
  instalments?: string;
  cta: string;
  /**
   * At most one badge. The old card carried "AM BELIEBTESTEN" and "BESTER WERT"
   * at once — two claims, one of them about popularity that a young firm cannot
   * substantiate. "Empfohlen" is Emanuel's own recommendation, which he can
   * stand behind.
   */
  badge?: string;
}

/** Ordered smallest first, so the cheapest way in is the first thing read. */
export const PACKAGES: PricingPackage[] = [
  {
    slug: 'micro',
    name: 'Micro',
    fit: 'Ein einzelner, klar umrissener Prozess.',
    price: 5900,
    weeks: 2,
    skills: '1',
    integrations: '1',
    training: 'Einführung im Team',
    support: '2 Wochen',
    roiHours: null,
    roiPayback: 'abhängig vom Prozess',
    includes: [
      '1 Claude Skill (ein Prozess, von Anfang bis Ende)',
      '1 MCP-Integration (z. B. bexio, E-Mail)',
      'Discovery und Design in Woche 1',
      'Development und Deployment in Woche 2',
      'Dokumentation des gebauten Skills',
      '2 Wochen Begleitung nach dem Start',
    ],
    cta: 'Micro anfragen',
  },
  {
    slug: 'starter',
    name: 'Starter',
    fit: 'Zwei Prozesse, an denen sich zeigt, ob das Muster trägt.',
    price: 9900,
    reference: 19200,
    weeks: 4,
    skills: '2',
    integrations: '1',
    training: 'Workshop, 4 Stunden',
    support: '2 Wochen',
    roiHours: '5–8 Std./Woche',
    roiPayback: '~6–9 Monate geschätzt',
    includes: [
      '2 Claude Skills (die beiden Prozesse mit dem grössten Hebel)',
      '1 MCP-Integration (z. B. bexio, Zapier, E-Mail)',
      'Discovery und Design (Wochen 1–2 der eflury Method™)',
      'Development und Deployment (Wochen 3–4)',
      'Team-Workshop, 4 Stunden',
      '2 Wochen Begleitung nach dem Start',
      'Dokumentation: Skills-Guide und Fehlerbehebung',
      'Claude Team-Abo inklusive, 3 Monate',
    ],
    cta: 'Starter anfragen',
  },
  {
    slug: 'professional',
    name: 'Professional',
    fit: 'Eine bis zwei Abteilungen, vollständig automatisiert.',
    price: 24900,
    reference: 48000,
    weeks: 8,
    skills: '5',
    integrations: '2',
    training: '2 Workshops, je 4 Stunden',
    support: '4 Wochen, danach monatliche Check-ins (3 Monate)',
    roiHours: '15–20 Std./Woche',
    roiPayback: '~3,2 Monate geschätzt',
    includes: [
      '5 Claude Skills (Automatisierung von Anfang bis Ende)',
      '2 MCP-Integrationen (bexio, CRM, E-Mail und weitere)',
      'Die vollständige eflury Method™, alle fünf Phasen',
      'Discovery und Design (Wochen 1–2)',
      'Development in Sprints (Wochen 3–6)',
      'Deployment und Optimierung (Wochen 7–8)',
      '2 Team-Workshops, je 4 Stunden',
      '4 Wochen Begleitung nach dem Start',
      'Monatliche Optimierungs-Check-ins, 3 Monate',
      'ROI-Dashboard: eingesparte Zeit nachvollziehbar',
      'Reaktion innert 24 Stunden',
      'Claude Team-Abo inklusive, 6 Monate',
    ],
    instalments: '2 × CHF 12’450',
    cta: 'Professional anfragen',
    badge: 'Empfohlen',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    fit: 'Mehrere Abteilungen, über den ganzen Tech-Stack.',
    price: 49900,
    reference: 72000,
    weeks: 12,
    skills: '10+',
    integrations: '5',
    training: 'Programm nach Mass',
    support: '8 Wochen, danach Quartalsreviews (12 Monate)',
    roiHours: '30–50 Std./Woche',
    roiPayback: '~2–4 Monate geschätzt',
    includes: [
      '10+ Claude Skills über mehrere Abteilungen',
      '5 MCP-Integrationen — der Stack durchgehend verbunden',
      'Erweiterte eflury Method™ mit eigenen Phasen',
      'Discovery und Design mit tiefem Prozess-Mapping (Wochen 1–3)',
      'Development in Sprints (Wochen 4–9)',
      'Deployment und Optimierung (Wochen 10–12)',
      'Schulungsprogramm nach Mass, unternehmensweit',
      '8 Wochen Begleitung nach dem Start',
      'Quartalsreviews über 12 Monate',
      'Eigener Slack-Kanal',
      'Reaktion innert 4 Stunden',
      'Eigene Skills-Bibliothek, für Sie gebaut',
      'Auswertungen: ROI-Reporting und Nutzung',
      'Claude Team-Abo inklusive, 12 Monate, unbegrenzte Nutzer',
    ],
    instalments: '3 × CHF 16’633',
    cta: 'Enterprise besprechen',
  },
];

/**
 * The audit credit, with its worked example.
 *
 * On the old page the sum sat at the very top, before the reader had met a
 * single package — three numbers with nothing to attach them to. It belongs
 * directly under the mechanic it demonstrates.
 */
export const AUDIT_CREDIT = {
  auditPrice: 4900,
  windowMonths: 6,
  note:
    'Das KI-Audit kostet CHF 4’900 und dauert eine Woche. Es endet mit einem schriftlichen Go/No-Go — auch wenn das Nein lautet. Wer innert sechs Monaten ein Paket beauftragt, bekommt das Audit vollständig angerechnet.',
  example: {
    base: { label: 'Micro-Paket', amount: 5900 },
    credit: { label: 'KI-Audit, voll angerechnet', amount: -4900 },
    net: { label: 'Netto für Phase 1', amount: 1000 },
  },
} as const;

export interface AddOn {
  name: string;
  price: string;
  what: string;
}

export const ADD_ONS: AddOn[] = [
  {
    name: 'Zusätzlicher Claude Skill',
    price: 'CHF 2’900',
    what: 'Ein weiterer Prozess, nach dem Paket. Rund 5–8 Stunden Entwicklung.',
  },
  {
    name: 'Zusätzliche MCP-Integration',
    price: 'CHF 3’500',
    what: 'Ein weiteres System angebunden — Slack, Google Workspace, SAP.',
  },
  {
    name: 'Erweiterter Support',
    price: 'CHF 1’200 / Monat',
    what: 'Begleitung nach dem Paket: Reaktion innert 4 Stunden, monatliche Check-ins.',
  },
  {
    name: 'Workshop vor Ort',
    price: 'CHF 1’800 / Tag',
    what: 'Ein Tag Schulung in Ihrem Büro. Grenchen, Biel und Bern ohne Reisekosten.',
  },
];

export interface PricingFaq {
  question: string;
  answer: string;
}

/*
 * Rewritten rather than carried over. Three of these were wrong in the
 * extracted German — "rechnt" for "rechnet", "Die einzige zusätzliche Kosten
 * ist" — and one contradicted the page it sits on: an FAQ advertising seasonal
 * promotions, under a headline promising the price is fixed before the work
 * starts. It is kept because it is a real commercial fact, but stated so that
 * the fixed price is the rule and an action is the exception.
 */
export const PRICING_FAQS: PricingFaq[] = [
  {
    question: 'Warum stehen die Preise überhaupt hier?',
    answer:
      'Weil «Kontaktieren Sie uns für ein Angebot» beide Seiten Zeit kostet. Sie sehen vorher, ob die Grössenordnung passt, und müssen nicht telefonieren, um das herauszufinden.',
  },
  {
    question: 'Kann ich in Raten zahlen?',
    answer:
      'Professional und Enterprise ja: die Hälfte bei Auftrag, die Hälfte bei Deployment. Micro und Starter sind eine Zahlung.',
  },
  {
    question: 'Gibt es versteckte Kosten?',
    answer:
      'Der einzige zusätzliche Posten ist die Mehrwertsteuer von 8,1 %, wie sie das Gesetz vorschreibt. Hosting, Software-Lizenzen während der Entwicklung und Schulungsmaterial sind im Paketpreis enthalten.',
  },
  {
    question: 'Was steckt im inkludierten Claude Team-Abo?',
    answer:
      'Claude Team kostet CHF 280 pro Monat für drei Nutzer. Für die beim Paket genannte Dauer ist es enthalten, damit während der Umsetzung keine zweite Rechnung läuft.',
  },
  {
    question: 'Was, wenn ich nur einen einzigen Prozess automatisieren will?',
    answer:
      'Dann ist Micro das Richtige: CHF 5’900, zwei Wochen, ein Skill, eine Integration. Die Audit-Anrechnung gilt auch dort, und ein Upgrade auf ein grösseres Paket ist jederzeit möglich.',
  },
  {
    question: 'Kommen nach dem Paket Stundenrechnungen?',
    answer:
      'Nein. Die Begleitung nach dem Start ist im Paket enthalten — zwischen zwei und acht Wochen, je nach Paket. Danach können Sie Erweiterten Support dazunehmen oder neue Skills einzeln beauftragen.',
  },
  {
    question: 'Kann ich später von Starter auf Professional wechseln?',
    answer:
      'Ja. Emanuel rechnet die bezahlten CHF 9’900 an, Sie zahlen die Differenz von CHF 15’000. Der Wechsel muss innert sechs Monaten erfolgen.',
  },
  {
    question: 'Was, wenn die Zeitersparnis ausbleibt?',
    answer:
      'Bei Professional und Enterprise gilt: Werden innert drei Monaten nach Deployment keine 15 Stunden pro Woche eingespart, erhalten Sie den Paketpreis zurück. Micro und Starter sind davon ausgenommen — beide sind zu kurz, um eine Ersparnis seriös zu messen.',
  },
  {
    question: 'Gibt es Rabatte?',
    answer:
      'Der Paketpreis ist fix und gilt unverändert. Gelegentlich gibt es zeitlich begrenzte Aktionen für Unternehmen in der Frühphase; angekündigt werden sie im Newsletter.',
  },
  {
    question: 'Und wenn es mehr als zehn Skills braucht?',
    answer:
      'Dann rechnet Emanuel eine eigene Offerte: CHF 2’500 pro Skill von 11 bis 20, CHF 2’000 pro Skill ab 20.',
  },
];

/** Rows of the comparison table, derived so they cannot drift from the cards. */
export const COMPARISON_ROWS = [
  { label: 'Preis', value: (p: PricingPackage) => `CHF ${p.price.toLocaleString('de-CH')}` },
  { label: 'Dauer', value: (p: PricingPackage) => `${p.weeks} Wochen` },
  { label: 'Claude Skills', value: (p: PricingPackage) => p.skills },
  { label: 'MCP-Integrationen', value: (p: PricingPackage) => p.integrations },
  { label: 'Schulung', value: (p: PricingPackage) => p.training },
  { label: 'Begleitung', value: (p: PricingPackage) => p.support },
  { label: 'Angestrebte Ersparnis', value: (p: PricingPackage) => p.roiHours ?? '—' },
  { label: 'Amortisation', value: (p: PricingPackage) => p.roiPayback },
] as const;
