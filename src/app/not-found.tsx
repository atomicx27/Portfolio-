'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ParticleField from '@/components/three/ParticleField';

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-[#e8e8f0] px-4 overflow-hidden">
      {/* Background Three.js Particle Field */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 text-center max-w-lg select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          {/* Glowing Error Code */}
          <h1 className="text-8xl md:text-9xl font-black font-mono tracking-tighter bg-gradient-to-r from-[#00f0ff] via-[#ff2d95] to-[#b026ff] bg-clip-text text-transparent animate-pulse filter drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6"
        >
          <h2 className="text-lg md:text-2xl font-bold font-mono text-[var(--accent-primary)] uppercase tracking-wider">
            🚨 Node Missing
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-[#a0a0b8] leading-relaxed font-sans">
            The coordinates you requested do not exist in the current neural matrix. The node might have been relocated, deleted, or simply lost in hyperspace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <Link href="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-2xl font-bold font-mono text-sm tracking-widest uppercase text-white bg-gradient-to-r from-[#00f0ff] to-[#ff2d95] shadow-lg shadow-[#00f0ff]/20 hover:shadow-xl hover:shadow-[#00f0ff]/30 transition-all cursor-pointer"
            >
              Re-route to Home
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
