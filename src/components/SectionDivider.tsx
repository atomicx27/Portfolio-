'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function SectionDivider() {
  const { theme } = useTheme();

  return (
    <div className="relative w-full overflow-hidden select-none pointer-events-none h-16 md:h-24 z-20">
      {theme === 'cyberpunk' && (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          {/* Tech glitch line and grid accents */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent relative">
            {/* Pulsing center node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#00f0ff] border border-[#0a0a0f] rotate-45 animate-pulse" />
            <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff2d95]" />
            <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#b026ff]" />
          </div>
          {/* Decorative tech lines */}
          <div className="flex gap-4 mt-2">
            <div className="w-8 h-[2px] bg-[#00f0ff]/30 skew-x-12" />
            <div className="w-2 h-[2px] bg-[#ff2d95]/50" />
            <div className="w-8 h-[2px] bg-[#00f0ff]/30 -skew-x-12" />
          </div>
        </div>
      )}

      {theme === 'dark-minimal' && (
        <div className="absolute inset-0 flex justify-center items-center">
          {/* Subtle glowing line */}
          <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B6B]/40 to-transparent relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#FFD43B] rounded-full" />
          </div>
        </div>
      )}

      {theme === 'light-airy' && (
        <svg
          className="absolute inset-0 w-full h-full text-[#f0f0f5] fill-current"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <motion.path
            animate={{
              d: [
                "M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z",
                "M0,64L60,58.7C120,53,240,43,360,37.3C480,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z",
                "M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      )}

      {theme === 'glassmorphism' && (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          {/* Clean minimal floating translucent divider */}
          <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
            <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white/20 bg-[#60a5fa]/20 backdrop-blur-md" />
            <div className="absolute left-[60%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white/20 bg-[#a78bfa]/20 backdrop-blur-md" />
          </div>
        </div>
      )}
    </div>
  );
}
