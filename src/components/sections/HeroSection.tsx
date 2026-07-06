'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { roles } from '@/lib/constants';

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

        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          50%  { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1);   opacity: 0; }
        }
      `}</style>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div variants={childVariants} className="relative mb-8">
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px solid var(--accent-primary)',
              animation: 'pulse-ring 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
            }}
          />
          <div
            className="flex h-[120px] w-[120px] items-center justify-center rounded-full text-4xl font-bold select-none"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--accent-primary) 25%, transparent), color-mix(in srgb, var(--accent-secondary) 25%, transparent))',
              border: '3px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
            }}
          >
            PK
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={childVariants}
          className="mb-2 text-lg font-medium tracking-wide sm:text-xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name — animated gradient */}
        <motion.h1
          variants={childVariants}
          className="mb-4 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent bg-[length:200%_auto]"
          style={{ animation: 'gradient-shift 4s linear infinite' }}
        >
          Pashin Kasad
        </motion.h1>

        {/* Typed roles */}
        <motion.div
          variants={childVariants}
          className="mb-8 h-8 text-lg font-medium sm:text-xl md:text-2xl"
          style={{ color: 'var(--text-muted)' }}
        >
          <span ref={typedRef} />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={childVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:text-base"
            style={{
              background:
                'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              boxShadow: '0 4px 24px color-mix(in srgb, var(--accent-primary) 35%, transparent)',
            }}
          >
            View My Work
          </a>

          {/* Secondary CTA */}
          <a
            href="/Pashin_Kasad_Resume_with_Dylexica.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95 sm:text-base"
            style={{
              border: '2px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
            }}
          >
            Download CV
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span
          className="text-xs font-medium uppercase tracking-widest"
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--accent-primary)' }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
