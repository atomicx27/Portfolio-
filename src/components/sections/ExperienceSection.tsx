'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';

const typeEmoji: Record<string, string> = {
  work: '💼',
  education: '🎓',
  organization: '👥',
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--bg-primary)]">
      {/* CSS Floating Accent Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute w-2 h-2 rounded-full bg-[var(--accent-primary)] top-[15%] left-[80%] blur-[1px] animate-[float_4s_ease-in-out_infinite]"
          style={{ animationDelay: '1s' }}
        />
        <div 
          className="absolute w-3.5 h-3.5 rounded-full bg-[var(--accent-tertiary)] top-[65%] left-[10%] blur-[2px] animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: '2.5s' }}
        />
        <div 
          className="absolute w-2 h-2 rounded-full bg-[var(--accent-secondary)] top-[85%] left-[75%] blur-[1px] animate-[float_5s_ease-in-out_infinite]"
          style={{ animationDelay: '0.2s' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold theme-text mb-4">
            Experience & Education
          </h2>
          <div
            className="h-1.5 w-24 mx-auto rounded-full"
            style={{
              background:
                'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 left-4 md:left-1/2 md:-translate-x-px"
            style={{
              background:
                'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
            }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                    delay: 0.05,
                  }}
                  className={`relative flex items-start ml-12 md:ml-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Glowing Dot with pulsing ring */}
                  <div className="absolute top-6 left-[-2.25rem] md:left-1/2 md:-translate-x-1/2 z-10 flex h-3.5 w-3.5 items-center justify-center">
                    <span 
                      className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    />
                    <div
                      className="h-2.5 w-2.5 rounded-full relative z-20"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        boxShadow: '0 0 10px var(--glow-color)',
                      }}
                    />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <motion.div
                      whileHover={{ 
                        y: -5,
                        borderColor: 'var(--accent-primary)',
                        boxShadow: 'var(--shadow-glow)'
                      }}
                      className="rounded-2xl p-6 border backdrop-blur-md theme-card-bg theme-border transition-all duration-300"
                    >
                      {/* Glow Backdrop */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                      {/* Type Indicator + Date */}
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                          <span className="text-sm">{typeEmoji[exp.type]}</span>
                        </div>
                        <span
                          className="text-xs font-bold tracking-widest uppercase font-mono"
                          style={{ color: 'var(--accent-primary)' }}
                        >
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold theme-text mb-1">
                        {exp.title}
                      </h3>

                      {/* Organization & Location */}
                      <p className="text-sm theme-text-secondary mb-1 font-semibold">
                        {exp.organization}
                      </p>
                      <p className="text-xs theme-text-muted mb-4 font-mono">
                        📍 {exp.location}
                      </p>

                      {/* Description */}
                      <ul className="space-y-2.5">
                        {exp.description.map((desc, i) => (
                          <li
                            key={i}
                            className="text-sm theme-text-secondary leading-relaxed flex gap-2"
                          >
                            <span
                              className="mt-1.5 min-w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: 'var(--accent-secondary)',
                              }}
                            />
                            {desc}
                          </li>
                        ))}
                      </ul>

                      {/* Highlight Badge */}
                      {exp.highlight && (
                        <div
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider border font-mono"
                          style={{
                            backgroundColor:
                              'color-mix(in srgb, var(--accent-primary) 15%, transparent)',
                            color: 'var(--accent-primary)',
                            borderColor: 'color-mix(in srgb, var(--accent-primary) 30%, transparent)',
                          }}
                        >
                          ⭐ {exp.highlight}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
