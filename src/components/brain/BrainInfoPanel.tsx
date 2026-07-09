'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, Cpu, Heart } from 'lucide-react';
import { type BrainNode } from '@/data/brainNodes';

interface BrainInfoPanelProps {
  node: BrainNode | null;
  onClose: () => void;
}

const typeIcons = {
  project: <Layers className="w-4 h-4" />,
  skill: <Cpu className="w-4 h-4" />,
  interest: <Heart className="w-4 h-4" />,
};

const typeLabels = {
  project: 'Project',
  skill: 'Skill',
  interest: 'Interest',
};

export default function BrainInfoPanel({ node, onClose }: BrainInfoPanelProps) {
  return (
    <AnimatePresence>
      {node && (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' as const }}
          className="absolute right-4 top-20 bottom-4 w-80 max-w-[calc(100vw-2rem)] z-20 flex flex-col"
        >
          <div className="relative h-full theme-card-bg rounded-2xl border theme-border backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl">
            {/* Accent strip */}
            <div className="h-1 w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

            {/* Header */}
            <div className="p-5 pb-3 flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full theme-bg-secondary border theme-border flex items-center justify-center theme-text-muted hover:theme-text hover:border-[var(--accent-primary)] transition-all duration-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 mb-3 pr-8">
                <span className="text-3xl">{node.icon}</span>
                <div>
                  <h3 className="text-lg font-bold theme-text leading-tight">
                    {node.label}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                      {typeIcons[node.type]}
                      {typeLabels[node.type]}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full theme-bg-secondary theme-text-muted">
                      {node.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              {/* Description */}
              <p className="text-sm theme-text-secondary leading-relaxed mb-4">
                {node.description}
              </p>

              {/* Tech Stack */}
              {node.techStack && node.techStack.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider theme-text-muted mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {node.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Connections */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider theme-text-muted mb-2">
                  Connected To
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {node.connections.slice(0, 8).map((connId) => (
                    <span
                      key={connId}
                      className="text-xs px-2 py-0.5 rounded-full theme-bg-secondary theme-text-secondary border theme-border"
                    >
                      {connId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/ Skill| Interest/g, '')}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Link */}
              {node.githubUrl && (
                <a
                  href={node.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] hover:underline transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
