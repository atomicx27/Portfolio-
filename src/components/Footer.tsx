'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative border-t theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold theme-accent-text"
          >
            {'<'}PK{' />'}
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
              { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full theme-card-bg border theme-border flex items-center justify-center theme-text-secondary hover:theme-accent-text hover:border-[var(--accent-primary)] transition-all duration-300"
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm theme-text-muted flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> and Next.js
            <span className="mx-2">·</span>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
