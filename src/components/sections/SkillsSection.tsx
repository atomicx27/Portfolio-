'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold theme-text mb-4">
            Skills & Technologies
          </h2>
          <div
            className="h-1 w-24 mx-auto rounded-full"
            style={{
              background:
                'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            }}
          />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillCategories.map((category, index) => {
            // First card (AI) spans row-span-2 on lg for a taller bento look
            const isAICard = index === 0;

            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`
                  group relative rounded-2xl p-6 border backdrop-blur-md
                  theme-card-bg theme-border
                  transition-all duration-300
                  hover:shadow-lg
                  ${isAICard ? 'lg:row-span-2' : ''}
                `}
                style={{
                  boxShadow: '0 0 0 0 transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 30px -5px var(--glow-color)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                {/* Card Glow Background */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, var(--glow-color), transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-lg font-semibold theme-text">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 cursor-default hover:scale-105"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--accent-primary) 12%, transparent)',
                        color: 'var(--accent-primary)',
                        border: '1px solid color-mix(in srgb, var(--accent-primary) 20%, transparent)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          'color-mix(in srgb, var(--accent-primary) 25%, transparent)';
                        e.currentTarget.style.boxShadow =
                          '0 0 12px -2px var(--glow-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          'color-mix(in srgb, var(--accent-primary) 12%, transparent)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
