'use client';

import { motion } from 'framer-motion';

/* ─── Animation helpers ─── */
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const interests = [
  { icon: '🎌', label: 'Anime' },
  { icon: '🎵', label: 'Music' },
  { icon: '🤖', label: 'AI' },
  { icon: '🔥', label: 'Zoroastrian Heritage' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes border-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div className="mb-16 text-center" {...fadeInUp}>
          <h2
            className="text-3xl font-extrabold sm:text-4xl md:text-5xl"
            style={{ color: 'var(--text-primary)' }}
          >
            About Me
          </h2>
          <div
            className="mx-auto mt-3 h-1 w-20 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            }}
          />
        </motion.div>

        {/* Two-column grid */}
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* ── Left: Photo placeholder ── */}
          <motion.div
            className="flex justify-center"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <div className="relative">
              {/* Rotating dashed border frame */}
              <span
                className="absolute -inset-3 rounded-2xl"
                style={{
                  border: '2px dashed var(--accent-primary)',
                  animation: 'border-spin 12s linear infinite',
                  opacity: 0.5,
                }}
              />
              {/* Static accent frame */}
              <span
                className="absolute -inset-1.5 rounded-2xl opacity-30"
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
                }}
              />
              {/* Placeholder square */}
              <div
                className="relative flex h-[300px] w-[300px] items-center justify-center rounded-2xl text-7xl select-none"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '2px solid var(--border-color)',
                }}
              >
                <span
                  className="font-extrabold"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  PK
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Bio ── */}
          <div className="flex flex-col gap-6">
            <motion.p
              className="text-base leading-relaxed sm:text-lg"
              style={{ color: 'var(--text-secondary)' }}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
            >
              BTech graduate with hands-on experience in building full-stack and
              AI-driven solutions. I&apos;ve developed end-to-end products,
              including a freelance marketplace platform and mobile apps using
              Flutter, Node.js, PostgreSQL, and Supabase. With a strong interest
              in AI, automation, and scalable system design — combined with
              leadership experience as GDSC Chief of Operations — I bring
              technical depth, adaptability, and a drive to create impactful,
              user-focused products.
            </motion.p>

            {/* Dyslexia callout */}
            <motion.blockquote
              className="rounded-xl p-5 sm:p-6"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderLeft: '4px solid var(--accent-primary)',
              }}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.35 }}
            >
              <p
                className="text-sm leading-relaxed sm:text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="mr-2 text-xl">🧠</span>
                I&apos;m dyslexic — and it&apos;s my superpower. It shapes how I
                think differently about problem-solving, pushing me to find
                creative solutions others might miss.
              </p>
            </motion.blockquote>

            {/* Interest icons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.5 }}
            >
              {interests.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
