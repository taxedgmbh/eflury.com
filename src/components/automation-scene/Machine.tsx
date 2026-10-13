'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import {
  CanvasTexture,
  CylinderGeometry,
  Group,
  InstancedMesh,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  SRGBColorSpace,
  type BufferGeometry,
} from 'three';
import { gearGeometry, roundedBoxGeometry, tileGeometry } from './geometry';
import {
  BASE,
  BASE_TOP,
  GATE,
  GEARS,
  PANEL,
  RACK_YAW,
  STAGE,
  SYSTEMS,
  SYSTEM_BLOCK,
  TILE_COUNT,
  TRACK,
  ease,
  groupedLayout,
  lerp3,
  pathPose,
  scatterLayout,
  span,
  systemBlockPosition,
  type TilePose,
} from './layouts';
import type { Palette } from './palette';

/**
 * The machine, driven by scroll.
 *
 *   Beraten   loose documents settle into three sorted piles
 *   Bauen     the machine assembles around them, part by part
 *   Betreiben the gears turn and the documents run through the gate
 *             onto the stack
 *
 * Every transform is a pure function of `progress` (0 → 1), computed in the
 * render loop and written straight to the objects — nothing here is React
 * state, so scrolling never re-renders a component. Scrolling back up plays
 * the whole thing in reverse for free, because there is no timeline to rewind,
 * only a function to evaluate.
 *
 * Restraint is deliberate. The site's design rules name "vibe code style" as
 * the failure mode, so this uses the brand tokens, matte surfaces and one
 * accent colour, reserved for the approval gate and one gear. No glow, no
 * bloom, no post-processing, nothing that moves unless the visitor scrolls.
 */

function labelTexture(text: string, palette: Palette): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = palette.css.raised;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = palette.css.ink;
  ctx.font = '700 64px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** A page: a heading bar and ruled lines, so a tile reads as a document. */
function documentTexture(palette: Palette): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 168;
  canvas.height = 232;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = palette.css.paper;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = palette.css.paperInk;
  ctx.globalAlpha = 0.8;
  ctx.fillRect(18, 22, 84, 12);
  ctx.globalAlpha = 0.3;
  for (let y = 52; y < 210; y += 16) {
    ctx.fillRect(18, y, y % 48 === 4 ? 96 : 132, 6);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function matte(color: Palette['ink'], extra: Partial<MeshStandardMaterial> = {}) {
  return new MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.04, ...extra });
}

/**
 * For textured faces the material colour must stay white: three multiplies it
 * into the map, so tinting a label with the surface colour would print the
 * surface colour twice and the label would come out a shade too dark.
 */
function printed(map: CanvasTexture) {
  return new MeshStandardMaterial({ map, roughness: 0.78, metalness: 0 });
}

const RACK_DROP = 1.6;
const GEAR_ENTRY: [number, number, number] = [0, 1.5, 0.7];
const GATE_DROP = 1.3;
/** How far the driver gear turns across the Betreiben stage. */
const DRIVE_TURNS = 1.5;

