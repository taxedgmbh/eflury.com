/**
 * Photography for eflury.com, sourced from Wikimedia Commons.
 *
 * Openly licensed only, verified against the Commons API at fetch time rather
 * than trusted from this file — scripts/fetch-photos.mjs refuses anything whose
 * licence is not in its allow-list, so a file that is re-licensed upstream fails
 * the fetch instead of quietly shipping.
 *
 * The images are chosen to restate what the page is about rather than decorate
 * it: structural repetition where the subject is a process that runs the same
 * way every time, a watch movement where it is precision (and because Grenchen
 * is a watchmaking town, which is where this site's whole visual idea comes
 * from), stair flights where it is a sequence of phases.
 *
 * `focus` is the CSS object-position. Architectural photographs crop badly on
 * their centre — the subject is usually off-axis — so each one is set by eye.
 */

export const PHOTOS = [
  {
    id: 'facade-bays',
    title: 'File:Torre América and Gran Meliá Caracas in Bello Monte, Venezuela.jpg',
    focus: '50% 38%',
    alt: 'Hochhausfassade von unten: dieselbe Fensterachse, vielfach wiederholt bis in die Flucht.',
    use: 'Startseite — ein Ablauf, der jedes Mal gleich läuft.',
  },
  {
    id: 'switching-station',
    title:
      'File:Hans chr. hansen, architect- svanemølle koblingsstation, copenhagen 1966-1968 (5692115853).jpg',
    focus: '50% 45%',
    alt: 'Betonfassade eines Schaltwerks in strengem Raster, ohne Zierde.',
    use: 'Methode — Struktur vor Technik.',
  },
  {
    id: 'stair-flights',
    title: 'File:Spiral Staircase, Keck Center (U.S. National Academies).jpg',
    focus: '50% 50%',
    alt: 'Treppenläufe übereinander, von unten gesehen — eine Stufe nach der anderen.',
    use: 'Methode/Phasen — fünf Schritte mit Entscheid nach jedem.',
  },
  {
    id: 'watchmaker',
    title: 'File:Watchmaker (184539829).jpeg',
    focus: '50% 45%',
    alt: 'Uhrmacher an der Werkbank, über ein Werk gebeugt, Werkzeug in der Hand.',
    use: 'Über Emanuel / Karriere — Handwerk, und Grenchen ist eine Uhrenstadt.',
  },
  {
    id: 'market-hall',
    title: 'File:Woolwich Public Market Hall, Grade 2 Listed Building. 2016-03-05.jpg',
    focus: '50% 55%',
    alt: 'Stahlfachwerk einer Markthalle: viele gleiche Felder, unter einem Dach.',
    use: 'Einsatzbereiche — verschiedene Branchen, dieselbe Konstruktion darunter.',
  },
  {
    id: 'watch-movement',
    title: 'File:Nomos Tangente neomatik 41 Update, Ref. 180, DUW 6101 -- 2023 -- 0012X.jpg',
    focus: '50% 50%',
    alt: 'Offenes Uhrwerk in Grossaufnahme: Räderwerk, Brücken und Schrauben.',
    use: 'Fallstudien — gemessene Resultate, nicht geschätzte.',
  },
  {
    id: 'reading-room',
    title: 'File:Main Reading Room of the New York City Public Library on 5th Avenue ca, 1910-1920.jpg',
    focus: '50% 50%',
    alt: 'Grosser Lesesaal einer Bibliothek, Tischreihen unter hohen Fenstern.',
    use: 'Leitfäden — Nachschlagen statt Raten.',
  },
  {
    id: 'card-catalogue',
    title:
      'File:Kansallisarkisto Helsinki Rauhankatu 17 luettelohuone kortistokaappi 2026 02 23.jpg',
    focus: '50% 50%',
    alt: 'Karteikartenschrank im Lesesaal eines Staatsarchivs, Schublade an Schublade.',
    use: 'Datenqualität — ein Datensatz ist nur so gut wie seine Ordnung.',
  },
  {
    id: 'machine-shop',
    title:
      'File:Interior of the machine shop at the Petone Railway Workshops, 1924 ATLIB 299540.png',
    focus: '50% 55%',
    alt: 'Grosse Maschinenwerkstatt mit Drehbänken in langer Reihe, 1924.',
    use: 'Leistungen — eine Werkstatt, nicht ein Katalog.',
  },
  {
    id: 'lathe-workshop',
    title: 'File:Line shaft, boring machine, workshop, lathe, belt drive Fortepan 62666.jpg',
    focus: '50% 45%',
    alt: 'Werkstatt mit Transmissionsantrieb: eine Welle treibt mehrere Maschinen an.',
    use: 'Claude Skills — ein Antrieb, viele Werkzeuge.',
  },
  {
    id: 'micrometer',
    title: 'File:2 Micrometers.JPG',
    focus: '50% 50%',
    alt: 'Zwei Bügelmessschrauben, auf Hundertstel genau ablesbar.',
    use: 'KI-Audit — zuerst messen, dann urteilen.',
  },
  {
    id: 'control-room',
    title: 'File:Aprender (Entre Ríos) - Tunel subfluvial (02).jpg',
    focus: '50% 50%',
    alt: 'Leitstand mit Anzeigen und Schaltern, von dem aus ein Betrieb überwacht wird.',
    use: 'Betreuter Betrieb — jemand schaut hin, auch wenn es läuft.',
  },
  {
    id: 'engine-room',
    title: 'File:Machine shop, icebreaker suur tōll, maritime museum, tallinn, estonia.jpg',
    focus: '50% 50%',
    alt: 'Maschinenraum eines Eisbrechers: Wellen, Lager und Leitungen ineinander greifend.',
    use: 'MCP-Integration — Systeme, die miteinander verbunden sind.',
  },
  {
    id: 'ops-centre',
    title: 'File:ADPCentralOps.JPG',
    focus: '50% 50%',
    alt: 'Operations-Zentrale mit Bildschirmreihen und Arbeitsplätzen.',
    use: 'Power BI — Zahlen an einem Ort, für alle dieselben.',
  },
  {
    id: 'ledger-book',
    title: 'File:Geschäftsbuch 1833-49 Museum Senftenberg.jpg',
    focus: '50% 45%',
    alt: 'Aufgeschlagenes Geschäftsbuch von 1833, Spalten von Hand geführt.',
    use: 'Finanzprozesse — dieselbe Arbeit, bevor sie automatisiert wurde.',
  },
];
