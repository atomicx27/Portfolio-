'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.links.email,
    href: `mailto:${siteConfig.links.email}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: siteConfig.location,
    href: undefined,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
];

const socials = [
  {
    icon: Github,
    href: siteConfig.links.github,
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: siteConfig.links.linkedin,
    label: 'LinkedIn',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold theme-text mb-4">
            Let&apos;s Connect
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-lg sm:text-xl theme-text-secondary mb-14 max-w-xl mx-auto"
        >
          Let&apos;s build something amazing together
        </motion.p>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left – Contact Info */}
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-4"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const Wrapper = info.href ? 'a' : 'div';
              const wrapperProps = info.href
                ? { href: info.href, target: '_blank', rel: 'noopener noreferrer' }
                : {};

              return (
                <Wrapper
                  key={info.label}
                  {...wrapperProps}
                  className="theme-card-bg rounded-xl p-4 border theme-border flex items-center gap-4 group hover:border-[var(--accent-primary)]/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider theme-text-muted font-semibold">
                      {info.label}
                    </p>
                    <p className="theme-text font-medium text-sm">{info.value}</p>
                  </div>
                </Wrapper>
              );
            })}
          </motion.div>

          {/* Right – Contact Form */}
          <motion.form
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState((s) => ({ ...s, name: e.target.value }))
              }
              className="rounded-xl theme-card-bg border theme-border p-3 theme-text placeholder:theme-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition-shadow"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
              className="rounded-xl theme-card-bg border theme-border p-3 theme-text placeholder:theme-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition-shadow"
            />
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              value={formState.message}
              onChange={(e) =>
                setFormState((s) => ({ ...s, message: e.target.value }))
              }
              className="rounded-xl theme-card-bg border theme-border p-3 theme-text placeholder:theme-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition-shadow resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-lg shadow-[var(--accent-primary)]/20 hover:shadow-xl hover:shadow-[var(--accent-primary)]/30 transition-shadow flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.button>
          </motion.form>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mt-14"
        >
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full border theme-border theme-card-bg flex items-center justify-center hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] theme-text transition-colors"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
            className="fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-semibold shadow-2xl"
          >
            🎉 Thank you! Message received.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
