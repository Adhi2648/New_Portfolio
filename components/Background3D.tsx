import React, { useEffect } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.05); // Match bg color #020617

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all elements
    const group = new THREE.Group();
    scene.add(group);

    // Create rings
    const activeRings: THREE.Line[] = [];
    const colors = [0x38bdf8, 0x818cf8, 0xc084fc];

    // Use LineLoop for a thinner, cleaner wireframe ring
    for (let i = 0; i < 4; i++) {
      // Create a circle geometry
      const geometry = new THREE.BufferGeometry();
      const points = [];
      const segments = 64;
      const radius = 2.5 + i * 1.5;

      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0)
        );
      }
      geometry.setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.6 - i * 0.1,
        blending: THREE.AdditiveBlending,
      });

      const ring = new THREE.Line(geometry, material);

      // Random initial rotation
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;

      // Give each ring unique rotation speeds
      ring.userData = {
        rx: (Math.random() - 0.5) * 0.003,
        ry: (Math.random() - 0.5) * 0.003,
        rz: (Math.random() - 0.5) * 0.003
      };

      group.add(ring);
      activeRings.push(ring);
    }

    // Add some ambient drifting particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 40;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Mouse Interaction
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse movement for parallax
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Parallax effect on the whole group
      group.rotation.x = mouse.y * 0.3;
      group.rotation.y = mouse.x * 0.3;

      // Rotate individual rings
      activeRings.forEach(ring => {
        ring.rotation.x += ring.userData.rx;
        ring.rotation.y += ring.userData.ry;
        ring.rotation.z += ring.userData.rz;
      });

      // Slowly rotate particles
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // cleanup
      activeRings.forEach(r => { r.geometry.dispose(); (r.material as THREE.Material).dispose(); });
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return null;
};

export default Background3D;
