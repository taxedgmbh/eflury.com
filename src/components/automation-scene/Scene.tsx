'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, type RefObject } from 'react';
import { PCFShadowMap, PerspectiveCamera, Vector3 } from 'three';
import { Machine } from './Machine';
import { STAGE, ease, span } from './layouts';
import { usePalette } from './palette';

/**
 * The WebGL half of the section. Loaded only on the client and only when the
 * section is near the viewport — see AutomationScroll — so three.js never
 * enters the homepage's initial bundle and cannot touch its LCP.
 */

/**
 * Radius of a sphere that contains the whole machine: half the base plate's
 * diagonal plus the height of the gear panel.
 */
const SCENE_RADIUS = 3.75;

/**
 * One camera view per stage — where it looks from, and what at. The rig
 * blends between them across the stage boundaries, so the camera drifts with
 * the story rather than cutting: above and in front while loose papers settle,
 * the three-quarter overview while the machine assembles, lower and closer to
 * the track once it runs.
 */
const VIEWS = [
  { from: new Vector3(2.8, 5.8, 8.6), at: new Vector3(0, 1.1, 0.1) },
  { from: new Vector3(5.0, 5.4, 7.8), at: new Vector3(0.1, 0.85, 0) },
  { from: new Vector3(5.8, 4.4, 7.4), at: new Vector3(0.35, 0.7, 0.3) },
].map((v) => ({ dir: v.from.clone().sub(v.at).normalize(), at: v.at }));

/**
 * Smoothed progress.
 *
 * Scroll arrives in steps — a mouse wheel moves 100px at a time — and mapping
 * that straight onto the scene makes every notch a jump. The shown value eases
 * toward the measured one instead, and keeps asking for frames only until it
 * has caught up, so the loop goes back to sleep when the visitor stops.
 */
function Driver({
  measure,
  shown,
}: {
  measure: () => number;
  shown: RefObject<number>;
}) {
  const invalidate = useThree((s) => s.invalidate);
  const started = useRef(false);

  // Priority -1 runs before the machine and camera, which read `shown`.
  useFrame((_, delta) => {
    const target = measure();
    if (!started.current) {
      // Start where the page already is; do not animate in from zero on load.
      shown.current = target;
      started.current = true;
      return;
    }
    // After an idle stretch, R3F's delta covers the whole pause; clamp it so
    // the first frame back does not jump to the end in one step.
    const dt = Math.min(delta, 1 / 30);
    const gap = target - shown.current;
    shown.current += gap * (1 - Math.exp(-dt * 7));
    if (Math.abs(gap) > 0.0005) invalidate();
    else shown.current = target;
  }, -1);

  return null;
}

/**
 * Blend between the stage views, then fit the distance to the canvas.
 *
 * The distance is solved from whichever field of view is narrower. A fixed
 * camera position cropped the machine on the real layout — a portrait column
 * 616 by 845 — because a perspective camera's horizontal field of view shrinks
 * with the aspect ratio.
 */
function CameraRig({ shown }: { shown: RefObject<number> }) {
  const scratch = useRef({ dir: new Vector3(), at: new Vector3() });

  useFrame((state) => {
    const camera = state.camera as PerspectiveCamera;
    const p = shown.current ?? 0;
    // Each blend straddles a stage boundary, so the camera is already moving
    // as the next stage's motion begins.
    const toBuild = ease(span(p, STAGE.sorting[0] + 0.06, STAGE.bauen[0] + 0.08));
    const toRun = ease(span(p, STAGE.betreiben[0] - 0.08, STAGE.betreiben[0] + 0.1));
    const { dir, at } = scratch.current;

    dir.copy(VIEWS[0].dir).lerp(VIEWS[1].dir, toBuild).lerp(VIEWS[2].dir, toRun).normalize();
    at.copy(VIEWS[0].at).lerp(VIEWS[1].at, toBuild).lerp(VIEWS[2].at, toRun);

    const { width, height } = state.size;
    const vFov = (camera.fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * (width / height));
    const distance = SCENE_RADIUS / Math.sin(Math.min(vFov, hFov) / 2);

    camera.position.copy(at).addScaledVector(dir, distance);
    camera.lookAt(at);
  });

  return null;
}

/** Scrolling asks for a frame; the Driver decides how many more it needs. */
function RedrawOnScroll() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const onScroll = () => invalidate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [invalidate]);
  return null;
}

export function Scene({
  measure,
  onReady,
}: {
  /** Returns how far through the section the page is, 0 → 1. */
  measure: () => number;
  onReady: () => void;
}) {
  const palette = usePalette();
  const shown = useRef(0);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      shadows={{ type: PCFShadowMap }}
      camera={{ fov: 29, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={() => onReady()}
    >
      <Driver measure={measure} shown={shown} />
      <CameraRig shown={shown} />
      <RedrawOnScroll />
      <ambientLight intensity={0.6} />
      <hemisphereLight intensity={0.35} />
      <directionalLight
        position={[3.5, 7, 4.5]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4.5}
        shadow-camera-right={4.5}
        shadow-camera-top={4}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0004}
        shadow-radius={4}
      />
      <directionalLight position={[-4, 2.5, -2]} intensity={0.3} />
      {palette ? <Machine palette={palette} progress={shown} /> : null}
    </Canvas>
  );
}
