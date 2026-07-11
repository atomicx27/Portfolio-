'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig, type ThemeName } from '@/context/ThemeContext';
import { Palette } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  const themes = Object.entries(themeConfig) as [ThemeName, (typeof themeConfig)[ThemeName]][];

  // Close when clicking outside switcher
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectTheme = (newTheme: ThemeName) => {
    // Check if View Transition API is supported
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
    setIsOpen(false);
  };

  return (
    <div ref={switcherRef} className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring' as const, stiffness: 350, damping: 25 }}
            className="absolute bottom-16 right-0 p-4 rounded-2xl theme-card-bg backdrop-blur-xl border theme-border shadow-2xl min-w-[210px] select-none"
          >
            <p className="text-[10px] uppercase tracking-widest theme-text-muted mb-3 font-bold font-mono">
              Select Theme
            </p>
            <div className="flex flex-col gap-1.5">
              {themes.map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => selectTheme(key)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer outline-none ${
                    theme === key
                      ? 'theme-active-bg border-l-2 border-[var(--accent-primary)]'
                      : 'hover:bg-white/5 border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex gap-1">
                    {config.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-xs theme-text font-bold font-mono tracking-wide">
                    {config.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full theme-accent-bg flex items-center justify-center shadow-lg shadow-[var(--accent-primary)]/20 transition-all hover:shadow-xl hover:shadow-[var(--accent-primary)]/40 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
        aria-label="Toggle Theme Menu"
      >
        <Palette className="w-5.5 h-5.5 text-white" />
      </motion.button>
    </div>
  );
}
