import { Mail, Rss } from 'lucide-react';
import { PAGES, pick, type Lang } from '@/lib/i18n';

/** True once the mail account for confirmations is configured (apphosting.yaml). */
export const NEWSLETTER_ON = process.env.NEXT_PUBLIC_NEWSLETTER === 'on';

/**
 * Newsletter sign-up. A plain HTML form posting to /api/newsletter/subscribe,
 * so it works without JavaScript; the API answers with a redirect to a status
 * page. Double opt-in: nothing is sent until the address is confirmed.
 * The hidden "lang" field decides the language of the emails.
 *
 * The "website" field is a honeypot: hidden from people, filled by bots.
 */
export function NewsletterForm({ id = 'nl', lang = 'en' }: { id?: string; lang?: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  if (!NEWSLETTER_ON) {
    return (
      <div className="nl">
        <a href={PAGES.rss[lang]} className="pf-btn pf-btn-line">
          <Rss size={18} aria-hidden /> {t('RSS feed', 'RSS-Feed')}
        </a>
      </div>
    );
  }
  return (
    <form className="nl" action="/api/newsletter/subscribe/" method="post">
      <input type="hidden" name="lang" value={lang} />
      <label htmlFor={`${id}-email`} className="nl-label">
        {t('Email address', 'E-Mail-Adresse')}
      </label>
      <div className="nl-row">
        <input
          id={`${id}-email`}
          className="nl-input"
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          placeholder={t('you@example.com', 'name@beispiel.ch')}
        />
        <button type="submit" className="pf-btn pf-btn-fill">
          <Mail size={18} aria-hidden /> {t('Subscribe', 'Abonnieren')}
        </button>
      </div>
      <div className="nl-hp" aria-hidden>
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="nl-small">
        {t(
          'New notes by email when I publish one. You confirm by email first, and every email has an unsubscribe link. No tracking.',
          'Neue Notizen per E-Mail, sobald ich eine veröffentliche. Sie bestätigen zuerst per E-Mail, und jedes E-Mail enthält einen Abmeldelink. Kein Tracking.',
        )}{' '}
        <a href={`${PAGES.privacy[lang]}#newsletter`}>{t('Privacy', 'Datenschutz')}</a> ·{' '}
        <a href={PAGES.rss[lang]}>{t('RSS feed', 'RSS-Feed')}</a>
      </p>
    </form>
  );
}
