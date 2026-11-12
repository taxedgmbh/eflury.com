'use client';

import { useEffect, useRef } from 'react';

/**
 * Brand hero background: a slow 3D field of connected nodes, echoing the
 * circuit lines of the EF mark. Ported from astro-src/src/scripts/hero-network.ts.
 *
 * three.js is imported once the page has loaded and the browser is idle, as a
 * separate chunk that never enters the page's initial bundle; the hero reads fine on plain navy until it
 * arrives. Reduced motion gets one still frame. The loop pauses off-screen and
 * in background tabs, and everything is disposed on unmount.
 */
export function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cleanup = () => {};
    let cancelled = false;

    // Decoration only: start once the page has loaded and the main thread is
    // idle, so three.js never competes with the first paint or first input.
    const start = () => import('three').then(init);
    let idleId = 0;
    const schedule = () => {
      idleId =
        typeof window.requestIdleCallback === 'function'
          ? window.requestIdleCallback(start, { timeout: 2500 })
          : window.setTimeout(start, 1200);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    const init = (THREE: typeof import('three')) => {
      if (cancelled || !canvas) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        return; // no WebGL: the navy hero stands on its own
      }
      // Phones get a lighter field: fewer nodes and a lower pixel ratio.
      const small = window.matchMedia('(max-width: 767px)').matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.set(0, 0, 14);

      // Node field on a wide wavy sheet
      const COLS = small ? 20 : 34;
      const ROWS = small ? 12 : 18;
      const N = COLS * ROWS;
      const base = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        base[i * 3] = (c / (COLS - 1) - 0.5) * 34 + (Math.random() - 0.5) * 0.6;
        base[i * 3 + 1] = (r / (ROWS - 1) - 0.5) * 16 + (Math.random() - 0.5) * 0.6;
        base[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
      const pos = new Float32Array(base);
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const spriteCanvas = document.createElement('canvas');
      spriteCanvas.width = spriteCanvas.height = 64;
      const g = spriteCanvas.getContext('2d')!;
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, 'rgba(255,255,255,1)');
      grd.addColorStop(0.35, 'rgba(255,255,255,0.6)');
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      const sprite = new THREE.CanvasTexture(spriteCanvas);

      const pMat = new THREE.PointsMaterial({
        color: 0x5ab8e8,
        size: 0.22,
        map: sprite,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(pGeo, pMat);

      // Sparse links: right / down neighbours, ~35% kept
      const pairs: number[] = [];
      for (let i = 0; i < N; i++) {
        const c = i % COLS;
        if (c < COLS - 1 && Math.random() < 0.35) pairs.push(i, i + 1);
        if (i + COLS < N && Math.random() < 0.35) pairs.push(i, i + COLS);
      }
      const lPos = new Float32Array(pairs.length * 3);
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
      const lMat = new THREE.LineBasicMaterial({
        color: 0x2dd4bf,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(lGeo, lMat);

      const group = new THREE.Group();
      group.add(lines, points);
      group.rotation.x = -0.55;
      scene.add(group);

      const mouse = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
        if (reduce) update(0);
      };

      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      });
      io.observe(canvas);

      function update(t: number) {
        for (let i = 0; i < N; i++) {
          const x = base[i * 3];
          const y = base[i * 3 + 1];
          pos[i * 3 + 2] = base[i * 3 + 2] + Math.sin(x * 0.35 + t * 0.6) * 0.9 + Math.cos(y * 0.45 + t * 0.4) * 0.7;
        }
        pGeo.attributes.position.needsUpdate = true;
        for (let k = 0; k < pairs.length; k++) {
          const i = pairs[k];
          lPos[k * 3] = pos[i * 3];
          lPos[k * 3 + 1] = pos[i * 3 + 1];
          lPos[k * 3 + 2] = pos[i * 3 + 2];
        }
        lGeo.attributes.position.needsUpdate = true;
        group.rotation.z = Math.sin(t * 0.05) * 0.08;
        camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
        camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      }

      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      resize();

      let raf = 0;
      if (!reduce) {
        const start = performance.now();
        const loop = () => {
          raf = requestAnimationFrame(loop);
          if (visible && !document.hidden) update((performance.now() - start) / 1000);
        };
        loop();
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener('pointermove', onMove);
        pGeo.dispose();
        lGeo.dispose();
        pMat.dispose();
        lMat.dispose();
        sprite.dispose();
        renderer.dispose();
      };
    };

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
      window.clearTimeout(idleId);
      cleanup();
    };
  }, []);

  return <canvas ref={ref} className="bh-canvas" aria-hidden />;
}
