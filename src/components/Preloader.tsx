'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fast loading simulation to sync with fonts and Three.js canvas setup
    const duration = 1800; // 1.8 seconds loading
    const interval = 20; // tick every 20ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f] text-[#e8e8f0]"
        >
          {/* Subtle background radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_60%)] pointer-events-none" />

          {/* Morphing Logo Frame */}
          <div className="relative w-32 h-32 flex items-center justify-center mb-8">
            {/* Morphing Background */}
            <motion.div
              animate={{
                borderRadius: [
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                  "50% 50% 33% 67% / 55% 27% 73% 45%",
                  "38% 62% 63% 37% / 41% 62% 38% 59%",
                  "30% 70% 70% 30% / 30% 30% 70% 70%"
                ],
                rotate: [0, 90, 180, 360]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff] via-[#ff2d95] to-[#b026ff] opacity-40 blur-[2px]"
            />
            
            {/* Inner Ring */}
            <motion.div
              animate={{
                borderRadius: [
                  "50% 50% 33% 67% / 55% 27% 73% 45%",
                  "38% 62% 63% 37% / 41% 62% 38% 59%",
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                  "50% 50% 33% 67% / 55% 27% 73% 45%"
                ],
                rotate: [360, 270, 180, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-[3px] bg-[#0a0a0f] border border-[#00f0ff]/20 flex items-center justify-center"
            >
              <span className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff2d95]">
                PK
              </span>
            </motion.div>
          </div>

          {/* Loading Progress Text */}
          <div className="relative h-8 mb-2 flex items-center justify-center font-mono">
            <span className="text-[#00f0ff] font-bold text-lg">
              {Math.floor(progress)}%
            </span>
          </div>

          {/* Tagline / System Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.2em] uppercase text-[#a0a0b8] font-mono flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
            Initializing AI Interface...
          </motion.div>

          {/* Loading progress bar line */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#ff2d95] to-[#b026ff]" style={{ width: `${progress}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
