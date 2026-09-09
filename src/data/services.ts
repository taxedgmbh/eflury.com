/**
 * Service content, lifted verbatim from the Astro pages in
 * astro-src/src/pages/de/services/. Four of those built their copy from t()
 * lookups against de.json and three had it inline; both were resolved at
 * extraction time, so this module is now the single source.
 *
 * Extracted rather than retyped — it is ~2,000 lines of German marketing copy
 * that has already been reviewed, and retyping it would introduce drift.
 *
 * Voice was shifted from the company "wir" to third person by
 * migration/voice-to-third-person.mjs. That script leaves two things alone,
 * because both use "wir" to mean the reader rather than Emanuel: quoted client
 * speech («Wir müssten etwas mit KI machen») and FAQ questions ("Sind unsere
 * Daten sicher?").
 */
export interface ServiceStep { title: string; description: string }
export interface ServiceBenefit { title: string; description: string }
export interface ServiceFaq { question: string; answer: string }

export interface Service {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  serviceType: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  problemTitle: string;
  problems: string[];
  solutionTitle: string;
  solutionDescription: string;
  benefits: ServiceBenefit[];
  processTitle: string;
  processSteps: ServiceStep[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  relatedCaseStudy?: unknown;
  sampleReport?: unknown;
}

export const SERVICES: Service[] = [
  {
    slug: "ki-audit",
    metaTitle: "KI-Audit - Automatisierungs-Assessment zum Fixpreis | eflury.com",
    metaDescription: "Einwöchiges Audit zum Fixpreis: Prozessinventar mit Zeitkosten-Scoring, priorisierte Automatisierungs-Roadmap, ROI-Projektion pro Initiative — und ein ehrliches Go/No-Go.",
    keywords: "KI-Audit, Automatisierungs-Assessment, KI-Readiness, Prozessinventar, ROI-Projektion, Schweizer KMU, Fixpreis",
    serviceType: "KI-Audit",
    heroTitle: "Wissen, was sich lohnt — bevor Sie bauen",
    heroSubtitle: "KI-Audit",
    heroDescription: "Ein einwöchiges Audit Ihrer Prozesse für CHF 4’900 fix — bei einem Folgeauftrag vollständig ans Umsetzungspaket angerechnet. Wo Automatisierung messbaren Wert schafft, was sie kostet, was sie zurückbringt — und wo sie sich nicht lohnt. Sie erhalten eine schriftliche Entscheidungsgrundlage, kein Verkaufsgespräch. Das Ergebnis kann ein No-Go sein; auch das ist ein sauberes Resultat.",
    problemTitle: "Kommt Ihnen das bekannt vor?",
    problems: [
      "«Wir müssten etwas mit KI machen» steht auf der GL-Agenda — aber niemand kann sagen, mit welchem Prozess man anfangen soll",
      "Anbieter versprechen Einsparungen, aber Sie haben keine eigenen, unabhängigen Zahlen zum Gegenprüfen",
      "Ihr Team ist bereits ausgelastet — ein sechsmonatiges Experiment, das still stirbt, liegt nicht drin",
      "Ein früherer Automatisierungsanlauf ist verpufft, weil der Aufwand in den falschen Prozess floss",
      "Sie brauchen etwas, das Partner oder Verwaltungsrat lesen können: Zahlen und Prioritäten statt Schlagworte"
    ],
    solutionTitle: "Eine Woche. Echte Zahlen. Ein klares Go oder No-Go.",
    solutionDescription: "Das KI-Audit ist Phase 1 der eflury Method™ als eigenständiges Produkt: Emanuel interviewt die Menschen, die Ihre Prozesse tatsächlich ausführen (2–3 Stunden Aufwand für Ihr Team), prüfen die relevanten Systeme mit Lesezugriff und bewerten jeden Kandidatenprozess nach Zeitkosten und Automatisierungspotenzial. Sie erhalten ein Prozessinventar mit Zeitkosten-Scoring, eine priorisierte Automatisierungs-Roadmap und eine ROI-Projektion pro Initiative — schriftlich, und sie gehören Ihnen. Genau diese Grundlagenarbeit überspringen gescheiterte KI-Projekte: Gartner prognostiziert, dass Organisationen bis 2026 rund 60% der KI-Projekte abbrechen, die nicht durch KI-taugliche Daten gestützt sind. Das Audit sagt Ihnen vor jedem Build, ob Ihre Prozesse und Daten bereit sind — und welche Initiative sich zuerst amortisiert.",
    benefits: [
      {
        "title": "Eine Entscheidungsgrundlage, kein Pitch",
        "description": "Drei benannte Deliverables: Prozessinventar mit Zeitkosten-Scoring, priorisierte Roadmap, ROI-Projektion pro Initiative. Alles schriftlich, alles Ihres — nutzbar mit Emanuel oder mit jedem anderen."
      },
      {
        "title": "Ein No-Go ist ein sauberes Resultat",
        "description": "Das Audit endet mit einem gemeinsamen Go/No-Go-Entscheid auf Basis der Zahlen. Lohnt sich Automatisierung in Ihrem Fall nicht, steht das im Bericht — schriftlich, bevor Sie etwas für einen Build ausgegeben haben."
      },
      {
        "title": "Minimale Belastung für Ihr Team",
        "description": "Ihr Beitrag: 2–3 Stunden Interviews und Lesezugriff auf die relevanten Systeme. Den Rest übernimmt Emanuel — Ihr Betrieb läuft weiter."
      },
      {
        "title": "Geht nahtlos in den Build über",
        "description": "Fällt der Entscheid auf Go, startet das Design direkt auf den Audit-Ergebnissen — ohne wiederholte Discovery, und die vollen CHF 4’900 Audit-Gebühr werden Ihrem Paket angerechnet (innert 6 Monaten). Umsetzungspakete inklusive Build sind transparent publiziert, ab CHF 9’900."
      }
    ],
    processTitle: "So läuft das Audit ab",
    processSteps: [
      {
        "title": "Kickoff & Interviews",
        "description": "2–3 Stunden mit den Menschen, die die Prozesse tatsächlich ausführen — nicht nur mit der Geschäftsleitung. Hier zeigen sich die echten Zeitfresser."
      },
      {
        "title": "System-Review",
        "description": "Prüfung der relevanten Systeme mit Lesezugriff (z.B. bexio, ABACUS, Microsoft 365) — unter denselben offengelegten Sicherheitsstandards wie die gesamte Arbeit."
      },
      {
        "title": "Scoring & Roadmap",
        "description": "Jeder Kandidatenprozess bewertet nach Zeitkosten und Automatisierungspotenzial; Initiativen priorisiert, je mit ROI-Projektion."
      },
      {
        "title": "Ergebnis-Workshop",
        "description": "Sie gehen den Bericht gemeinsam durch und fällen einen Go/No-Go-Entscheid — auf Basis der Zahlen, nicht eines Bauchgefühls."
      }
    ],
    sampleReport: {
      "title": "Sehen Sie genau, was Sie erhalten",
      "note": "Laden Sie den Musterbericht für ein fiktives 18-Personen-KMU herunter — gleiche Struktur, Bewertungsmethode und Tiefe wie das echte Ergebnis, klar als Illustration gekennzeichnet.",
      "cta": "Musterbericht herunterladen (PDF)",
      "href": "/downloads/eflury-sample-audit-report-de.pdf",
      "image": "/images/artifacts/sample-audit-cover-de.webp"
    },
    faqs: [
      {
        "question": "Was habe ich am Ende konkret in der Hand?",
        "answer": "Drei schriftliche Deliverables: ein Prozessinventar mit Zeitkosten-Scoring, eine priorisierte Automatisierungs-Roadmap und eine ROI-Projektion pro Initiative — plus eine dokumentierte Go/No-Go-Empfehlung. Das sind die Phase-1-Deliverables der eflury Method™, und sie gehören Ihnen, unabhängig davon, wie Sie sich danach entscheiden."
      },
      {
        "question": "Was kostet das Audit?",
        "answer": "CHF 4’900, fix — schriftlich bestätigt, bevor die Arbeit beginnt, keine Tagessätze, kein offenes Ende. Und vollständig angerechnet: Gehen Sie innert 6 Monaten in ein Umsetzungspaket über, zählt die Audit-Gebühr voll daran. Pakete inklusive Build sind transparent auf der Preisseite publiziert, ab CHF 9’900 — das Audit ist damit faktisch die risikobefreite erste Woche Ihres Projekts."
      },
      {
        "question": "Was, wenn die Antwort lautet: nicht automatisieren?",
        "answer": "Dann steht genau das im Bericht, mit den Zahlen, die dorthin geführt haben. Ein No-Go ist ein sauberes Resultat — es kostet Sie ein Audit statt eines gescheiterten Projekts. Die Deliverables behalten Sie in jedem Fall."
      },
      {
        "question": "Sind unsere Daten während des Audits sicher?",
        "answer": "Das Audit arbeitet mit Lesezugriff: Agenten und Emanuel greifen über MCP-Konnektoren auf Ihre Systeme zu, ohne etwas zurückzuschreiben. Bei sensiblen Daten arbeitet Emanuel mit Stichproben oder Redaktion. Das vollständige Setup — inklusive aller eingesetzten Dienste — ist auf seiner Seite Sicherheit & Vertrauen offengelegt, ausgerichtet am revDSG."
      },
      {
        "question": "Können wir die Roadmap ohne Sie umsetzen?",
        "answer": "Ja. Die Deliverables sind so geschrieben, dass jeder kompetente Umsetzer damit arbeiten kann — kein Lock-in ist ein erklärtes Prinzip seiner Methode. Machen Sie mit Emanuel weiter, startet das Design ohne wiederholte Discovery auf den Audit-Ergebnissen."
      },
      {
        "question": "Wie viel Zeit kostet es unser Team?",
        "answer": "Rund 2–3 Stunden Interviews mit den Betroffenen, das Einrichten des Lesezugriffs auf die relevanten Systeme und etwa eine Stunde für den Ergebnis-Workshop. Das Audit selbst dauert typischerweise eine Woche."
      }
    ],
    ctaTitle: "Finden Sie heraus, welcher Prozess sich zuerst amortisiert",
    ctaDescription: "Buchen Sie ein kostenloses 30-Minuten-Gespräch. Sie gehen Ihre Situation gemeinsam durch — am Ende des Gesprächs wissen Sie, ob ein Audit für Sie sinnvoll ist.",
    ctaButtonText: "Kostenloses Audit-Gespräch buchen",
    relatedCaseStudy: {
      "title": "Finanzprozess-Automatisierung bei einem Schweizer Fertigungsunternehmen",
      "link": "/de/case-studies/finance-automation",
      "metric": "~4.1 Monate geschätzte Amortisation"
    }
  },
  {
    slug: "finanzen-automatisierung",
    metaTitle: "Finanzprozess-Automatisierung",
    metaDescription: "Automatisieren Sie Monatsabschluss, Reporting und Abstimmungen. KI-gestützte Finanzautomatisierung für Schweizer KMU mit Bexio- und ABACUS-Integration.",
    keywords: "Finanzautomatisierung, Monatsabschluss, Reporting-Automatisierung, Bexio-Integration, ABACUS-Automatisierung, Schweizer Buchhaltung",
    serviceType: "Finanzprozess-Automatisierung",
    heroTitle: "Automatisieren Sie Ihre Finanzprozesse",
    heroSubtitle: "Finanz-Spezialist",
    heroDescription: "Vom Monatsabschluss bis zur täglichen Abstimmung — Emanuel baut KI-Automatisierungen, die Finanzteams 30-50 Stunden pro Monat sparen und gleichzeitig Genauigkeit und Compliance verbessern.",
    problemTitle: "Herausforderungen im Finanzteam",
    problems: [
      "Der Monatsabschluss dauert Tage mit manueller Datensammlung und Abstimmung",
      "Berichterstellung erfordert Stunden des Kopierens von Daten zwischen Systemen",
      "Rechnungsverarbeitung ist ein Engpass mit manueller Dateneingabe",
      "Compliance-Dokumentation ist zeitaufwändig und fehleranfällig"
    ],
    solutionTitle: "KI-gestützte Finanzautomatisierung",
    solutionDescription: "Emanuel kombiniert Claude KI mit Ihren bestehenden Finanztools (Bexio, ABACUS, Excel), um die repetitive Arbeit zu automatisieren. Ihr Team konzentriert sich auf Analyse und Entscheidungen, während KI die Datenverarbeitung übernimmt.",
    benefits: [
      {
        "title": "Schnellerer Monatsabschluss",
        "description": "Reduzieren Sie die Abschlusszeit um 60-80% mit automatisierter Abstimmung und Reporting."
      },
      {
        "title": "Bexio & ABACUS Integration",
        "description": "Native Integration mit Schweizer Buchhaltungssoftware via MCP."
      },
      {
        "title": "Genau & Prüffähig",
        "description": "KI führt Audit-Trails und erkennt Fehler, die Menschen übersehen."
      },
      {
        "title": "Schweizer Compliance-ready",
        "description": "Entwickelt mit Schweizer Buchhaltungsstandards und DSG-Datenschutz im Blick."
      }
    ],
    processTitle: "Finanzautomatisierungsprozess",
    processSteps: [
      {
        "title": "Prozess-Mapping",
        "description": "Emanuel dokumentiert Ihre aktuellen Finanz-Workflows und Schmerzpunkte."
      },
      {
        "title": "Automatisierungs-Design",
        "description": "Emanuel entwirft KI-Workflows, die sich in Ihre Buchhaltungssoftware integrieren."
      },
      {
        "title": "Entwicklung & Test",
        "description": "Automatisierung wird mit historischen Daten vor Go-Live gebaut und getestet."
      },
      {
        "title": "Parallellauf & Schulung",
        "description": "Alte und neue Prozesse laufen eine Zeit lang parallel, danach schult Emanuel Ihr Team."
      }
    ],
    faqs: [
      {
        "question": "Mit welcher Buchhaltungssoftware integrieren Sie?",
        "answer": "Emanuel ist spezialisiert auf Schweizer Buchhaltungssoftware: Bexio, ABACUS und Infoniqa. Emanuel arbeitet auch mit internationalen Tools wie Xero, QuickBooks und SAP."
      },
      {
        "question": "Wie viel Zeit können wir realistisch sparen?",
        "answer": "Die meisten Finanzteams sparen 30-50 Stunden pro Monat. Der Monatsabschluss reduziert sich typischerweise von 5-7 Tagen auf 1-2 Tage."
      },
      {
        "question": "Ist KI genau genug für Finanzdaten?",
        "answer": "Moderne KI erreicht 99%+ Genauigkeit bei strukturierten Datenaufgaben. Emanuel baut immer menschliche Überprüfungspunkte für wichtige Entscheidungen ein."
      },
      {
        "question": "Was ist mit Compliance und Prüfungsanforderungen?",
        "answer": "Alle Automatisierungen führen vollständige Audit-Trails. Jede KI-Aktion wird mit Zeitstempeln protokolliert und entspricht Schweizer Buchhaltungsstandards."
      },
      {
        "question": "Was ist die Investition für Finanzautomatisierung?",
        "answer": "Starterprojekte beginnen bei CHF 10'000. Umfassende Pakete liegen bei CHF 25'000-50'000. Die meisten Kunden sehen ROI innerhalb von 3-6 Monaten."
      }
    ],
    ctaTitle: "Transformieren Sie Ihre Finanzoperationen",
    ctaDescription: "Buchen Sie eine kostenlose Beratung, um Ihre wirkungsvollsten Automatisierungsmöglichkeiten zu identifizieren.",
    ctaButtonText: "Finanzautomatisierungs-Gespräch buchen",
    relatedCaseStudy: {
      "title": "Finanzautomatisierungs-Fallstudie",
      "link": "/de/case-studies/finance-automation",
      "metric": "40 Std/Monat gespart"
    }
  },
  {
    slug: "power-bi",
    metaTitle: "Power BI Beratung & Dashboard-Entwicklung",
    metaDescription: "Individuelle Power BI Dashboards und Reports für Schweizer Unternehmen. Von Datenmodellierung bis Executive Dashboards mit KI-gestützten Erkenntnissen.",
    keywords: "Power BI Beratung, Dashboard-Entwicklung, Business Intelligence, Schweizer BI-Berater, Datenvisualisierung",
    serviceType: "Power BI Beratung",
    heroTitle: "Power BI Dashboards, die Entscheidungen antreiben",
    heroSubtitle: "BI Spezialist",
    heroDescription: "Emanuel baut Power BI Dashboards, die Ihre Daten in handlungsrelevante Erkenntnisse verwandeln. Von Executive KPI-Übersichten bis zu detaillierten operativen Ansichten — designed für wie Ihr Team tatsächlich arbeitet.",
    problemTitle: "Daten ohne Richtung",
    problems: [
      "Daten verstreut über Excel-Dateien, ERP und mehrere Systeme",
      "Stunden für manuelle Berichterstellung, die bei Veröffentlichung bereits veraltet sind",
      "Führungskräfte stellen Fragen, die Ihre aktuellen Reports nicht beantworten können",
      "Keine Single Source of Truth für wichtige Geschäftskennzahlen"
    ],
    solutionTitle: "Power BI richtig gemacht",
    solutionDescription: "Emanuel erstellt Power BI-Lösungen, die alle Ihre Datenquellen in live, interaktive Dashboards verbinden. Automatische Aktualisierung, mobiler Zugriff und Erkenntnisse, die tatsächlich genutzt werden.",
    benefits: [
      {
        "title": "Single Source of Truth",
        "description": "Alle Ihre Daten an einem Ort mit konsistenten Definitionen und Berechnungen."
      },
      {
        "title": "Live-Daten, keine statischen Reports",
        "description": "Dashboards aktualisieren sich automatisch. Immer aktuell, nie veraltet."
      },
      {
        "title": "Self-Service Analytics",
        "description": "Designed für Geschäftsnutzer, um Daten ohne IT-Support zu erkunden."
      },
      {
        "title": "KI-gestützte Erkenntnisse",
        "description": "Optionale Claude-Integration für Abfragen und Analysen in natürlicher Sprache."
      }
    ],
    processTitle: "Power BI Entwicklungsprozess",
    processSteps: [
      {
        "title": "Anforderungsermittlung",
        "description": "Emanuel definiert Ihre Schlüsselfragen, Metriken und wie Entscheidungen getroffen werden."
      },
      {
        "title": "Datenmodellierung",
        "description": "Emanuel baut ein robustes Datenmodell, das Ihre verschiedenen Datenquellen verbindet."
      },
      {
        "title": "Dashboard-Design",
        "description": "Interaktive Dashboards, designed für Ihre spezifischen Use Cases und Nutzer."
      },
      {
        "title": "Schulung & Adoption",
        "description": "Ihr Team lernt, die Dashboards selbstständig zu nutzen und zu erweitern."
      }
    ],
    faqs: [
      {
        "question": "Welche Datenquellen können Sie mit Power BI verbinden?",
        "answer": "Fast alles: Excel, SQL-Datenbanken, Bexio, ABACUS, Salesforce, SharePoint, Web-APIs und hunderte mehr. Power BI hat native Konnektoren für die meisten Business-Systeme."
      },
      {
        "question": "Wir haben noch keine Power BI-Lizenz. Was brauchen wir?",
        "answer": "Power BI Desktop ist kostenlos. Für Sharing brauchen Sie Power BI Pro (CHF 9.40/Nutzer/Monat) oder Premium. Emanuel hilft bei der richtigen Lizenzwahl."
      },
      {
        "question": "Wie lange dauert ein Power BI-Projekt?",
        "answer": "Einfache Dashboards: 2-3 Wochen. Umfassende BI-Lösungen mit mehreren Dashboards: 6-8 Wochen. Emanuel arbeitet iterativ mit laufendem Feedback."
      },
      {
        "question": "Können Sie Claude KI mit Power BI integrieren?",
        "answer": "Ja. Nutzer können Fragen in natürlicher Sprache stellen und erhalten sofortige Antworten aus Ihren Power BI-Daten. Das ist eine einzigartige Fähigkeit, die Emanuel anbietet."
      },
      {
        "question": "Was ist die Investition für Power BI Beratung?",
        "answer": "Einzelne Dashboard-Projekte starten bei CHF 5'000. Enterprise BI-Implementierungen liegen bei CHF 15'000-40'000. Laufender Support kostet CHF 500-1'500/Monat."
      }
    ],
    ctaTitle: "Verwandeln Sie Ihre Daten in Erkenntnisse",
    ctaDescription: "Besprechen Sie mit Emanuel, wie Power BI Ihrem Team helfen kann, schneller bessere Entscheidungen zu treffen.",
    ctaButtonText: "Power BI Beratungsgespräch buchen",
    relatedCaseStudy: {
      "title": "Power BI Erfolgsgeschichte",
      "link": "/de/case-studies/power-bi-reporting",
      "metric": "15 Std/Woche gespart"
    }
  },
  {
    slug: "datenqualitaet",
    metaTitle: "Datenqualität mit Agentic AI | eflury.com",
    metaDescription: "KI-Agenten, die Ihre Geschäftsdaten profilieren, deduplizieren, validieren und überwachen — mit menschlichen Freigabe-Gates und Schweizer Datenschutz.",
    keywords: "Datenqualität, Agentic AI, Datenbereinigung, Deduplizierung, Stammdaten, Datenvalidierung, Schweizer KMU, Claude, MCP",
    serviceType: "Datenqualität mit Agentic AI",
    heroTitle: "Saubere Daten, dauerhaft — mit Agentic AI",
    heroSubtitle: "Datenqualität",
    heroDescription: "Autonome KI-Agenten profilieren Ihre Daten, finden Duplikate, die keine Regel-Engine erkennt, validieren neue Einträge und überwachen die Qualität laufend — und jede Korrektur durchläuft ein menschliches Freigabe-Gate. Gebaut auf Claude, verbunden mit Ihren Systemen via MCP, ausgerichtet auf Schweizer Datenschutz.",
    problemTitle: "Kommt Ihnen das bekannt vor?",
    problems: [
      "\"Müller AG\", \"Mueller AG\" und \"Müller AG, Grenchen\" sind drei verschiedene Kunden in Ihrem CRM — und niemand traut der Kundenzahl",
      "Jeder Monatsabschluss beginnt mit stundenlangem manuellem Aufräumen in Excel, bevor jemand die Zahlen zu präsentieren wagt",
      "ERP, CRM und Excel-Listen widersprechen sich bei Adressen, Preisen oder Beständen — und der Abgleich ist irgendjemandes inoffizieller Nebenjob",
      "Eine Migration oder ein KI-Projekt steht still, weil \"die Daten nicht bereit sind\" — und niemand sagen kann, wann sie es sein werden",
      "Ihre bestehenden Datenqualitätsregeln brechen jedes Mal, wenn die Realität einen Fall produziert, für den niemand eine Regel geschrieben hat"
    ],
    solutionTitle: "Agenten, die Ihre Daten verstehen — statt nur Muster abzugleichen",
    solutionDescription: "Klassische Datenqualitäts-Tools führen handgeschriebene Regeln aus. Agentic AI liest Ihre Daten wie eine sorgfältige Mitarbeiterin: Sie erkennt, dass zwei unterschiedlich geschriebene Firmen derselbe Kunde sind, dass ein Preis für seine Produktgruppe unplausibel ist, dass sich ein Datumsformat nach dem letzten ERP-Update geändert hat. Moderne Claude-Modelle halten 200’000 bis 1 Million Tokens Kontext — grob 300 bis 2’500 Seiten oder Zehntausende Datensätze — sodass ein Agent Ihr Schema, Ihre Geschäftsregeln und grosse Datenstichproben gleichzeitig betrachten kann statt Zeile für Zeile. Das ist kein Nice-to-have: Gartner prognostiziert, dass bis Ende 2026 60% der KI-Projekte ohne AI-ready Data abgebrochen werden. Saubere Daten sind das Fundament, auf dem jede Automatisierung und jede KI-Initiative steht.",
    benefits: [
      {
        "title": "Semantische Deduplizierung",
        "description": "Findet Duplikate, die Fuzzy-Matching übersieht: Namensvarianten, Umlaute, Abkürzungen, umgezogene Adressen. Zusammenführungen werden in Batches vorgeschlagen und von einem Menschen geprüft, bevor sich irgendetwas ändert."
      },
      {
        "title": "Regeln in natürlicher Sprache",
        "description": "Beschreiben Sie auf Deutsch oder Englisch, was \"gültig\" bedeutet — der Agent macht daraus ausführbare Prüfungen. Kein Regel-Engine-Scripting, kein Berater-Lock-in. Genau dorthin bewegt sich die gesamte Branche."
      },
      {
        "title": "Laufende Überwachung statt jährlicher Putzaktion",
        "description": "Ein Monitoring-Agent beobachtet neue und geänderte Datensätze, meldet Anomalien ohne vordefinierte Schwellenwerte und zeigt die Datengesundheit auf einem Dashboard, dem Ihr Team wirklich vertraut."
      },
      {
        "title": "Kontextfenster, richtig eingesetzt",
        "description": "Grosse Kontextfenster ermöglichen Prüfungen über ganze Datensätze — aber publizierte Forschung (NVIDIA RULER, Chromas Context-Rot-Studie) zeigt: Der effektive Kontext ist kleiner als der beworbene. Seine Agenten kombinieren deshalb langen Kontext fürs Schlussfolgern mit direkten MCP-Datenbankabfragen und Batch-Verarbeitung, statt naiv \"eine Million Zeilen zu lesen\"."
      }
    ],
    processTitle: "So bringt Emanuel Ihre Daten in Ordnung",
    processSteps: [
      {
        "title": "Datenqualitäts-Audit",
        "description": "Agenten profilieren Ihre Systeme (ERP, CRM, Dateien) und erstellen einen bewerteten Report: Duplikate, Lücken, Inkonsistenzen, Format-Drift — jeweils mit Business-Impact."
      },
      {
        "title": "Bereinigung mit Freigabe-Gates",
        "description": "Bereinigungs-Agenten schlagen Korrekturen und Zusammenführungen in Batches vor; Sie geben frei. Ohne Freigabe wird nichts in Ihre Systeme zurückgeschrieben."
      },
      {
        "title": "Validierung an der Quelle",
        "description": "Neue Einträge werden bei der Erfassung geprüft — Plausibilität, Vollständigkeit, systemübergreifende Konsistenz — damit die Qualität gar nicht erst wieder abrutscht."
      },
      {
        "title": "Monitoring & Übergabe",
        "description": "Ein Datengesundheits-Dashboard (auf Wunsch in Power BI), sinnvolle Alarme und Training, damit Ihr Team das System selbstständig betreibt."
      }
    ],
    faqs: [
      {
        "question": "Was haben KI-Kontextfenster mit Datenqualität zu tun?",
        "answer": "Das Kontextfenster ist das Arbeitsgedächtnis des Modells. Aktuelle Claude-Modelle halten 200’000 bis 1 Million Tokens — mehrere hundert bis rund 2’500 Seiten oder Zehntausende Datensätze. Damit kann ein Agent Schema, Datenkatalog, Geschäftsregeln und grosse Stichproben gleichzeitig betrachten — genau das macht semantische Deduplizierung und tabellenübergreifende Konsistenzprüfungen möglich. Die Forschung (\"Lost in the Middle\", NVIDIAs RULER-Benchmark, Chromas Context-Rot-Studie 2025) zeigt aber: Modelle bauen deutlich vor der beworbenen Grenze ab. Deshalb kippt Emanuel nie Ihre Datenbank in einen Prompt: Agenten fragen sie über MCP ab, verarbeiten in Batches und reservieren das Kontextfenster fürs Schlussfolgern. Das ist der Unterschied zwischen einer Demo und einem System, dem Sie vertrauen können."
      },
      {
        "question": "Sind meine Daten sicher? Was ist mit dem revDSG?",
        "answer": "Ihre Daten bleiben in Ihren Systemen; Agenten greifen über MCP-Konnektoren lesend zu. Bei sensiblen Datensätzen arbeitet Emanuel mit Stichproben oder Redaktion, nutzen wo nötig EU-/Schweiz-gehostete Deployment-Optionen und dokumentieren jeden Verarbeitungsschritt. Anthropic trainiert seine Modelle standardmässig nicht auf API-Daten, und EU-Hosting (z.B. Frankfurt) ist verfügbar. Sie erhalten ein Bearbeitungsverzeichnis und ein revDSG-konformes Setup — keine Black Box."
      },
      {
        "question": "Halluziniert die KI nicht einfach \"Korrekturen\"?",
        "answer": "Unbeaufsichtigt kann sie das — genau deshalb wird keine Korrektur automatisch angewendet. Bereinigungs-Agenten schlagen vor, Menschen geben frei. Deterministische Prüfungen übernehmen, was Determinismus am besten kann (exakte Summen, Schlüssel-Integrität, referenzielle Prüfungen); der Agent übernimmt die semantischen Ermessensfälle. Dieses Human-in-the-Loop-Muster ist der Branchenstandard: Forresters Data-Quality-Wave vom Q1 2026 beschreibt agentische Bereinigung \"mit dem Menschen in der Schleife\" als die prägende Marktverschiebung."
      },
      {
        "question": "Was unterscheidet das von Informatica, Talend und den klassischen Tools?",
        "answer": "Das sind exzellente Enterprise-Plattformen — und selbst sie werden agentisch: Gartner hat die Kategorie 2024 in \"Augmented Data Quality Solutions\" umbenannt, und die etablierten Anbieter bauen Natural-Language-Regel-Agenten ein. Die Evidenz spricht für den Ansatz: In einem 2026 publizierten Benchmark aus einem echten Produktions-Deduplizierungsworkflow schlug LLM-basiertes Matching das langjährig eingesetzte regelbasierte System deutlich. Sein Service bringt dieses Muster zu Schweizer KMU in KMU-Massstab: Wochen statt Quartale, Fixpreise, gebaut auf Claude und MCP gegen die Systeme, die Sie bereits nutzen — bexio, ABACUS, Microsoft 365."
      },
      {
        "question": "Was kostet das, und wie lange dauert es?",
        "answer": "Das Datenqualitäts-Audit dauert etwa eine Woche und liefert einen bewerteten Report plus priorisierten Bereinigungsplan — das allein ist oft ein Augenöffner. Ein typisches Bereinigungs- und Monitoring-Setup dauert 4–8 Wochen. Die Preise folgen denselben transparenten Fixpreis-Paketen wie alle seine Services."
      },
      {
        "question": "Agentic AI ist stark gehypt. Warum sollte dieses Projekt gelingen?",
        "answer": "Berechtigte Frage — Gartner erwartet, dass über 40% der Agentic-AI-Projekte bis 2027 abgebrochen werden, meist wegen unklarem Geschäftsnutzen. Datenqualität ist das Gegenbeispiel, weil die Ausgangslage messbar ist, bevor die Arbeit beginnt: Duplikatquote, Fehlerquote, Stunden manueller Bereinigung pro Monat. Diese Kennzahlen definiert Emanuel im Audit — und Sie sehen sie nach jedem Bereinigungs-Batch. Wenn sie sich nicht bewegen, sehen Sie auch das."
      }
    ],
    ctaTitle: "Finden Sie heraus, wie sauber Ihre Daten wirklich sind",
    ctaDescription: "Buchen Sie ein kostenloses 30-Minuten-Gespräch. Sie schauen gemeinsam auf einen Ihrer Datensätze — und Emanuel sagt Ihnen ehrlich, was Agenten beheben können und was nicht.",
    ctaButtonText: "Kostenlosen Daten-Check buchen",
    relatedCaseStudy: {
      "title": "Finanzprozess-Automatisierung bei einem Schweizer Fertigungsbetrieb",
      "link": "/de/case-studies/finance-automation",
      "metric": "~CHF 48’000 projizierte jährliche Einsparungen"
    }
  },
  {
    slug: "claude-skills",
    metaTitle: "Claude Skills Entwicklung",
    metaDescription: "Massgeschneiderte Claude Skills für Ihre spezifischen Workflows. Automatisieren Sie repetitive Aufgaben mit KI, die Ihr Geschäft versteht.",
    keywords: "Claude Skills, Claude Code, KI Automatisierung, individuelle KI-Entwicklung, Schweizer KI-Berater",
    serviceType: "Claude Skills Entwicklung",
    heroTitle: "Massgeschneiderte Claude Skills für Ihr Unternehmen",
    heroSubtitle: "Claude Spezialist",
    heroDescription: "Emanuel entwickelt individuelle Claude Skills, die Ihre spezifischen Workflows automatisieren — von Dokumentenverarbeitung bis Datenanalyse. Jeder Skill spart Ihrem Team wöchentlich Stunden.",
    problemTitle: "Kommt Ihnen das bekannt vor?",
    problems: [
      "Ihr Team verbringt Stunden mit repetitiven Dokumentenaufgaben, die KI erledigen könnte",
      "Sie haben ChatGPT ausprobiert, aber es integriert sich nicht in Ihre Workflows",
      "Generische KI-Tools verstehen Ihre branchenspezifischen Anforderungen nicht",
      "Sie brauchen Automatisierung, die mit Ihrer bestehenden Schweizer Business-Software funktioniert"
    ],
    solutionTitle: "Individuelle Claude Skills — Für Sie gebaut",
    solutionDescription: "Emanuel entwickelt Claude Skills, die exakt auf Ihre Workflows zugeschnitten sind. Keine generischen Vorlagen — individuelle KI, die Ihr Geschäft versteht, sich in Ihre Tools integriert und messbare Zeiteinsparungen liefert.",
    benefits: [
      {
        "title": "Massgeschneidert für Ihre Workflows",
        "description": "Jeder Skill ist auf Ihre spezifischen Prozesse, Terminologie und Anforderungen ausgelegt."
      },
      {
        "title": "Schweizer Software-Integration",
        "description": "Funktioniert mit Bexio, ABACUS, Microsoft 365 und anderen Tools, die Sie bereits nutzen."
      },
      {
        "title": "Messbare Zeiteinsparungen",
        "description": "Typische Kunden sparen 15-30 Stunden pro Woche mit 3-5 individuellen Skills."
      },
      {
        "title": "Kontinuierliche Verbesserung",
        "description": "Skills werden mit der Zeit intelligenter, basierend auf Ihrem Feedback."
      }
    ],
    processTitle: "So entwickelt Emanuel Ihre Skills",
    processSteps: [
      {
        "title": "Workflow-Analyse",
        "description": "Emanuel untersucht Ihre aktuellen Prozesse, um die besten Automatisierungsmöglichkeiten zu identifizieren."
      },
      {
        "title": "Skill-Design",
        "description": "Emanuel definiert exakt, was jeder Skill tun soll, inklusive Inputs, Outputs und Sonderfälle."
      },
      {
        "title": "Entwicklung & Testing",
        "description": "Emanuel baut und testen jeden Skill gründlich mit Ihren echten Daten."
      },
      {
        "title": "Schulung & Übergabe",
        "description": "Ihr Team lernt, die Skills selbstständig zu nutzen und zu pflegen."
      }
    ],
    faqs: [
      {
        "question": "Was genau ist ein Claude Skill?",
        "answer": "Ein Claude Skill ist eine individuelle KI-Automatisierung auf Basis von Anthropics Claude. Es ist ein spezialisierter Prompt + Workflow, der spezifische Aufgaben wie Dokumentenverarbeitung, Datenextraktion, Berichterstellung oder E-Mail-Entwürfe erledigt."
      },
      {
        "question": "Wie lange dauert die Entwicklung eines Skills?",
        "answer": "Einfache Skills dauern 1-2 Wochen. Komplexe Skills mit mehreren Integrationen 3-4 Wochen. Die meisten Kunden starten mit 3-5 Skills, die ihre wichtigsten Workflows abdecken."
      },
      {
        "question": "Können Skills mit meiner bestehenden Software arbeiten?",
        "answer": "Ja. Emanuel ist spezialisiert auf die Integration von Claude Skills mit Schweizer Business-Software, einschliesslich Bexio, ABACUS, Microsoft 365 und individuellen Systemen via APIs oder MCP."
      },
      {
        "question": "Was ist der Unterschied zwischen Claude Skills und ChatGPT?",
        "answer": "ChatGPT ist ein allgemeines Chat-Tool. Claude Skills sind individuelle Automatisierungen, die spezifische Aufgaben in Ihrem Workflow erledigen — sie handeln, statt nur zu antworten."
      },
      {
        "question": "Was kostet ein Claude Skill?",
        "answer": "Einzelne Skills starten bei CHF 2'000. Die meisten Kunden investieren CHF 10'000-25'000 für ein komplettes Skills-Paket (3-5 Skills plus Schulung)."
      }
    ],
    ctaTitle: "Bereit zur Automatisierung mit Claude Skills?",
    ctaDescription: "Buchen Sie ein kostenloses 30-Minuten-Gespräch. Emanuel analysiert Ihre Workflows und identifizieren Ihre wirkungsvollsten Automatisierungsmöglichkeiten.",
    ctaButtonText: "Skills-Strategiegespräch buchen",
    relatedCaseStudy: {
      "title": "Claude Skills in Aktion",
      "link": "/de/case-studies/taxed-gmbh",
      "metric": "27.5 Std/Woche gespart"
    }
  },
  {
    slug: "mcp-integration",
    metaTitle: "MCP Server Integration",
    metaDescription: "Verbinden Sie Claude mit Ihren Geschäftssystemen über Model Context Protocol. Nahtlose Integration mit Datenbanken, APIs und Unternehmenssoftware.",
    keywords: "MCP Integration, Model Context Protocol, Claude Integration, API Automatisierung, Schweizer Business-Automatisierung",
    serviceType: "MCP Server Integration",
    heroTitle: "Verbinden Sie Claude mit Ihren Geschäftssystemen",
    heroSubtitle: "MCP Spezialist",
    heroDescription: "Model Context Protocol (MCP) ermöglicht Claude die direkte Interaktion mit Ihren Datenbanken, APIs und Software. Emanuel baut individuelle MCP-Integrationen, die Claude in eine echte Business-Automatisierungsplattform verwandeln.",
    problemTitle: "Die Integrations-Herausforderung",
    problems: [
      "KI-Tools können nicht auf Ihre internen Datenbanken und Systeme zugreifen",
      "Manuelle Dateneingabe zwischen KI-Outputs und Ihrer Software verschwendet Zeit",
      "Sie brauchen Echtzeitdaten, damit KI genaue Entscheidungen treffen kann",
      "Sicherheitsbedenken verhindern die Verbindung von KI mit sensiblen Geschäftssystemen"
    ],
    solutionTitle: "MCP — Das fehlende Glied",
    solutionDescription: "Model Context Protocol ist Anthropics Standard zur sicheren Verbindung von Claude mit externen Systemen. Emanuel entwirft und implementieren individuelle MCP-Server, die Claude kontrollierten Zugriff auf Ihre Geschäftsdaten geben.",
    benefits: [
      {
        "title": "Direkter Systemzugriff",
        "description": "Claude liest und schreibt direkt in Ihre Datenbanken, CRMs und Business-Software."
      },
      {
        "title": "Echtzeit-Daten",
        "description": "Keine veralteten Exporte mehr. KI-Entscheidungen basierend auf Live-Geschäftsdaten."
      },
      {
        "title": "Sicher by Design",
        "description": "MCP bietet granulare Berechtigungskontrollen. Claude greift nur auf das zu, was Sie erlauben."
      },
      {
        "title": "Schweizer Hosting-Optionen",
        "description": "MCP-Server können auf Ihrer Infrastruktur laufen für maximale Datenhoheit."
      }
    ],
    processTitle: "MCP-Integrationsprozess",
    processSteps: [
      {
        "title": "System-Audit",
        "description": "Emanuel analysiert Ihre aktuellen Systeme und identifizieren Integrationsmöglichkeiten."
      },
      {
        "title": "Architektur-Design",
        "description": "Emanuel entwirft die MCP-Server-Architektur mit Fokus auf Sicherheit und Performance."
      },
      {
        "title": "Entwicklung & Deployment",
        "description": "Emanuel baut und deployen individuelle MCP-Server, entweder Cloud-gehostet oder On-Premise."
      },
      {
        "title": "Testing & Sicherheitsreview",
        "description": "Umfassende Tests stellen sicheren, zuverlässigen Betrieb sicher."
      }
    ],
    faqs: [
      {
        "question": "Was ist MCP (Model Context Protocol)?",
        "answer": "MCP ist Anthropics offener Standard zur Verbindung von KI-Modellen mit externen Datenquellen. Es ist wie ein universeller Adapter, der Claude sicheren Zugriff auf Datenbanken, APIs und Dateisysteme ermöglicht."
      },
      {
        "question": "Ist MCP sicher für sensible Geschäftsdaten?",
        "answer": "Ja. MCP enthält eingebaute Sicherheitsfunktionen: Authentifizierung, Berechtigungsscopes und Audit-Logging. Sie kontrollieren exakt, worauf Claude zugreifen kann."
      },
      {
        "question": "Welche Systeme können Sie mit MCP integrieren?",
        "answer": "Jedes System mit API oder Datenbankverbindung: ERP-Systeme (SAP, ABACUS), CRMs (Salesforce, HubSpot), Datenbanken (PostgreSQL, MySQL), Cloud-Services und individuelle interne Systeme."
      },
      {
        "question": "Wie unterscheidet sich MCP von traditionellen API-Integrationen?",
        "answer": "Traditionelle Integrationen sind einseitig. MCP ermöglicht KI-native Integration: Claude versteht Ihren Datenkontext und kann intelligente Aktionen über Systeme hinweg ausführen."
      },
      {
        "question": "Was kostet ein MCP-Integrationsprojekt?",
        "answer": "Einfache MCP-Integrationen starten bei CHF 5'000. Komplexe Enterprise-Integrationen liegen bei CHF 15'000-30'000. Laufende Wartung kostet CHF 500-1'500/Monat."
      }
    ],
    ctaTitle: "Verbinden Sie Ihre Systeme mit KI",
    ctaDescription: "Besprechen Sie mit Emanuel, wie MCP Claude in eine integrierte Automatisierungsplattform für Ihr Unternehmen verwandeln kann.",
    ctaButtonText: "MCP-Beratungsgespräch buchen",
    relatedCaseStudy: {
      "title": "MCP in Produktion",
      "link": "/de/case-studies/taxed-gmbh",
      "metric": "5 Systeme verbunden"
    }
  },
  {
    slug: "ki-betrieb",
    metaTitle: "Managed AI Operations - Betrieb Ihrer Automatisierungen | eflury.com",
    metaDescription: "Laufender Betrieb Ihrer KI-Automatisierungen: Monitoring, monatlicher Kennzahlenbericht, Verbesserungs-Backlog und Re-Validierung nach Plattform-Updates — ab publiziertem Tarif von CHF 1'200/Monat.",
    keywords: "Managed AI Operations, KI-Monitoring, Automatisierung Support, Claude Skills Wartung, Schweizer KMU, Extended Support",
    serviceType: "Managed AI Operations",
    heroTitle: "Bauen ist die halbe Arbeit. Emanuel übernimmt die andere Hälfte.",
    heroSubtitle: "Managed AI Operations",
    heroDescription: "Automatisierungen schaffen nur Wert, solange sie funktionieren. Emanuel betreibt die Systeme, die er für Sie baut: regelmässige Health-Checks, ein monatlicher schriftlicher Kennzahlenbericht, ein priorisiertes Verbesserungs-Backlog — und Re-Validierung, wenn sich die KI-Plattformen darunter ändern. Ohne dass Sie einen KI-Engineer einstellen müssen.",
    problemTitle: "Kommt Ihnen das bekannt vor?",
    problems: [
      "Beim Go-live funktionierte die Automatisierung — sechs Monate später kann niemand sagen, ob sie noch performt",
      "Modell- und API-Updates erscheinen alle paar Monate, und niemand ist zuständig, sie gegen Ihre Workflows zu testen",
      "Fehler fallen auf, wenn ein Kunde reklamiert — nicht, wenn sie passieren",
      "Die eine Person, die das System verstand, ist ausgelastet, in den Ferien oder weg",
      "Sie wollen den Nutzen der KI-Automatisierung, ohne einen KI-Engineer auf der Lohnliste zu haben"
    ],
    solutionTitle: "Betrieb als Produkt: gemessen, monatlich, schriftlich",
    solutionDescription: "Managed AI Operations ist Phase 5 der eflury Method™ — Optimierung — als kontinuierlicher Service. Emanuel übernimmt den Betrieb der Automatisierungen, die er gebaut hat: regelmässige Health-Checks, Monitoring von Fehlerraten und Nutzung sowie ein monatlicher schriftlicher Kennzahlenbericht mit Zeitersparnis, Fehlerraten und Nutzung — denselben Zahlen, die der ursprüngliche Business Case versprochen hat. Jeder Bericht kommt mit einem priorisierten Verbesserungs-Backlog, und ein kurzes monatliches Review ist alles, was es Ihr Team an Zeit kostet. Werden Claude-Modelle oder APIs aktualisiert, testet Emanuel Ihre Workflows gegen die Änderungen und passen an, wo nötig — damit Ihre Automatisierungen mit der Plattform Schritt halten, statt still zu degradieren.",
    benefits: [
      {
        "title": "Betriebskompetenz ohne Einstellung",
        "description": "Sie erhalten Monitoring, Wartung und Plattform-Expertise als Service — statt eine Rolle zu rekrutieren, die schwer zu besetzen und noch schwerer auszulasten ist."
      },
      {
        "title": "Gemessen, monatlich, schriftlich",
        "description": "Ein monatlicher Kennzahlenbericht — Zeitersparnis, Fehlerraten, Nutzung — plus priorisiertes Verbesserungs-Backlog. Sie wissen jederzeit, ob sich das System noch verdient."
      },
      {
        "title": "Ein publizierter Preis",
        "description": "Der laufende Betrieb startet beim publizierten Extended-Support-Tarif seiner Preisseite: CHF 1’200/Monat mit 4-Stunden-Reaktionszeit und monatlichen Check-ins. Grössere Setups erhalten eine schriftliche Fixofferte."
      },
      {
        "title": "Kein Lock-in, nie",
        "description": "Die Dokumentation bleibt als Teil des Service aktuell. Sie können den Betrieb jederzeit selbst übernehmen — kein Lock-in ist ein erklärtes Prinzip seiner Methode."
      }
    ],
    processTitle: "So läuft der Service",
    processSteps: [
      {
        "title": "Übergabe & Baseline",
        "description": "Emanuel dokumentiert den Ist-Zustand und vereinbaren die relevanten Kennzahlen: Zeitersparnis, Fehlerraten, Nutzung — jeden Monat gleich gemessen."
      },
      {
        "title": "Monitoring & Health-Checks",
        "description": "Regelmässige Prüfung Ihrer Automatisierungen und ihrer Datenflüsse; Anomalien werden markiert und untersucht, bevor sie Ihre Kunden erreichen."
      },
      {
        "title": "Monatsbericht & Review",
        "description": "Ein schriftlicher Kennzahlenbericht mit priorisiertem Verbesserungs-Backlog — gemeinsam durchgesprochen in einem kurzen monatlichen Review."
      },
      {
        "title": "Verbesserungen & Re-Validierung",
        "description": "Backlog-Punkte werden zu Fixpreisen umgesetzt; nach Modell- oder API-Updates testet Emanuel Ihre Workflows neu und passen an, wo nötig."
      }
    ],
    faqs: [
      {
        "question": "Was kostet es?",
        "answer": "Der Ausgangspunkt ist auf seiner Preisseite publiziert: Extended Support für CHF 1’200/Monat, mit 4-Stunden-Reaktionszeit und monatlichen Check-ins. Setups mit mehr Systemen oder strengeren Anforderungen erhalten vor dem Start eine schriftliche Fixofferte — keine Tagessätze, kein offenes Ende."
      },
      {
        "question": "Brauchen wir das überhaupt?",
        "answer": "Ehrlich: vielleicht nicht. Jedes Projekt übergebt Emanuel mit vollständiger Dokumentation und Team-Schulung, sodass Sie ohne Emanuel betreiben können — das ist sein No-Lock-in-Prinzip. Managed Operations ist für Teams, die die Betriebskompetenz lieber einkaufen als aufbauen. Beides sind saubere Entscheidungen."
      },
      {
        "question": "Was steht im Monatsbericht?",
        "answer": "Die Phase-5-Deliverables der eflury Method™: ein Kennzahlenbericht mit Zeitersparnis, Fehlerraten und Nutzung plus ein priorisiertes Verbesserungs-Backlog. Der Punkt ist: Sie können jeden Monat überprüfen, ob die Automatisierung noch liefert, was der Business Case versprochen hat."
      },
      {
        "question": "Warum brauchen Automatisierungen überhaupt laufende Betreuung?",
        "answer": "Weil sich ihre Umgebung bewegt: KI-Modelle werden aktualisiert, APIs ändern sich, Ihre Prozesse und Daten entwickeln sich weiter. Ein Workflow, der beim Go-live getestet wurde, kann unter einer neuen Modellversion oder einem geänderten Eingabeformat still degradieren. Re-Validierung nach Plattformänderungen ist genau die Arbeit, die intern nie priorisiert wird — also macht Emanuel sie zu jemandes explizitem Job."
      },
      {
        "question": "Betreiben Sie auch Systeme, die Sie nicht gebaut haben?",
        "answer": "Am liebsten betreibt Emanuel, was er gebaut hat — das kennt Emanuel Zeile für Zeile. Bei bestehenden Claude/MCP-Setups von Dritten startet Emanuel mit einem KI-Audit, um den Ist-Zustand zu dokumentieren; danach ist die Betriebsübernahme meist unkompliziert."
      },
      {
        "question": "Was passiert im Betrieb mit unseren Daten?",
        "answer": "Dieselben Regeln wie in jedem Projekt: Ihre Daten bleiben in Ihren Systemen, der Zugriff erfolgt lesend über MCP-Konnektoren, und Änderungen brauchen menschliche Freigabe. Jeder Dienst, auf den er sich stützt, ist auf der Seite Sicherheit & Vertrauen offengelegt."
      }
    ],
    ctaTitle: "Sorgen Sie dafür, dass sich Ihre Automatisierungen weiter verdienen",
    ctaDescription: "Buchen Sie ein kostenloses 30-Minuten-Gespräch. Emanuel schaut an, was heute bei Ihnen läuft — und sagen Ihnen ehrlich, ob sich Managed Operations in Ihrem Fall lohnt.",
    ctaButtonText: "Kostenloses Betriebs-Gespräch buchen",
    relatedCaseStudy: {
      "title": "Power BI Executive Dashboard für ein Dienstleistungsunternehmen",
      "link": "/de/case-studies/power-bi-reporting",
      "metric": "~15 h/Woche geschätzte Zeitersparnis"
    }
  }
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
