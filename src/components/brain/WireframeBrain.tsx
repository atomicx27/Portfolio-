'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Generates a brain-shaped wireframe using a parametric surface.
 * Uses a modified ellipsoid with a medial groove to approximate brain hemispheres.
 */
export default function WireframeBrain({ accentColor = '#00f0ff' }: { accentColor?: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const uSegments = 48;
    const vSegments = 32;

    for (let i = 0; i <= uSegments; i++) {
      const u = (i / uSegments) * Math.PI * 2;
      for (let j = 0; j <= vSegments; j++) {
        const v = (j / vSegments) * Math.PI;

        // Base ellipsoid shape
        let x = 2.2 * Math.sin(v) * Math.cos(u);
        let y = 1.6 * Math.cos(v);
        let z = 1.8 * Math.sin(v) * Math.sin(u);

        // Medial groove — creates the brain split
        const grooveDepth = 0.25 * Math.exp(-8 * z * z);
        x *= (1 - grooveDepth * Math.abs(Math.sin(u)));

        // Slight bulge on top hemisphere
        if (y > 0) {
          const bulgeFactor = 1 + 0.12 * Math.sin(v * 2);
          x *= bulgeFactor;
          z *= bulgeFactor;
        }

        // Subtle surface undulation for organic feel
        const noise = 0.04 * Math.sin(u * 6 + v * 4) + 0.03 * Math.cos(u * 8 - v * 3);
        x += noise * Math.sin(v) * Math.cos(u);
        z += noise * Math.sin(v) * Math.sin(u);

        points.push(new THREE.Vector3(x, y, z));
      }
    }

    // Build indexed geometry from the parametric grid
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    for (const p of points) {
      vertices.push(p.x, p.y, p.z);
    }

    for (let i = 0; i < uSegments; i++) {
      for (let j = 0; j < vSegments; j++) {
        const a = i * (vSegments + 1) + j;
        const b = a + 1;
        const c = (i + 1) * (vSegments + 1) + j;
        const d = c + 1;

        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        wireframe
        transparent
        opacity={0.07}
        color={accentColor}
        depthWrite={false}
      />
    </mesh>
  );
}
