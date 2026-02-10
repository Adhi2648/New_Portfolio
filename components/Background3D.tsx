
import React, { useEffect } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particles Data
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const range = 12;

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range;
      positions[i * 3 + 2] = (Math.random() - 0.5) * range;

      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    // Points Object
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12, // Increased size
      transparent: true,
      opacity: 0.9, // Increased opacity
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(points);

    // Lines (Constellation)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.35, // Increased opacity for higher visibility
      blending: THREE.AdditiveBlending
    });

    // Mouse Interaction
    const mouse = new THREE.Vector2(-100, -100);
    const targetMouse = new THREE.Vector2(-100, -100);

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let lineMesh: THREE.LineSegments | null = null;

    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth mouse movement
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      const posArr = pointGeometry.attributes.position.array as Float32Array;
      const linePositions = [];

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Move particles
        posArr[i3] += velocities[i3];
        posArr[i3 + 1] += velocities[i3 + 1];
        posArr[i3 + 2] += velocities[i3 + 2];

        // Bounds check
        if (Math.abs(posArr[i3]) > range / 2) velocities[i3] *= -1;
        if (Math.abs(posArr[i3 + 1]) > range / 2) velocities[i3 + 1] *= -1;
        if (Math.abs(posArr[i3 + 2]) > range / 2) velocities[i3 + 2] *= -1;

        // Mouse interaction (gravity effect)
        const mousePoint = new THREE.Vector3(mouse.x * 6, mouse.y * 6, 0);
        const p = new THREE.Vector3(posArr[i3], posArr[i3 + 1], posArr[i3 + 2]);
        const distToMouse = p.distanceTo(mousePoint);

        if (distToMouse < 2.5) {
          const dir = p.clone().sub(mousePoint).normalize();
          const force = (2.5 - distToMouse) * 0.015;
          posArr[i3] += dir.x * force;
          posArr[i3 + 1] += dir.y * force;
        }

        // Connect lines
        for (let j = i + 1; j < particlesCount; j++) {
          const j3 = j * 3;
          const distSq = 
            Math.pow(posArr[i3] - posArr[j3], 2) +
            Math.pow(posArr[i3 + 1] - posArr[j3 + 1], 2) +
            Math.pow(posArr[i3 + 2] - posArr[j3 + 2], 2);

          if (distSq < 6.25) { // 2.5^2
            linePositions.push(posArr[i3], posArr[i3 + 1], posArr[i3 + 2]);
            linePositions.push(posArr[j3], posArr[j3 + 1], posArr[j3 + 2]);
          }
        }
      }

      pointGeometry.attributes.position.needsUpdate = true;

      // Update lines
      if (lineMesh) scene.remove(lineMesh);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineMesh);

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
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return null;
};

export default Background3D;
