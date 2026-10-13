import { TILE, TOOTH_GAP_CENTRE, TOOTH_TIP_CENTRE, teethFor } from './constants';

/**
 * Where everything sits, as data.
 *
 * Kept free of React and three.js objects so the scroll stages can interpolate
 * between layouts as plain arithmetic, and so the layouts can be checked
 * without rendering anything.
 *
 * World units: x to the right, y up, z towards the viewer. The base plate's
 * top face is y = BASE_TOP.
 */

export type Vec3 = [number, number, number];

export const BASE = { size: [6.4, 0.18, 3.0] as Vec3, position: [0, 0, 0] as Vec3 };
export const BASE_TOP = BASE.size[1] / 2;

/** The panel the gear train is mounted on. */
export const PANEL = {
  size: [3.6, 2.3, 0.12] as Vec3,
  position: [-0.25, BASE_TOP + 1.15, -1.2] as Vec3,
};

/**
 * The gear train. Each gear after the first is placed at exactly the sum of
 * the two radii from the one it drives, along a chosen angle — the only
 * placement at which the teeth actually mesh. Placing them by eye produces
 * gears that overlap or float apart, and the eye catches it immediately.
 */
export interface GearSpec {
  radius: number;
  position: Vec3;
  /** Turns per unit of drive; derived from the radius ratio, sign alternates. */
  ratio: number;
  /** Starting rotation about Z, so this gear's teeth sit in its parent's gaps. */
  phase: number;
  accent?: boolean;
}

const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * Place a gear meshing with `parent` along `angle`, and work out the starting
 * rotation at which its teeth fall into the parent's gaps.
 *
 * In the aligned position one of the parent's tooth tips points straight at
 * the child and one of the child's gaps points straight back. The parent is
 * δ short of that, so the child is turned δ × (parent radius / child radius)
 * the opposite way — exactly where turning both together would have left it.
 */
function meshWith(parent: GearSpec, radius: number, angle: number, accent = false): GearSpec {
  const d = parent.radius + radius;
  const pitchParent = (Math.PI * 2) / teethFor(parent.radius);
  const pitchChild = (Math.PI * 2) / teethFor(radius);
  const delta = mod(angle - parent.phase - TOOTH_TIP_CENTRE * pitchParent, pitchParent);
  const aligned = angle + Math.PI - TOOTH_GAP_CENTRE * pitchChild;
  return {
    radius,
    position: [
      parent.position[0] + d * Math.cos(angle),
      parent.position[1] + d * Math.sin(angle),
      parent.position[2],
    ],
    ratio: -parent.ratio * (parent.radius / radius),
    phase: aligned + delta * (parent.radius / radius),
    accent,
  };
}

const GEAR_Z = PANEL.position[2] + PANEL.size[2] / 2 + 0.12;
const driver: GearSpec = {
  radius: 0.9,
  position: [-0.95, BASE_TOP + 1.26, GEAR_Z],
  ratio: 1,
  phase: 0,
};
const second = meshWith(driver, 0.6, (-20 * Math.PI) / 180);
const third = meshWith(second, 0.38, (55 * Math.PI) / 180, true);
export const GEARS: GearSpec[] = [driver, second, third];

/** The systems the site already names as integrations, stacked as a rack. */
export const SYSTEMS = ['Excel', 'CRM', 'bexio'] as const;
export const SYSTEM_BLOCK = { size: [1.1, 0.48, 0.7] as Vec3, x: -2.45, z: 0.1, gap: 0.05 };
/**
 * The rack is turned toward the camera. Facing straight ahead, its labels were
 * read at a steep angle from the right and came out as unreadable slivers.
 */
export const RACK_YAW = (28 * Math.PI) / 180;
export function systemBlockPosition(index: number): Vec3 {
  const h = SYSTEM_BLOCK.size[1];
  return [SYSTEM_BLOCK.x, BASE_TOP + h / 2 + index * (h + SYSTEM_BLOCK.gap), SYSTEM_BLOCK.z];
}

/** The conveyor along the front edge. */
export const TRACK = { size: [5.5, 0.05, 0.62] as Vec3, position: [0.25, BASE_TOP + 0.025, 0.95] as Vec3 };
export const TRACK_TOP = TRACK.position[1] + TRACK.size[1] / 2;

/** The approval gate — the site's "Freigabe-Gate" — spanning the track. */
export const GATE = {
  x: 1.45,
  postSize: [0.1, 0.62, 0.1] as Vec3,
  lintelSize: [0.12, 0.1, 0.92] as Vec3,
};

/** Where finished documents collect, at the end of the track. */
export const OUTPUT = { x: 2.62, z: TRACK.position[2] };

export interface TilePose {
  position: Vec3;
  /** Euler rotation, radians. */
  rotation: Vec3;
}

