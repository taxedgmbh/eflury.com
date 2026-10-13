'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Poster } from './Poster';

/**
 * Beraten · Bauen · Betreiben, as a machine that assembles while the visitor
 * scrolls.
 *
 * The three stages are the method the homepage already states, and the copy
 * below restates claims the site already makes elsewhere — the Go/No-Go audit,
 * the systems it connects to, the approval before anything is written, the
 * fixed input and output. The scene illustrates; it does not add a promise.
 *
 * No scroll-jacking. The page scrolls natively; the canvas column is
 * position: sticky inside a tall section, and progress is read from the
 * section's position. Libraries that take over scrolling (drei's
 * ScrollControls and the like) put the section in its own scroll container,
 * which is the wrong model for one section inside an ordinary page.
 */

const Scene = dynamic(() => import('./Scene').then((m) => m.Scene), { ssr: false });

const STAGES = [
  {
    step: '1 · Beraten',
    title: 'Zuerst wird sichtbar, was heute von Hand läuft.',
    body: 'Das Audit erfasst die Abläufe, die jeden Monat wiederkehren, und zeigt, welche sich zu automatisieren lohnen — mit ehrlichem Go/No-Go.',
  },
  {
    step: '2 · Bauen',
    title: 'Dann wird gebaut, auf den Systemen, die schon da sind.',
    body: 'Angebunden an bexio, CRM oder Excel. Was das System schreiben würde, geht zuerst durch eine Freigabe.',
  },
  {
    step: '3 · Betreiben',
    title: 'Danach läuft es von selbst.',
    body: 'Mit festem Eingang, festem Ausgang und einer Prüfung, die sich meldet, wenn etwas nicht stimmt.',
  },
] as const;

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function AutomationScroll() {
  const track = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  /*
   * How far through the stages the page is, 0 → 1. Measured on demand by the
   * scene, inside its render loop, rather than by a scroll listener here: the
   * scene only exists for visitors who get the animation, so a reduced-motion
   * visitor's page never attaches a scroll listener for it at all.
   */
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    return travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
  }, []);

  // Fetch three.js only when the section is within a viewport of being seen,
  // and never for a visitor who has asked for less motion or has no WebGL —
  // they keep the poster, which is drawn from the same layout.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !webglAvailable()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="ablauf-heading" className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
        <p className="small text-[var(--text-muted)]">Wiederholung ohne Aufwand</p>
        <span aria-hidden className="mt-4 block h-[3px] w-10 bg-[var(--accent)]" />
        <h2 id="ablauf-heading" className="title mt-5 max-w-[24ch]">
          Derselbe Ablauf, jeden Monat — ohne dass jemand ihn anstösst.
        </h2>
      </div>

      {/*
       * Progressive enhancement: the compact, static layout is the default, and
       * the tall pinned version is added only under motion-safe. The first
       * version did it the other way round with motion-reduce overrides, and on
       * desktop the md: classes came later in the cascade and won — reduced-
       * motion visitors got the full 300vh of scrolling with the poster parked
       * at the top of the section, out of sight.
       *
       * flex on a phone, grid from md. The sticky element must share a
       * containing block with the scrolling text: in a one-column grid it would
       * sit in its own row, exactly as tall as itself, and never stick.
       */}
      <div
        ref={track}
        className="mx-auto flex max-w-6xl flex-col px-6 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-x-12"
      >
        <div
          aria-hidden
          className="flex items-center py-8 md:col-start-2 md:row-start-1 md:self-start motion-safe:sticky motion-safe:top-0 motion-safe:z-10 motion-safe:h-[46svh] motion-safe:bg-[var(--surface)] motion-safe:py-0 md:motion-safe:top-[4.25rem] md:motion-safe:h-[calc(100svh-4.25rem)] md:motion-safe:bg-transparent"
        >
          <div className="relative h-full w-full">
            <div hidden={ready} className="flex items-center motion-safe:absolute motion-safe:inset-0">
              <Poster />
            </div>
            {load ? (
              <div className="absolute inset-0">
                <Scene measure={measure} onReady={() => setReady(true)} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="pb-16 sm:pb-24 md:col-start-1 md:row-start-1">
          <ol>
            {STAGES.map((s) => (
              <li
                key={s.step}
                className="py-8 motion-safe:flex motion-safe:min-h-[70svh] motion-safe:flex-col motion-safe:justify-center motion-safe:py-0 md:motion-safe:min-h-[85svh]"
              >
                <p className="small font-medium text-[var(--accent-text)]">{s.step}</p>
                <h3 className="heading mt-2 max-w-[22ch]">{s.title}</h3>
                <p className="mt-3 max-w-[42ch] text-[var(--text-muted)]">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="pt-4">
            <Link href="/de/methode/" className="tap gap-1.5 font-semibold text-[var(--link)] hover:underline">
              Wie Emanuel arbeitet <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
