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

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function FunFactsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Stats Counters */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="theme-card-bg rounded-2xl p-6 border theme-border text-center"
            >
              <div className="text-4xl font-bold theme-accent-text mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm theme-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {funFacts.map((fact, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 24px var(--glow-color)',
              }}
              className="theme-card-bg rounded-xl p-4 border theme-border flex flex-col items-center text-center cursor-default transition-shadow"
            >
              <span className="text-3xl mb-2">{fact.icon}</span>
              <p className="font-semibold theme-text text-sm">{fact.label}</p>
              <p className="text-xs theme-text-muted mt-1 leading-relaxed">
                {fact.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
