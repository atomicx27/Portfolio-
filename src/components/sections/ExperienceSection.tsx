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
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
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
            className="h-1 w-24 mx-auto rounded-full"
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
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                    delay: 0.1,
                  }}
                  className={`relative flex items-start ml-12 md:ml-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Glowing Dot */}
                  <div
                    className="absolute top-6 left-[-2.25rem] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full z-10"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      boxShadow:
                        '0 0 12px 4px var(--glow-color), 0 0 24px 8px color-mix(in srgb, var(--glow-color) 40%, transparent)',
                    }}
                  />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <motion.div
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="rounded-xl p-6 border backdrop-blur-md theme-card-bg theme-border transition-all duration-300 hover:shadow-lg"
                      style={{ boxShadow: '0 0 0 0 transparent' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          '0 0 25px -5px var(--glow-color)';
                        e.currentTarget.style.borderColor =
                          'var(--accent-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          '0 0 0 0 transparent';
                        e.currentTarget.style.borderColor = '';
                      }}
                    >
                      {/* Type Indicator + Date */}
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <span className="text-lg">{typeEmoji[exp.type]}</span>
                        <span
                          className="text-xs font-semibold tracking-wide uppercase"
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
                      <p className="text-sm theme-text-secondary mb-1 font-medium">
                        {exp.organization}
                      </p>
                      <p className="text-xs theme-text-muted mb-4">
                        📍 {exp.location}
                      </p>

                      {/* Description */}
                      <ul className="space-y-2">
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
                          className="mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold"
                          style={{
                            backgroundColor:
                              'color-mix(in srgb, var(--accent-primary) 15%, transparent)',
                            color: 'var(--accent-primary)',
                            border:
                              '1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent)',
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
