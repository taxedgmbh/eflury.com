---
title: "Von Excel zu Power BI: Der Migrations-Leitfaden für Schweizer KMU"
description: "Schritt-für-Schritt-Anleitung für die Migration von Excel-Berichten zu Power BI. Inkl. Checkliste, typische Fallstricke und ROI-Berechnung für Schweizer Unternehmen."
pubDate: 2025-01-10
author: "Emanuel Flury"
tags: ["Power BI", "Excel", "Migration", "Business Intelligence", "Schweiz"]
lang: "de"
---

Sie haben jahrelang mit Excel gearbeitet. Ihre Berichte funktionieren. Warum also wechseln? Die kurze Antwort: Weil Excel Sie mehr kostet, als Sie denken - und Power BI Ihnen mehr bietet, als Sie erwarten.

## Wann ist der richtige Zeitpunkt für die Migration?

Die Migration zu Power BI lohnt sich, wenn mindestens drei dieser Punkte zutreffen:

- [ ] Sie verbringen mehr als 5 Stunden/Woche mit Berichtserstellung
- [ ] Mehrere Personen arbeiten an denselben Excel-Dateien
- [ ] Ihre Excel-Dateien sind grösser als 10 MB
- [ ] Sie kopieren regelmässig Daten zwischen Systemen
- [ ] Führungskräfte wünschen sich aktuellere Zahlen
- [ ] "Welche Version ist die richtige?" ist eine häufige Frage

Wenn Sie bei drei oder mehr Punkten genickt haben: Lesen Sie weiter.

## Was Power BI besser macht

### 1. Automatische Datenaktualisierung

**Excel:** Daten manuell exportieren, in Excel einfügen, Formeln prüfen.

**Power BI:** Datenquellen einmal verbinden, danach automatische Aktualisierung (stündlich, täglich, wöchentlich).

### 2. Interaktive Dashboards

**Excel:** Statische Tabellen und Diagramme. Für Detailansichten neue Berichte erstellen.

**Power BI:** Klicken Sie auf ein Segment, und alle verbundenen Visualisierungen filtern sich automatisch. Drill-Down bis zur einzelnen Transaktion.

### 3. Zentrale Wahrheitsquelle

**Excel:** Kopien auf lokalen Laufwerken, per E-Mail verschickt, verschiedene Versionen.

**Power BI:** Ein Dashboard in der Cloud. Alle sehen dieselben aktuellen Zahlen.

### 4. Mobile Verfügbarkeit

**Excel:** Am Handy praktisch unbrauchbar.

**Power BI:** Native Apps für iOS und Android. Kennzahlen unterwegs checken.

## Die typische Excel-Landschaft in Schweizer KMU

Nach meiner Erfahrung sieht es in vielen Unternehmen so aus:

| Bereich | Excel-Nutzung | Aufwand/Monat |
|---------|---------------|---------------|
| Finanzen | Monatsberichte, Budgetvergleich | 20+ Stunden |
| Verkauf | Pipeline, Prognosen, Provisionen | 15+ Stunden |
| Lager | Bestandsübersichten, Bestellplanung | 10+ Stunden |
| Personal | Absenzen, Überstunden, Headcount | 8+ Stunden |
| Geschäftsleitung | Konsolidierte Kennzahlen | 5+ Stunden |

**Gesamtaufwand: 50-80 Stunden/Monat**

Mit Power BI reduziert sich dieser Aufwand typischerweise auf 10-15 Stunden - hauptsächlich für Analyse statt Berichtserstellung.

## Migrations-Strategie: Schritt für Schritt

### Phase 1: Inventar erstellen (1-2 Tage)

Bevor Sie migrieren, müssen Sie wissen, was existiert:

1. **Alle Excel-Berichte sammeln**
   - Netzlaufwerke durchsuchen
   - E-Mails nach Anhängen durchforsten
   - Mitarbeiter befragen

2. **Für jeden Bericht dokumentieren:**
   - Wer erstellt ihn? (Owner)
   - Wie oft? (Frequenz)
   - Wer nutzt ihn? (Zielgruppe)
   - Welche Datenquellen? (Herkunft)
   - Wie lange dauert die Erstellung? (Aufwand)

3. **Priorisieren nach:**
   - Höchstem Zeitaufwand
   - Meisten Nutzern
   - Wichtigkeit für Entscheidungen

### Phase 2: Datenquellen klären (2-3 Tage)

Power BI kann sich mit über 100 Datenquellen verbinden. Typische Quellen in Schweizer KMU:

| Quelle | Verbindungsart | Komplexität |
|--------|---------------|-------------|
| Excel-Dateien | Direkt | Einfach |
| SQL Server | Direkt | Mittel |
| SAP Business One | via Connector | Mittel |
| Abacus | via Export/API | Mittel-Hoch |
| Bexio | via API | Mittel |
| Shopify/WooCommerce | via Connector | Einfach |

**Wichtig:** Klären Sie mit Ihrer IT, ob Direktverbindungen möglich sind oder ob Sie Datenexporte benötigen.

### Phase 3: Datenmodell designen (3-5 Tage)

