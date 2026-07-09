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
 * Connection lines dynamically light up and grow thicker when hovered or active.
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

  // Pre-compute node position map (scaled to fit brain hemispheres better)
  const positionMap = useMemo(() => {
    const map: Record<string, THREE.Vector3> = {};
    for (const node of brainNodes) {
      map[node.id] = new THREE.Vector3(
        node.position[0] * 1.8,
        node.position[1] * 1.4,
        node.position[2] * 1.6
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
    if (!highlightedIds) return 0.22;
    return highlightedIds.has(fromId) && highlightedIds.has(toId) ? 0.35 : 0.04;
  }, [highlightedIds]);

  // Determine if a connection is active (either side hovered or clicked)
  const isLineActive = useCallback((fromId: string, toId: string) => {
    return hoveredId === fromId || hoveredId === toId || activeNodeId === fromId || activeNodeId === toId;
  }, [hoveredId, activeNodeId]);

  return (
    <group ref={groupRef}>
      {/* Connection Lines */}
      {connections.map(([fromId, toId]) => {
        const from = positionMap[fromId];
        const to = positionMap[toId];
        if (!from || !to) return null;

        const isActive = isLineActive(fromId, toId);
        
        // Calculate appropriate opacity and color
        let opacity = getLineOpacity(fromId, toId);
        let lineColor = accentColor;
        let lineWidth = 1.0;

        if (isActive) {
          opacity = 0.85;
          lineColor = secondaryColor;
          lineWidth = 3.5;
        } else if (hoveredId || activeNodeId) {
          // Dim other connections when one node is focused
          opacity = 0.03;
        }

        return (
          <Line
            key={`${fromId}--${toId}`}
            points={[from, to]}
            color={lineColor}
            lineWidth={lineWidth}
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
        const baseSize = node.size * 0.075;
        const scale = isHovered || isActive ? 1.45 : 1;

        // Visual coloring according to category
        const nodeColor = node.type === 'interest'
          ? secondaryColor
          : node.type === 'skill'
            ? '#888888'
            : accentColor;

        return (
          <group key={node.id} position={pos}>
            {/* Outer halo / glow pulse */}
            <Sphere args={[baseSize * 2.3, 8, 8]}>
              <meshBasicMaterial
                color={nodeColor}
                transparent
                opacity={opacity * 0.07 * (isHovered || isActive ? 2.5 : 1)}
                depthWrite={false}
              />
            </Sphere>

            {/* Inner solid sphere with rim highlight */}
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
                emissiveIntensity={isHovered || isActive ? 2.0 : 0.65}
                transparent
                opacity={opacity}
                roughness={0.2}
                metalness={0.6}
              />
            </Sphere>

            {/* Float Label — visible on hover */}
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
                  className="px-3 py-1.5 rounded-lg text-white text-[11px] font-semibold border backdrop-blur-md transition-all duration-300"
                  style={{
                    background: 'rgba(10, 10, 15, 0.85)',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    borderColor: `${nodeColor}40`,
                    boxShadow: `0 4px 20px ${nodeColor}25`,
                    transform: 'translateY(-26px)',
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
