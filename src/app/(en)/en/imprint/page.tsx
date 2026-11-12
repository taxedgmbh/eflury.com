import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
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
        <br />
        <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        <br />
        <a href={`tel:${PERSON.telephone}`}>{PERSON.telephoneDisplay}</a> (phone and WhatsApp)
      </address>
      <p>
        This is the personal website of Emanuel Flury. It sells nothing and is not the website of a company. The
        companies mentioned here have their own websites, with their own imprints:{' '}
        <a href="https://skopa.ai" target="_blank" rel="noopener">
          skopa.ai
        </a>{' '}
        and{' '}
        <a href="https://taxed.ch" target="_blank" rel="noopener">
          taxed.ch
        </a>
        .
      </p>

      <h2>Liability</h2>
      <p>
        The content of this website is written with care, but no guarantee is given that it is correct, complete or
        up to date. To the extent permitted by law, liability for damage arising from the use of this website is
        excluded.
      </p>

      <h2>Links</h2>
      <p>
        This website links to other websites. Their operators alone are responsible for their content. Following a
        link is at your own risk.
      </p>

      <h2>Copyright</h2>
      <p>
        Text, photos and graphics on this website belong to Emanuel Flury unless stated otherwise. Copying them needs
        prior written permission. The Skopa and Taxed logos belong to their companies.
      </p>

      <h2>Privacy</h2>
      <p>
        How this website handles personal data is described in the <a href="/en/privacy/">privacy policy</a>.
      </p>
    </LegalPage>
  );
}
