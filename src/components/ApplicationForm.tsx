'use client';

import { useRef, useState } from 'react';
import { Turnstile, type TurnstileHandle } from './Turnstile';
import { DirectChannels, field, label } from './form-parts';

/**
 * Careers intake, against /api/apply.
 *
 * The route has existed since Phase 3 — multipart parsing, Cloud Storage
 * upload, signed read URLs, Turnstile, Firestore — with nothing calling it. The
 * page it belongs on was worse than empty: the extractor strips forms, so what
 * survived was the form's success state, thanking every visitor for an
 * application they never sent.
 *
 * Limits mirror the route exactly (8 MB per file, 15 MB total, extension
 * allow-list) so the browser rejects what the server would, rather than making
 * someone upload 15 MB to be told no.
 */

const MAX_FILE = 8 * 1024 * 1024;
const MAX_TOTAL = 15 * 1024 * 1024;
const ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.zip';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function mb(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function ApplicationForm() {
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

    // Same checks the route runs, so a 15 MB upload is not wasted to learn this.
    let total = 0;
    for (const [, value] of form.entries()) {
      if (!(value instanceof File) || value.size === 0) continue;
      if (value.size > MAX_FILE) {
        setError(`„${value.name}" ist ${mb(value.size)} gross — maximal 8 MB pro Datei.`);
        return;
      }
      total += value.size;
    }
    if (total > MAX_TOTAL) {
      setError(`Die Dateien sind zusammen ${mb(total)} gross — maximal 15 MB.`);
      return;
    }

    form.set('turnstileToken', token.current);
    setStatus('sending');

    try {
      const response = await fetch('/api/apply/', { method: 'POST', body: form });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
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
      <div className="max-w-xl rounded-xl border border-[var(--rule)] bg-[var(--surface-raised)] p-6">
        <p className="text-lg font-semibold">Vielen Dank für Ihre Bewerbung.</p>
        <p className="mt-2 leading-relaxed text-[var(--text-muted)]">
          Ihre Unterlagen sind eingegangen. Sie werden persönlich gelesen und
          beantwortet — von der Person, die mit Ihnen arbeiten würde.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5" noValidate>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ap-website">Website</label>
        <input id="ap-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="vorname">Vorname</label>
          <input id="vorname" name="vorname" required maxLength={300} autoComplete="given-name" className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label className={label} htmlFor="nachname">Nachname</label>
          <input id="nachname" name="nachname" required maxLength={300} autoComplete="family-name" className={`mt-1.5 ${field}`} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ap-email">E-Mail</label>
          <input id="ap-email" name="email" type="email" required maxLength={200} autoComplete="email" className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label className={label} htmlFor="telefon">
            Telefon <span className="font-normal text-[var(--text-faint)]">(optional)</span>
          </label>
          <input id="telefon" name="telefon" type="tel" maxLength={300} autoComplete="tel" className={`mt-1.5 ${field}`} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="adresse">Adresse</label>
        <input id="adresse" name="adresse" required maxLength={300} autoComplete="street-address" className={`mt-1.5 ${field}`} />
      </div>

      <div className="grid gap-5 sm:grid-cols-[8rem_minmax(0,1fr)]">
        <div>
          <label className={label} htmlFor="plz">PLZ</label>
          <input id="plz" name="plz" required maxLength={300} autoComplete="postal-code" className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label className={label} htmlFor="ort">Ort</label>
          <input id="ort" name="ort" required maxLength={300} autoComplete="address-level2" className={`mt-1.5 ${field}`} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="pensum">Pensum</label>
          <input id="pensum" name="pensum" required maxLength={300} placeholder="z. B. 80–100 %" className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label className={label} htmlFor="gehalt">Gehaltsvorstellung</label>
          <input id="gehalt" name="gehalt" required maxLength={300} placeholder="z. B. CHF 110'000" className={`mt-1.5 ${field}`} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="empfohlen">
          Empfohlen von <span className="font-normal text-[var(--text-faint)]">(optional)</span>
        </label>
        <input id="empfohlen" name="empfohlen" maxLength={300} className={`mt-1.5 ${field}`} />
      </div>

      <input type="hidden" name="job" value="Initiativbewerbung" />

      <fieldset className="space-y-4 border-t border-[var(--rule)] pt-5">
        <legend className="text-sm font-medium">Unterlagen</legend>
        <p className="text-sm text-[var(--text-muted)]">
          PDF, Word, Bild oder ZIP. Maximal 8 MB pro Datei, 15 MB insgesamt.
        </p>
        <div>
          <label className={label} htmlFor="cv">Lebenslauf</label>
          <input id="cv" name="cv" type="file" required accept={ACCEPT} className={`mt-1.5 ${field} file:me-3 file:rounded file:border-0 file:bg-[var(--surface-sunken)] file:px-3 file:py-1.5 file:text-sm`} />
        </div>
        <div>
          <label className={label} htmlFor="zeugnisse">Zeugnisse</label>
          <input id="zeugnisse" name="zeugnisse" type="file" required multiple accept={ACCEPT} className={`mt-1.5 ${field} file:me-3 file:rounded file:border-0 file:bg-[var(--surface-sunken)] file:px-3 file:py-1.5 file:text-sm`} />
        </div>
        <div>
          <label className={label} htmlFor="anschreiben">
            Anschreiben <span className="font-normal text-[var(--text-faint)]">(optional)</span>
          </label>
          <input id="anschreiben" name="anschreiben" type="file" accept={ACCEPT} className={`mt-1.5 ${field} file:me-3 file:rounded file:border-0 file:bg-[var(--surface-sunken)] file:px-3 file:py-1.5 file:text-sm`} />
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="datenschutz" value="1" required className="mt-1 h-5 w-5 accent-[var(--accent-text)]" />
        <span className="text-[var(--text-muted)]">
          Ich bin einverstanden, dass meine Angaben und Unterlagen zur Bearbeitung
          meiner Bewerbung gemäss{' '}
          <a href="/de/datenschutz/" className="text-[var(--link)] hover:underline">
            Datenschutzerklärung
          </a>{' '}
          bearbeitet werden.
        </span>
      </label>

      <Turnstile
        onToken={(t) => { token.current = t; }}
        onReady={(handle) => { turnstile.current = handle; }}
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
        className="tap rounded-sm bg-[var(--text)] px-5 small font-medium text-[var(--surface)] disabled:opacity-60"
      >
        {status === 'sending' ? 'Wird gesendet …' : 'Bewerbung senden'}
      </button>
    </form>
  );
}
