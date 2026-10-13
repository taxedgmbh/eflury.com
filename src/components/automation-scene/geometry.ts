import { BoxGeometry, ExtrudeGeometry, Path, Shape } from 'three';
import { TILE, teethFor } from './constants';

/**
 * Procedural geometry for the scene. Everything is built from code rather than
 * loaded from a model file: no asset to source, license or keep in sync, and
 * the whole scene costs a few kilobytes of JavaScript rather than a download.
 */

/** A spur gear standing in the XY plane, centred on the origin. */
export function gearGeometry(radius: number, depth = 0.16): ExtrudeGeometry {
  const teeth = teethFor(radius);
  const toothDepth = 0.12;
  const rOuter = radius + toothDepth / 2;
  const rRoot = radius - toothDepth / 2;
  const step = (Math.PI * 2) / teeth;

  const shape = new Shape();
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    // root → flank → tip → flank: a trapezoidal tooth, which reads as a gear
    // at this size and keeps the vertex count low.
    const profile: [number, number][] = [
      [rRoot, a],
      [rOuter, a + step * 0.22],
      [rOuter, a + step * 0.5],
      [rRoot, a + step * 0.72],
    ];
    profile.forEach(([r, t], j) => {
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      if (i === 0 && j === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();

  // Spokes cut out of the web, so a gear reads as a machined part rather than
  // a toothed disc.
  const hub = Math.max(0.09, radius * 0.18);
  const web = rRoot - 0.1;
  if (radius > 0.5) {
    const spokes = 5;
    for (let s = 0; s < spokes; s++) {
      const a0 = (s / spokes) * Math.PI * 2 + 0.22;
      const a1 = ((s + 1) / spokes) * Math.PI * 2 - 0.22;
      const cut = new Path();
      cut.absarc(0, 0, web, a0, a1, false);
      cut.absarc(0, 0, hub + 0.08, a1, a0, true);
      cut.closePath();
      shape.holes.push(cut);
    }
  }
  const bore = new Path();
  bore.absarc(0, 0, hub * 0.55, 0, Math.PI * 2, true);
  shape.holes.push(bore);

  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 20,
  });
  // Centre on Z only. center() would also shift XY by the bounding box's
  // midpoint, which for a toothed outline is not the axis — and a gear that
  // turns about a point slightly off its centre wobbles and stops meshing.
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}


/**
 * A box with rounded vertical edges — plates, blocks, the gate.
 *
 * The result measures exactly width × height × depth. ExtrudeGeometry's bevel
 * grows the shape outward on every side, so the outline and the extrusion are
 * shrunk by the bevel first. The first version skipped that, every part came
 * out a bevel too large, and the documents — placed on the track's nominal top
 * face — sat inside the track instead of on it.
 */
export function roundedBoxGeometry(
  width: number,
  height: number,
  depth: number,
  radius = 0.06
): ExtrudeGeometry {
  const bevelThickness = Math.min(0.02, height / 4);
  const bevelSize = Math.min(0.015, width / 4, depth / 4);
  const innerW = width - 2 * bevelSize;
  const innerD = depth - 2 * bevelSize;
  const r = Math.max(0.001, Math.min(radius, innerW / 2, innerD / 2));
  const w = innerW / 2 - r;
  const d = innerD / 2 - r;
  const shape = new Shape();
  shape.moveTo(-w, -d - r);
  shape.lineTo(w, -d - r);
  shape.absarc(w, -d, r, -Math.PI / 2, 0, false);
  shape.lineTo(w + r, d);
  shape.absarc(w, d, r, 0, Math.PI / 2, false);
  shape.lineTo(-w, d + r);
  shape.absarc(-w, d, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-w - r, -d);
  shape.absarc(-w, -d, r, Math.PI, Math.PI * 1.5, false);

  const geometry = new ExtrudeGeometry(shape, {
    depth: height - 2 * bevelThickness,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments: 2,
    curveSegments: 6,
  });
  // Extruded along Z; stand it up so `height` runs along Y.
  geometry.rotateX(-Math.PI / 2);
  geometry.center();
  return geometry;
}

export function tileGeometry(): BoxGeometry {
  return new BoxGeometry(TILE.width, TILE.height, TILE.depth);
}
