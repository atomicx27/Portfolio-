'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

const THEME_COLORS = {
  cyberpunk: '#00f0ff',
  'dark-minimal': '#FF6B6B',
  'light-airy': '#667eea',
  glassmorphism: '#60a5fa',
};

// Lowercase generator helpers (defined outside component so React Compiler ignores them)
function generateFgPositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  return pos;
}

function generateFgVelocities(count: number): Float32Array {
  const vel = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    vel[i * 3] = (Math.random() - 0.5) * 0.006;
    vel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
    vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
  }
  return vel;
}

function generateBgPositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }
  return pos;
}

function ConstellationParticles() {
  const { theme } = useTheme();
  
  // Theme-specific color
  const activeColor = useMemo(() => {
    return new THREE.Color(THEME_COLORS[theme] || '#00f0ff');
  }, [theme]);

  // Main points & lines refs
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const bgPointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const fgCount = 120; // foreground particles that connect
  const bgCount = 800; // background stars (no lines for performance)

  // Use pure useMemo for initial buffer values to avoid ref-access-on-render warnings
  const fgPositions = useMemo(() => generateFgPositions(fgCount), [fgCount]);
  const bgPositions = useMemo(() => generateBgPositions(bgCount), [bgCount]);

  // Use single ref for mutable velocities (safe to read/write inside hooks & event handlers)
  const fgVelocitiesRef = useRef<Float32Array | null>(null);
  if (fgVelocitiesRef.current === null) {
    fgVelocitiesRef.current = generateFgVelocities(fgCount);
  }

  // Max line connection limit to preallocate buffer
  const maxLines = 400;
  
  const [linePositions, lineColors] = useMemo(() => {
    const pos = new Float32Array(maxLines * 2 * 3); // 2 vertices per line, 3 coords per vertex
    const col = new Float32Array(maxLines * 2 * 4); // RGBA per vertex
    return [pos, col];
  }, []);

  // Listen to mouse moves properly
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !bgPointsRef.current) return;
    
    const fgVelocities = fgVelocitiesRef.current;
    if (fgVelocities === null) return;

    const clockTime = state.clock.elapsedTime;

    // --- Upgrade Background Particles ---
    const bgGeom = bgPointsRef.current.geometry;
    const bgPosAttr = bgGeom.attributes.position;
    const bgArr = bgPosAttr.array as Float32Array;
    
    // Background drift
    for (let i = 0; i < bgCount; i++) {
      bgArr[i * 3 + 1] -= 0.001; // slow fall
      if (bgArr[i * 3 + 1] < -11) {
        bgArr[i * 3 + 1] = 11;
      }
    }
    bgPosAttr.needsUpdate = true;
    bgPointsRef.current.rotation.y = clockTime * 0.005;

    // --- Upgrade Foreground Constellation Particles ---
    const fgGeom = pointsRef.current.geometry;
    const fgPosAttr = fgGeom.attributes.position;
    const fgArr = fgPosAttr.array as Float32Array;

    const mx = mouseRef.current.x * 5;
    const my = mouseRef.current.y * 3.5;

    // Update positions and velocities
    for (let i = 0; i < fgCount; i++) {
      // Basic drift
      fgArr[i * 3] += fgVelocities[i * 3];
      fgArr[i * 3 + 1] += fgVelocities[i * 3 + 1];
      fgArr[i * 3 + 2] += fgVelocities[i * 3 + 2];

      // Mouse attraction/repulsion: pull gently toward mouse position
      const dx = mx - fgArr[i * 3];
      const dy = my - fgArr[i * 3 + 1];
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      
      if (distToMouse < 4.0) {
        // Soft push away if close, or gentle drag
        const force = (4.0 - distToMouse) * 0.0003;
        fgArr[i * 3] -= dx * force;
        fgArr[i * 3 + 1] -= dy * force;
      }

      // Boundary collision check
      if (Math.abs(fgArr[i * 3]) > 8) fgVelocities[i * 3] *= -1;
      if (Math.abs(fgArr[i * 3 + 1]) > 6) fgVelocities[i * 3 + 1] *= -1;
      if (Math.abs(fgArr[i * 3 + 2]) > 5) fgVelocities[i * 3 + 2] *= -1;
    }
    fgPosAttr.needsUpdate = true;

    // --- Draw Connecting Lines ---
    const lineGeom = linesRef.current.geometry;
    const linePosAttr = lineGeom.attributes.position;
    const lineColAttr = lineGeom.attributes.color;
    const lPosArr = linePosAttr.array as Float32Array;
    const lColArr = lineColAttr.array as Float32Array;

    let lineIndex = 0;
    const maxDist = 2.0;

    // Nested loop to compute distance between stars
    for (let i = 0; i < fgCount; i++) {
      if (lineIndex >= maxLines) break;

      const xi = fgArr[i * 3];
      const yi = fgArr[i * 3 + 1];
      const zi = fgArr[i * 3 + 2];

      for (let j = i + 1; j < fgCount; j++) {
        if (lineIndex >= maxLines) break;

        const xj = fgArr[j * 3];
        const yj = fgArr[j * 3 + 1];
        const zj = fgArr[j * 3 + 2];

        const dx = xj - xi;
        const dy = yj - yi;
        const dz = zj - zi;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDist * maxDist) {
          const dist = Math.sqrt(distSq);
          // Fade alpha out as it approaches max distance
          const alpha = 1.0 - dist / maxDist;

          // Vertex 1
          lPosArr[lineIndex * 6] = xi;
          lPosArr[lineIndex * 6 + 1] = yi;
          lPosArr[lineIndex * 6 + 2] = zi;

          lColArr[lineIndex * 8] = activeColor.r;
          lColArr[lineIndex * 8 + 1] = activeColor.g;
          lColArr[lineIndex * 8 + 2] = activeColor.b;
          lColArr[lineIndex * 8 + 3] = alpha * 0.45;

          // Vertex 2
          lPosArr[lineIndex * 6 + 3] = xj;
          lPosArr[lineIndex * 6 + 4] = yj;
          lPosArr[lineIndex * 6 + 5] = zj;

          lColArr[lineIndex * 8 + 4] = activeColor.r;
          lColArr[lineIndex * 8 + 5] = activeColor.g;
          lColArr[lineIndex * 8 + 6] = activeColor.b;
          lColArr[lineIndex * 8 + 7] = alpha * 0.45;

          lineIndex++;
        }
      }
    }

    // Zero out unused line buffers so they don't render artifacts
    for (let k = lineIndex; k < maxLines; k++) {
      lPosArr[k * 6] = 0;
      lPosArr[k * 6 + 1] = 0;
      lPosArr[k * 6 + 2] = 0;
      lPosArr[k * 6 + 3] = 0;
      lPosArr[k * 6 + 4] = 0;
      lPosArr[k * 6 + 5] = 0;

      lColArr[k * 8 + 3] = 0;
      lColArr[k * 8 + 7] = 0;
    }

    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;

    // Smooth subtle rotating orbits
    pointsRef.current.rotation.y = clockTime * 0.015;
    linesRef.current.rotation.y = clockTime * 0.015;
  });

  return (
    <group>
      {/* Background stars (deep, small dots) */}
      <points ref={bgPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bgPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          sizeAttenuation
          transparent
          opacity={0.3}
          color={THEME_COLORS[theme] || '#00f0ff'}
          depthWrite={false}
        />
      </points>

      {/* Foreground constellation nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[fgPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          sizeAttenuation
          transparent
          opacity={0.8}
          color={THEME_COLORS[theme] || '#00f0ff'}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 4]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ConstellationParticles />
      </Canvas>
    </div>
  );
}