/** Deterministic noise in [0, 1): the same layout every render, no Math.random. */
function hash(i: number, salt = 0): number {
  const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function jitter(i: number, amount: number): number {
  return (hash(i) - 0.5) * 2 * amount;
}

/** Documents in flight along the track, evenly spaced. */
export const TRACK_SLOTS = [-1.9, -1.15, -0.4, 0.35, 1.0, 2.0];

/** How many finished documents sit on the output stack in the end state. */
export const STACK_COUNT = 18;

export const TILE_COUNT = TRACK_SLOTS.length + STACK_COUNT;

const TRACK_Z = TRACK.position[2];
const ON_TRACK_Y = TRACK_TOP + TILE.height / 2;

/** Final pose of document i: the first STACK_COUNT on the stack, bottom first. */
function finalPose(i: number): TilePose {
  if (i < STACK_COUNT) {
    return {
      position: [
        OUTPUT.x + jitter(i, 0.012),
        ON_TRACK_Y + i * (TILE.height + 0.004),
        OUTPUT.z + jitter(i + 7, 0.012),
      ],
      rotation: [0, jitter(i + 3, 0.035), 0],
    };
  }
  // Track documents fill from the far end, so the first to arrive goes furthest.
  const slot = TRACK_SLOTS[TRACK_SLOTS.length - 1 - (i - STACK_COUNT)];
  return { position: [slot, ON_TRACK_Y, TRACK_Z], rotation: [0, 0, 0] };
}

/** The running machine: documents on the track, and a neat stack at the end. */
export function machineLayout(): TilePose[] {
  return Array.from({ length: TILE_COUNT }, (_, i) => finalPose(i));
}

/**
 * Stage 1 start — the work as it arrives: loose documents with no order,
 * drifting over the empty base plate.
 */
export function scatterLayout(): TilePose[] {
  return Array.from({ length: TILE_COUNT }, (_, i) => ({
    position: [
      -2.6 + hash(i, 1) * 5.2,
      0.7 + hash(i, 2) * 1.9,
      -0.7 + hash(i, 3) * 2.0,
    ],
    rotation: [
      (hash(i, 4) - 0.5) * 1.6,
      hash(i, 5) * Math.PI * 2,
      (hash(i, 6) - 0.5) * 1.6,
    ],
  }));
}

/**
 * Stage 1 end — the audit has sorted them: three neat piles, one per kind of
 * work, set out where the machine will stand.
 */
export const PILE_X = [-1.3, -0.3, 0.7];
export const PILE_Z = 0.25;

export function groupedLayout(): TilePose[] {
  return Array.from({ length: TILE_COUNT }, (_, i) => {
    const pile = i % PILE_X.length;
    // Reversed, so document 0 — the first to leave in stage 3 — is on top of
    // its pile. Counted the other way, the machine would pull the bottom sheet
    // out from under the rest.
    const level = Math.floor((TILE_COUNT - 1 - i) / PILE_X.length);
    return {
      position: [
        PILE_X[pile] + jitter(i + 11, 0.015),
        BASE_TOP + TILE.height / 2 + level * (TILE.height + 0.006),
        PILE_Z + jitter(i + 13, 0.015),
      ],
      rotation: [0, jitter(i + 17, 0.05), 0],
    };
  });
}

/**
 * Where documents join the track, clear of the systems rack. At x = -2.3 the
 * entry sat inside the rack's footprint once the rack was turned toward the
 * camera, and every document passed straight through the Excel block.
 */
export const TRACK_ENTRY: Vec3 = [-1.6, ON_TRACK_Y, TRACK_Z];

/**
 * Stage 3 — document i travelling from its pile to its final place, t ∈ [0, 1].
 *
 * Three legs: lifted from the pile onto the start of the track; along the
 * track, which carries it under the approval gate; and, for the documents that
 * finish on the stack, up onto it. Every document destined for the stack has
 * to pass the gate, which is the point being made.
 */
export function pathPose(from: TilePose, i: number, t: number, out: TilePose): TilePose {
  const end = finalPose(i);
  const along: Vec3 = [i < STACK_COUNT ? OUTPUT.x : end.position[0], ON_TRACK_Y, TRACK_Z];
  const p = out.position;
  const r = out.rotation;

  if (t < 0.25) {
    const k = ease(t / 0.25);
    lerp3(from.position, TRACK_ENTRY, k, p);
    p[1] += Math.sin(k * Math.PI) * 0.45; // lifted over, not dragged through
    lerp3(from.rotation, [0, 0, 0], k, r);
  } else if (t < 0.9) {
    lerp3(TRACK_ENTRY, along, (t - 0.25) / 0.65, p);
    r[0] = r[1] = r[2] = 0;
  } else {
    const k = ease((t - 0.9) / 0.1);
    lerp3(along, end.position, k, p);
    p[1] += Math.sin(k * Math.PI) * 0.12;
    lerp3([0, 0, 0], end.rotation, k, r);
  }
  return out;
}

export function lerp3(a: Vec3, b: Vec3, k: number, out: Vec3): Vec3 {
  out[0] = a[0] + (b[0] - a[0]) * k;
  out[1] = a[1] + (b[1] - a[1]) * k;
  out[2] = a[2] + (b[2] - a[2]) * k;
  return out;
}

/** Smooth in and out — the easing for every movement in the scene. */
export function ease(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/** Map p into [0, 1] across the window [a, b]. */
export function span(p: number, a: number, b: number): number {
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}

/** The three stages as fractions of the section's scroll. */
export const STAGE = { beraten: [0, 0.33], bauen: [0.33, 0.66], betreiben: [0.66, 1] } as const;
