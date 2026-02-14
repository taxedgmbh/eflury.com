---
title: "Agentic AI für Unternehmen: Wann autonome AI Agents in 2026 einsetzen"
description: "Agentic AI verstehen und wann Schweizer KMU autonome Agenten einsetzen sollten. Erfahren Sie, welche Anwendungsfälle ROI liefern, welche scheitern werden und wie Goldman Sachs bereits Claude Agents für Compliance einsetzt."
pubDate: 2026-02-18
author: "Emanuel Flury"
tags: ["Agentic AI", "AI Agents", "Schweizer KMU", "Automation"]
lang: "de"
translationKey: "agentic-ai-2026"
---

Ein Bankkunde stellte mir kürzlich eine Frage, über die vermutlich viele Schweizer Führungskräfte nachdenken: *"Wir haben Chatbots implementiert, wir nutzen Automation – was genau ist diese 'Agentic AI', von der alle sprechen, und warum prognostiziert Gartner, dass 40% der Unternehmensanwendungen bis Ende 2026 AI Agents enthalten werden?"*

Es ist eine berechtigte Frage, besonders wenn man bedenkt, dass derzeit weniger als 5% der Unternehmensanwendungen agentenbasierte Fähigkeiten beinhalten. Der Begriff "Agentic AI" ist zu einem dieser Schlagworte geworden, die gleichzeitig revolutionär und undurchdringlich technisch klingen – die Art von Jargon, die in Analystenberichten und Verkaufspräsentationen auftaucht, aber selten mit konkreten Erklärungen, was es tatsächlich bedeutet oder wann man sich dafür interessieren sollte.

Die Realität ist, wie so oft bei aufkommenden Technologien, sowohl einfacher als auch nuancierter als das Marketing suggeriert. Agentic AI repräsentiert eine echte Weiterentwicklung darin, wie Unternehmen künstliche Intelligenz nutzen können, aber sie ist nicht für jede Situation geeignet, und das Verständnis des Unterschieds zwischen geeigneten und ungeeigneten Anwendungsfällen könnte die wichtigste strategische Entscheidung sein, die Technologieführer 2026 treffen werden.

---

## Wichtigste Erkenntnisse

> **Für Führungskräfte:** Agentic AI bezieht sich auf KI-Systeme, die mehrstufige Ziele mit minimaler menschlicher Intervention autonom verfolgen können – nicht nur auf Eingabeaufforderungen reagieren, sondern planen, ausführen und sich anpassen. Gartner prognostiziert explosives Wachstum (40% der Unternehmens-Apps bis Ende 2026), und die Technologie generiert bereits messbaren ROI bei Firmen wie Goldman Sachs. Jedoch werden ca. 40% der anfänglichen Implementierungen scheitern, hauptsächlich weil Agenten auf Legacy-Systeme aufgesetzt werden, anstatt Workflows neu zu gestalten. Die wertvollsten ersten Anwendungsfälle für Schweizer KMU sind Kreditorenbuchhaltung/Debitorenbuchhaltung-Automation, Compliance-Prüfung und intelligente Datenextraktion – aber nur wenn sie mit angemessener Workflow-Neugestaltung und menschlichen Kontrollpunkten implementiert werden.

---

## Was ist Agentic AI? (Und was sie nicht ist)

Die Verwirrung um Agentic AI ist verständlich, angesichts der Tatsache, dass die Technologielandschaft bereits Chatbots, Robotic Process Automation (RPA) und verschiedene andere Formen von "intelligenten" Systemen umfasst. Um das Rauschen zu durchdringen, hilft es, klare Unterscheidungen zu treffen.

### Der grundlegende Unterschied

**Traditionelle KI-Systeme** (einschliesslich der meisten Chatbots und aktuellen Automatisierungswerkzeuge) arbeiten nach einem grundsätzlich reaktiven Modell: Sie warten darauf, dass ein Mensch eine Aufforderung oder einen Auslöser gibt, sie führen eine vordefinierte Antwort oder einen vordefinierten Workflow aus, und dann warten sie auf die nächste Anweisung. Der Mensch behält die Kontrolle sowohl über das Ziel als auch über den Ausführungspfad.

**Agentic AI-Systeme** hingegen arbeiten mit einem Grad an Autonomie, der eine qualitative Verschiebung in der Fähigkeit darstellt. Wenn Sie einem agentischen System ein Ziel vorgeben, kann es:

- Dieses Ziel in Teilaufgaben **zerlegen**, ohne dass Sie jeden Schritt spezifizieren müssen
- Eine Abfolge von Aktionen zur Erreichung dieser Teilaufgaben **planen**, wobei es seinen Ansatz basierend auf Zwischenergebnissen anpasst
- Diese Aktionen über mehrere Systeme und Datenquellen hinweg **ausführen**, potenziell über einen längeren Zeitraum
- Seinen eigenen Fortschritt **überwachen**, erkennen, wenn ein gewählter Ansatz nicht funktioniert, und seine Strategie autonom anpassen
- Sich von Fehlern oder unerwarteten Situationen **erholen**, ohne sofort auf menschliche Intervention zu eskalieren

Dies ist nicht bloss eine quantitative Verbesserung der Automatisierungsfähigkeiten – es repräsentiert ein fundamental anderes Paradigma dafür, wie KI-Systeme innerhalb von Geschäftsprozessen operieren.

### Ein praktisches Beispiel: Rechnungsverarbeitung

Um diese Unterscheidung konkret zu machen, betrachten Sie die scheinbar einfache Aufgabe, eine Lieferantenrechnung zu verarbeiten:

**Traditioneller RPA-Ansatz:**
1. Mensch: Daten aus Rechnungs-PDF extrahieren
2. System: OCR ausführen, Formularfelder ausfüllen
3. Mensch: Kontierung verifizieren
4. System: Eintrag im ERP-System erstellen
5. Mensch: Genehmigungsworkflow starten

Jeder Schritt erfordert explizite Programmierung, und jede Abweichung vom erwarteten Format (eine handschriftliche Notiz, eine ungewöhnliche Artikelbeschreibung, ein nicht-standardisiertes Layout) erfordert typischerweise menschliche Intervention zur Behandlung der Ausnahme.

**Agentic AI-Ansatz:**
1. Mensch: "Verarbeite diese Rechnung gemäss unseren Standard-Beschaffungsrichtlinien"
2. Agent autonom:
   - Extrahiert Daten aus der Rechnung unabhängig von Formatvariationen
   - Identifiziert die relevante Bestellung im ERP-System (auch wenn die Bestellnummer fehlt oder falsch ist)
   - Verifiziert, dass die Preise mit vereinbarten Konditionen übereinstimmen, eskaliert Abweichungen über definierten Schwellenwerten
   - Bestimmt die entsprechende Kontierung basierend auf historischen Mustern und Unternehmensrichtlinien
   - Leitet zur Genehmigung weiter basierend auf Betrag, Abteilung und Budgetstatus
   - Überwacht den Genehmigungsprozess und sendet bei Bedarf entsprechende Erinnerungen
   - Erstellt finale Buchungseinträge nach Genehmigung
   - Aktualisiert Lieferantendaten mit Lieferleistungsdaten

Der entscheidende Unterschied ist, dass der Agent den gesamten End-to-End-Prozess handhabt, dabei Dutzende von Mikro-Entscheidungen trifft, sich an Variationen in Rechnungsformat und -inhalt anpasst und nur Menschen einbezieht, wenn echte Beurteilungen seine Autoritätsgrenzen überschreiten.

### Wie sich Agentic AI von RPA und Chatbots unterscheidet

| Dimension | Chatbots | RPA | Agentic AI |
|-----------|----------|-----|------------|
| **Interaktionsmodell** | Konversationsantworten auf Benutzeranfragen | Automatisierte Ausführung definierter Workflows | Autonomes Verfolgen von Zielen |
| **Planungsfähigkeit** | Keine (reagiert auf jede Eingabe unabhängig) | Minimal (folgt Skript) | Hoch (erstellt und passt mehrstufige Pläne an) |
| **Fehlerbehandlung** | Bittet um Klärung oder eskaliert | Scheitert typischerweise und alarmiert Menschen | Versucht alternative Ansätze vor Eskalation |
| **Umfang** | Einzelner Konversationsschritt | Einzelner vordefinierter Prozess | Multi-Prozess-Workflows über Systeme hinweg |
| **Menschliche Aufsicht** | Nach jedem Austausch | An definierten Kontrollpunkten | Nur an Entscheidungsschwellen |
| **Lernen** | Mustererkennung innerhalb der Konversation | Keine (deterministische Regeln) | Passt Strategien basierend auf Ergebnissen an |

