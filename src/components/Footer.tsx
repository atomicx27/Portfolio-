'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { siteConfig, navLinks } from '@/lib/constants';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t theme-border bg-[var(--bg-secondary)] overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] rounded-full bg-[var(--accent-primary)]/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-between">
          
          {/* Logo & Copyright (Left column) */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-black font-mono tracking-wider theme-accent-text inline-block self-center md:self-start cursor-pointer outline-none"
            >
              {'<'}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">PK</span>{' />'}
            </motion.button>
            <p className="text-sm theme-text-muted flex items-center justify-center md:justify-start gap-1 font-medium mt-1">
              Built with <Heart size={14} className="text-[#ff2d95] fill-[#ff2d95] animate-pulse" /> using Next.js
            </p>
            <p className="text-xs theme-text-muted/80 font-mono">
              © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
            </p>
          </div>

          {/* Mini Sitemap (Center column) */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold font-mono">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="theme-text-secondary hover:theme-accent-text transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Socials & Back To Top (Right column) */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-6">
            {/* Socials */}
            <div className="flex items-center gap-3.5">
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
                  whileHover={{ 
                    y: -4, 
                    scale: 1.1,
                    borderColor: 'var(--accent-primary)',
                    boxShadow: '0 0 12px var(--glow-color)' 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full theme-card-bg border theme-border flex items-center justify-center theme-text-secondary hover:theme-accent-text transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ 
                y: -4,
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 0 12px var(--glow-color)'
              }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full theme-card-bg border theme-border flex items-center justify-center theme-text hover:theme-accent-text transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
