import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { REGISTRY } from '@/components/personal/data';
import { alternates, PAGES } from '@/lib/i18n';
import { ADDRESS, PERSON } from '@/lib/site';

const DESCRIPTION = 'Impressum von eflury.com, der persönlichen Website von Emanuel Flury, Grenchen, Schweiz.';

export const metadata: Metadata = {
  title: 'Impressum',
  description: DESCRIPTION,
  alternates: alternates(PAGES.imprint, 'de'),
  openGraph: {
    type: 'website',
    url: PAGES.imprint.de,
    title: 'Impressum · Emanuel Flury',
    description: DESCRIPTION,
    siteName: 'Emanuel Flury',
    locale: 'de_CH',
  },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" updated="13. November 2026" lang="de" alt={PAGES.imprint.en}>
      <h2>Verantwortlich für diese Website</h2>
      <address>
        {PERSON.name}
        <br />
        {ADDRESS.streetAddress}
        <br />
        {ADDRESS.postalCode} {ADDRESS.addressLocality}
        <br />
        Schweiz
      </address>
      <ul className="legal-contact">
        <li>
          E-Mail: <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </li>
        <li>
          Telefon und WhatsApp: <a href={`tel:${PERSON.telephone}`}>{PERSON.telephoneDisplay}</a>
        </li>
      </ul>
      <p>
        Für den Inhalt dieser Website ist Emanuel Flury verantwortlich. Es ist seine persönliche Website: Sie verkauft
        nichts, wird von keiner Firma betrieben und ist kein kommerzielles Angebot.
      </p>

      <h2>Auf dieser Website erwähnte Unternehmen</h2>
      <p>Die Unternehmen haben eigene Websites und Impressen. Ihre Einträge im Handelsregister sind öffentlich:</p>
      <ul>
        <li>
          <strong>Skopa AG</strong>, Grenchen, UID {REGISTRY.skopa.uid}, Handelsregister des Kantons{' '}
          {REGISTRY.skopa.canton} (
          <a href={REGISTRY.skopa.zefix} target="_blank" rel="noopener">
            Zefix
          </a>
          ,{' '}
          <a href="https://skopa.ai" target="_blank" rel="noopener">
            skopa.ai
          </a>
          )
        </li>
        <li>
          <strong>Taxed GmbH</strong>, Biel/Bienne, UID {REGISTRY.taxed.uid}, Handelsregister des Kantons{' '}
          {REGISTRY.taxed.canton} (
          <a href={REGISTRY.taxed.zefix} target="_blank" rel="noopener">
            Zefix
          </a>
          ,{' '}
          <a href="https://taxed.ch" target="_blank" rel="noopener">
            taxed.ch
          </a>
          )
        </li>
        <li>
          <strong>EF Real Estate</strong> ist der Name, unter dem Emanuel Flury Wohnimmobilien privat hält. Es ist keine
          Firma und hat keinen Handelsregistereintrag.
        </li>
      </ul>

      <h2>Keine Beratung</h2>
      <p>
        Nichts auf dieser Website ist Steuer-, Rechts-, Finanz- oder Anlageberatung. Für eine Beratung zu Ihrer eigenen
        Situation wenden Sie sich an eine qualifizierte Fachperson.
      </p>

      <h2>Haftung</h2>
      <p>
        Die Inhalte dieser Website werden mit Sorgfalt erstellt, doch wird keine Gewähr für ihre Richtigkeit,
        Vollständigkeit oder Aktualität übernommen. Soweit gesetzlich zulässig, ist jede Haftung für Schäden aus der
        Nutzung dieser Website oder verlinkter Websites ausgeschlossen.
      </p>

      <h2>Links</h2>
      <p>
        Diese Website verlinkt auf andere Websites. Für deren Inhalte sind allein deren Betreiber verantwortlich. Das
        Aufrufen eines Links erfolgt auf eigenes Risiko.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Texte, Fotos, Videos und Grafiken auf dieser Website gehören Emanuel Flury, sofern nicht anders angegeben. Die
        Logos von Skopa und Taxed gehören den jeweiligen Unternehmen. Das Material der Pressemappe darf gemäss den{' '}
        <a href={PAGES.terms.de}>Nutzungsbedingungen</a> verwendet werden; jede andere Verwendung braucht eine vorgängige
        schriftliche Zustimmung.
      </p>

      <h2>Datenschutz</h2>
      <p>
        Wie diese Website mit Personendaten umgeht, steht in der <a href={PAGES.privacy.de}>Datenschutzerklärung</a>.
      </p>
    </LegalPage>
  );
}