---

## Die Marktrealität: Explosives Wachstum (und erhebliche Fehlerquote)

Die Analystenprojektionen für die Agentic AI-Adoption sind bemerkenswert, nicht nur wegen ihres Optimismus, sondern wegen der Geschwindigkeit der erwarteten Transformation.

### Die Gartner-Prognose

Laut [Gartners 2025 strategischem Technologietrend-Bericht](https://www.gartner.com/en/articles/gartner-top-10-strategic-technology-trends-for-2026) wird der Prozentsatz der Unternehmensanwendungen, die Agentic AI-Fähigkeiten beinhalten, bis **Ende 2026 40% erreichen**, von weniger als 5% Anfang 2025. Dies repräsentiert eine der schnellsten Technologie-Adoptionskurven, die Gartner in den letzten Jahren verfolgt hat.

### Marktgrösse und Wachstum

Die finanziellen Projektionen erzählen eine ergänzende Geschichte. Der globale Agentic AI-Markt wird voraussichtlich von ca. **7,8 Milliarden USD in 2025 auf 52 Milliarden USD bis 2030** wachsen, laut [Markets and Markets Research](https://www.marketsandmarkets.com/Market-Reports/agentic-ai-market-259715837.html). Dies repräsentiert eine zusammengesetzte jährliche Wachstumsrate von über 45% – die Art von Entwicklung, die typischerweise mit wirklich transformativen Technologien assoziiert wird, nicht mit inkrementellen Verbesserungen.

### Der Realitätscheck: Warum 40% scheitern werden

Bevor wir uns jedoch von der Begeisterung mitreissen lassen, ist es wichtig, eine ernüchternde Statistik anzuerkennen, die Gartner neben ihren Wachstumsprognosen einschliesst: Sie schätzen, dass **mehr als 40% der anfänglichen Agentic AI-Implementierungen nicht den erwarteten Wert liefern werden**, wobei die Mehrheit dieser Fehler auf einen einzigen fundamentalen Fehler zurückzuführen ist.

Der Fehler? **Der Versuch, Agentic AI-Fähigkeiten auf bestehende Legacy-Systeme und -Prozesse aufzusetzen, anstatt Workflows neu zu gestalten, um die einzigartigen Fähigkeiten der Technologie zu nutzen.**

Dieses Muster sollte jedem vertraut klingen, der länger als ein paar Jahre in der Technologieführung tätig war – es ist im Wesentlichen der gleiche Fehler, den Organisationen machten, als sie versuchten, papierbasierte Prozesse zu "digitalisieren", indem sie einfach digitale Versionen von Papierformularen erstellten, oder als sie versuchten, Desktop-Anwendungen zu "mobilisieren", indem sie die Benutzeroberfläche verkleinerten, damit sie auf ein Telefon passt.

Die Organisationen, die mit Agentic AI erfolgreich sein werden, sind diejenigen, die nicht fragen "Wie können wir unseren aktuellen Prozess autonom machen?", sondern vielmehr "Wenn wir diesen Prozess von Grund auf neu gestalten würden, mit verfügbaren agentischen Fähigkeiten, wie würde er aussehen?"

---

## Praxiseinsatz: Goldman Sachs und Claude Agents

Während viele Diskussionen über Agentic AI spekulativ bleiben oder sich auf zukünftige Möglichkeiten konzentrieren, gibt es bereits überzeugende Beispiele für grossflächige Produktionsimplementierungen, die messbaren Geschäftswert liefern.

### Goldman Sachs' Implementierung

Vielleicht der bemerkenswerteste Frühadoptierer ist Goldman Sachs, die [Claude-basierte Agenten über mehrere Geschäftsfunktionen hinweg eingesetzt haben](https://www.anthropic.com/customers/goldman-sachs), mit besonders signifikanten Implementierungen in Buchhaltungsabstimmung und regulatorischen Compliance-Workflows.

**Der Buchhaltungsabstimmungs-Anwendungsfall:** Goldman Sachs verarbeitet täglich Millionen von Transaktionen über Dutzende von Systemen und juristischen Einheiten hinweg. Traditionell erforderte die Abstimmung Armeen von Analysten, die manuell Datensätze über Systeme hinweg verglichen, Diskrepanzen untersuchten und ihre Erkenntnisse dokumentierten – Arbeit, die sowohl zeitintensiv als auch fehleranfällig war aufgrund des schieren Volumens und der Komplexität.

Das von ihnen eingesetzte Claude-basierte agentische System:
- Greift autonom auf Daten über mehrere Buchhaltungssysteme und Handelsplattformen zu
- Identifiziert Diskrepanzen, die Untersuchung erfordern, basierend auf Wesentlichkeitsschwellen und Risikofaktoren
- Recherchiert potenzielle Ursachen durch Untersuchung verwandter Transaktionen, Systemlogs und historischer Muster
- Generiert vorläufige Erklärungen für Diskrepanzen unter Angabe spezifischer Nachweise
- Leitet Punkte, die menschliches Urteilsvermögen erfordern, mit vollem Kontext an geeignete Spezialisten weiter
- Dokumentiert alle Erkenntnisse im erforderlichen regulatorischen Format

**Ergebnisse:** Goldman Sachs berichtet, dass das System die für bestimmte Abstimmungsprozesse erforderliche Zeit um mehr als 60% reduziert hat, während gleichzeitig die Vollständigkeit und Konsistenz der Dokumentation verbessert wurde – eine Kombination von Vorteilen, die schwer durch reine Automatisierung oder zusätzliches Personal zu erreichen wäre.

**Der Compliance-Prüfungs-Anwendungsfall:** Finanzinstitute unterliegen ausserordentlich komplexen und sich ständig weiterentwickelnden regulatorischen Anforderungen. Goldman Sachs hat agentische Systeme eingesetzt, die Transaktionen und Kommunikation auf potenzielle Compliance-Probleme überwachen, automatisch die relevanten regulatorischen Anforderungen referenzieren und Punkte eskalieren, die rechtliche Überprüfung erfordern.

Der kritische Unterschied zu traditionellen regelbasierten Compliance-Systemen ist die Fähigkeit des Agenten, Kontext und Nuancen zu verstehen, anstatt einfach Schlüsselwörter oder Schwellenwerte abzugleichen. Dies reduziert falsch-positive Ergebnisse erheblich, während gleichzeitig die Erkennung von wirklich besorgniserregenden Mustern verbessert wird, die möglicherweise nicht vordefinierten Regeln entsprechen.

### Was macht diese Implementierungen erfolgreich

Mehrere Faktoren unterscheiden Goldman Sachs' erfolgreiche Implementierungen von den gescheiterten Projekten, die Gartner prognostiziert:

1. **Workflow-Neugestaltung:** Anstatt zu versuchen, bestehende manuelle Prozesse Schritt-für-Schritt zu automatisieren, haben sie die Workflows neu konzipiert, um die Stärken des Agenten zu nutzen
2. **Klare Autoritätsgrenzen:** Die Agenten haben wohldefinierte Entscheidungsschwellen, jenseits derer sie an Menschen eskalieren müssen
3. **Umfassender Kontext:** Die Systeme haben Zugriff auf alle relevanten Datenquellen, anstatt isoliert zu operieren
4. **Kontinuierliches Lernen:** Die Implementierungen beinhalten Feedback-Schleifen, die die Leistung im Laufe der Zeit verbessern
5. **Geeignete Anwendungsfälle:** Sowohl Buchhaltung als auch Compliance beinhalten substanzielle Informationsverarbeitung und Regelanwendung – Aufgaben, die gut für agentische Fähigkeiten geeignet sind

---

## Wann Agentic AI einsetzen: Die besten ersten Anwendungsfälle für Schweizer KMU

Für Schweizer kleine und mittlere Unternehmen, die Agentic AI in Betracht ziehen, ist die Frage nicht, ob die Technologie Verdienste hat – das Goldman Sachs-Beispiel demonstriert, dass sie das tut – sondern vielmehr, welche spezifischen Anwendungen die beste Kombination aus Geschäftswert, Implementierungsmachbarkeit und handhabbarem Risiko für Organisationen ohne Goldmans Ressourcen oder technische Tiefe bieten.

### Hochwertige erste Anwendungsfälle

Basierend auf Implementierungen, die ich für Schweizer KMU geleitet habe, und dem Muster erfolgreicher Implementierungen global, liefern die folgenden Anwendungsfälle konsistent starken ROI, während sie für Organisationen, die neu in agentischen Systemen sind, erreichbar bleiben:

#### 1. Kreditoren- und Debitorenbuchhaltungs-Workflows

**Warum dies gut funktioniert:** Kreditorenbuchhaltungs-/Debitorenbuchhaltungs-Prozesse beinhalten substanzielle routinemässige Entscheidungsfindung innerhalb wohldefinierter Richtlinien, nutzen Daten aus mehreren Systemen (Rechnungen, Bestellungen, Verträge, ERP) und bieten messbare Zeitersparnisse und Fehlerreduktion.

**Was der Agent tut:**
- Verarbeitet eingehende Rechnungen in jedem Format (PDF, E-Mail, Papier-Scan, EDI)
- Gleicht Rechnungen mit Bestellungen und Wareneingangsdokumenten ab (3-Wege-Abgleich)
- Identifiziert und untersucht Diskrepanzen bei Preisen, Mengen oder Bedingungen
- Wendet unternehmensspezifisches Genehmigungsrouting basierend auf Betrag, Kategorie und Budgetstatus an
- Generiert Zahlungsläufe gemäss Zahlungsbedingungen und Cashflow-Richtlinien
- Bearbeitet Lieferantenanfragen zum Zahlungsstatus durch Zugriff auf mehrere Systeme

**Erwartete Ergebnisse:** 60-75% Reduktion der Verarbeitungszeit pro Rechnung, 80%+ Reduktion von Zahlungsfehlern, verbesserte Lieferantenbeziehungen durch schnellere Anfragenbearbeitung.

**Schweiz-spezifischer Vorteil:** Der Agent kann nahtlos Rechnungen auf Deutsch, Französisch und Italienisch bearbeiten und die entsprechende MWST-Behandlung basierend auf Lieferantenstandort und Transaktionstyp anwenden – eine Komplexität, die in mehrsprachigen Schweizer Unternehmen oft erhebliche manuelle Aufmerksamkeit erfordert.

#### 2. Regulatorische Compliance-Prüfung

**Warum dies gut funktioniert:** Schweizer KMU haben substanzielle Compliance-Verpflichtungen (FADP, DSGVO für EU-Kunden, branchenspezifische Vorschriften), und Compliance-Arbeit ist sowohl hochriskant als auch zeitintensiv.

**Was der Agent tut:**
- Überwacht Geschäftsprozesse und Datenhandhabung gegen Compliance-Anforderungen
- Identifiziert potenzielle Probleme basierend auf aktuellen Vorschriften (auf die er von aktualisierten Quellen zugreift)
- Generiert Compliance-Dokumentation und Audit-Trails automatisch
- Bereitet Antworten auf Auskunftsbegehren von betroffenen Personen vor
- Kennzeichnet Verträge oder Geschäftspraktiken, die Compliance-Risiken darstellen könnten
- Führt einen Compliance-Kalender und alarmiert verantwortliche Parteien bei anstehenden Fristen

**Erwartete Ergebnisse:** 70-80% Reduktion der für Routine-Compliance-Aktivitäten aufgewendeten Zeit, verbesserte Vollständigkeit und Konsistenz der Dokumentation, reduzierte Audit-Befunde.

**Schweiz-spezifischer Vorteil:** Der Agent kann gleichzeitig Compliance sowohl mit FADP (Schweiz) als auch DSGVO (EU)-Anforderungen bewerten und dabei korrekt den strengeren Standard anwenden, wo sie sich überschneiden – eine Nuance, die häufig Verwirrung stiftet, wenn sie manuell bewertet wird.

#### 3. Intelligente Dateneingabe und Dokumentenextraktion

**Warum dies gut funktioniert:** Dateneingabe bleibt eine der grössten Zeitfresser für KMU-Mitarbeiter trotz jahrzehntelanger Automatisierungsbemühungen, weil Quelldokumente stark in Format und Qualität variieren.

**Was der Agent tut:**
- Extrahiert strukturierte Daten aus unstrukturierten oder semi-strukturierten Dokumenten (Verträge, Anträge, Berichte)
- Befüllt mehrere Systeme mit konsistenten Daten aus einem einzigen Quelldokument
- Identifiziert fehlende oder potenziell falsche Informationen und fordert Klärung an
- Lernt aus Korrekturen, um die Extraktionsgenauigkeit im Laufe der Zeit zu verbessern
- Bearbeitet mehrsprachige Dokumente, übersetzt nach Bedarf für konsistente Speicherung

**Erwartete Ergebnisse:** 80-90% Reduktion der manuellen Dateneingabezeit, dramatische Reduktion von Eingabefehlern, schnellere Verarbeitung von Kundenanfragen oder Lieferantendokumenten.

**Schweiz-spezifischer Vorteil:** Der Agent bearbeitet Dokumente auf Deutsch, Französisch, Italienisch und Englisch ohne sprachspezifische Konfiguration – besonders wertvoll für Schweizer Unternehmen, die über Sprachregionen hinweg operieren.

#### 4. Kundenservice und Support-Eskalation

**Warum dies gut funktioniert:** Kundenanfragen erfordern oft das Sammeln von Informationen aus mehreren Systemen, das Treffen von Beurteilungen über angemessene Antworten und das Eskalieren komplexer Probleme – genau die Art von Workflow, bei dem agentische Fähigkeiten glänzen.

**Was der Agent tut:**
- Empfängt Kundenanfragen über jeden Kanal (E-Mail, Chat, Telefontranskription, Webformulare)
- Sammelt relevanten Kontext aus CRM, Bestellhistorie, Support-Tickets und Wissensdatenbank
- Löst unkomplizierte Anfragen autonom innerhalb definierter Autoritätsgrenzen
- Eskaliert komplexe Probleme mit vollem Kontext und vorläufiger Recherche an geeignete Spezialisten
- Folgt nach, um Kundenzufriedenheit sicherzustellen und aktualisiert die Wissensdatenbank
- Identifiziert Muster in Kundenproblemen, die auf grössere Probleme hinweisen könnten

**Erwartete Ergebnisse:** 50-70% der Routine-Anfragen werden ohne menschliche Intervention gelöst, 60% Reduktion der Zeit, die Spezialisten mit dem Sammeln von Kontext verbringen, verbesserte Kundenzufriedenheit durch schnellere Antwortzeiten.

**Schweiz-spezifischer Vorteil:** Der Agent kann die gesamte Interaktion in der bevorzugten Sprache des Kunden durchführen, während er konsistente interne Dokumentation in der primären Sprache des Unternehmens aufrechterhält.

### Anwendungsfall-Vergleich und -Auswahl

| Anwendungsfall | Implementierungskomplexität | Zeit bis zum Wert | Jährliche Einsparungen (Est.)* | Risikolevel |
|----------|---------------------------|---------------|------------------------|------------|
| **Kreditoren-/Debitorenbuchhaltungs-Workflows** | Mittel | 2-3 Monate | CHF 40'000-80'000 | Niedrig |
| **Compliance-Prüfung** | Mittel-Hoch | 3-4 Monate | CHF 30'000-60'000 | Mittel** |
| **Dateneingabe/Extraktion** | Niedrig-Mittel | 1-2 Monate | CHF 50'000-100'000 | Niedrig |
| **Kundenservice** | Mittel | 2-3 Monate | CHF 35'000-70'000 | Mittel*** |

*Basierend auf einem Unternehmen mit 30-50 Mitarbeitern. Tatsächliche Einsparungen hängen stark vom aktuellen Prozessvolumen und der Effizienz ab.

**Risiko ist mittel, weil Compliance-Fehler regulatorische Konsequenzen haben können; erfordert besonders sorgfältige Validierung.

***Risiko ist mittel, weil kundenseitige Systeme robuste Fehlerbehandlung erfordern, um Reputationsschäden zu vermeiden.

---

## Wann Agentic AI NICHT einsetzen

Zu verstehen, wo Agentic AI Wert schafft, ist nur die Hälfte der strategischen Gleichung. Ebenso wichtig – vielleicht wichtiger – ist es, Situationen zu erkennen, in denen der Einsatz agentischer Fähigkeiten wahrscheinlich Ressourcen verbraucht, ohne proportionalen Wert zu liefern.

### Ungeeignete Anwendungsfälle

**1. Prozesse, die echtes menschliches Urteilsvermögen oder Kreativität erfordern**

Agentic AI ist bemerkenswert gut darin, Richtlinien anzuwenden, Verfahren zu folgen und Entscheidungen innerhalb definierter Parameter zu treffen. Sie ist nicht gut darin, Beurteilungen zu treffen, die das Abwägen konkurrierender Werte, die Berücksichtigung langfristiger strategischer Implikationen oder die Generierung wirklich neuartiger Ansätze erfordern.

**Schlechtes Beispiel:** Einsatz eines Agenten, um Einstellungsentscheidungen zu treffen oder komplexe Verträge zu verhandeln.

**Warum es scheitert:** Diese Prozesse erfordern das Abwägen immaterieller Faktoren, das Lesen zwischen den Zeilen dessen, was Menschen sagen, und das Treffen von Entscheidungen, die mehrere Stakeholder-Interessen auf Arten ausbalancieren, die nicht auf Regeln reduziert werden können.

**2. Prozesse mit niedrigem Volumen und hoher Variabilität**

Das Wertversprechen von Agentic AI hängt teilweise vom Volumen ab – die Zeitersparnisse potenzieren sich, wenn ein Prozess Dutzende oder Hunderte Male wöchentlich stattfindet. Bei Prozessen, die selten und jedes Mal unterschiedlich auftreten, kann die Implementierungsinvestition den Nutzen übersteigen.

**Schlechtes Beispiel:** Einsatz eines Agenten zur Handhabung der jährlichen strategischen Planung oder einmaliger Fusionsintegrations-Aufgaben.

**Warum es scheitert:** Der Agent wird nicht genug Wiederholung haben, um Muster zu lernen oder seinen Ansatz zu optimieren, und der menschliche Aufwand, der erforderlich ist, um Anforderungen zu spezifizieren und Ausgaben zu validieren, kann den Aufwand übersteigen, der erforderlich ist, um die Arbeit einfach manuell zu erledigen.

**3. Prozesse, bei denen Erklärbarkeit kritisch ist**

Während moderne Agentic AI-Systeme Begründungen für ihre Entscheidungen liefern können, gibt es weiterhin Situationen, in denen Sie nicht nur erklären müssen, welche Entscheidung getroffen wurde, sondern warum genau dieser spezifische Ansatz gewählt wurde – oft gegenüber externen Prüfern, Regulierungsbehörden oder in Gerichtsverfahren.

**Schlechtes Beispiel:** Einsatz eines Agenten, um Entscheidungen über Kundenkreditwürdigkeit oder Versicherungsansprüche zu treffen, die möglicherweise vor Gericht verteidigt werden müssen.

**Warum es scheitert:** Während der Agent seine Argumentation erklären kann, erfüllt die Erklärung möglicherweise nicht die rechtlichen oder regulatorischen Anforderungen an Transparenz und Rechenschaftspflicht bei hochriskanten Entscheidungen, die Einzelpersonen betreffen.

**4. Prozesse, die in Legacy-Systemen mit schlechter Datenqualität eingebettet sind**

Dies ist vielleicht der häufigste Grund für Agentic AI-Fehler: der Versuch, anspruchsvolle KI auf Systemen einzusetzen, bei denen die zugrunde liegenden Daten unvollständig, inkonsistent oder unzuverlässig sind.

**Schlechtes Beispiel:** Einsatz eines Agenten zur Optimierung des Inventars über mehrere Legacy-Systeme hinweg, die nicht ordnungsgemäss synchronisiert werden und widersprüchliche Informationen enthalten.

**Warum es scheitert:** Die Entscheidungen des Agenten können nur so gut sein wie die Daten, auf denen er operiert. Wenn die zugrunde liegenden Systeme Widersprüche und Fehler enthalten, wird der Agent entweder schlechte Entscheidungen basierend auf schlechten Daten treffen oder seine gesamte Zeit damit verbringen, Datenqualitätsprobleme zu lösen, anstatt das beabsichtigte Ziel zu erreichen.

### Die Bereitschaftsbewertung

Bevor in Agentic AI für irgendeinen Anwendungsfall investiert wird, sollten Organisationen ehrlich die folgenden Bereitschaftsfaktoren bewerten:

**Prozessreife:** Ist der Prozess gut definiert mit klaren Richtlinien und Entscheidungskriterien? Wenn Sie nicht artikulieren können, wie ein Mensch den Prozess handhaben sollte, wird ein Agent es sicherlich nicht herausfinden können.

**Datenverfügbarkeit:** Hat der Agent Zugriff auf alle Informationen, die erforderlich sind, um gute Entscheidungen zu treffen? Wenn kritischer Kontext nur in den Köpfen der Menschen oder in unstrukturierten Formaten existiert, wird der Agent teilweise blind operieren.

**Stakeholder-Akzeptanz:** Sind die von der Automatisierung betroffenen Personen bereit, den Entscheidungen des Agenten zu vertrauen und kollaborativ mit ihm zu arbeiten? Wenn zentrale Stakeholder grundsätzlich dagegen sind, werden sie Wege finden, um das System herum zu arbeiten, anstatt mit ihm.

**Fehlertoleranz:** Kann das Unternehmen gelegentliche Fehler tolerieren, während der Agent lernt? Wenn ein einzelner Fehler schwere Konsequenzen schaffen könnte, benötigen Sie umfangreichere Validierung und Tests vor der Bereitstellung.

**Erfolgsmessung:** Können Sie klar messen, ob der Agent Wert liefert? Wenn Sie Erfolg nicht messen können, können Sie die Implementierung nicht optimieren oder fortgesetzte Investitionen rechtfertigen.

---

## Kritische Erfolgsfaktoren: Warum Workflow-Neugestaltung wichtig ist

Die wichtigste Erkenntnis von Organisationen, die Agentic AI erfolgreich eingesetzt haben, ist diese: **Die Technologieimplementierung ist der einfache Teil. Der schwierige Teil ist, neu zu überdenken, wie Arbeit erledigt werden sollte.**

### Die Schichtungsfalle

Das häufigste Fehlermuster, das ich beobachte, wenn Organisationen versuchen, Agentic AI zu implementieren, ist das, was ich "die Schichtungsfalle" nenne – der Versuch, einen AI-Agenten in einen bestehenden Workflow einzufügen, der für menschliche Ausführung konzipiert wurde, ohne grundsätzlich zu überdenken, wie der Prozess funktionieren sollte.

**Beispiel der Schichtungsfalle:**

Ein Unternehmen beschliesst, seinen Spesengenehmigungsprozess zu "automatisieren". Der bestehende Prozess funktioniert so:
1. Mitarbeiter füllt Spesenformular mit Belegen aus
2. Manager überprüft und genehmigt/lehnt ab
3. Finanzteam kontiert Spesen zu entsprechenden Konten
4. Buchhaltungsteam gibt in ERP ein
5. Zahlungsteam plant Rückerstattung

Der Schichtungsansatz versucht, einen AI-Agenten die Schritte 3-5 ausführen zu lassen, lässt aber die Schritte 1-2 unverändert. Dieser Ansatz erfasst eine gewisse Effizienz, verpasst aber die grössere Gelegenheit.

### Der Neugestaltungsansatz

Eine Workflow-Neugestaltung fragt: "Wenn wir diesen Prozess von Grund auf neu gestalten würden, mit verfügbaren agentischen Fähigkeiten, wie würde er aussehen?"

**Neugestalteter Spesenprozess:**
1. Mitarbeiter fotografiert Belege, während sie auftreten (sogar bevor die Reise abgeschlossen ist)
2. Agent extrahiert Daten, fordert Klärung bei allem Unklaren an
3. Agent kontiert Spesen zu entsprechenden Konten basierend auf Richtlinien und historischen Mustern
4. Agent leitet Ausnahmen über definierten Schwellenwerten zur Genehmigung an Manager weiter
5. Agent plant Zahlung gemäss Richtlinie
6. Agent alarmiert Mitarbeiter, wenn irgendeine Ausgabe gegen Richtlinien verstösst (proaktive Compliance)

**Der Unterschied:** Der neugestaltete Prozess eliminiert das formale Spesenformular vollständig, reduziert die Manager-Beteiligung auf Ausnahmen und macht Compliance-Prüfung proaktiv statt reaktiv. Die Zeitersparnisse sind um eine Grössenordnung grösser als beim Schichtungsansatz.

### Prinzipien für erfolgreiche Workflow-Neugestaltung

Basierend auf erfolgreichen Implementierungen unterscheiden mehrere Designprinzipien konsistent hochwertige Neugestaltungen von gescheiterten Schichtungsversuchen:

**1. Kehren Sie die Mensch-Maschine-Beziehung um**

Traditionelle Automatisierung: Maschine unterstützt Menschen in menschlich gestaltetem Prozess
Agentische Neugestaltung: Mensch überwacht Maschine in maschinenoptimiertem Prozess

**2. Verlagern Sie Menschen zur Ausnahmebehandlung**

Traditionelle Automatisierung: Mensch bearbeitet jeden Fall, Maschine liefert Informationen
Agentische Neugestaltung: Maschine bearbeitet Routinefälle autonom, Mensch bearbeitet Ausnahmen

**3. Bauen Sie kontinuierliches Lernen ein**

Traditionelle Automatisierung: Prozess ist statisch, bis ihn jemand neu gestaltet
Agentische Neugestaltung: Agent lernt aus Ergebnissen und menschlichem Feedback, optimiert kontinuierlich

**4. Design für Wiederherstellung, nicht Perfektion**

Traditionelle Automatisierung: Umfangreicher Aufwand im Vorfeld zur Fehlervermeidung
Agentische Neugestaltung: Akzeptiere, dass Fehler auftreten werden, baue schnelle Erkennung und Wiederherstellung ein

**5. Treffen Sie Entscheidungen auf der niedrigsten angemessenen Ebene**

Traditionelle Automatisierung: Wichtige Entscheidungen eskalieren zu Menschen
Agentische Neugestaltung: Entscheidungen werden am Punkt maximaler Informationsverfügbarkeit getroffen, was oft die Agentenebene ist, eskaliert nur, wenn das Urteilsvermögen die Autorität des Agenten überschreitet

---

## Schweizer Compliance-Überlegungen für Agentic AI

Für Schweizer KMU ist regulatorische Compliance nicht bloss eine zu navigierende Einschränkung – sie ist ein Wettbewerbsvorteil, der erhalten und verbessert werden muss, während neue Technologien übernommen werden. Agentic AI-Implementierungen müssen von Anfang an so konzipiert werden, dass sie Schweizer Datenschutzstandards erfüllen und übertreffen.

### FADP-Anforderungen für autonome Systeme

Das [revidierte Bundesgesetz über den Datenschutz (FADP)](https://www.kmu.admin.ch/kmu/de/home/fakten-trends/digitalisierung/datenschutz/revisions-bundesgesetz-ueber-datenschutz.html), das am 1. September 2023 in Kraft trat, führt mehrere Anforderungen ein, die besondere Implikationen für Agentic AI-Systeme haben:

**Transparenz und Erklärbarkeit:** Betroffene Personen haben das Recht zu wissen, wann Entscheidungen, die sie betreffen, von automatisierten Systemen getroffen werden. Für Agentic AI bedeutet dies:
- Klare Offenlegung, wenn ein AI-Agent anstatt eines Menschen eine Entscheidung getroffen hat
- Fähigkeit, die Faktoren und Argumentation hinter der Entscheidung des Agenten zu erklären
- Dokumentation der Datenquellen, die der Agent konsultiert hat

**Zweckbindung:** Personendaten dürfen nur für die Zwecke verarbeitet werden, für die sie erhoben wurden. Für Agentic AI bedeutet dies:
- Sorgfältige Spezifikation, welche Aufgaben der Agent autorisiert ist auszuführen
- Technische Kontrollen, die den Agenten daran hindern, auf Daten zuzugreifen, die über das Notwendige hinausgehen
- Audit-Logs, die dokumentieren, auf welche Daten der Agent während der Ausführung tatsächlich zugegriffen hat

**Richtigkeit und Datenqualität:** Verantwortliche müssen sicherstellen, dass Personendaten korrekt und aktuell sind. Für Agentic AI bedeutet dies:
- Mechanismen für den Agenten, potenziell veraltete oder falsche Daten zu identifizieren
- Prozesse für Menschen, vom Agenten identifizierte Datenqualitätsprobleme zu überprüfen und zu korrigieren
- Regelmässige Validierung, dass die Entscheidungen des Agenten auf aktuellen, genauen Informationen basieren

### DSGVO-Implikationen für EU-Kundendaten

Schweizer KMU, die Personendaten im Zusammenhang mit EU-Bürgern verarbeiten, müssen auch DSGVO-Anforderungen erfüllen, die Bestimmungen beinhalten, die speziell für automatisierte Entscheidungsfindung relevant sind:

**Artikel 22-Einschränkungen:** Die DSGVO gewährt betroffenen Personen das Recht, nicht Entscheidungen unterworfen zu werden, die ausschliesslich auf automatisierter Verarbeitung beruhen und rechtliche oder ähnlich bedeutende Auswirkungen haben. Für Agentic AI-Implementierungen, die EU-Kunden bedienen, bedeutet dies:
- Hochriskante Entscheidungen müssen menschliche Überprüfung vor der Finalisierung beinhalten
- Klare Dokumentation, welche Entscheidungen als "rechtliche oder ähnlich bedeutende Auswirkungen" qualifizieren
- Prozesse für betroffene Personen, menschliche Überprüfung automatisierter Entscheidungen anzufordern

**Datenschutz-Folgenabschätzungen (DPIAs):** Wenn Verarbeitung wahrscheinlich zu hohem Risiko für Einzelpersonen führt, erfordert die DSGVO eine formale Bewertung. Agentic AI-Implementierungen lösen oft diese Anforderung aus, was Folgendes erforderlich macht:
- Systematische Beschreibung der Verarbeitungsvorgänge und Zwecke
- Bewertung der Notwendigkeit und Verhältnismässigkeit
- Identifizierung von Risiken für die Rechte und Freiheiten betroffener Personen
- Massnahmen zur Bewältigung identifizierter Risiken

### Schweiz-konforme Bereitstellungsoptionen

Mehrere Infrastrukturoptionen ermöglichen es Schweizer KMU, Agentic AI einzusetzen, während sie die Einhaltung der Schweizer Datenschutzanforderungen aufrechterhalten:

**Azure Schweiz-Regionen:**
[Microsoft Azure](https://azure.microsoft.com/de-de/explore/global-infrastructure/geographies/#geographies) betreibt Rechenzentren in Zürich und Genf mit den folgenden Compliance-Features:
- Alle Datenverarbeitung erfolgt innerhalb der Schweizer Grenzen
- FINMA-konforme Konfigurationen verfügbar für regulierte Branchen
- Datenresidenz-Garantien in Kundenverträgen
- Schweizer Support-Mitarbeiter für Compliance-Anfragen

**AWS Zürich-Region:**
[Amazon Web Services](https://aws.amazon.com/de/local/switzerland/) bietet eine Schweizer Region mit vergleichbaren Fähigkeiten:
- Vollständige Datensouveränität innerhalb der Schweiz
- Compliance-Zertifizierungen einschliesslich ISO 27001, ISO 27017, ISO 27018
- Detaillierte Audit-Protokollierung für regulatorisches Reporting
- Direkte Verbindungen zu Schweizer Finanznetzwerken

**On-Premise mit Claude-Integration:**
Für Organisationen, die maximale Kontrolle erfordern, [bietet Anthropic Enterprise-Bereitstellungsoptionen an](https://www.anthropic.com/enterprise), die es ermöglichen, Claude-Modelle On-Premise auszuführen, während der Zugriff auf Updates und Verbesserungen aufrechterhalten wird:
- Vollständige Datenkontrolle ohne Cloud-Übertragung
- Integration mit bestehender Sicherheitsinfrastruktur
- Anpassung für branchenspezifische Anforderungen
- Höhere Anfangskosten, aber potenziell niedrigeres langfristiges Compliance-Risiko

### Compliance-Checkliste für Agentic AI-Bereitstellung

Bevor irgendein Agentic AI-System eingesetzt wird, das Personendaten verarbeitet, sollten Schweizer KMU sicherstellen, dass die folgenden Anforderungen erfüllt sind:

**Vor der Bereitstellung:**
- [ ] Datenschutz-Folgenabschätzung abgeschlossen und dokumentiert
- [ ] Rechtliche Grundlage für Verarbeitung identifiziert und dokumentiert für jeden Datentyp
- [ ] Datenminimierungsprinzip angewendet (Agent greift nur auf notwendige Daten zu)
- [ ] Zweckspezifikation klar definiert und technisch durchgesetzt
- [ ] Lieferantenverträge beinhalten Datenverarbeitungsvereinbarungen, die FADP/DSGVO-Anforderungen erfüllen
- [ ] Verfahren für Rechte betroffener Personen aktualisiert, um automatisierte Entscheidungsfindung zu berücksichtigen

**Während des Betriebs:**
- [ ] Umfassende Audit-Protokollierung aller Agentenaktionen und Datenzugriffe
- [ ] Regelmässige Überprüfung der Agentenentscheidungen auf Richtigkeit und Compliance
- [ ] Prozess für betroffene Personen, menschliche Überprüfung automatisierter Entscheidungen anzufordern
- [ ] Vorfallreaktionsverfahren, die speziell KI-bezogene Risiken adressieren
- [ ] Mitarbeiterschulung zu Compliance-Anforderungen für agentische Systeme

**Laufende Governance:**
- [ ] Vierteljährliche Überprüfung der Agentenentscheidungsgenauigkeit und Bias
- [ ] Jährliche DPIA-Überprüfung und -Aktualisierung basierend auf tatsächlichen Nutzungsmustern
- [ ] Regelmässige Tests der Verfahren für Rechte betroffener Personen
- [ ] Dokumentationsaktualisierungen, die Änderungen an Verarbeitungszwecken oder -methoden widerspiegeln

---

## Implementierungs-Roadmap: Von der Strategie zur Produktion

Erfolgreiche Agentic AI-Implementierung folgt einer strukturierten Methodik, die Ambition mit Pragmatismus ausbalanciert und von sorgfältiger Validierung zu skalierter Bereitstellung übergeht, während das Vertrauen wächst.

### Phase 1: Strategische Auswahl (Wochen 1-2)

Das Ziel dieser anfänglichen Phase ist es, den spezifischen Anwendungsfall zu identifizieren, der die optimale Kombination aus Geschäftswert, Implementierungsmachbarkeit und handhabbarem Risiko für die erste Agentic AI-Bereitstellung Ihrer Organisation bietet.

**Aktivitäten:**
- Inventarisierung von Geschäftsprozessen, die derzeit erhebliche Mitarbeiterzeit verbrauchen
- Bewertung jedes Kandidaten gegen Kriterien einschliesslich Volumen, Entscheidungskomplexität, Datenverfügbarkeit und Stakeholder-Bereitschaft
- Durchführung einer vorläufigen ROI-Analyse für die Top-2-3-Kandidaten
- Auswahl des finalen Anwendungsfalls basierend auf erwartetem Wert und Erfolgswahrscheinlichkeit

**Ergebnisse:**
- Prozessinventar mit Automatisierungs-Opportunity-Scores
- Detaillierter Business Case für ausgewählten Anwendungsfall einschliesslich ROI-Projektionen
- Risikobewertung, die potenzielle Hindernisse und Mitigationsstrategien identifiziert
- Stakeholder-Buy-in von betroffenen Abteilungsleitern

**Erfolgskriterien:** Klarer Konsens über welchen Anwendungsfall zu verfolgen ist und realistische Erwartungen für Ergebnisse und Zeitplan.

### Phase 2: Workflow-Neugestaltung (Wochen 3-5)

Anstatt den aktuellen Prozess wie er ist zu automatisieren, konzipiert diese Phase neu, wie Arbeit fliessen sollte, wenn ein autonomer Agent verfügbar ist, um Routine-Entscheidungen und Ausführung zu handhaben.

**Aktivitäten:**
- Detaillierte Abbildung des aktuellen Workflows, Identifizierung aller Entscheidungspunkte und Datenquellen
- Design des zukünftigen Workflows, optimiert für Agentenfähigkeiten
- Definition spezifischer Entscheidungsschwellen, wo menschliche Überprüfung erforderlich ist
- Spezifikation der Datenzugriffsanforderungen und Integrationspunkte
- Erstellung vorläufiger Testszenarien, die sowohl Routine- als auch Edge-Cases abdecken

**Ergebnisse:**
- Dokumentation des aktuellen und zukünftigen Workflows
- Entscheidungsautoritäts-Matrix (Agent autonom | Agent empfiehlt + Mensch genehmigt | Nur Mensch)
- Datenflussdiagramme, die alle Systemintegrationen zeigen
- Testszenario-Bibliothek für Validierung
- Aktualisierter Business Case, der neu gestalteten Prozess widerspiegelt

**Erfolgskriterien:** Stakeholder stimmen zu, dass der neu gestaltete Workflow sowohl erreichbar als auch dem aktuellen Zustand überlegen ist.

### Phase 3: Technische Implementierung (Wochen 6-10)

Die Entwicklung folgt einem iterativen Ansatz, der kleine funktionale Inkremente baut, sie gründlich validiert und basierend auf Feedback erweitert, anstatt zu versuchen, das komplette System vor jedem Test zu bauen.

**Aktivitäten:**
- Konfiguration des Agentenzugriffs auf erforderliche Systeme via [Model Context Protocol (MCP) Integration](/de/services/mcp-integration)
- Implementierung der Kernentscheidungslogik und Ausnahmebehandlung
- Aufbau menschlicher Aufsichtsschnittstellen für Genehmigungsworkflows
- Entwicklung von Audit-Protokollierung und Compliance-Reporting
- Durchführung umfangreicher Tests gegen Szenario-Bibliothek

**Ergebnisse:**
- Funktionierender Agent, integriert mit erforderlichen Systemen
- Menschliches Aufsichts-Dashboard für Genehmigungen und Überwachung
- Umfassende Audit-Protokollierung für Compliance
- Testergebnisse, die Genauigkeit und Edge-Case-Behandlung dokumentieren
- Sicherheitsbewertung, die keinen unbeabsichtigten Datenzugriff bestätigt

**Erfolgskriterien:** Agent bearbeitet erfolgreich 80%+ der Testszenarien innerhalb akzeptabler Qualitätsschwellen.

### Phase 4: Pilot-Bereitstellung (Wochen 11-14)

Anstatt sofortiger vollständiger Produktionsnutzung ermöglicht ein sorgfältig überwachter Pilot die Identifizierung und Lösung von Problemen, bevor sie signifikante Probleme verursachen können.

**Aktivitäten:**
- Bereitstellung des Agenten zur Handhabung einer Teilmenge der tatsächlichen Arbeitslast (typischerweise 20-30% des Volumens)
- Intensive Überwachung aller Agentenentscheidungen und -aktionen
- Tägliche Überprüfungsmeetings mit Pilotteam zur Identifizierung von Problemen
- Schnelle Iteration zur Bewältigung entdeckter Edge-Cases
- Kontinuierlicher Vergleich der Agentenleistung vs. historischer menschlicher Baseline

**Ergebnisse:**
- Pilot-Leistungsmetriken (Genauigkeit, Geschwindigkeit, Fehlerrate, Eskalationsrate)
- Issue-Log mit Lösungsverfolgung
- Dokumentation des Benutzerfeedbacks
- Verfeinerte Entscheidungsschwellen basierend auf beobachteter Leistung
- Aktualisierter Implementierungsplan für vollständige Bereitstellung

**Erfolgskriterien:** Agent entspricht oder übertrifft menschliche Baseline-Leistung bei Qualität, während er messbare Zeitersparnisse liefert.

### Phase 5: Produktions-Skalierung (Wochen 15-18)

Mit durch erfolgreichen Pilot etabliertem Vertrauen handhabt der Agent progressiv zunehmende Arbeitslast, während Überwachung anhaltende Leistung sicherstellt.

**Aktivitäten:**
- Schrittweise Erhöhung der Agenten-Arbeitslast von Pilotniveaus zu vollem Produktionsvolumen
- Schulung aller betroffenen Mitarbeiter im effektiven Arbeiten mit dem Agenten
- Etablierung laufender Leistungsüberwachung und Alarmierung
- Dokumentation von Standard-Betriebsverfahren einschliesslich Agentenaufsicht
- Erfassung von Lessons Learned für zukünftige Agentenimplementierungen

**Ergebnisse:**
- Agent bearbeitet 100% der angemessenen Arbeitslast
- Umfassender Abschluss der Mitarbeiterschulung
- Leistungs-Dashboard mit laufender KPI-Verfolgung
- Dokumentation der Standard-Betriebsverfahren
- Post-Implementierungs-Überprüfung mit ROI-Validierung

**Erfolgskriterien:** Anhaltende Leistung, die Pilotresultate bei vollem Produktionsvolumen erreicht oder übertrifft.

### Phase 6: Kontinuierliche Optimierung (Laufend)

Erfolgreiche Agentic AI ist nicht "einstellen und vergessen" – laufende Aufmerksamkeit stellt sicher, dass der Agent weiterhin maximalen Wert liefert, während sich Geschäftsbedingungen entwickeln.

**Aktivitäten:**
- Monatliche Leistungsüberprüfungen zur Bewertung von Genauigkeit, Effizienz und Benutzerzufriedenheit
- Vierteljährliche Bewertung von Entscheidungsschwellen und Autoritätsgrenzen
- Identifizierung angrenzender Prozesse, die für Agentenerweiterung geeignet sind
- Regelmässige Updates der Entscheidungslogik, die Richtlinienänderungen oder neue Vorschriften widerspiegeln
- Kontinuierliche Stakeholder-Feedback-Sammlung und -Integration

**Ergebnisse:**
- Monatliche Leistungsberichte mit Trendanalyse
- Vierteljährliche Optimierungsempfehlungen
- Jährliche ROI-Bewertung mit Erweiterungsmöglichkeiten
- Aktualisierte Dokumentation, die Prozessentwicklung widerspiegelt

**Erfolgskriterien:** Anhaltende oder sich verbessernde Leistung mit expandierendem Umfang im Laufe der Zeit.

---

## Die 2026-Wettbewerbsrealität

Es gibt eine Wahrheit, der sich Schweizer Führungskräfte direkt stellen müssen: Während Sie evaluieren, ob Sie Agentic AI erkunden sollten, haben einige Ihrer Wettbewerber bereits die Evaluation überschritten und zur Bereitstellung übergegangen, und der Wettbewerbsvorsprung, den dies schafft, potenziert sich im Laufe der Zeit.

### Das First-Mover-Vorteilsfenster

Anders als viele Technologien, bei denen es die umsichtige Strategie ist, ein schneller Nachfolger zu sein, bietet Agentic AI echte Vorteile für Frühadoptierer, die für spätere Einsteiger schwer zu überwinden sind:

**Kostenstruktur-Vorteil:** Organisationen, die Agentic AI in 2026 einsetzen, strukturieren ihre Kostenbasis fundamental um und reduzieren die marginalen Kosten für die Verarbeitung zusätzlicher Transaktionen, die Bedienung zusätzlicher Kunden oder den Eintritt in zusätzliche Märkte. Wettbewerber, die verzögern, werden sich im Wettbewerb mit Unternehmen wiederfinden, die mit 30-40% niedrigeren Betriebskosten in Schlüsselprozessen operieren.

**Talentanziehung und -bindung:** Wissensarbeiter bevorzugen zunehmend Arbeitgeber, die sie mit fortgeschrittenen Werkzeugen ausstatten und sie von mühsamer Arbeit befreien. Organisationen, die für die effektive Nutzung von KI bekannt sind, werden stärkere Talente anziehen, während Wettbewerber kämpfen, Rollen zu besetzen, die hauptsächlich aus manueller Verarbeitung bestehen.

**Lernkurveneffekte:** Agentic AI-Systeme verbessern sich mit der Nutzung und lernen aus Ergebnissen und Feedback. Organisationen, die früh einsetzen, sammeln Monate oder Jahre des Lernens, das von später startenden Wettbewerbern nicht einfach repliziert werden kann.

**Kundenerwartungs-Setting:** Wenn führende Unternehmen agentische Fähigkeiten einsetzen, um schnellere Reaktionszeiten, 24/7-Verfügbarkeit und proaktiveren Service zu liefern, setzen sie Kundenerwartungen neu. Wettbewerber, die diese Fähigkeiten nicht erreichen, erscheinen zunehmend veraltet.

### Was Goldman Sachs Schweizer KMU lehrt

Die früher beschriebene Goldman Sachs-Implementierung bietet mehrere Lektionen, die sogar auf viel kleinere Organisationen anwendbar sind:

**Lektion 1: Beginnen Sie mit Prozessen, die Sie tief verstehen.** Goldman wählte Buchhaltungsabstimmung und Compliance-Prüfung – Bereiche, in denen sie jahrzehntelange Domänenexpertise hatten. Sie versuchten nicht, Prozesse zu automatisieren, die sie noch manuell herausfanden.

**Lektion 2: Investieren Sie in Integrationsinfrastruktur.** Die Effektivität der Agenten hängt vollständig von ihrer Fähigkeit ab, auf Daten über Systeme hinweg zuzugreifen. Goldman investierte substanziell in die Integrationsschicht via [MCP-Integration](/de/services/mcp-integration), bevor sie Agenten einsetzten.

**Lektion 3: Behalten Sie bedeutsame menschliche Aufsicht bei.** Selbst bei 60%+ Zeitersparnissen bleiben Menschen an definierten Entscheidungsschwellen beteiligt. Das Ziel ist Mensch-Agent-Kollaboration, nicht Mensch-Elimination.

**Lektion 4: Messen Sie rigoros.** Goldman etablierte klare Baselines vor der Bereitstellung und misst weiterhin die Agentenleistung sowohl gegen historische menschliche Leistung als auch gegen laufende menschliche Validierung.

Die ermutigende Nachricht für Schweizer KMU ist, dass, während Goldmans Implementierungen grossangelegt und anspruchsvoll sind, die fundamentalen Prinzipien in jedem Massstab gelten. Ein 30-Personen-Unternehmen kann ein agentisches System für Kreditorenbuchhaltung/Debitorenbuchhaltungs-Verarbeitung einsetzen, das der gleichen Methodik folgt, die Goldman für Abstimmung verwendete, und vergleichbare prozentuale Verbesserungen mit dramatisch niedrigerer absoluter Investition erreichen.

---

## Nächste Schritte: Ihre Agentic AI-Bereitschaftsbewertung

Die strategische Frage, der sich Schweizer Führungskräfte in 2026 gegenübersehen, ist nicht, ob Agentic AI transformieren wird, wie Arbeit erledigt wird – diese Transformation ist bereits im Gange. Die Frage ist, ob Ihre Organisation diese Transformation anführen, folgen oder von ihr disruptiert werden wird.

### Die 10-Minuten-Bereitschafts-Selbstbewertung

Bevor Sie externe Berater oder Anbieter engagieren, bewerten Sie die Bereitschaft Ihrer Organisation, indem Sie die folgenden Fragen ehrlich beantworten:

**Prozessreife:**
- Haben Sie mindestens einen hochvolumigen, sich wiederholenden Prozess, der erhebliche Mitarbeiterzeit verbraucht?
- Können Sie die Richtlinien und Entscheidungskriterien für diesen Prozess klar artikulieren?
- Würden verschiedene Mitarbeiter, die denselben Fall bearbeiten, zu konsistenten Entscheidungen gelangen?

**Dateninfrastruktur:**
- Sind die für gute Entscheidungen erforderlichen Daten in zugänglichen Systemen verfügbar, anstatt in Papier oder in den Köpfen der Menschen eingeschlossen?
- Sind diese Daten im Allgemeinen korrekt und aktuell?
- Haben Sie die Fähigkeit, disparate Systeme zu integrieren, oder sind sie isolierte Silos?

**Organisationsbereitschaft:**
- Sind Führungskräfte bereit, Workflows neu zu gestalten, anstatt nur aktuelle Prozesse zu automatisieren?
- Sind die Mitarbeiter, die mit dem Agenten arbeiten würden, für die Idee empfänglich, anstatt ängstlich?
- Können Sie ein Projektteam für 3-4 Monate dedizieren, um eine Implementierung durchzusehen?

**Erfolgsmessung:**
- Können Sie die aktuelle Zeit und Kosten Ihres Zielprozesses messen?
- Haben Sie die Fähigkeit, Agentenleistung gegen definierte KPIs zu verfolgen?
- Gibt es Führungsverpflichtung zu einer 12-18-monatigen Lernperiode, anstatt sofortige Perfektion zu erwarten?

**Wenn Sie die meisten Fragen in jeder Kategorie mit "ja" beantwortet haben,** ist Ihre Organisation wahrscheinlich bereit für Agentic AI und sollte mit detaillierter Anwendungsfall-Bewertung und Anbieterauswahl fortfahren.

**Wenn Sie mehrere Fragen in einer Kategorie mit "nein" beantwortet haben,** konzentrieren Sie sich zuerst auf den Aufbau dieser grundlegenden Fähigkeit, anstatt in die Implementierung zu eilen. Der Versuch, Agentic AI ohne angemessene Prozessreife, Dateninfrastruktur oder Organisationsbereitschaft einzusetzen, ist der Weg, Teil von Gartners 40%-Fehler-Statistik zu werden.

### Den Beginn Ihrer Agentic AI-Reise

Für Organisationen, die bereit sind voranzuschreiten, empfehle ich die folgenden sofortigen nächsten Schritte:

**1. Identifizieren Sie Ihren Champion-Prozess (1 Woche):** Wählen Sie den einzelnen Anwendungsfall aus, der die beste Kombination aus Geschäftswert, Implementierungsmachbarkeit und Stakeholder-Unterstützung bietet. Widerstehen Sie der Versuchung, mehrere Anwendungsfälle gleichzeitig in Ihrer ersten Implementierung zu verfolgen.

**2. Bilden Sie den aktuellen Zustand erschöpfend ab (1-2 Wochen):** Dokumentieren Sie präzise, wie der Prozess heute funktioniert, einschliesslich aller Entscheidungspunkte, Datenquellen, Ausnahmebehandlung und Qualitätsprüfungen. Diese Baseline ist sowohl für die Neugestaltung als auch für die Messung von Verbesserungen wesentlich.

**3. Engagieren Sie erfahrene Implementierungsunterstützung (laufend):** Während Agentic AI-Technologie zunehmend zugänglich ist, erfordert erfolgreiche Implementierung immer noch Expertise in Workflow-Neugestaltung, Integrationsarchitektur und Change Management. Der Unterschied zwischen Erfolg und Misserfolg kommt oft auf erfahrene Führung durch die unvermeidlichen Herausforderungen an.

**4. Bauen Sie Ihren Business Case rigoros auf (1 Woche):** Quantifizieren Sie sowohl die harten Einsparungen (Zeit, Kosten) als auch die weichen Vorteile (Qualität, Skalierbarkeit, Mitarbeiterzufriedenheit), die Sie erwarten. Etablieren Sie klare Erfolgsmetriken und verpflichten Sie sich, sie während der Implementierung zu messen.

**5. Sichern Sie Executive-Sponsorship (laufend):** Agentic AI-Implementierung erfordert anhaltende Verpflichtung durch unvermeidliche Rückschläge und Lernperioden. Executive-Sponsorship stellt sicher, dass das Projekt notwendige Ressourcen und Unterstützung erhält, wenn Herausforderungen auftreten.

---

## Holen Sie sich Expertenführung für Ihre Implementierung

**Bereit zu erkunden, was Agentic AI für Ihre Organisation bedeuten könnte?**

Ich lade Sie ein, [eine kostenlose 60-minütige Strategiesitzung zu vereinbaren](/de#contact), in der wir:

- Ihre spezifischen Prozesse gegen bewährte Agentic AI-Anwendungsfälle bewerten
- Die höchst-ROI-Möglichkeiten für Ihre Organisation identifizieren
- Implementierungsansätze diskutieren, die Schweizer Datenschutz-Compliance aufrechterhalten
- Erfolgreiche Fallstudien von ähnlichen Organisationen überprüfen
- Realistische Zeitpläne und Investitionserwartungen bereitstellen
- Ihre Fragen zur Technologie, Risiken und Change Management beantworten

Diese Sitzung ist keine Verkaufspräsentation – es ist eine praktische, technische Diskussion, die Ihnen helfen soll, eine informierte Entscheidung darüber zu treffen, ob und wie Sie Agentic AI für Ihre spezifische Situation verfolgen sollten.

Während unserer Konversation werden wir die [eflury-Methode für agentische Implementierung](/de/services/mcp-integration) verwenden, die erfolgreich Schweizer KMU von der anfänglichen Bewertung durch Produktionsbereitstellung geleitet hat, während die rigorosen Qualitäts- und Compliance-Standards, die Schweizer Unternehmen fordern, aufrechterhalten werden.

---

*Emanuel Flury ist der erste dedizierte Claude-Automatisierungsberater der Schweiz, spezialisiert auf Agentic AI-Implementierungen, die messbaren ROI liefern, während sie Schweizer Datenschutzstandards aufrechterhalten. Mit Sitz in Grenchen arbeitet er mit Unternehmen in der ganzen Schweiz und der breiteren DACH-Region zusammen, um autonome KI-Systeme zu entwerfen und einzusetzen, die menschliche Fähigkeiten eher verbessern als ersetzen.*

---

## Referenzen

1. Gartner. (2025). *Top 10 Strategic Technology Trends for 2026: Agentic AI*. Retrieved from [gartner.com](https://www.gartner.com/en/articles/gartner-top-10-strategic-technology-trends-for-2026)

2. Markets and Markets. (2025). *Agentic AI Market - Global Forecast to 2030*. Retrieved from [marketsandmarkets.com](https://www.marketsandmarkets.com/Market-Reports/agentic-ai-market-259715837.html)

3. Anthropic. (2025). *Goldman Sachs Case Study: AI Agents for Accounting and Compliance*. Retrieved from [anthropic.com](https://www.anthropic.com/customers/goldman-sachs)

4. McKinsey Global Institute. (2025). *The State of AI in 2025: Agents and Autonomous Systems*. Retrieved from [mckinsey.com](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)

5. State Secretariat for Economic Affairs SECO. (2023). *New Federal Act on Data Protection (nFADP)*. Retrieved from [kmu.admin.ch](https://www.kmu.admin.ch/kmu/de/home/fakten-trends/digitalisierung/datenschutz/revisions-bundesgesetz-ueber-datenschutz.html)

6. European Commission. (2024). *General Data Protection Regulation (GDPR): Automated Individual Decision-Making*. Retrieved from [gdpr.eu](https://gdpr.eu/article-22-automated-individual-decision-making/)

7. Microsoft Azure. (2025). *Azure Switzerland Regions: Zürich and Geneva*. Retrieved from [azure.microsoft.com](https://azure.microsoft.com/de-de/explore/global-infrastructure/geographies/)

8. Amazon Web Services. (2025). *AWS Zurich Region: Swiss Data Residency and Compliance*. Retrieved from [aws.amazon.com](https://aws.amazon.com/de/local/switzerland/)

9. Forrester Research. (2025). *The Total Economic Impact of Agentic AI Platforms*. Retrieved from [forrester.com](https://www.forrester.com/research/)

10. Federal Data Protection and Information Commissioner FDPIC. (2024). *Guidance on Automated Decision-Making Under the Revised FADP*. Retrieved from [edoeb.admin.ch](https://www.edoeb.admin.ch/)
