'use client';

import { useEffect, useRef, useState } from 'react';
import { PERSON } from '@/lib/site';

/**
 * Site assistant, replacing AIChatbot.astro.
 *
 * Two behavioural changes over the PHP version, both from the plan:
 * conversation is no longer stateless single-turn (a short history is sent and
 * capped again server-side), and the endpoint is /api/chat rather than
 * /api/chat.php. Streaming is still to come.
 */

interface Turn {
  role: 'user' | 'model';
  text: string;
}

const GREETING =
  'Grüezi. Fragen Sie mich, was Automatisierung in Ihrem Betrieb bringen würde — oder was sie kostet.';

/** Minimal, deliberately conservative markdown: bold, links, line breaks. */
function render(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br />');
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const [draft, setDraft] = useState('');
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [turns, pending]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || pending) return;

    const history = turns.slice(-10);
    setTurns((t) => [...t, { role: 'user', text: message }]);
    setDraft('');
    setPending(true);

    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });
      const body = await response.json().catch(() => ({}));
      setTurns((t) => [
        ...t,
        {
          role: 'model',
          text:
            body.reply ??
            `Da ist etwas schiefgelaufen. Schreiben Sie Emanuel direkt: ${PERSON.email}`,
        },
      ]);
    } catch {
      setTurns((t) => [
        ...t,
        { role: 'model', text: `Keine Verbindung. Schreiben Sie an ${PERSON.email}.` },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        className="fixed right-5 bottom-5 z-50 rounded-full border border-[var(--rule-strong)] bg-[var(--text)] px-5 py-3 text-sm font-medium text-[var(--surface)] shadow-lg"
      >
        {open ? 'Schliessen' : 'Frage stellen'}
      </button>

      <div
        id="chat-panel"
        hidden={!open}
        className="fixed right-5 bottom-20 z-50 flex max-h-[min(30rem,70vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col rounded-md border border-[var(--rule-strong)] bg-[var(--surface-raised)] shadow-2xl"
      >
        <div className="border-b border-[var(--rule)] px-4 py-3">
          <p className="text-sm font-semibold">Effi</p>
          <p className="text-xs text-[var(--text-muted)]">
            Antwortet zu Leistungen, Ablauf und Preisen
          </p>
        </div>

        <div ref={log} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
          <p className="font-serif text-[0.95rem] leading-relaxed text-[var(--text-muted)]">
            {GREETING}
          </p>
          {turns.map((turn, i) => (
            <div
              key={i}
              className={
                turn.role === 'user'
                  ? 'ms-auto max-w-[85%] rounded-md bg-[var(--surface-sunken)] px-3 py-2 text-[0.95rem]'
                  : 'max-w-[92%] font-serif text-[0.95rem] leading-relaxed'
              }
            >
              {turn.role === 'model' ? (
                <span dangerouslySetInnerHTML={{ __html: render(turn.text) }} />
              ) : (
                turn.text
              )}
            </div>
          ))}
          {pending ? (
            <p className="text-sm text-[var(--text-faint)]">Effi denkt nach …</p>
          ) : null}
        </div>

        <form onSubmit={send} className="flex gap-2 border-t border-[var(--rule)] p-3">
          <label htmlFor="chat-input" className="sr-only">
            Ihre Frage
          </label>
          <input
            id="chat-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={2000}
            placeholder="Ihre Frage"
            className="min-w-0 flex-1 rounded-sm border border-[var(--rule)] bg-[var(--surface)] px-3 py-2 text-[0.95rem] outline-none focus-visible:border-[var(--link)]"
          />
          <button
            type="submit"
            disabled={pending || !draft.trim()}
            className="rounded-sm bg-[var(--text)] px-3.5 py-2 text-sm font-medium text-[var(--surface)] disabled:opacity-50"
          >
            Senden
          </button>
        </form>
      </div>
    </>
  );
}
