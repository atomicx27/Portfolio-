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
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* CSS Floating Accent Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div 
          className="absolute w-2 h-2 rounded-full bg-[var(--accent-primary)] top-[20%] left-[10%] blur-[1px] animate-[float_4s_ease-in-out_infinite]"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute w-3.5 h-3.5 rounded-full bg-[var(--accent-secondary)] top-[65%] left-[85%] blur-[2px] animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: '1.5s' }}
        />
        <div 
          className="absolute w-2.5 h-2.5 rounded-full bg-[var(--accent-tertiary)] top-[80%] left-[15%] blur-[1px] animate-[float_5s_ease-in-out_infinite]"
          style={{ animationDelay: '3s' }}
        />
        <div 
          className="absolute w-2 h-2 rounded-full bg-[var(--accent-primary)] top-[35%] left-[90%] blur-[1px] animate-[float_3.5s_ease-in-out_infinite]"
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes border-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes morph-about {
          0%, 100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          }
          50% {
            border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div className="mb-16 text-center" {...fadeInUp}>
          <h2
            className="text-3xl font-extrabold sm:text-4xl md:text-5xl"
            style={{ color: 'var(--text-primary)' }}
          >
            About Me
          </h2>
          <div
            className="mx-auto mt-3 h-1.5 w-24 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            }}
          />
        </motion.div>

        {/* Two-column grid */}
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* ── Left: Premium Monogram Card ── */}
          <motion.div
            className="flex justify-center"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <div className="relative group">
              {/* Rotating outer frame */}
              <span
                className="absolute -inset-4 rounded-[2.5rem] opacity-40 blur-md group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
                  animation: 'morph-about 10s ease-in-out infinite, border-spin 15s linear infinite',
                }}
              />
              
              {/* Monogram Box with active theme styling */}
              <div
                className="relative flex h-[300px] w-[300px] items-center justify-center p-[3px] select-none"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  animation: 'morph-about 10s ease-in-out infinite',
                }}
              >
                {/* Inner glass layer */}
                <div
                  className="flex h-full w-full flex-col items-center justify-center rounded-inherit backdrop-blur-xl border border-white/5 relative overflow-hidden"
                  style={{
                    animation: 'morph-about 10s ease-in-out infinite',
                    background: 'rgba(20, 20, 35, 0.75)',
                  }}
                >
                  <span
                    className="text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                  >
                    PK
                  </span>
                  <div className="absolute bottom-6 font-mono text-[10px] tracking-[0.3em] text-[var(--text-muted)] uppercase">
                    AI & Full Stack
                  </div>
                </div>
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
              className="rounded-2xl p-6 relative overflow-hidden backdrop-blur-md border border-[var(--border-color)]"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderLeft: '4px solid var(--accent-primary)',
              }}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.35 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 to-transparent pointer-events-none" />
              <p
                className="text-sm leading-relaxed sm:text-base font-medium relative z-10"
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
              className="flex flex-wrap gap-3.5 pt-2"
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.5 }}
            >
              {interests.map((item) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-semibold transition-all border"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    borderColor: 'var(--accent-primary)',
                    boxShadow: '0 0 10px rgba(var(--accent-primary), 0.15)' 
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
