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
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--bg-primary)]">
      {/* CSS Floating Accent Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <div 
          className="absolute w-3 h-3 rounded-full bg-[var(--accent-primary)] top-[40%] left-[80%] blur-[2px] animate-[float_5s_ease-in-out_infinite]"
          style={{ animationDelay: '0.5s' }}
        />
        <div 
          className="absolute w-2 h-2 rounded-full bg-[var(--accent-tertiary)] top-[15%] left-[20%] blur-[1px] animate-[float_4s_ease-in-out_infinite]"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)] top-[75%] left-[45%] blur-[1.5px] animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            className="h-1.5 w-24 mx-auto rounded-full"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => {
            // First card spans row-span-2 on lg for a taller bento look
            const isFeatured = index === 0 || index === 1;

            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ 
                  y: -6,
                  borderColor: 'var(--accent-primary)',
                  boxShadow: 'var(--shadow-glow)'
                }}
                className={`
                  group relative rounded-2xl p-6 border backdrop-blur-md
                  theme-card-bg theme-border
                  transition-all duration-300
                  ${isFeatured ? 'lg:col-span-1 lg:row-span-1' : ''}
                `}
              >
                {/* Glow Backdrop */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Icon + Title */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] group-hover:border-[var(--accent-primary)]/50 transition-colors duration-300">
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold theme-text">
                    {category.title}
                  </h3>
                </div>

                {/* Skill List with Progress Bars */}
                <div className="flex flex-col gap-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1.5 group/skill">
                      {/* Name + Percentage */}
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span className="theme-text-secondary group-hover/skill:text-transparent group-hover/skill:bg-clip-text group-hover/skill:bg-gradient-to-r group-hover/skill:from-[var(--accent-primary)] group-hover/skill:to-[var(--accent-secondary)] transition-all duration-300">
                          {skill.name}
                        </span>
                        <span className="text-xs theme-text-muted" style={{ color: 'var(--text-muted)' }}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="h-2 w-full rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden">
                        {/* Animated fill */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                        />
                      </div>
                    </div>
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
