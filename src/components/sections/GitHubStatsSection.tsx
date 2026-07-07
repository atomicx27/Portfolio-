'use client';

import { motion } from 'framer-motion';
import { Github, FolderGit2, Star, GitBranch, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function GitHubStatsSection() {
  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)'
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold theme-text mb-4">
            GitHub Activity
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
        </motion.div>

        {/* Central Github Card */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="theme-card-bg rounded-3xl p-8 sm:p-12 border theme-border relative overflow-hidden text-center flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:border-[var(--accent-primary)] group"
          style={{ boxShadow: '0 0 0 0 transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Card Glow Blob */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            style={{
              background: 'radial-gradient(circle at 50% 50%, var(--glow-color), transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Icon with pulsing effect */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-[var(--accent-primary)] opacity-20 blur-md group-hover:scale-125 transition-transform duration-300" />
            <div className="w-16 h-16 rounded-full theme-bg-secondary border theme-border flex items-center justify-center theme-text relative">
              <Github className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold theme-text mb-4">
            Explore My Repositories & Contributions
          </h3>
          
          <p className="theme-text-secondary max-w-2xl text-base sm:text-lg mb-8 leading-relaxed">
            I believe in building in public and open-sourcing my creations. Most of my projects, local AI agent experiments, automation wrappers, and tools are hosted publicly on my profile, complete with full documentation.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-10">
            <div className="p-4 rounded-2xl theme-bg-secondary border theme-border">
              <FolderGit2 className="w-5 h-5 theme-accent-text mx-auto mb-1.5" />
              <span className="text-xl font-bold theme-text block">20+</span>
              <span className="text-[10px] sm:text-xs theme-text-muted">Repositories</span>
            </div>
            <div className="p-4 rounded-2xl theme-bg-secondary border theme-border">
              <Star className="w-5 h-5 theme-accent-text mx-auto mb-1.5" />
              <span className="text-xl font-bold theme-text block">50+</span>
              <span className="text-[10px] sm:text-xs theme-text-muted">AI Concepts</span>
            </div>
            <div className="p-4 rounded-2xl theme-bg-secondary border theme-border">
              <GitBranch className="w-5 h-5 theme-accent-text mx-auto mb-1.5" />
              <span className="text-xl font-bold theme-text block">10+</span>
              <span className="text-[10px] sm:text-xs theme-text-muted">AI Agents</span>
            </div>
          </div>

          {/* Link Button */}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white theme-accent-bg font-semibold shadow-lg shadow-[var(--accent-primary)]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent-primary)]/40 hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>Follow @atomicx27 on GitHub</span>
            <ArrowUpRight className="w-4 h-4 ml-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
