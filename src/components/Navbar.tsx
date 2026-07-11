'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { navLinks } from '@/lib/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // Page Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  // Mobile Menu Focus Trap Ref
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionObserver = () => {
      if (pathname === '/brain') return () => {};

      const sections = navLinks
        .filter((link) => link.href.startsWith('#'))
        .map((link) => document.querySelector(link.href));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`${entry.target.id}`);
            }
          });
        },
        { threshold: 0.25, rootMargin: '-20% 0px -60% 0px' } // triggers active state more accurately
      );

      sections.forEach((section) => {
        if (section) observer.observe(section);
      });

      return () => observer.disconnect();
    };

    window.addEventListener('scroll', handleScroll);
    const cleanup = handleSectionObserver();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanup?.();
    };
  }, [pathname]);

  // Handle escape to close mobile menu
  useEffect(() => {
    if (isMobileOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith('#')) {
      if (pathname === '/brain') {
        router.push(`/${href}`);
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      router.push(href);
    }
  };

  const handleLogoClick = () => {
    if (pathname === '/brain') {
      router.push('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      {pathname !== '/brain' && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] origin-left z-50 shadow-[0_0_8px_var(--glow-color)]"
          style={{ scaleX }}
        />
      )}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring' as const, stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 theme-card-bg backdrop-blur-xl border-b theme-border shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-black font-mono tracking-wider theme-accent-text cursor-pointer"
          >
            {'<'}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">PK</span>{' />'}
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const hash = link.href.replace('#', '');
              const isActive = activeSection === hash || (link.href === '/brain' && pathname === '/brain');
              
              return (
                <div key={link.href} className="relative">
                  <motion.button
                    onClick={() => handleNavClick(link.href)}
                    className={`px-4.5 py-2 rounded-lg text-sm font-semibold font-mono tracking-wide transition-all duration-300 relative cursor-pointer ${
                      isActive
                        ? 'theme-accent-text'
                        : 'theme-text-secondary hover:theme-text'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navActive"
                        className="absolute inset-0 rounded-lg theme-active-bg -z-10 border-b-2 border-[var(--accent-primary)]/40 shadow-sm"
                        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                      />
                    )}
                  </motion.button>
                </div>
              );
            })}
            <motion.a
              href="/Pashin_kasad_Resume.pdf"
              download
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="ml-3 px-5 py-2 rounded-xl text-sm font-bold font-mono tracking-wider uppercase text-white theme-accent-bg transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-primary)]/20 cursor-pointer"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden theme-text p-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded-lg"
            aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-30 md:hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            {/* Drawer Container */}
            <motion.div 
              ref={mobileMenuRef}
              className="absolute right-0 top-0 bottom-0 w-72 theme-bg p-8 pt-24 flex flex-col gap-4 border-l theme-border"
            >
              {navLinks.map((link, i) => {
                const hash = link.href.replace('#', '');
                const isActive = activeSection === hash || (link.href === '/brain' && pathname === '/brain');
                
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-lg font-bold font-mono tracking-wider text-left py-2.5 transition-colors cursor-pointer border-b border-[var(--border-color)]/30 ${
                      isActive
                        ? 'theme-accent-text'
                        : 'theme-text-secondary'
                    }`}
                  >
                    {link.name}
                  </motion.button>
                );
              })}
              <motion.a
                href="/Pashin_kasad_Resume.pdf"
                download
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="mt-6 px-5 py-3.5 rounded-2xl text-center font-bold font-mono tracking-widest uppercase text-white theme-accent-bg cursor-pointer"
              >
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
