'use client';

import { motion } from 'framer-motion';

const posts = [
  {
    title: 'Building AI Agents from Scratch',
    excerpt:
      'A deep dive into the architecture behind autonomous AI agents — from prompt engineering to tool calling and memory management.',
    date: 'Coming Soon',
  },
  {
    title: 'My Journey with Power BI',
    excerpt:
      'How I transformed raw business data into compelling visual stories using DAX, custom visuals, and real-time dashboards.',
    date: 'Coming Soon',
  },
  {
    title: 'Why I Open Source Everything',
    excerpt:
      "Open source shaped who I am as a developer. Here's why I choose to share my work and what it has given back.",
    date: 'Coming Soon',
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function BlogSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
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
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {posts.map((post, i) => (
            <motion.div
              key={i}
              variants={card}
              className="theme-card-bg rounded-2xl overflow-hidden border theme-border group"
            >
              {/* Accent gradient strip */}
              <div className="h-2 w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

              <div className="p-6">
                {/* Date + badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs theme-text-muted">{post.date}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    Soon
                  </span>
                </div>

                <h3 className="text-lg font-bold theme-text mb-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm theme-text-secondary leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <span className="text-sm font-medium text-[var(--accent-primary)] group-hover:underline cursor-pointer transition-all">
                  Read More →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming soon note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm theme-text-muted italic"
        >
          📝 Blog posts are on the way — watch this space!
        </motion.p>
      </div>
    </section>
  );
}
