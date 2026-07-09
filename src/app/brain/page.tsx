'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain } from 'lucide-react';
import Link from 'next/link';
import { brainNodes, type BrainNode, type BrainCategory } from '@/data/brainNodes';
import BrainInfoPanel from '@/components/brain/BrainInfoPanel';
import BrainSearch from '@/components/brain/BrainSearch';
import ThemeSwitcher from '@/components/ThemeSwitcher';

// Lazy-load the 3D scene to avoid SSR issues with Three.js
const BrainScene = dynamic(() => import('@/components/brain/BrainScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-4"
        >
          🧠
        </motion.div>
        <p className="theme-text-secondary text-sm animate-pulse">
          Loading neural network...
        </p>
      </div>
    </div>
  ),
});

export default function BrainPage() {
  const [activeNode, setActiveNode] = useState<BrainNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BrainCategory | 'All'>('All');
  const [accentColor, setAccentColor] = useState('#00f0ff');
  const [secondaryColor, setSecondaryColor] = useState('#ff00ff');

  // Read theme colors from CSS custom properties
  useEffect(() => {
    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--accent-primary').trim() || '#00f0ff';
      const secondary = style.getPropertyValue('--accent-secondary').trim() || '#ff00ff';
      setAccentColor(accent);
      setSecondaryColor(secondary);
    };
    readColors();

    // Re-read on theme change
    const observer = new MutationObserver(readColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Compute highlighted node IDs based on search/filter
  const highlightedIds = useMemo(() => {
    const hasSearch = searchQuery.trim().length > 0;
    const hasCategory = activeCategory !== 'All';

    if (!hasSearch && !hasCategory) return null; // null means show all

    const ids = new Set<string>();
    const query = searchQuery.toLowerCase();

    for (const node of brainNodes) {
      const matchesSearch = !hasSearch || (
        node.label.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query) ||
        (node.techStack?.some(t => t.toLowerCase().includes(query)) ?? false)
      );

      const matchesCategory = !hasCategory || node.category === activeCategory;

      if (matchesSearch && matchesCategory) {
        ids.add(node.id);
        // Also highlight connected nodes (dimmer — we just include them)
        for (const connId of node.connections) {
          ids.add(connId);
        }
      }
    }

    return ids;
  }, [searchQuery, activeCategory]);

  const handleNodeClick = useCallback((node: BrainNode) => {
    setActiveNode(prev => prev?.id === node.id ? null : node);
  }, []);

  const nodeCount = brainNodes.length;
  const connectionCount = useMemo(() => {
    const seen = new Set<string>();
    for (const node of brainNodes) {
      for (const t of node.connections) {
        seen.add([node.id, t].sort().join('--'));
      }
    }
    return seen.size;
  }, []);

  return (
    <div className="fixed inset-0 theme-bg overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${accentColor}15, transparent 60%), radial-gradient(ellipse at 70% 60%, ${secondaryColor}10, transparent 50%)`,
        }}
      />

      {/* Top-left nav - Back button + Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4 z-30 flex items-center gap-3"
      >
        <Link
          href="/"
          className="w-9 h-9 rounded-xl theme-card-bg backdrop-blur-xl border theme-border flex items-center justify-center theme-text-secondary hover:theme-text hover:border-[var(--accent-primary)] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <Brain className="w-5 h-5 theme-accent-text" />
          <span className="text-sm font-bold theme-text">Neural Map</span>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <div className="absolute top-16 left-0 right-0 z-20 px-4">
        <BrainSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Stats bar — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-4 left-4 z-20 flex items-center gap-4 text-[11px] theme-text-muted"
      >
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          {nodeCount} nodes
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-pulse" style={{ animationDelay: '0.5s' }} />
          {connectionCount} connections
        </span>
        <span className="hidden sm:inline theme-text-muted opacity-60">
          Drag to rotate · Scroll to zoom · Click a node to explore
        </span>
      </motion.div>

      {/* 3D Canvas — full screen behind everything */}
      <div className="absolute inset-0 z-10">
        <BrainScene
          accentColor={accentColor}
          secondaryColor={secondaryColor}
          highlightedIds={highlightedIds}
          onNodeClick={handleNodeClick}
          activeNodeId={activeNode?.id ?? null}
        />
      </div>

      {/* Info Panel — right side */}
      <BrainInfoPanel
        node={activeNode}
        onClose={() => setActiveNode(null)}
      />

      {/* Theme Switcher */}
      <ThemeSwitcher />
    </div>
  );
}
