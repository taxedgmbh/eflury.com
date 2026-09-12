'use client';

import { useRef, useState } from 'react';
import { Turnstile, type TurnstileHandle } from './Turnstile';
import { PERSON } from '@/lib/site';

/**
 * Shown whenever a submission does not get through — a failed security check, a
 * missing secret, a network error, anything.
 *
 * A real enquiry arrived the week this was written: thirty employees, seven
 * admin seats, a full advise-build-run brief. Losing one of those to a 403 the
 * visitor cannot act on is far worse than any spam it would let through, and
 * the form is not the only way to reach him.
 */
function DirectChannels() {
  return (
    <div className="mt-4 rounded-xl border border-[var(--rule)] bg-[var(--surface-sunken)] p-4 text-sm">
      <p className="font-medium text-[var(--text)]">Sie erreichen Emanuel auch direkt:</p>
      <ul className="mt-2 space-y-1">
        <li>
          <a href={`mailto:${PERSON.email}`} className="text-[var(--link)] hover:underline">
            {PERSON.email}
          </a>
        </li>
        <li>
          <a href={`tel:${PERSON.telephone}`} className="text-[var(--link)] hover:underline">
            {PERSON.telephoneDisplay}
          </a>
        </li>
        <li>
          <a
            href={`https://wa.me/${PERSON.telephone.replace('+', '')}`}
            className="text-[var(--link)] hover:underline"
            rel="noopener"
          >
            WhatsApp
          </a>
        </li>
      </ul>
    </div>
  );
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] px-3 py-2.5 text-[0.95rem] text-[var(--text)] outline-none focus-visible:border-[var(--link)]';
const label = 'block text-sm font-medium';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const token = useRef<string | null>(null);
  const turnstile = useRef<TurnstileHandle | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!token.current) {
      setError('Bitte warten Sie, bis die Sicherheitsprüfung abgeschlossen ist.');
      return;
    }

    const form = new FormData(event.currentTarget);
    setStatus('sending');

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: form.get('name'),
          email: form.get('email'),
          company: form.get('company') || undefined,
          phone: form.get('phone') || undefined,
          message: form.get('message'),
          website: form.get('website') || undefined,
          turnstileToken: token.current,
        }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(body.error ?? 'Das hat nicht geklappt.');
        setStatus('error');
        // A token is single-use; without a reset a retry always fails.
        turnstile.current?.reset();
        return;
      }
      setStatus('sent');
    } catch {
      setError(`Verbindung fehlgeschlagen. Schreiben Sie direkt an ${PERSON.email}.`);
      setStatus('error');
      turnstile.current?.reset();
    }
  }

  if (status === 'sent') {
    return (
      <div className="max-w-xl border-t border-[var(--rule-strong)] pt-6">
        <p className="text-lg leading-relaxed">
          Danke — die Nachricht ist angekommen. Emanuel meldet sich innert 24 Stunden.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5" noValidate>
      {/* Honeypot: hidden from people, offered to bots that parse the markup. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className={label} htmlFor="name">
          Name
        </label>
        <input id="name" name="name" required maxLength={120} className={`mt-1.5 ${field}`} />
      </div>

      <div>
        <label className={label} htmlFor="email">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className={`mt-1.5 ${field}`}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="company">
            Firma <span className="font-normal text-[var(--text-faint)]">(optional)</span>
          </label>
          <input id="company" name="company" maxLength={160} className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label className={label} htmlFor="phone">
            Telefon <span className="font-normal text-[var(--text-faint)]">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={60}
            className={`mt-1.5 ${field}`}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          Worum geht es?
        </label>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Am hilfreichsten: welcher Prozess Zeit kostet und wie oft er anfällt.
        </p>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={`mt-1.5 ${field} resize-y`}
        />
      </div>

      <Turnstile
        onToken={(t) => {
          token.current = t;
        }}
        onReady={(handle) => {
          turnstile.current = handle;
        }}
      />

      {error ? (
        <div role="alert">
          <p className="text-sm text-[var(--text)]">{error}</p>
          <DirectChannels />
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-sm bg-[var(--text)] px-5 py-2.5 text-[0.95rem] font-medium text-[var(--surface)] disabled:opacity-60"
      >
        {status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
      </button>

      <p className="text-sm text-[var(--text-faint)]">
        Die Angaben werden gemäss{' '}
        <a href="/de/datenschutz/" className="text-[var(--link)] hover:underline">
          Datenschutzerklärung
        </a>{' '}
        bearbeitet.
      </p>
    </form>
  );
}
