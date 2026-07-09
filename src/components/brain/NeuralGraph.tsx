'use client';

import { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Line, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { brainNodes, type BrainNode } from '@/data/brainNodes';

interface NeuralGraphProps {
  accentColor: string;
  secondaryColor: string;
  highlightedIds: Set<string> | null;
  onNodeClick: (node: BrainNode) => void;
  activeNodeId: string | null;
}

/**
 * Renders all brain nodes as glowing spheres and their connections as lines.
 * Handles raycasting for hover and click interactions.
 */
export default function NeuralGraph({
  accentColor,
  secondaryColor,
  highlightedIds,
  onNodeClick,
  activeNodeId,
}: NeuralGraphProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null!);

  // Pre-compute node position map
  const positionMap = useMemo(() => {
    const map: Record<string, THREE.Vector3> = {};
    for (const node of brainNodes) {
      map[node.id] = new THREE.Vector3(
        node.position[0] * 2.0,
        node.position[1] * 1.5,
        node.position[2] * 1.7
      );
    }
    return map;
  }, []);

  // Generate unique connection pairs to avoid drawing duplicates
  const connections = useMemo(() => {
    const seen = new Set<string>();
    const conns: [string, string][] = [];
    for (const node of brainNodes) {
      for (const targetId of node.connections) {
        const key = [node.id, targetId].sort().join('--');
        if (!seen.has(key) && positionMap[targetId]) {
          seen.add(key);
          conns.push([node.id, targetId]);
        }
      }
    }
    return conns;
  }, [positionMap]);

  const getNodeOpacity = useCallback((nodeId: string) => {
    if (!highlightedIds) return 1;
    return highlightedIds.has(nodeId) ? 1 : 0.12;
  }, [highlightedIds]);

  const getLineOpacity = useCallback((fromId: string, toId: string) => {
    if (!highlightedIds) return 0.25;
    return highlightedIds.has(fromId) && highlightedIds.has(toId) ? 0.4 : 0.04;
  }, [highlightedIds]);

  return (
    <group ref={groupRef}>
      {/* Connection Lines */}
      {connections.map(([fromId, toId]) => {
        const from = positionMap[fromId];
        const to = positionMap[toId];
        if (!from || !to) return null;
        const opacity = getLineOpacity(fromId, toId);
        return (
          <Line
            key={`${fromId}--${toId}`}
            points={[from, to]}
            color={accentColor}
            lineWidth={1}
            transparent
            opacity={opacity}
          />
        );
      })}

      {/* Nodes */}
      {brainNodes.map((node) => {
        const pos = positionMap[node.id];
        const isHovered = hoveredId === node.id;
        const isActive = activeNodeId === node.id;
        const opacity = getNodeOpacity(node.id);
        const baseSize = node.size * 0.08;
        const scale = isHovered || isActive ? 1.4 : 1;

        const nodeColor = node.type === 'interest'
          ? secondaryColor
          : node.type === 'skill'
            ? '#888888'
            : accentColor;

        return (
          <group key={node.id} position={pos}>
            {/* Glow sphere (larger, translucent) */}
            <Sphere args={[baseSize * 2.5, 8, 8]}>
              <meshBasicMaterial
                color={nodeColor}
                transparent
                opacity={opacity * 0.08 * (isHovered || isActive ? 2 : 1)}
                depthWrite={false}
              />
            </Sphere>

            {/* Main node sphere */}
            <Sphere
              args={[baseSize * scale, 16, 16]}
              onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation();
                setHoveredId(node.id);
                document.body.style.cursor = 'pointer';
              }}
              onPointerLeave={() => {
                setHoveredId(null);
                document.body.style.cursor = 'auto';
              }}
              onClick={(e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                onNodeClick(node);
              }}
            >
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isHovered || isActive ? 1.5 : 0.6}
                transparent
                opacity={opacity}
                roughness={0.3}
                metalness={0.5}
              />
            </Sphere>

            {/* Label — show on hover */}
            {isHovered && opacity > 0.5 && (
              <Html
                center
                distanceFactor={6}
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    background: 'rgba(0,0,0,0.75)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    fontFamily: 'Inter, system-ui, sans-serif',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${accentColor}40`,
                    transform: 'translateY(-24px)',
                  }}
                >
                  {node.icon} {node.label}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
