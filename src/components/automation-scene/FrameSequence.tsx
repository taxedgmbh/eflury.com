'use client';

import { useEffect, useRef } from 'react';
import { DESK_FOOTAGE, footageFrame } from '@/lib/footage';
import { STAGE, ease, span } from './layouts';

/**
 * The filmed half of stage 1: someone doing the work by hand, played by
 * scroll.
 *
 * One still per scroll position, drawn onto a 2D canvas — not a <video> with
 * currentTime set on scroll, which only lands on keyframes and stutters. No
 * three.js here, so this half can load ahead of the 3D scene and costs only
 * the frames themselves.
 *
 * Mounted only once the section is near and only for visitors who get motion
 * (see AutomationScroll), so the scroll listener below never exists for a
 * reduced-motion visitor.
 */

const F = DESK_FOOTAGE;

/** Frames in flight at once while loading. */
const CONCURRENCY = 6;

export function FrameSequence({ measure }: { measure: () => number }) {
  const layer = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const wrap = layer.current;
    const ctx = el?.getContext('2d');
    if (!el || !wrap || !ctx) return;

    let cancelled = false;
    let raf = 0;
    let shown = measure();
    let last = 0;
    const frames: (HTMLImageElement | null)[] = Array(F.frames).fill(null);

    // The 640 set covers phones and the narrow column; 960 anything with
    // more device pixels than that to fill.
    const devicePx = el.clientWidth * Math.min(2, window.devicePixelRatio || 1);
    const width = devicePx > F.widths[1] ? F.widths[0] : F.widths[1];

    function nearestLoaded(index: number): HTMLImageElement | null {
      for (let d = 0; d < F.frames; d++) {
        const a = frames[index - d];
        if (a) return a;
        const b = frames[index + d];
        if (b) return b;
      }
      return null;
    }

    function draw() {
      const p = shown;
      const index = Math.round(span(p, ...STAGE.footage) * (F.frames - 1));
      const img = nearestLoaded(index);
      const { width: cw, height: ch } = el!;
      ctx!.clearRect(0, 0, cw, ch);
      if (img) {
        // Fitted, not cropped: the frame is already cut to the hands and
        // keyboard, and the column is portrait on desktop and landscape on a
        // phone. Cover would cut the hands off in one or the other.
        const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        const x = (cw - w) / 2;
        const y = (ch - h) / 2;
        const radius = 12 * (cw / el!.clientWidth); // --radius-md, in canvas px
        ctx!.save();
        ctx!.beginPath();
        ctx!.roundRect(x, y, w, h, radius);
        ctx!.clip();
        ctx!.drawImage(img, x, y, w, h);
        ctx!.restore();
      }
      // The 3D scene sits underneath; fading this layer out hands over to it.
      wrap!.style.opacity = String(1 - ease(span(p, ...STAGE.crossfade)));
      wrap!.style.visibility = p >= STAGE.crossfade[1] ? 'hidden' : 'visible';
    }

    // Same smoothing as the 3D scene's Driver, so both halves move alike: the
    // shown position eases toward the scrolled one, and the loop stops once
    // it has caught up.
    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const target = measure();
      const gap = target - shown;
      shown += gap * (1 - Math.exp(-dt * 7));
      if (Math.abs(gap) <= 0.0005) shown = target;
      draw();
      raf = Math.abs(gap) > 0.0005 ? requestAnimationFrame(tick) : 0;
    }

    function wake() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      el!.width = Math.round(el!.clientWidth * dpr);
      el!.height = Math.round(el!.clientHeight * dpr);
      draw();
    }

    // First frame first, then the rest in playing order, so whatever the
    // visitor scrolls to is either loaded or close to a frame that is.
    let next = 0;
    function loadNext() {
      if (cancelled || next >= F.frames) return;
      const i = next++;
      const img = new Image();
      img.decoding = 'async';
      img.src = footageFrame(F, i, width);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          frames[i] = img;
          draw();
        })
        .catch(() => {})
        .finally(loadNext);
    }
    for (let k = 0; k < CONCURRENCY; k++) loadNext();

    const observer = new ResizeObserver(resize);
    observer.observe(el);
    window.addEventListener('scroll', wake, { passive: true });
    resize();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('scroll', wake);
    };
  }, [measure]);

  return (
    <div ref={layer} className="absolute inset-0 bg-[var(--surface)]">
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
