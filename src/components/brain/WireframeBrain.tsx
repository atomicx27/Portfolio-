'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HemisphereProps {
  isRight: boolean;
  accentColor: string;
}

/**
 * Generates a single hemisphere geometry with organic brain folds.
 */
function createHemisphereGeometry(isRight: boolean) {
  const points: THREE.Vector3[] = [];
  const uSegments = 40;
  const vSegments = 30;
  const offsetX = isRight ? 0.35 : -0.35;

  for (let i = 0; i <= uSegments; i++) {
    const u = (i / uSegments) * Math.PI * 2;
    for (let j = 0; j <= vSegments; j++) {
      const v = (j / vSegments) * Math.PI;

      // Base ellipsoid dimensions for one hemisphere
      let x = 0.95 * Math.sin(v) * Math.cos(u);
      let y = 1.1 * Math.cos(v);
      let z = 1.4 * Math.sin(v) * Math.sin(u);

      // Flattens the inner side facing the other hemisphere
      if (isRight ? x < 0 : x > 0) {
        x *= 0.3;
      }

      // Brain folds (Gyri and Sulci) using high-frequency sine/cosine waves
      const foldNoise = 0.11 * (
        Math.sin(u * 12 + Math.cos(v * 8)) * 
        Math.cos(v * 12 + Math.sin(u * 8))
      );
      
      // Apply displacement along the normal vector
      const normalX = Math.sin(v) * Math.cos(u);
      const normalY = Math.cos(v);
      const normalZ = Math.sin(v) * Math.sin(u);

      x += normalX * foldNoise;
      y += normalY * foldNoise;
      z += normalZ * foldNoise;

      // Shift hemisphere outwards
      points.push(new THREE.Vector3(x + offsetX, y + 0.2, z + 0.1));
    }
  }

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
}

/**
 * Generates a cerebellum lobe geometry (back-bottom part of the brain).
 */
function createCerebellumGeometry(isRight: boolean) {
  const points: THREE.Vector3[] = [];
  const uSegments = 30;
  const vSegments = 20;
  const offsetX = isRight ? 0.3 : -0.3;

  for (let i = 0; i <= uSegments; i++) {
    const u = (i / uSegments) * Math.PI * 2;
    for (let j = 0; j <= vSegments; j++) {
      const v = (j / vSegments) * Math.PI;

      // Smaller, wider, flatter ellipsoid
      let x = 0.55 * Math.sin(v) * Math.cos(u);
      let y = 0.4 * Math.cos(v);
      let z = 0.55 * Math.sin(v) * Math.sin(u);

      // Fine horizontal banding folds characteristic of the cerebellum
      const cerebellumNoise = 0.03 * Math.sin(y * 35) * Math.cos(z * 15);
      
      x += cerebellumNoise;
      y += cerebellumNoise;
      z += cerebellumNoise;

      // Position at the back bottom of the brain
      points.push(new THREE.Vector3(x + offsetX, y - 0.7, z - 0.9));
    }
  }

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
}

/**
 * Generates the brain stem geometry (vertical central structure at bottom).
 */
function createBrainStemGeometry() {
  const points: THREE.Vector3[] = [];
  const radialSegments = 20;
  const heightSegments = 15;

  for (let j = 0; j <= heightSegments; j++) {
    const yRatio = j / heightSegments;
    const y = -0.6 - yRatio * 0.9; // Extends downwards
    const radius = 0.28 * (1.0 - yRatio * 0.3); // Tapers slightly

    for (let i = 0; i <= radialSegments; i++) {
      const angle = (i / radialSegments) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle) - 0.4; // Positioned slightly back

      points.push(new THREE.Vector3(x, y, z));
    }
  }

  const geo = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const indices: number[] = [];

  for (const p of points) {
    vertices.push(p.x, p.y, p.z);
  }

  for (let j = 0; j < heightSegments; j++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = j * (radialSegments + 1) + i;
      const b = a + 1;
      const c = (j + 1) * (radialSegments + 1) + i;
      const d = c + 1;

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}

export default function WireframeBrain({ accentColor = '#00f0ff' }: { accentColor?: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  // Pre-calculate geometries once
  const geometries = useMemo(() => {
    return {
      leftCerebrum: createHemisphereGeometry(false),
      rightCerebrum: createHemisphereGeometry(true),
      leftCerebellum: createCerebellumGeometry(false),
      rightCerebellum: createCerebellumGeometry(true),
      brainStem: createBrainStemGeometry(),
    };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  const materialProps = {
    wireframe: true,
    transparent: true,
    opacity: 0.1,
    color: accentColor,
    depthWrite: false,
  };

  return (
    <group ref={groupRef}>
      {/* Left Hemisphere (Cerebrum) */}
      <mesh geometry={geometries.leftCerebrum}>
        <meshBasicMaterial {...materialProps} opacity={0.09} />
      </mesh>

      {/* Right Hemisphere (Cerebrum) */}
      <mesh geometry={geometries.rightCerebrum}>
        <meshBasicMaterial {...materialProps} opacity={0.09} />
      </mesh>

      {/* Left Cerebellum */}
      <mesh geometry={geometries.leftCerebellum}>
        <meshBasicMaterial {...materialProps} color={accentColor} opacity={0.07} />
      </mesh>

      {/* Right Cerebellum */}
      <mesh geometry={geometries.rightCerebellum}>
        <meshBasicMaterial {...materialProps} color={accentColor} opacity={0.07} />
      </mesh>

      {/* Brain Stem */}
      <mesh geometry={geometries.brainStem}>
        <meshBasicMaterial {...materialProps} color={accentColor} opacity={0.06} />
      </mesh>
    </group>
  );
}
