'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats, funFacts } from '@/lib/constants';

function formatNumber(value: number): string {
  if (value >= 1000) {
    return `${Math.floor(value / 1000)}K`;
  }
  return value.toString();
}

function AnimatedCounter({
  target,
  suffix = '',
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // 1.8 seconds count up
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * target));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function FunFactsSection() {
  return (
    <section id="funfacts" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] overflow-hidden">
      {/* CSS Floating Accent Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] top-[30%] left-[85%] blur-[1.5px] animate-[float_4.5s_ease-in-out_infinite]"
          style={{ animationDelay: '0.5s' }}
        />
        <div 
          className="absolute w-2 h-2 rounded-full bg-[var(--accent-secondary)] top-[75%] left-[20%] blur-[1px] animate-[float_3.5s_ease-in-out_infinite]"
          style={{ animationDelay: '1.8s' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Stats Counters */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ 
                y: -5,
                borderColor: 'var(--accent-primary)',
                boxShadow: 'var(--shadow-glow)'
              }}
              className="theme-card-bg rounded-2xl p-6 border theme-border text-center transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold theme-accent-text mb-1 leading-none">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs uppercase tracking-widest font-mono font-bold theme-text-muted mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-5"
        >
          {funFacts.map((fact, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{
                scale: 1.03,
                borderColor: 'var(--accent-primary)',
                boxShadow: 'var(--shadow-glow)'
              }}
              className="theme-card-bg rounded-2xl p-5 border theme-border flex flex-col items-center text-center cursor-default transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] mb-4">
                <span className="text-2xl">{fact.icon}</span>
              </div>
              <p className="font-bold theme-text text-sm sm:text-base">{fact.label}</p>
              <p className="text-xs theme-text-secondary mt-2 leading-relaxed">
                {fact.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
