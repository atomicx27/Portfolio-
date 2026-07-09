'use client';

import { Suspense, useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import WireframeBrain from './WireframeBrain';
import NeuralGraph from './NeuralGraph';
import SynapticPulses from './SynapticPulses';
import { type BrainNode, brainNodes } from '@/data/brainNodes';

interface BrainSceneProps {
  accentColor: string;
  secondaryColor: string;
  highlightedIds: Set<string> | null;
  onNodeClick: (node: BrainNode) => void;
  activeNodeId: string | null;
}

/**
 * Handles smooth camera transitions (zoom and target centering) 
 * only when a node is clicked or cleared. Allows full user orbital 
 * controls (pan/zoom/rotate) once the transition is complete.
 */
function CameraController({ activeNodeId }: { activeNodeId: string | null }) {
  const { camera, controls } = useThree();
  const isTransitioning = useRef(false);

  // Trigger camera transition when activeNodeId changes
  useEffect(() => {
    isTransitioning.current = true;
  }, [activeNodeId]);

  // Position map matching the scaled positions in NeuralGraph
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

  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const defaultCameraPos = useMemo(() => new THREE.Vector3(0, 1, 5.5), []);

  useFrame((_, delta) => {
    const orbit = controls as any;
    if (!orbit) return;

    if (isTransitioning.current) {
      let targetDestination = defaultTarget;
      let cameraDestination = defaultCameraPos;
      let lerpSpeed = 4;

      if (activeNodeId && positionMap[activeNodeId]) {
        const nodePos = positionMap[activeNodeId];
        targetDestination = nodePos;
        
        const cameraOffset = new THREE.Vector3(0.4, 0.4, 1.4);
        cameraDestination = nodePos.clone().add(cameraOffset);
        lerpSpeed = 5; // Slightly faster focus transition
      }

      // Smoothly interpolate camera target and position
      orbit.target.lerp(targetDestination, delta * lerpSpeed);
      camera.position.lerp(cameraDestination, delta * lerpSpeed);

      // Disable autoRotate during transition
      orbit.autoRotate = false;

      // Check if camera has reached the destination
      const targetClose = orbit.target.distanceTo(targetDestination) < 0.02;
      const cameraClose = camera.position.distanceTo(cameraDestination) < 0.02;

      if (targetClose && cameraClose) {
        // Snap to exact coordinates and stop transition loop
        orbit.target.copy(targetDestination);
        camera.position.copy(cameraDestination);
        isTransitioning.current = false;
        
        // Re-enable auto-rotation ONLY when we are back at the center overview
        if (!activeNodeId) {
          orbit.autoRotate = true;
          orbit.autoRotateSpeed = 0.4;
        }
      }
      
      orbit.update();
    } else {
      // Transition is complete. Ensure autoRotate settings are correct
      // but do not overwrite target or camera position, enabling full user control.
      if (activeNodeId) {
        orbit.autoRotate = false;
      } else {
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.4;
      }
    }
  });

  return null;
}

function SceneContent({
  accentColor,
  secondaryColor,
  highlightedIds,
  onNodeClick,
  activeNodeId,
}: BrainSceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 6, 6]} intensity={0.8} color={accentColor} />
      <pointLight position={[-6, -4, -6]} intensity={0.4} color={secondaryColor} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#05050a', 4, 10]} />

      {/* Camera controls */}
      <OrbitControls
        makeDefault
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.4}
        minDistance={1.2}
        maxDistance={7.5}
        enableDamping
        dampingFactor={0.06}
      />

      {/* Wireframe brain hemispheres & stem */}
      <WireframeBrain accentColor={accentColor} />

      {/* Interactive nodes and connections */}
      <NeuralGraph
        accentColor={accentColor}
        secondaryColor={secondaryColor}
        highlightedIds={highlightedIds}
        onNodeClick={onNodeClick}
        activeNodeId={activeNodeId}
      />

      {/* Pulsing synaptic signals */}
      <SynapticPulses
        accentColor={accentColor}
        highlightedIds={highlightedIds}
      />

      {/* Camera Zoom Controller */}
      <CameraController activeNodeId={activeNodeId} />
    </>
  );
}

export default function BrainScene(props: BrainSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 5.5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
