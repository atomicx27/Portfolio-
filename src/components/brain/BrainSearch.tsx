'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { brainCategories, type BrainCategory } from '@/data/brainNodes';

interface BrainSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: BrainCategory | 'All';
  onCategoryChange: (category: BrainCategory | 'All') => void;
}

const allCategories: (BrainCategory | 'All')[] = ['All', ...brainCategories];

export default function BrainSearch({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: BrainSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="absolute top-4 left-4 right-4 z-20 flex flex-col items-center gap-3 pointer-events-none"
    >
      {/* Search Input */}
      <div className="relative w-full max-w-md pointer-events-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search nodes..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl theme-card-bg backdrop-blur-xl border theme-border theme-text text-sm placeholder:theme-text-muted focus:outline-none focus:border-[var(--accent-primary)] transition-all duration-300"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-1.5 pointer-events-auto">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
              activeCategory === cat
                ? 'theme-accent-bg text-white border-transparent shadow-md shadow-[var(--accent-primary)]/20'
                : 'theme-card-bg backdrop-blur-xl theme-border theme-text-secondary hover:theme-text hover:border-[var(--accent-primary)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
