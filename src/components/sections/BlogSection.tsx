'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ArrowRight } from 'lucide-react';
import { blogPosts, type BlogPost } from '@/data/blogs';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function BlogSection() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <>
      <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold theme-text mb-4">
              Blog
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
            <p className="mt-4 theme-text-secondary text-sm sm:text-base max-w-xl mx-auto">
              Deep dives into the projects I&apos;ve built — the problems, the architecture, and the lessons learned.
            </p>
          </motion.div>

          {/* Posts Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={card}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setActivePost(post)}
                className="theme-card-bg rounded-2xl overflow-hidden border theme-border group cursor-pointer transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-lg flex flex-col"
                style={{ boxShadow: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(var(--accent-primary-rgb, 0,0,0), 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Accent gradient strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{post.icon}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold theme-text mb-2 leading-snug group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm theme-text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1.5 text-xs theme-text-muted">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                      <span className="mx-1">·</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePost(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] theme-card-bg rounded-3xl border theme-border overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="relative p-6 sm:p-8 pb-4 sm:pb-5 border-b border-[var(--border-color)] flex-shrink-0">
                {/* Gradient strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full theme-bg-secondary border theme-border flex items-center justify-center theme-text-muted hover:theme-text hover:border-[var(--accent-primary)] transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-3 pr-10">
                  <span className="text-3xl">{activePost.icon}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    {activePost.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold theme-text leading-tight pr-10">
                  {activePost.title}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-xs theme-text-muted">
                  <Clock className="w-3 h-3" />
                  <span>{activePost.readTime}</span>
                  <span>·</span>
                  <span>{activePost.date}</span>
                </div>
              </div>

              {/* Modal Body — Scrollable */}
              <div className="overflow-y-auto flex-1 p-6 sm:p-8 pt-5 sm:pt-6">
                <div className="prose-custom">
                  {activePost.content.split('\n\n').map((paragraph, i) => (
                    <p
                      key={i}
                      className="theme-text-secondary text-sm sm:text-base leading-relaxed mb-4 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
