'use client';

import { useRef, useState } from 'react';
import { Turnstile, type TurnstileHandle } from './Turnstile';
import { field } from './form-parts';

/**
 * Footer signup, against /api/contact `type: 'newsletter'`.
 *
 * Double opt-in: this only records the request. Nothing is sent until the
 * signed confirmation link is followed, which is what revDSG and GDPR require
 * and why the success copy says to check the inbox rather than "subscribed".
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const token = useRef<string | null>(null);
  const turnstile = useRef<TurnstileHandle | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!token.current) {
      setError('Einen Moment — die Sicherheitsprüfung läuft noch.');
      return;
    }
    const form = new FormData(event.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email: form.get('email'),
          website: form.get('website') || undefined,
          turnstileToken: token.current,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? 'Das hat nicht geklappt.');
        setStatus('error');
        turnstile.current?.reset();
        return;
      }
      setStatus('sent');
    } catch {
      setError('Verbindung fehlgeschlagen.');
      setStatus('error');
      turnstile.current?.reset();
    }
  }

  if (status === 'sent') {
    return (
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">
        Fast geschafft — bitte bestätigen Sie die Anmeldung über den Link in Ihrem
        Posteingang. Ohne Bestätigung wird nichts versendet.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="nl-website">Website</label>
        <input id="nl-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="nl-email" className="block text-sm text-[var(--text-muted)]">
        Gelegentlich ein Beitrag, wenn es etwas zu sagen gibt.
      </label>
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        maxLength={200}
        autoComplete="email"
        placeholder="Ihre E-Mail-Adresse"
        className={field}
      />
      <Turnstile
        onToken={(t) => { token.current = t; }}
        onReady={(h) => { turnstile.current = h; }}
      />
      {error ? (
        <p role="alert" className="text-sm text-[var(--text)]">{error}</p>
      ) : null}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="tap rounded-sm bg-[var(--text)] px-4 text-sm font-medium text-[var(--surface)] disabled:opacity-60"
      >
        {status === 'sending' ? 'Wird gesendet …' : 'Anmelden'}
      </button>
    </form>
  );
}
