'use client';

import { useEffect, useId, useRef } from 'react';

/**
 * Cloudflare Turnstile widget.
 *
 * The token it produces is now actually checked: /api/contact calls siteverify
 * server-side. On the Astro site the widget rendered and gated the submit
 * button, but nothing verified the token, so posting straight to the endpoint
 * bypassed it entirely.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit';

export interface TurnstileHandle {
  reset: () => void;
}

export function Turnstile({
  onToken,
  onReady,
}: {
  onToken: (token: string | null) => void;
  onReady?: (handle: TurnstileHandle) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const id = useId();
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;

  useEffect(() => {
    if (!sitekey || !container.current) return;

    const render = () => {
      if (!window.turnstile || !container.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(container.current, {
        sitekey,
        language: 'de',
        theme: 'auto',
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(null),
        'error-callback': () => onToken(null),
      });
      onReady?.({
        reset: () => {
          window.turnstile?.reset(widgetId.current ?? undefined);
          onToken(null);
        },
      });
    };

    if (window.turnstile) {
      render();
    } else if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      window.onloadTurnstileCallback = render;
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      // Script is in flight from another instance; chain onto its callback.
      const previous = window.onloadTurnstileCallback;
      window.onloadTurnstileCallback = () => {
        previous?.();
        render();
      };
    }

    const current = widgetId;
    return () => {
      if (current.current) window.turnstile?.remove(current.current);
      current.current = null;
    };
    // onToken/onReady are held in refs by callers; re-running would re-render the
    // widget and invalidate an already-solved token.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sitekey]);

  if (!sitekey) {
    return (
      <p className="text-sm text-[var(--text-faint)]">
        Sicherheitsprüfung ist nicht konfiguriert.
      </p>
    );
  }

  return <div ref={container} id={`turnstile-${id}`} className="min-h-[65px]" />;
}
