'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import GitHubStatsSection from '@/components/sections/GitHubStatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogSection from '@/components/sections/BlogSection';
import FunFactsSection from '@/components/sections/FunFactsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen theme-bg scanline-overlay">
      <Navbar />
      <HeroSection />

      <div className="relative z-10">
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <FunFactsSection />
        <GitHubStatsSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </div>

      <Footer />
      <ThemeSwitcher />
    </main>
  );
}
