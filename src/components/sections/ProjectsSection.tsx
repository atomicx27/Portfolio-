'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, Github } from 'lucide-react';
import { projects, projectCategories, type ProjectCategory } from '@/data/projects';

// ─── Animation Variants ───────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 240,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    y: 15,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeInOut' as const },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Project Card ──────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.div
      layout
      variants={cardVariants}
      whileHover={{ 
        y: -6,
        borderColor: 'var(--accent-primary)',
        boxShadow: 'var(--shadow-glow)'
      }}
      className={`group relative flex flex-col rounded-2xl border p-6 overflow-hidden transition-all duration-300 theme-card-bg theme-border ${
        project.featured 
          ? 'md:col-span-2 lg:col-span-2 min-h-[340px] md:justify-between' 
          : 'col-span-1 min-h-[300px]'
      }`}
    >
      {/* Glow Backdrop */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div>
        {/* ── Top Row: Icon + Category + Featured ── */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] group-hover:border-[var(--accent-primary)]/50 transition-colors duration-300">
            <span className="text-2xl leading-none select-none">{project.icon}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.featured && (
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring' as const, stiffness: 450, damping: 14, delay: 0.2 }}
                className="flex items-center gap-1 rounded-full bg-[var(--accent-secondary)] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm font-mono"
              >
                <Star className="w-2.5 h-2.5 fill-current" />
                Featured
              </motion.div>
            )}
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider font-mono"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent-primary) 15%, transparent)',
                color: 'var(--accent-primary)',
              }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* ── Title ── */}
        <h3
          className="text-xl font-bold mb-2.5 transition-colors duration-300 group-hover:text-[var(--accent-primary)]"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>

        {/* ── Description ── */}
        <p
          className={`text-sm leading-relaxed mb-5 ${project.featured ? 'line-clamp-4' : 'line-clamp-3'}`}
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>
      </div>

      <div>
        {/* ── Tech Stack Badges ── */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold font-mono transition-colors duration-200"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)',
                color: 'var(--accent-primary)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── Footer Actions ── */}
        <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-color)]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--accent-primary) 12%, transparent)',
              color: 'var(--accent-primary)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-3.5 h-3.5" />
            Source Code
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* ── Decorative gradient blob ── */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: 'var(--accent-primary)' }}
      />
    </motion.div>
  );
}

// ─── Projects Section ──────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = (
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)
  ).sort((a, b) => a.priority - b.priority);

  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-[0.06]"
        style={{ backgroundColor: 'var(--accent-primary)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Projects
          </h2>
          <div
            className="mx-auto h-1.5 w-24 rounded-full mb-6"
            style={{
              background:
                'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            }}
          />
          <p
            className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            A curated showcase of things I&apos;ve built — from production platforms to wild AI experiments.
          </p>
        </motion.div>

        {/* ── Category Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 flex justify-center"
        >
          <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar max-w-full px-1">
            {projectCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 border font-mono select-none outline-none ${
                    isActive 
                      ? 'border-[var(--accent-primary)] text-white' 
                      : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50'
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-[var(--accent-primary)]"
                      transition={{ type: 'spring' as const, stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Project Count ── */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm font-mono font-medium mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          Showing{' '}
          <span style={{ color: 'var(--accent-primary)' }} className="font-bold">
            {filteredProjects.length}
          </span>{' '}
          project{filteredProjects.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && (
            <>
              {' '}
              in{' '}
              <span style={{ color: 'var(--accent-primary)' }} className="font-bold">
                {activeCategory}
              </span>
            </>
          )}
        </motion.p>

        {/* ── Project Bento Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Empty State ── */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
