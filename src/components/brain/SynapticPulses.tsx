'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { brainNodes } from '@/data/brainNodes';

interface SynapticPulsesProps {
  accentColor: string;
  highlightedIds: Set<string> | null;
}

interface Pulse {
  fromPos: THREE.Vector3;
  toPos: THREE.Vector3;
  offset: number;
  speed: number;
  fromId: string;
  toId: string;
}

/**
 * Animated glowing particles that travel along connection lines,
 * simulating synaptic neural signals firing between nodes.
 */
export default function SynapticPulses({ accentColor, highlightedIds }: SynapticPulsesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const pulses = useMemo(() => {
    const posMap: Record<string, THREE.Vector3> = {};
    for (const node of brainNodes) {
      posMap[node.id] = new THREE.Vector3(
        node.position[0] * 1.8,
        node.position[1] * 1.4,
        node.position[2] * 1.6
      );
    }

    const seen = new Set<string>();
    const result: Pulse[] = [];

    for (const node of brainNodes) {
      for (const targetId of node.connections) {
        const key = [node.id, targetId].sort().join('--');
        if (!seen.has(key) && posMap[targetId]) {
          seen.add(key);
          // Create 1-2 pulses per connection
          const numPulses = Math.random() > 0.5 ? 2 : 1;
          for (let p = 0; p < numPulses; p++) {
            result.push({
              fromPos: posMap[node.id],
              toPos: posMap[targetId],
              offset: Math.random(), // Random start position along path
              speed: 0.15 + Math.random() * 0.3,
              fromId: node.id,
              toId: targetId,
            });
          }
        }
      }
    }

    return result;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    for (let i = 0; i < pulses.length; i++) {
      const pulse = pulses[i];
      pulse.offset = (pulse.offset + delta * pulse.speed) % 1;

      // Lerp position along connection
      const pos = new THREE.Vector3().lerpVectors(pulse.fromPos, pulse.toPos, pulse.offset);

      // Check if this pulse should be visible based on highlighting
      const isVisible = !highlightedIds ||
        (highlightedIds.has(pulse.fromId) && highlightedIds.has(pulse.toId));

      // Pulse size with fade at endpoints
      const edgeFade = Math.sin(pulse.offset * Math.PI);
      const scale = isVisible ? 0.025 * edgeFade : 0;

      dummy.position.copy(pos);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, pulses.length]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
