// Brand hero background: a slow 3D field of connected nodes (echoes the
// circuit lines of the EF mark). Three.js is loaded lazily; the hero
// renders fine without it (navy surface), and reduced-motion users get a
// single still frame.
export async function mountHeroNetwork(canvas: HTMLCanvasElement) {
  const THREE = await import('three');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  // Node field on a wide wavy sheet
  const COLS = 34, ROWS = 18, N = COLS * ROWS;
  const base = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const c = i % COLS, r = Math.floor(i / COLS);
    base[i * 3] = (c / (COLS - 1) - 0.5) * 34 + (Math.random() - 0.5) * 0.6;
    base[i * 3 + 1] = (r / (ROWS - 1) - 0.5) * 16 + (Math.random() - 0.5) * 0.6;
    base[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  const pos = new Float32Array(base);
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const sprite = (() => {
    const s = document.createElement('canvas'); s.width = s.height = 64;
    const g = s.getContext('2d')!; const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.35, 'rgba(255,255,255,0.6)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(s);
  })();
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0x5ab8e8, size: 0.22, map: sprite, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending,
  }));

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
  const lines = new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({
    color: 0x2dd4bf, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false,
  }));

  const group = new THREE.Group();
  group.add(lines, points);
  group.rotation.x = -0.55;
  scene.add(group);

  const mouse = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(canvas);

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

  const update = (t: number) => {
    for (let i = 0; i < N; i++) {
      const x = base[i * 3], y = base[i * 3 + 1];
      pos[i * 3 + 2] = base[i * 3 + 2] + Math.sin(x * 0.35 + t * 0.6) * 0.9 + Math.cos(y * 0.45 + t * 0.4) * 0.7;
    }
    pGeo.attributes.position.needsUpdate = true;
    for (let k = 0; k < pairs.length; k++) {
      const i = pairs[k];
      lPos[k * 3] = pos[i * 3]; lPos[k * 3 + 1] = pos[i * 3 + 1]; lPos[k * 3 + 2] = pos[i * 3 + 2];
    }
    lGeo.attributes.position.needsUpdate = true;
    group.rotation.z = Math.sin(t * 0.05) * 0.08;
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  if (reduce) { update(0); return; }
  const clock = new THREE.Clock();
  const loop = () => {
    requestAnimationFrame(loop);
    if (visible && !document.hidden) update(clock.getElapsedTime());
  };
  loop();
}
