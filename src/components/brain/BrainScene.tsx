'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WireframeBrain from './WireframeBrain';
import NeuralGraph from './NeuralGraph';
import SynapticPulses from './SynapticPulses';
import { type BrainNode } from '@/data/brainNodes';

interface BrainSceneProps {
  accentColor: string;
  secondaryColor: string;
  highlightedIds: Set<string> | null;
  onNodeClick: (node: BrainNode) => void;
  activeNodeId: string | null;
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
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color={accentColor} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color={secondaryColor} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 4, 12]} />

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.4}
        minDistance={2.5}
        maxDistance={8}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Wireframe brain outline */}
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
    </>
  );
}

export default function BrainScene(props: BrainSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 5.5], fov: 50 }}
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
