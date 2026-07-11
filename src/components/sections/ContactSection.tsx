'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Loader2 } from 'lucide-react';
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
    value: '+91 97694 01157',
    href: 'tel:+919769401157',
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS environment variables are configured
    if (!serviceId || !templateId || !publicKey) {
      // Development fallback mode
      setTimeout(() => {
        setIsSubmitting(false);
        triggerToast('🎉 Mock Send: Configure EmailJS Env variables to send real emails!', 'success');
        setFormState({ name: '', email: '', message: '' });
      }, 1500);
      return;
    }

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formState.name,
            from_email: formState.email,
            message: formState.message,
          },
        }),
      });

      if (response.ok) {
        triggerToast('🎉 Message sent successfully! I will get back to you soon.', 'success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        const errorText = await response.text();
        console.error('EmailJS Error:', errorText);
        triggerToast('❌ Failed to send message. Please try again later.', 'error');
      }
    } catch (err) {
      console.error('Network Error:', err);
      triggerToast('❌ Network error. Please check your connection.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold theme-text mb-4">
            Let&apos;s Connect
          </h2>
          <div
            className="h-1.5 w-24 mx-auto rounded-full"
            style={{
              background:
                'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-base sm:text-lg theme-text-secondary mb-14 max-w-xl mx-auto"
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
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const innerContent = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center shrink-0 border border-[var(--border-color)] group-hover:border-[var(--accent-primary)]/40 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest theme-text-muted font-bold font-mono">
                      {info.label}
                    </p>
                    <p className="theme-text font-semibold text-sm sm:text-base mt-0.5">{info.value}</p>
                  </div>
                </>
              );

              if (info.href) {
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-card-bg rounded-2xl p-5 border theme-border flex items-center gap-4 group hover:border-[var(--accent-primary)]/50 transition-colors"
                  >
                    {innerContent}
                  </a>
                );
              }

              return (
                <div
                  key={info.label}
                  className="theme-card-bg rounded-2xl p-5 border theme-border flex items-center gap-4 group hover:border-[var(--accent-primary)]/50 transition-colors"
                >
                  {innerContent}
                </div>
              );
            })}
          </motion.div>

          {/* Right – Contact Form */}
          <motion.form
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Name Input with accessible label */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="text-xs font-bold font-mono tracking-wider uppercase theme-text-secondary pl-1">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Enter your name"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                className="rounded-2xl theme-card-bg border theme-border p-4 theme-text placeholder:theme-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition-shadow outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            {/* Email Input with accessible label */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="text-xs font-bold font-mono tracking-wider uppercase theme-text-secondary pl-1">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="Enter your email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                className="rounded-2xl theme-card-bg border theme-border p-4 theme-text placeholder:theme-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition-shadow outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            {/* Message Input with accessible label */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-xs font-bold font-mono tracking-wider uppercase theme-text-secondary pl-1">
                Message
              </label>
              <textarea
                id="contact-message"
                placeholder="Write your message here..."
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="rounded-2xl theme-card-bg border theme-border p-4 theme-text placeholder:theme-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition-shadow resize-none outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-bold font-mono text-sm tracking-widest uppercase text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-lg shadow-[var(--accent-primary)]/20 hover:shadow-xl hover:shadow-[var(--accent-primary)]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mt-16"
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
                whileHover={{ scale: 1.12, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full border theme-border theme-card-bg flex items-center justify-center hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] theme-text transition-colors"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            transition={{ type: 'spring' as const, stiffness: 350, damping: 24 }}
            className={`fixed bottom-8 left-1/2 z-[9999] px-6 py-3.5 rounded-2xl text-white font-bold shadow-2xl font-mono text-sm border ${
              toastType === 'success' 
                ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] border-[var(--accent-primary)]/30' 
                : 'bg-red-600 border-red-500'
            }`}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
