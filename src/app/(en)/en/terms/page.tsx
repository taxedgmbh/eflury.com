import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { alternates, PAGES } from '@/lib/i18n';
import { PERSON } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'Terms of use for eflury.com, including how the press-kit bios, photos, logos and video may be used.',
  alternates: alternates(PAGES.terms, 'en'),
  openGraph: {
    type: 'website',
    url: '/en/terms/',
    title: 'Terms of use · Emanuel Flury',
    description: 'Terms of use for eflury.com, including how the press-kit bios, photos, logos and video may be used.',
    siteName: 'Emanuel Flury',
    locale: 'en_GB',
  },
  // Required pages, not ones anyone should land on from a search. Links are
  // still followed.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="12 November 2026" alts={PAGES.terms}>
      <p>
        These terms apply to the use of eflury.com, the personal website of {PERSON.name}. By using the website you
        accept them.
      </p>

      <h2>1. Purpose of the website</h2>
      <p>
        The website introduces Emanuel Flury and the businesses he is involved in. It is for information only. It makes
        no offer and creates no contract.
      </p>

      <h2>2. No advice</h2>
      <p>
        Nothing on this website is tax, legal, financial or investment advice, including where it touches on tax, real
        estate or technology. Decisions you make on the basis of this website are your own responsibility.
      </p>

      <h2>3. Copyright</h2>
      <p>
        All text, photos, videos, graphics and the EF logo are protected by copyright and belong to Emanuel Flury
        unless stated otherwise. The Skopa and Taxed logos belong to Skopa AG and Taxed GmbH. Apart from the press kit
        (section 4), nothing may be copied, changed or published without prior written permission.
      </p>

      <h2>4. Press kit</h2>
      <p>The bios, photos, logo pack, intro video and contact card in the press kit may be used free of charge:</p>
      <ul>
        <li>for articles, reports, event programmes and introductions about Emanuel Flury or his businesses;</li>
        <li>with the credit &ldquo;Photo: Emanuel Flury&rdquo; for photos;</li>
        <li>without changes beyond cropping and resizing, and with the bios quoted unchanged or shortened;</li>
        <li>not in a way that suggests Emanuel Flury endorses a product, service, party or opinion;</li>
        <li>not for advertising, and not in any context that harms his reputation.</li>
      </ul>
      <p>
        For anything else, write to <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>.
      </p>

      <h2>5. Links</h2>
      <p>
        Links to other websites are provided for convenience. Their operators alone are responsible for their content.
      </p>

      <h2>6. Liability</h2>
      <p>
        The website is provided as it is, without any guarantee that it is correct, complete, up to date or always
        available. To the extent permitted by law, any liability is excluded.
      </p>

      <h2>7. Privacy</h2>
      <p>
        How personal data is handled is described in the <a href="/en/privacy/">privacy policy</a>.
      </p>

      <h2>8. Changes</h2>
      <p>These terms may be changed at any time. The version on this page applies.</p>

      <h2>9. Law and jurisdiction</h2>
      <p>Swiss law applies. The place of jurisdiction is Grenchen, Switzerland, unless mandatory law provides otherwise.</p>
    </LegalPage>
  );
}
