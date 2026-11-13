import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { alternates, PAGES } from '@/lib/i18n';
import { PERSON } from '@/lib/site';

const DESCRIPTION =
  'Nutzungsbedingungen für eflury.com, einschliesslich der Verwendung von Kurzbiografien, Fotos, Logos und Video aus der Pressemappe.';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen',
  description: DESCRIPTION,
  alternates: alternates(PAGES.terms, 'de'),
  openGraph: {
    type: 'website',
    url: PAGES.terms.de,
    title: 'Nutzungsbedingungen · Emanuel Flury',
    description: DESCRIPTION,
    siteName: 'Emanuel Flury',
    locale: 'de_CH',
  },
  robots: { index: false, follow: true },
};

export default function NutzungsbedingungenPage() {
  return (
    <LegalPage title="Nutzungsbedingungen" updated="13. November 2026" lang="de" alt={PAGES.terms.en}>
      <p>
        Diese Bedingungen gelten für die Nutzung von eflury.com, der persönlichen Website von {PERSON.name}. Mit der
        Nutzung der Website akzeptieren Sie sie.
      </p>

      <h2>1. Zweck der Website</h2>
      <p>
        Die Website stellt Emanuel Flury und die Unternehmen vor, an denen er beteiligt ist. Sie dient nur der
        Information. Sie macht kein Angebot und begründet keinen Vertrag.
      </p>

      <h2>2. Keine Beratung</h2>
      <p>
        Nichts auf dieser Website ist Steuer-, Rechts-, Finanz- oder Anlageberatung, auch wo es um Steuern, Immobilien
        oder Technologie geht. Entscheidungen, die Sie gestützt auf diese Website treffen, liegen in Ihrer eigenen
        Verantwortung.
      </p>

      <h2>3. Urheberrecht</h2>
      <p>
        Alle Texte, Fotos, Videos, Grafiken und das EF-Logo sind urheberrechtlich geschützt und gehören Emanuel Flury,
        sofern nicht anders angegeben. Die Logos von Skopa und Taxed gehören der Skopa AG und der Taxed GmbH. Abgesehen
        von der Pressemappe (Ziffer 4) darf ohne vorgängige schriftliche Zustimmung nichts kopiert, verändert oder
        veröffentlicht werden.
      </p>

      <h2>4. Pressemappe</h2>
      <p>Kurzbiografien, Fotos, Logo-Paket, Intro-Video und Kontaktkarte der Pressemappe dürfen kostenlos verwendet werden:</p>
      <ul>
        <li>für Artikel, Berichte, Programme von Anlässen und Vorstellungen über Emanuel Flury oder seine Unternehmen;</li>
        <li>bei Fotos mit dem Vermerk «Foto: Emanuel Flury»;</li>
        <li>ohne Änderungen ausser Zuschneiden und Skalieren, und mit unverändert oder gekürzt zitierten Biografien;</li>
        <li>nicht so, dass der Eindruck entsteht, Emanuel Flury empfehle ein Produkt, eine Dienstleistung, eine Partei oder eine Meinung;</li>
        <li>nicht für Werbung und nicht in einem Zusammenhang, der seinem Ruf schadet.</li>
      </ul>
      <p>
        Für alles andere schreiben Sie an <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>.
      </p>

      <h2>5. Links</h2>
      <p>Links zu anderen Websites dienen der Bequemlichkeit. Für deren Inhalte sind allein deren Betreiber verantwortlich.</p>

      <h2>6. Haftung</h2>
      <p>
        Die Website wird bereitgestellt, wie sie ist, ohne Gewähr, dass sie richtig, vollständig, aktuell oder jederzeit
        verfügbar ist. Soweit gesetzlich zulässig, ist jede Haftung ausgeschlossen.
      </p>

      <h2>7. Datenschutz</h2>
      <p>
        Wie Personendaten bearbeitet werden, steht in der <a href={PAGES.privacy.de}>Datenschutzerklärung</a>.
      </p>

      <h2>8. Änderungen</h2>
      <p>Diese Bedingungen können jederzeit geändert werden. Es gilt die Fassung auf dieser Seite.</p>

      <h2>9. Anwendbares Recht und Gerichtsstand</h2>
      <p>Es gilt Schweizer Recht. Gerichtsstand ist Grenchen, Schweiz, soweit zwingendes Recht nichts anderes vorsieht.</p>

      <p>Bei Abweichungen zwischen der deutschen und der englischen Fassung gilt die deutsche Fassung.</p>
    </LegalPage>
  );
}
