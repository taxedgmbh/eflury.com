'use client';

import { useRef, useState } from 'react';
import { Turnstile, type TurnstileHandle } from './Turnstile';
import { DirectChannels, field, label } from './form-parts';

/**
 * Guide request, against /api/contact `type: 'lead-magnet'`.
 *
 * The `guide` value must match a key in the GUIDES map in
 * src/app/api/contact/route.ts — the route answers with that guide's file path,
 * and the download starts from the response rather than being linked directly,
 * so the PDF stays behind the form.
 */
export function GuideRequestForm({ guide, title }: { guide: string; title: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [download, setDownload] = useState<string | null>(null);
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
          type: 'lead-magnet',
          guide,
          email: form.get('email'),
          name: form.get('name') || undefined,
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
      setDownload(body.download ?? null);
      setStatus('sent');
    } catch {
      setError('Verbindung fehlgeschlagen.');
      setStatus('error');
      turnstile.current?.reset();
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-raised)] p-5">
        <p className="font-medium">Bereit.</p>
        {download ? (
          <p className="mt-2">
            <a href={download} className="text-[var(--link)] hover:underline" download>
              {title} herunterladen
            </a>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`g-${guide}-website`}>Website</label>
        <input id={`g-${guide}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className={label} htmlFor={`g-${guide}-email`}>E-Mail</label>
        <input id={`g-${guide}-email`} name="email" type="email" required maxLength={200} autoComplete="email" className={`mt-1.5 ${field}`} />
      </div>
      <div>
        <label className={label} htmlFor={`g-${guide}-name`}>
          Name <span className="font-normal text-[var(--text-faint)]">(optional)</span>
        </label>
        <input id={`g-${guide}-name`} name="name" maxLength={120} className={`mt-1.5 ${field}`} />
      </div>
      <Turnstile
        onToken={(t) => { token.current = t; }}
        onReady={(h) => { turnstile.current = h; }}
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
        className="rounded-sm bg-[var(--text)] px-4 py-2 text-sm font-medium text-[var(--surface)] disabled:opacity-60"
      >
        {status === 'sending' ? 'Wird gesendet …' : 'Leitfaden anfordern'}
      </button>
    </form>
  );
}
