'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { roles } from '@/lib/constants';
import ParticleField from '@/components/three/ParticleField';
import { useTheme } from '@/context/ThemeContext';

/* ─── Framer Motion variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function HeroSection() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: roles,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--accent-primary) 8%, transparent), var(--bg-primary))',
      }}
    >
      {/* ── Keyframes injected via style tag ── */}
      <style>{`
        @keyframes gradient-shift {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }

        @keyframes morph-blob {
          0% {
            border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
          }
          34% {
            border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
          }
          67% {
            border-radius: 50% 60% 30% 70% / 60% 30% 70% 40%;
          }
          100% {
            border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
          }
        }

        @keyframes glitch-text {
          0% {
            text-shadow: 2px -2px 0px #00f0ff, -2px 2px 0px #ff2d95;
          }
          20% {
            text-shadow: -2px 2px 0px #00f0ff, 2px -2px 0px #ff2d95;
          }
          40% {
            text-shadow: 2px 2px 0px #00f0ff, -2px -2px 0px #ff2d95;
          }
          60% {
            text-shadow: -2px -2px 0px #00f0ff, 2px 2px 0px #ff2d95;
          }
          80% {
            text-shadow: 2px -2px 0px #00f0ff, -2px 2px 0px #ff2d95;
          }
          100% {
            text-shadow: -2px 2px 0px #00f0ff, 2px -2px 0px #ff2d95;
          }
        }
      `}</style>

      {/* 3D Constellation Particle Field Background */}
      <ParticleField />

      {/* Grid overlay for Cyberpunk theme */}
      {theme === 'cyberpunk' && (
        <div 
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--accent-primary) 1px, transparent 1px), 
                              linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }}
        />
      )}

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex max-w-3xl flex-col items-center text-center select-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Monogram Monolith */}
        <motion.div 
          variants={childVariants} 
          className="relative mb-8 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          {/* Morphing Glow ring */}
          <div
            className="absolute inset-0 opacity-60 blur-xl group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
              animation: 'morph-blob 8s ease-in-out infinite, spin-slow 20s linear infinite',
            }}
          />

          {/* Morphing Border container */}
          <div
            className="w-[124px] h-[124px] flex items-center justify-center p-[2px]"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
              animation: 'morph-blob 8s ease-in-out infinite',
            }}
          >
            {/* Glassmorphic inner card */}
            <div
              className="flex h-full w-full items-center justify-center rounded-inherit backdrop-blur-xl font-mono text-4xl font-black transition-colors duration-500"
              style={{
                animation: 'morph-blob 8s ease-in-out infinite',
                background: 'rgba(10, 10, 15, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'var(--accent-primary)',
              }}
            >
              PK
            </div>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={childVariants}
          className="mb-2 text-lg font-medium tracking-widest uppercase sm:text-xl font-mono"
          style={{ color: 'var(--text-secondary)' }}
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name — animated gradient with optional Cyberpunk Glitch */}
        <motion.h1
          variants={childVariants}
          className={`mb-4 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent bg-[length:200%_auto] ${
            theme === 'cyberpunk' ? 'animate-[gradient-shift_4s_linear_infinite,glitch-text_2s_linear_infinite]' : 'animate-[gradient-shift_4s_linear_infinite]'
          }`}
        >
          Pashin Kasad
        </motion.h1>

        {/* Typed roles */}
        <motion.div
          variants={childVariants}
          className="mb-8 h-8 text-lg font-medium sm:text-xl md:text-2xl font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          <span ref={typedRef} />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={childVariants}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          {/* Primary CTA */}
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg sm:text-base cursor-pointer"
            style={{
              background:
                'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              boxShadow: '0 4px 24px color-mix(in srgb, var(--accent-primary) 35%, transparent)',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="/Pashin_kasad_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide sm:text-base cursor-pointer bg-[#0a0a0f]/40 backdrop-blur-md"
            style={{
              border: '2px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              boxShadow: '0 0 15px rgba(var(--accent-primary), 0.1)'
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: '0 0 20px var(--glow-color)' 
            }}
            whileTap={{ scale: 0.98 }}
          >
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span
          className="text-xs font-semibold uppercase tracking-[0.25em] font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          Scroll
        </span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--accent-primary)' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