Der häufigste Fehler: Excel-Tabellen 1:1 nach Power BI kopieren. Stattdessen:

1. **Sternschema erstellen**
   - Fakten-Tabellen (Transaktionen, Bewegungen)
   - Dimensions-Tabellen (Kunden, Produkte, Zeit)

2. **Beziehungen definieren**
   - Primärschlüssel identifizieren
   - Verknüpfungen zwischen Tabellen erstellen

3. **Berechnungen zentralisieren**
   - DAX-Measures für KPIs erstellen
   - Berechnungslogik dokumentieren

### Phase 4: Dashboards bauen (1-2 Wochen)

Beginnen Sie mit dem wichtigsten Bericht:

1. **Layout skizzieren** (Papier reicht)
2. **Visualisierungen auswählen**
3. **Filter und Slicer definieren**
4. **Design konsistent halten** (Farben, Fonts)
5. **Mobile Ansicht optimieren**

### Phase 5: Testen und schulen (1 Woche)

1. **Zahlen validieren**
   - Power BI vs. Excel für denselben Zeitraum
   - Abweichungen klären und dokumentieren

2. **Benutzer einbinden**
   - Feedback einholen
   - Schulung durchführen
   - Dokumentation erstellen

3. **Parallelbetrieb**
   - 2-4 Wochen beide Systeme führen
   - Vertrauen aufbauen

## Typische Fallstricke vermeiden

### 1. "Alles auf einmal" migrieren

**Problem:** Überforderung, lange Projektdauer, hohe Kosten.

**Lösung:** Start mit einem wichtigen Bericht. Erfolg zeigen. Dann erweitern.

### 2. Excel-Logik 1:1 übernehmen

**Problem:** Power BI funktioniert anders als Excel. Verschachtelte IF-Formeln werden zu DAX-Albträumen.

**Lösung:** Denken Sie das Datenmodell neu. Nutzen Sie die Stärken von Power BI.

### 3. Zu viele KPIs auf einem Dashboard

**Problem:** Informationsüberflutung. Niemand weiss, wo hinschauen.

**Lösung:** 5-7 KPIs pro Dashboard. Weniger ist mehr. Drill-Down für Details.

### 4. Keine Datenqualitätsprüfung

**Problem:** "Garbage in, garbage out" - schlechte Daten bleiben schlechte Daten.

**Lösung:** Datenqualitätsregeln implementieren. Fehlerhafte Datensätze kennzeichnen.

### 5. Vernachlässigung der Schulung

**Problem:** Das beste Dashboard nützt nichts, wenn niemand es nutzt.

**Lösung:** Zeit für Schulung einplanen. Champions im Team aufbauen.

## ROI-Berechnung für Ihr Unternehmen

### Beispiel: Mittelgrosses Schweizer Produktionsunternehmen

**Ausgangslage:**
- 50 Mitarbeiter
- 40 Stunden/Monat für Excel-Reporting
- Stundensatz: CHF 70

**Monatliche Kosten Excel:**
- 40h × CHF 70 = CHF 2'800
- Plus: Opportunitätskosten (verzögerte Entscheidungen)
- Plus: Fehlerkosten (falsche Daten → falsche Entscheidungen)

**Mit Power BI:**
- 10 Stunden/Monat für Analyse = CHF 700
- Power BI Pro: CHF 10/User × 10 User = CHF 100
- Monatliche Kosten: CHF 800

**Einsparung:** CHF 2'000/Monat = CHF 24'000/Jahr

**Einmalige Investition:**
- Implementierung: CHF 8'000-15'000
- Schulung: CHF 2'000-4'000

**Amortisation:** 5-9 Monate

## Checkliste für Ihre Migration

### Vor dem Start

- [ ] Management-Buy-in eingeholt
- [ ] Budget freigegeben
- [ ] Projektverantwortlicher benannt
- [ ] Berichts-Inventar erstellt
- [ ] Priorisierung abgeschlossen

### Während der Umsetzung

- [ ] Datenquellen dokumentiert
- [ ] Datenmodell erstellt
- [ ] Erstes Dashboard gebaut
- [ ] Zahlen validiert
- [ ] Feedback eingeholt

### Nach dem Go-Live

- [ ] Schulungen durchgeführt
- [ ] Dokumentation erstellt
- [ ] Parallelbetrieb abgeschlossen
- [ ] Erfolge gemessen
- [ ] Nächste Dashboards geplant

## Fazit

Die Migration von Excel zu Power BI ist keine technische Übung - es ist eine Transformation, wie Ihr Unternehmen mit Daten arbeitet. Der Aufwand lohnt sich, wenn Sie strukturiert vorgehen und die typischen Fehler vermeiden.

Starten Sie klein, zeigen Sie Erfolge, und bauen Sie von dort aus.

Brauchen Sie Unterstützung bei Ihrer Power BI Migration? [Vereinbaren Sie ein kostenloses Beratungsgespräch](/de#contact).

---

*Emanuel Flury hat dutzende Excel-zu-Power BI Migrationen in Schweizer KMU begleitet - mit Fokus auf schnelle Resultate und messbaren ROI.*
