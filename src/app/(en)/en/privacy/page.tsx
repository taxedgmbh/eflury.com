import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { ADDRESS, PERSON } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How eflury.com handles personal data: no cookies, no analytics, no forms. Hosted by Google in the Netherlands.',
  alternates: { canonical: '/en/privacy/' },
  openGraph: {
    type: 'website',
    url: '/en/privacy/',
    title: 'Privacy policy · Emanuel Flury',
    description: 'How eflury.com handles personal data: no cookies, no analytics, no forms. Hosted by Google in the Netherlands.',
    siteName: 'Emanuel Flury',
    locale: 'en_GB',
  },
  // Required pages, not ones anyone should land on from a search. Links are
  // still followed.
  robots: { index: false, follow: true },
};

/*
 * Keep this in step with what the site actually does. Today: no cookies, no
 * browser storage, no analytics, no forms; Google hosts it (logs kept 30
 * days); YouTube thumbnails load from Google's image servers; a video loads
 * from youtube-nocookie.com only on click; WhatsApp and email are plain links.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="12 November 2026">
      <p>
        This policy explains which personal data this website processes, why, and for how long. It follows the Swiss
        Federal Act on Data Protection (FADP) and, where it applies, the EU General Data Protection Regulation (GDPR).
      </p>

      <h2>1. Who is responsible</h2>
      <address>
        {PERSON.name}, {ADDRESS.streetAddress}, {ADDRESS.postalCode} {ADDRESS.addressLocality},{' '}
        {ADDRESS.addressCountry}
        <br />
        <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> · {PERSON.telephoneDisplay}
      </address>
      <p>There is no data protection officer; write to the address above with any question about your data.</p>

      <h2>2. In short</h2>
      <ul>
        <li>No cookies, no local storage, no analytics, no tracking, no advertising.</li>
        <li>No forms and no accounts. Nothing you type on this website is stored.</li>
        <li>The website is hosted by Google in the Netherlands; technical logs are kept for 30 days.</li>
        <li>YouTube video previews load from Google; a video itself only loads when you click it.</li>
        <li>Email and WhatsApp are links. You decide whether to use them.</li>
      </ul>

      <h2>3. Visiting the website: hosting and server logs</h2>
      <p>
        The website runs on Firebase App Hosting, a service of Google Cloud (Google Ireland Limited / Google LLC), in
        Google&rsquo;s data centre region in the Netherlands (europe-west4). Every visit is logged technically: IP
        address, date and time, the page requested, the referring page, browser and operating system. This is needed to
        deliver the website, keep it secure and find errors (legitimate interest; Art. 6(1)(f) GDPR). The logs are
        deleted after 30 days. Google processes this data on the website owner&rsquo;s behalf and may access it from
        other countries, including the USA, under the Swiss&ndash;US and EU&ndash;US Data Privacy Frameworks and
        standard contractual clauses. See{' '}
        <a href="https://cloud.google.com/terms/data-processing-addendum" target="_blank" rel="noopener">
          Google&rsquo;s data processing terms
        </a>
        .
      </p>

      <h2>4. Nothing stored on your device</h2>
      <p>
        The website sets no cookies and uses no local storage. Fonts, scripts and images are served from this website
        itself; the only exception is described in section 5.
      </p>

      <h2>5. YouTube</h2>
      <p>
        The YouTube section shows preview images of videos. These images load from Google&rsquo;s servers
        (i.ytimg.com) when the section comes into view, so your browser sends your IP address to Google. A video itself
        loads only when you click it, and then from youtube-nocookie.com, YouTube&rsquo;s mode that sets no cookies
        until you play the video. From that point,{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
          Google&rsquo;s privacy policy
        </a>{' '}
        applies.
      </p>

      <h2>6. Contacting me: email and WhatsApp</h2>
      <p>
        If you write an email or a WhatsApp message, your contact details and message are used only to reply to you
        (pre-contractual measures or legitimate interest; Art. 6(1)(b) and (f) GDPR). The mailbox is hosted by Apple
        (iCloud Mail). WhatsApp is a service of Meta Platforms Ireland Ltd.; using it is your choice, and{' '}
        <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener">
          WhatsApp&rsquo;s privacy policy
        </a>{' '}
        applies to the chat. Messages are deleted once the conversation is over, unless the law requires them to be
        kept.
      </p>

      <h2>7. Contact card and QR code</h2>
      <p>
        The contact card (vCard) and the QR code contain Emanuel Flury&rsquo;s own contact details. Downloading the card
        or scanning the code transfers nothing about you; the data is saved only on your device.
      </p>

      <h2>8. Links to social networks</h2>
      <p>
        Links to LinkedIn, Instagram, TikTok, YouTube, Facebook, GitHub and WhatsApp are plain links. No data is sent
        to those networks unless you click a link; after that, their privacy policies apply.
      </p>

      <h2>9. Security</h2>
      <p>
        The website is only served over an encrypted connection (HTTPS with HSTS). There are no user accounts and no
        database of visitors.
      </p>

      <h2>10. Your rights</h2>
      <p>
        You can ask for information about the personal data processed about you, and for it to be corrected or
        deleted. You can object to processing and, under the GDPR, ask for it to be restricted or handed over to you.
        Write to <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>. You can also complain to the{' '}
        <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">
          Swiss Federal Data Protection and Information Commissioner (FDPIC)
        </a>{' '}
        or to a data protection authority in the EU.
      </p>
      <p>No decisions are made about you automatically, and no profiles are created.</p>

      <h2>11. Changes</h2>
      <p>This policy is updated when the website changes. The current version is always the one on this page.</p>
    </LegalPage>
  );
}
