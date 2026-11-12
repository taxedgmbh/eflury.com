import { Mail, Rss } from 'lucide-react';

/** True once the mail account for confirmations is configured (apphosting.yaml). */
export const NEWSLETTER_ON = process.env.NEXT_PUBLIC_NEWSLETTER === 'on';

/**
 * Newsletter sign-up. A plain HTML form posting to /api/newsletter/subscribe,
 * so it works without JavaScript; the API answers with a redirect to a status
 * page. Double opt-in: nothing is sent until the address is confirmed.
 *
 * The "website" field is a honeypot: hidden from people, filled by bots.
 */
export function NewsletterForm({ id = 'nl' }: { id?: string }) {
  if (!NEWSLETTER_ON) {
    return (
      <div className="nl">
        <a href="/rss.xml" className="pf-btn pf-btn-line">
          <Rss size={18} aria-hidden /> RSS feed
        </a>
      </div>
    );
  }
  return (
    <form className="nl" action="/api/newsletter/subscribe/" method="post">
      <label htmlFor={`${id}-email`} className="nl-label">
        Email address
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
          placeholder="you@example.com"
        />
        <button type="submit" className="pf-btn pf-btn-fill">
          <Mail size={18} aria-hidden /> Subscribe
        </button>
      </div>
      <div className="nl-hp" aria-hidden>
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="nl-small">
        New notes by email when I publish one. You confirm by email first, and every email has an unsubscribe link.
        No tracking. <a href="/en/privacy/#newsletter">Privacy</a> · <a href="/rss.xml">RSS feed</a>
      </p>
    </form>
  );
}