export function Machine({
  palette,
  progress,
}: {
  palette: Palette;
  /** Smoothed scroll progress, 0 → 1, owned by the Scene. */
  progress: RefObject<number>;
}) {
  const geometries = useMemo(
    () => ({
      base: roundedBoxGeometry(...BASE.size, 0.12),
      panel: roundedBoxGeometry(...PANEL.size, 0.06),
      gears: GEARS.map((g) => gearGeometry(g.radius)),
      axle: new CylinderGeometry(0.07, 0.07, 0.26, 20).rotateX(Math.PI / 2),
      block: roundedBoxGeometry(...SYSTEM_BLOCK.size, 0.05),
      label: new PlaneGeometry(SYSTEM_BLOCK.size[0] * 0.86, SYSTEM_BLOCK.size[1] * 0.7),
      track: roundedBoxGeometry(...TRACK.size, 0.04),
      post: roundedBoxGeometry(...GATE.postSize, 0.03),
      lintel: roundedBoxGeometry(...GATE.lintelSize, 0.03),
      tile: tileGeometry(),
    }),
    []
  );

  const materials = useMemo(() => {
    const page = documentTexture(palette);
    const paperSide = matte(palette.paper);
    return {
      base: matte(palette.raised),
      panel: matte(palette.sunken),
      gear: matte(palette.ink, { roughness: 0.48, metalness: 0.18 }),
      gearAccent: matte(palette.accent, { roughness: 0.5, metalness: 0.12 }),
      axle: matte(palette.ruleStrong, { roughness: 0.4, metalness: 0.3 }),
      block: matte(palette.raised),
      track: matte(palette.ruleStrong),
      gate: matte(palette.accent),
      labels: SYSTEMS.map((name) => printed(labelTexture(name, palette))),
      // BoxGeometry face order: +x, -x, +y, -y, +z, -z. Only the top is a page.
      tile: [paperSide, paperSide, printed(page), paperSide, paperSide, paperSide],
    };
  }, [palette]);

  /*
   * Explicit disposal. GPU buffers and textures are not garbage-collected with
   * the JavaScript objects that own them, so every theme change — which builds
   * new materials and canvas textures — would otherwise leak the old ones, and
   * so would every unmount during client-side navigation. The root group sets
   * dispose={null} so React Three Fiber does not also try, and geometries
   * shared between meshes are released exactly once, here.
   */
  useEffect(
    () => () => {
      for (const g of Object.values(geometries).flat() as BufferGeometry[]) g.dispose();
    },
    [geometries]
  );
  useEffect(
    () => () => {
      for (const m of new Set(Object.values(materials).flat() as MeshStandardMaterial[])) {
        m.map?.dispose();
        m.dispose();
      }
    },
    [materials]
  );

  const layouts = useMemo(() => ({ scatter: scatterLayout(), grouped: groupedLayout() }), []);

  const panel = useRef<Mesh>(null);
  const blocks = useRef<(Group | null)[]>([]);
  const gears = useRef<(Mesh | null)[]>([]);
  const gearGroups = useRef<(Group | null)[]>([]);
  const track = useRef<Mesh>(null);
  const gate = useRef<Group>(null);
  const tiles = useRef<InstancedMesh>(null);

  // Scratch objects, reused every frame rather than allocated per tile.
  const scratch = useMemo(
    () => ({
      dummy: new Object3D(),
      pose: { position: [0, 0, 0], rotation: [0, 0, 0] } as TilePose,
    }),
    []
  );

  useFrame(() => {
    const p = progress.current ?? 0;
    const bauen = span(p, ...STAGE.bauen);
    const betreiben = span(p, ...STAGE.betreiben);

    // ---- Bauen: the machine assembles, part by part --------------------
    if (panel.current) {
      const t = ease(span(bauen, 0, 0.3));
      panel.current.visible = t > 0.001;
      panel.current.scale.y = Math.max(0.001, t);
      panel.current.position.y = BASE_TOP + (PANEL.size[1] * t) / 2;
    }

    blocks.current.forEach((block, i) => {
      if (!block) return;
      const t = ease(span(bauen, 0.08 + i * 0.08, 0.34 + i * 0.08));
      block.visible = t > 0.001;
      block.position.y = systemBlockPosition(i)[1] + (1 - t) * RACK_DROP;
    });

    const drive = betreiben * Math.PI * 2 * DRIVE_TURNS;
    GEARS.forEach((g, i) => {
      const group = gearGroups.current[i];
      const gear = gears.current[i];
      if (!group || !gear) return;
      const t = ease(span(bauen, 0.3 + i * 0.1, 0.64 + i * 0.1));
      group.visible = t > 0.001;
      group.position.set(
        g.position[0] + (1 - t) * GEAR_ENTRY[0],
        g.position[1] + (1 - t) * GEAR_ENTRY[1],
        g.position[2] + (1 - t) * GEAR_ENTRY[2]
      );
      // Turning by ratio × drive keeps every pair meshed: each gear's ratio
      // was derived from its radius when the train was laid out.
      gear.rotation.z = g.phase + g.ratio * drive - (1 - t) * 1.8;
    });

    if (track.current) {
      // Laid out from the systems end, the way a conveyor gets installed.
      const t = ease(span(bauen, 0.45, 0.8));
      const left = TRACK.position[0] - TRACK.size[0] / 2;
      track.current.visible = t > 0.001;
      track.current.scale.x = Math.max(0.001, t);
      track.current.position.x = left + (TRACK.size[0] * t) / 2;
    }

    if (gate.current) {
      const t = ease(span(bauen, 0.75, 1));
      gate.current.visible = t > 0.001;
      gate.current.position.y = (1 - t) * GATE_DROP;
    }

    // ---- Documents ------------------------------------------------------
    const mesh = tiles.current;
    if (!mesh) return;
    const { dummy, pose } = scratch;
    const sorting = span(p, ...STAGE.sorting);
    // Staggered so the documents move one after another rather than as a
    // block: each takes a share of the stage and starts a little after the
    // one before, and the last arrives exactly as the stage ends.
    const sortGap = 0.4 / (TILE_COUNT - 1);
    const flowGap = 0.055;
    const flowScale = 1 + (TILE_COUNT - 1) * flowGap;

    for (let i = 0; i < TILE_COUNT; i++) {
      const from = layouts.grouped[i];
      if (betreiben > 0) {
        const t = Math.min(1, Math.max(0, betreiben * flowScale - i * flowGap));
        pathPose(from, i, t, pose);
      } else {
        const k = ease((sorting - i * sortGap) / (1 - (TILE_COUNT - 1) * sortGap));
        lerp3(layouts.scatter[i].position, from.position, k, pose.position);
        lerp3(layouts.scatter[i].rotation, from.rotation, k, pose.rotation);
      }
      dummy.position.set(...pose.position);
      dummy.rotation.set(...pose.rotation);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  const gateZ = TRACK.position[2];
  const postY = BASE_TOP + GATE.postSize[1] / 2;
  const halfSpan = GATE.lintelSize[2] / 2 - GATE.postSize[2] / 2;
  const front = SYSTEM_BLOCK.size[2] / 2 + 0.024;

  return (
    <group dispose={null}>
      <mesh geometry={geometries.base} material={materials.base} position={BASE.position} receiveShadow />
      <mesh
        ref={panel}
        geometry={geometries.panel}
        material={materials.panel}
        position={PANEL.position}
        castShadow
        receiveShadow
      />

      {GEARS.map((g, i) => (
        <group
          key={i}
          ref={(el) => {
            gearGroups.current[i] = el;
          }}
          position={g.position}
        >
          <mesh
            ref={(el) => {
              gears.current[i] = el;
            }}
            geometry={geometries.gears[i]}
            material={g.accent ? materials.gearAccent : materials.gear}
            rotation={[0, 0, g.phase]}
            castShadow
            receiveShadow
          />
          <mesh geometry={geometries.axle} material={materials.axle} position={[0, 0, -0.04]} />
        </group>
      ))}

      <group position={[SYSTEM_BLOCK.x, 0, SYSTEM_BLOCK.z]} rotation={[0, RACK_YAW, 0]}>
        {SYSTEMS.map((name, i) => (
          <group
            key={name}
            ref={(el) => {
              blocks.current[i] = el;
            }}
            position={[0, systemBlockPosition(i)[1], 0]}
          >
            <mesh geometry={geometries.block} material={materials.block} castShadow receiveShadow />
            <mesh geometry={geometries.label} material={materials.labels[i]} position={[0, 0, front]} />
          </group>
        ))}
      </group>

      <mesh
        ref={track}
        geometry={geometries.track}
        material={materials.track}
        position={TRACK.position}
        receiveShadow
      />

      <group ref={gate} position={[GATE.x, 0, gateZ]}>
        <mesh geometry={geometries.post} material={materials.gate} position={[0, postY, -halfSpan]} castShadow />
        <mesh geometry={geometries.post} material={materials.gate} position={[0, postY, halfSpan]} castShadow />
        <mesh
          geometry={geometries.lintel}
          material={materials.gate}
          position={[0, BASE_TOP + GATE.postSize[1] + GATE.lintelSize[1] / 2, 0]}
          castShadow
        />
      </group>

      {/*
       * Material as a prop, not in args: args are constructor arguments, so a
       * theme change would rebuild the mesh and drop every tile position.
       */}
      <instancedMesh
        ref={tiles}
        args={[geometries.tile, undefined, TILE_COUNT]}
        material={materials.tile}
        castShadow
        receiveShadow
      />
    </group>
  );
}
