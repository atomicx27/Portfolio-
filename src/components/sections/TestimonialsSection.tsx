'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Working with Pashin was a great experience. His technical skills and problem-solving abilities are impressive.',
    name: '— Coming Soon',
    role: 'Future Collaborator',
  },
  {
    quote:
      'Pashin brings creative AI-driven solutions to the table. His passion for technology is truly contagious.',
    name: '— Coming Soon',
    role: 'Future Client',
  },
  {
    quote:
      'A dedicated developer who consistently delivers quality work. His attention to detail and commitment are outstanding.',
    name: '— Coming Soon',
    role: 'Future Teammate',
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

export default function TestimonialsSection() {
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
            Testimonials
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={card}
              className="theme-card-bg rounded-2xl p-6 border theme-border flex flex-col justify-between"
            >
              {/* Quote icon */}
              <span className="text-4xl leading-none font-serif opacity-30 text-[var(--accent-primary)]">
                &ldquo;
              </span>

              <p className="theme-text-secondary text-sm leading-relaxed mt-2 flex-1">
                {t.quote}
              </p>

              <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
                <p className="font-semibold theme-text text-sm">{t.name}</p>
                <p className="text-xs theme-text-muted">{t.role}</p>
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
          ✨ Testimonials coming soon — stay tuned!
        </motion.p>
      </div>
    </section>
  );
}
