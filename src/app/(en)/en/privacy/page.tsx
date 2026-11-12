import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { ADDRESS, PERSON } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  alternates: { canonical: '/en/privacy/' },
};

/*
 * Keep this in step with what the site actually does. Today: no cookies, no
 * analytics, no forms; Google hosts it; YouTube thumbnails load from Google's
 * image servers; a video loads from youtube-nocookie.com only on click.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="12 November 2026">
      <p>
        This policy explains which personal data this website processes and why. It follows the Swiss Federal Act on
        Data Protection (FADP) and, where it applies, the EU General Data Protection Regulation (GDPR).
      </p>

      <h2>Who is responsible</h2>
      <address>
        {PERSON.name}, {ADDRESS.streetAddress}, {ADDRESS.postalCode} {ADDRESS.addressLocality},{' '}
        {ADDRESS.addressCountry}
        <br />
        <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
      </address>

      <h2>In short</h2>
      <ul>
        <li>No cookies, no analytics, no tracking, no advertising.</li>
        <li>No forms. Nothing you type on this website is stored.</li>
        <li>The website is hosted by Google in the Netherlands.</li>
        <li>YouTube video previews load from Google; a video itself only loads when you click it.</li>
      </ul>

      <h2>Hosting and server logs</h2>
      <p>
        The website runs on Firebase App Hosting, a service of Google Cloud, in Google&rsquo;s data centre region in the
        Netherlands (europe-west4). Google processes this on behalf of the website owner. Every visit is logged
        technically: the IP address, date and time, the page requested, the browser and operating system. This is
        needed to deliver the website and keep it secure (legitimate interest, Art. 6(1)(f) GDPR). Google keeps these
        logs for a limited time and may process data in other countries, including the USA, under the safeguards of
        the Swiss&ndash;US and EU&ndash;US Data Privacy Frameworks and standard contractual clauses. See{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
          Google&rsquo;s privacy policy
        </a>
        .
      </p>

      <h2>YouTube</h2>
      <p>
        The YouTube section shows preview images of recent videos. These images load from Google&rsquo;s servers
        (i.ytimg.com), so your browser sends your IP address to Google when the section comes into view. A video
        itself loads only when you click it, and then from youtube-nocookie.com, YouTube&rsquo;s mode that sets no
        cookies until you play the video. From that point, YouTube&rsquo;s own{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
          privacy policy
        </a>{' '}
        applies.
      </p>

      <h2>Stored on your device</h2>
      <p>
        The website sets no cookies. Fonts and scripts are served from this website itself, not from third parties.
      </p>

      <h2>Email</h2>
      <p>
        If you write an email, your address and message are used only to reply to you. The mailbox is hosted by Apple
        (iCloud Mail). Emails are deleted once they are no longer needed.
      </p>

      <h2>Links to social networks</h2>
      <p>
        Links to LinkedIn, Instagram, TikTok, YouTube, Facebook and GitHub are plain links. No data is sent to those
        networks unless you click a link; after that, their privacy policies apply.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask for information about the data processed about you, and for it to be corrected or deleted. You can
        object to processing. Write to <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>. You can also complain to
        the Swiss Federal Data Protection and Information Commissioner (FDPIC) or to a data protection authority in
        the EU.
      </p>

      <h2>Changes</h2>
      <p>This policy is updated when the website changes. The current version is always the one on this page.</p>
    </LegalPage>
  );
}
