import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { REGISTRY } from '@/components/personal/data';
import { ADDRESS, PERSON } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Imprint of eflury.com, the personal website of Emanuel Flury, Grenchen, Switzerland.',
  alternates: { canonical: '/en/imprint/' },
  openGraph: {
    type: 'website',
    url: '/en/imprint/',
    title: 'Imprint · Emanuel Flury',
    description: 'Imprint of eflury.com, the personal website of Emanuel Flury, Grenchen, Switzerland.',
    siteName: 'Emanuel Flury',
    locale: 'en_GB',
  },
  // Required pages, not ones anyone should land on from a search. Links are
  // still followed.
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return (
    <LegalPage title="Imprint" updated="12 November 2026">
      <h2>Responsible for this website</h2>
      <address>
        {PERSON.name}
        <br />
        {ADDRESS.streetAddress}
        <br />
        {ADDRESS.postalCode} {ADDRESS.addressLocality}
        <br />
        {ADDRESS.addressCountry}
      </address>
      <ul className="legal-contact">
        <li>
          Email: <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </li>
        <li>
          Phone and WhatsApp: <a href={`tel:${PERSON.telephone}`}>{PERSON.telephoneDisplay}</a>
        </li>
      </ul>
      <p>
        Emanuel Flury is responsible for the content of this website. It is his personal website: it sells nothing,
        is not run by a company and is not a commercial offer.
      </p>

      <h2>Companies mentioned on this website</h2>
      <p>
        The companies have their own websites and imprints. Their entries in the Swiss commercial register are public:
      </p>
      <ul>
        <li>
          <strong>Skopa AG</strong>, Grenchen, UID {REGISTRY.skopa.uid}, commercial register of the Canton of{' '}
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
          <strong>Taxed GmbH</strong>, Biel/Bienne, UID {REGISTRY.taxed.uid}, commercial register of the Canton of{' '}
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
          <strong>EF Real Estate</strong> is the name under which Emanuel Flury holds residential property privately.
          It is not a company and has no register entry.
        </li>
      </ul>

      <h2>No advice</h2>
      <p>
        Nothing on this website is tax, legal, financial or investment advice. For advice on your own situation,
        contact a qualified adviser.
      </p>

      <h2>Liability</h2>
      <p>
        The content of this website is written with care, but no guarantee is given that it is correct, complete or
        up to date. To the extent permitted by law, liability for damage arising from the use of this website or of
        linked websites is excluded.
      </p>

      <h2>Links</h2>
      <p>
        This website links to other websites. Their operators alone are responsible for their content. Following a
        link is at your own risk.
      </p>

      <h2>Copyright</h2>
      <p>
        Text, photos, videos and graphics on this website belong to Emanuel Flury unless stated otherwise. The Skopa
        and Taxed logos belong to their companies. The press-kit material may be used as described in the{' '}
        <a href="/en/terms/">terms of use</a>; any other use needs prior written permission.
      </p>

      <h2>Privacy</h2>
      <p>
        How this website handles personal data is described in the <a href="/en/privacy/">privacy policy</a>.
      </p>
    </LegalPage>
  );
}
