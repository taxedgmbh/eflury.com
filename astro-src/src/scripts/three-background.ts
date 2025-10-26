import * as THREE from 'three';

export function initThreeBackground(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Particle system
  const particlesCount = 2000;
  const posArray = new Float32Array(particlesCount * 3);
  const velocities: number[] = [];

  // Initialize particle positions and velocities
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
    velocities[i] = (Math.random() - 0.5) * 0.02;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(posArray, 3)
  );

  // Check current theme for particle color
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const particleColor = isDark ? 0x00C77E : 0x007A4D;

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    color: particleColor,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Theme change listener
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        particlesMaterial.color.setHex(isDark ? 0x00C77E : 0x007A4D);
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // Animation loop
  let animationFrameId: number;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // Update particle positions
    const positions = particlesGeometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Apply velocity
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Boundary checking
      if (Math.abs(positions[i3]) > 50) velocities[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > 50) velocities[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > 50) velocities[i3 + 2] *= -1;
    }

    particlesGeometry.attributes.position.needsUpdate = true;

    // Mouse interaction - rotate based on mouse position
    particlesMesh.rotation.x += (mouseY * 0.1 - particlesMesh.rotation.x) * 0.05;
    particlesMesh.rotation.y += (mouseX * 0.1 - particlesMesh.rotation.y) * 0.05;

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  function handleResize() {
    if (!container) return;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  window.addEventListener('resize', handleResize);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationFrameId);
    observer.disconnect();
    renderer.dispose();
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    container.removeChild(renderer.domElement);
  };
}
