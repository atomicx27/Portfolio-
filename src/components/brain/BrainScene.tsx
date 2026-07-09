'use client';

import { Suspense, useMemo, useEffect } from 'react';
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
 * Handles smooth camera transition (zoom and target centering) 
 * when a node in the neural network is clicked or cleared.
 */
function CameraController({ activeNodeId }: { activeNodeId: string | null }) {
  const { camera, controls } = useThree();

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

  const targetLookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const defaultCameraPos = useMemo(() => new THREE.Vector3(0, 1, 5.5), []);

  useFrame((_, delta) => {
    const orbit = controls as any;
    if (!orbit) return;

    if (activeNodeId && positionMap[activeNodeId]) {
      const nodePos = positionMap[activeNodeId];
      
      // Interpolate the controls target to the node position
      targetLookAt.lerp(nodePos, delta * 4);
      orbit.target.copy(targetLookAt);

      // Interpolate camera position to be close to the node with an offset
      const cameraOffset = new THREE.Vector3(0.4, 0.4, 1.4);
      const targetCamPos = nodePos.clone().add(cameraOffset);
      camera.position.lerp(targetCamPos, delta * 4);

      // Disable autoRotate when viewing a specific node
      orbit.autoRotate = false;
    } else {
      // Interpolate controls target back to original center
      targetLookAt.lerp(new THREE.Vector3(0, 0, 0), delta * 3);
      orbit.target.copy(targetLookAt);

      // Interpolate camera back to original overview position
      camera.position.lerp(defaultCameraPos, delta * 3);

      // Re-enable slow auto-rotation for the idle brain view
      orbit.autoRotate = true;
      orbit.autoRotateSpeed = 0.4;
    }

    orbit.update();
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
