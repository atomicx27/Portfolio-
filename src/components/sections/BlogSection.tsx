'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ArrowRight } from 'lucide-react';
import { blogPosts, type BlogPost } from '@/data/blogs';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const card = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function BlogSection() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Close modal on escape press & manage body scroll lock
  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActivePost(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activePost]);

  // Premium Custom Markdown Inline Formatter
  const parseInlineFormatting = (text: string) => {
    let parts: (string | React.ReactNode)[] = [text];

    // 1. Process bold text (**text**)
    parts = parts.flatMap((part) => {
      if (typeof part !== 'string') return part;
      const regex = /\*\*(.*?)\*\*/g;
      const result = [];
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(part)) !== null) {
        if (match.index > lastIndex) {
          result.push(part.substring(lastIndex, match.index));
        }
        result.push(
          <strong key={`b-${match.index}`} className="font-bold theme-text">
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < part.length) {
        result.push(part.substring(lastIndex));
      }
      return result.length > 0 ? result : [part];
    });

    // 2. Process inline code (`code`)
    parts = parts.flatMap((part) => {
      if (typeof part !== 'string') return part;
      const regex = /`(.*?)`/g;
      const result = [];
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(part)) !== null) {
        if (match.index > lastIndex) {
          result.push(part.substring(lastIndex, match.index));
        }
        result.push(
          <code 
            key={`c-${match.index}`} 
            className="px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] font-mono text-xs"
          >
            {match[1]}
          </code>
        );
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < part.length) {
        result.push(part.substring(lastIndex));
      }
      return result.length > 0 ? result : [part];
    });

    return parts;
  };

  // Render content block by block (handles headers, lists, callout cards)
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Handle Bullet Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        const items = trimmed.split(/\n[-•]\s+/);
        return (
          <ul key={i} className="list-disc pl-5 my-4 space-y-2 text-sm sm:text-base theme-text-secondary leading-relaxed">
            {items.map((item, idx) => {
              const cleanItem = item.replace(/^[-•]\s+/, '');
              return <li key={idx}>{parseInlineFormatting(cleanItem)}</li>;
            })}
          </ul>
        );
      }

      // Handle Callout Subheadings (e.g. "🤖 AI-Powered Matching — Instead...")
      if (trimmed.includes(' — ')) {
        const [title, body] = trimmed.split(' — ', 2);
        if (title.length < 60) {
          return (
            <div 
              key={i} 
              className="my-5 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 relative overflow-hidden backdrop-blur-sm group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 to-transparent pointer-events-none" />
              <h4 className="text-base sm:text-lg font-bold theme-text mb-2 flex items-center gap-2">
                {parseInlineFormatting(title)}
              </h4>
              <p className="text-sm sm:text-base theme-text-secondary leading-relaxed">
                {parseInlineFormatting(body)}
              </p>
            </div>
          );
        }
      }

      // Standard Paragraphs
      return (
        <p key={i} className="theme-text-secondary text-sm sm:text-base leading-relaxed mb-4 last:mb-0">
          {parseInlineFormatting(trimmed)}
        </p>
      );
    });
  };

  return (
    <>
      <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold theme-text mb-4">
              Blog
            </h2>
            <div
              className="h-1.5 w-24 mx-auto rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
              }}
            />
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
                whileHover={{ 
                  y: -6,
                  borderColor: 'var(--accent-primary)',
                  boxShadow: 'var(--shadow-glow)'
                }}
                onClick={() => setActivePost(post)}
                className="theme-card-bg rounded-2xl overflow-hidden border theme-border group cursor-pointer transition-all duration-300 flex flex-col"
              >
                {/* Accent gradient strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] group-hover:border-[var(--accent-primary)]/50 transition-colors duration-300">
                      <span className="text-2xl">{post.icon}</span>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-mono">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold theme-text mb-2.5 leading-snug group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm theme-text-secondary leading-relaxed mb-5 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1.5 text-xs theme-text-muted font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                      <span className="mx-0.5">·</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePost(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 35, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] theme-card-bg rounded-3xl border theme-border overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="relative p-6 sm:p-8 pb-4 sm:pb-5 border-b border-[var(--border-color)] flex-shrink-0 bg-[var(--bg-secondary)]/50">
                {/* Gradient strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full theme-bg border theme-border flex items-center justify-center theme-text-muted hover:theme-text hover:border-[var(--accent-primary)] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-3 pr-10">
                  <span className="text-3xl">{activePost.icon}</span>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-mono">
                    {activePost.category}
                  </span>
                </div>
                <h2 id="modal-title" className="text-xl sm:text-2xl font-bold theme-text leading-tight pr-10">
                  {activePost.title}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-xs theme-text-muted font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activePost.readTime}</span>
                  <span>·</span>
                  <span>{activePost.date}</span>
                </div>
              </div>

              {/* Modal Body — Scrollable */}
              <div className="overflow-y-auto flex-1 p-6 sm:p-8 pt-5 sm:pt-6">
                <div className="prose-custom font-sans">
                  {renderContent(activePost.content)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
