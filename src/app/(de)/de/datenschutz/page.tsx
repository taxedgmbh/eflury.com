import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { alternates, PAGES } from '@/lib/i18n';
import { ADDRESS, PERSON } from '@/lib/site';

const DESCRIPTION =
  'Wie eflury.com mit Personendaten umgeht: keine Cookies, keine Analyse, kein Tracking; ein freiwilliger Newsletter mit Double-Opt-in. Gehostet von Google.';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: DESCRIPTION,
  alternates: alternates(PAGES.privacy, 'de'),
  openGraph: {
    type: 'website',
    url: PAGES.privacy.de,
    title: 'Datenschutzerklärung · Emanuel Flury',
    description: DESCRIPTION,
    siteName: 'Emanuel Flury',
    locale: 'de_CH',
  },
  robots: { index: false, follow: true },
};

/* German twin of /en/privacy/. Keep both in step with what the site does. */
export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" updated="13. November 2026" lang="de" alts={PAGES.privacy}>
      <p>
        Diese Erklärung beschreibt, welche Personendaten diese Website bearbeitet, wozu und wie lange. Sie richtet sich
        nach dem Schweizer Bundesgesetz über den Datenschutz (DSG) und, soweit anwendbar, nach der
        Datenschutz-Grundverordnung der EU (DSGVO).
      </p>

      <h2>1. Verantwortlich</h2>
      <address>
        {PERSON.name}, {ADDRESS.streetAddress}, {ADDRESS.postalCode} {ADDRESS.addressLocality}, Schweiz
        <br />
        <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> · {PERSON.telephoneDisplay}
      </address>
      <p>
        Es gibt keine Datenschutzberaterin und keinen Datenschutzberater; schreiben Sie bei Fragen zu Ihren Daten an
        die obige Adresse.
      </p>

      <h2>2. Kurz gesagt</h2>
      <ul>
        <li>Keine Cookies, kein lokaler Speicher, keine Analyse, kein Tracking, keine Werbung.</li>
        <li>
          Keine Benutzerkonten. Das einzige Formular ist die freiwillige Newsletter-Anmeldung; Ihre E-Mail-Adresse wird
          nur behalten, wenn Sie sie bestätigen.
        </li>
        <li>Die Website wird von Google in den Niederlanden gehostet; technische Protokolle werden 30 Tage aufbewahrt.</li>
        <li>Vorschaubilder der YouTube-Videos laden von Google; ein Video selbst lädt erst, wenn Sie es anklicken.</li>
        <li>E-Mail und WhatsApp sind Links. Sie entscheiden, ob Sie sie nutzen.</li>
      </ul>

      <h2>3. Besuch der Website: Hosting und Serverprotokolle</h2>
      <p>
        Die Website läuft auf Firebase App Hosting, einem Dienst von Google Cloud (Google Ireland Limited / Google LLC),
        in der Rechenzentrumsregion von Google in den Niederlanden (europe-west4). Jeder Besuch wird technisch
        protokolliert: IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite, die verweisende Seite, Browser und
        Betriebssystem. Das ist nötig, um die Website auszuliefern, sie sicher zu halten und Fehler zu finden
        (berechtigtes Interesse; Art. 6 Abs. 1 lit. f DSGVO). Die Protokolle werden nach 30 Tagen gelöscht. Google
        bearbeitet diese Daten im Auftrag des Website-Inhabers und kann auch aus anderen Ländern darauf zugreifen,
        einschliesslich der USA, gestützt auf das Swiss-U.S. und das EU-U.S. Data Privacy Framework sowie
        Standardvertragsklauseln. Siehe die{' '}
        <a href="https://cloud.google.com/terms/data-processing-addendum" target="_blank" rel="noopener">
          Auftragsverarbeitungsbedingungen von Google
        </a>
        .
      </p>

      <h2>4. Nichts wird auf Ihrem Gerät gespeichert</h2>
      <p>
        Die Website setzt keine Cookies und nutzt keinen lokalen Speicher. Schriften, Skripte und Bilder werden von
        dieser Website selbst ausgeliefert; die einzige Ausnahme ist in Ziffer 5 beschrieben.
      </p>

      <h2>5. YouTube</h2>
      <p>
        Der YouTube-Bereich zeigt Vorschaubilder von Videos. Diese Bilder laden von Servern von Google (i.ytimg.com),
        sobald der Bereich sichtbar wird; Ihr Browser übermittelt dabei Ihre IP-Adresse an Google. Ein Video selbst
        lädt erst, wenn Sie es anklicken, und dann von youtube-nocookie.com, dem Modus von YouTube, der keine Cookies
        setzt, bis Sie das Video abspielen. Ab dann gilt die{' '}
        <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener">
          Datenschutzerklärung von Google
        </a>
        .
      </p>

      <h2>6. Kontakt per E-Mail und WhatsApp</h2>
      <p>
        Wenn Sie ein E-Mail oder eine WhatsApp-Nachricht schreiben, werden Ihre Kontaktdaten und Ihre Nachricht nur
        verwendet, um Ihnen zu antworten (vorvertragliche Massnahmen oder berechtigtes Interesse; Art. 6 Abs. 1 lit. b
        und f DSGVO). Das Postfach wird von Apple betrieben (iCloud Mail). WhatsApp ist ein Dienst der Meta Platforms
        Ireland Ltd.; die Nutzung ist Ihre Entscheidung, und für den Chat gilt die{' '}
        <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener">
          Datenschutzrichtlinie von WhatsApp
        </a>
        . Nachrichten werden gelöscht, sobald das Gespräch abgeschlossen ist, sofern das Gesetz keine Aufbewahrung
        verlangt.
      </p>

      <h2>7. Kontaktkarte und QR-Code</h2>
      <p>
        Die Kontaktkarte (vCard) und der QR-Code enthalten die eigenen Kontaktdaten von Emanuel Flury. Beim
        Herunterladen der Karte oder Scannen des Codes wird nichts über Sie übermittelt; die Daten werden nur auf
        Ihrem Gerät gespeichert.
      </p>

      <h2 id="newsletter">8. Newsletter</h2>
      <p>
        Sie können neue Notizen per E-Mail abonnieren. Dazu geben Sie Ihre E-Mail-Adresse ein. Danach erhalten Sie ein
        E-Mail mit einem Bestätigungslink (Double-Opt-in); angemeldet sind Sie erst, wenn Sie ihn anklicken.
        Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit widerrufen können.
      </p>
      <p>
        Gespeichert werden: Ihre E-Mail-Adresse, die Sprache, in der Sie sich angemeldet haben, der Zeitpunkt der
        Anmeldung und der Bestätigung sowie ein zufälliger Code für den Abmeldelink. Unbestätigte Anmeldungen werden
        nach 7 Tagen automatisch gelöscht. Zum Schutz vor Missbrauch wird die Zahl der Anmeldungen pro Tag mit einem
        nicht umkehrbaren Code aus Ihrer IP-Adresse und dem Datum gezählt; die IP-Adresse selbst wird nicht
        gespeichert, und der Zähler wird nach zwei Tagen gelöscht.
      </p>
      <p>
        Die Daten liegen in Google Cloud Firestore im Rechenzentrum von Google in Zürich, Schweiz (europe-west6), im
        eigenen Projekt dieser Website; sie werden an keinen Newsletter-Dienst weitergegeben. Die E-Mails werden aus
        dem eigenen Postfach von Emanuel Flury, me@eflury.com, versandt, das von Apple betrieben wird (iCloud Mail).
        Google und Apple bearbeiten die Daten im Auftrag des Website-Inhabers. Die E-Mails enthalten keine
        Zählpixel und keine nachverfolgten Links.
      </p>
      <p>
        Jedes E-Mail enthält einen Abmeldelink. Wenn Sie sich abmelden, wird Ihre E-Mail-Adresse sofort gelöscht. Sie
        können sich auch abmelden, indem Sie an <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> schreiben.
      </p>

      <h2>9. RSS-Feed</h2>
      <p>
        Die Notizen gibt es auch als RSS-Feed unter <a href={PAGES.rss.de}>eflury.com/de/rss.xml</a> (Deutsch) und{' '}
        <a href={PAGES.rss.en}>eflury.com/rss.xml</a> (Englisch). Ein Feedreader ruft ihn ab wie jede andere Seite
        (siehe Ziffer 3); darüber hinaus wird nichts erfasst.
      </p>

      <h2>10. Links zu sozialen Netzwerken</h2>
      <p>
        Links zu LinkedIn, Instagram, TikTok, YouTube, Facebook, GitHub und WhatsApp sind einfache Links. An diese
        Netzwerke werden keine Daten übermittelt, solange Sie nicht auf einen Link klicken; danach gelten deren
        Datenschutzbestimmungen.
      </p>

      <h2>11. Sicherheit</h2>
      <p>
        Die Website wird nur über eine verschlüsselte Verbindung ausgeliefert (HTTPS mit HSTS). Es gibt keine
        Benutzerkonten und keine Datenbank der Besucherinnen und Besucher. Die Newsletter-Liste kann nur von der Website
        selbst und vom Inhaber gelesen werden; sie ist aus dem Internet nicht erreichbar.
      </p>

      <h2>12. Ihre Rechte</h2>
      <p>
        Sie können Auskunft über die zu Ihnen bearbeiteten Personendaten verlangen und deren Berichtigung oder Löschung
        fordern. Sie können der Bearbeitung widersprechen und nach der DSGVO ihre Einschränkung oder die Herausgabe
        Ihrer Daten verlangen. Schreiben Sie an <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>. Sie können sich
        auch beim{' '}
        <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">
          Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)
        </a>{' '}
        oder bei einer Datenschutzbehörde in der EU beschweren.
      </p>
      <p>Es werden keine automatisierten Einzelentscheidungen getroffen und keine Profile erstellt.</p>

      <h2>13. Änderungen</h2>
      <p>
        Diese Erklärung wird angepasst, wenn sich die Website ändert. Es gilt immer die Fassung auf dieser Seite. Bei
        Abweichungen zwischen der deutschen und der englischen Fassung gilt die deutsche Fassung.
      </p>
    </LegalPage>
  );
}
