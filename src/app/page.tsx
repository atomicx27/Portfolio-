'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import FunFactsSection from '@/components/sections/FunFactsSection';
import ContactSection from '@/components/sections/ContactSection';

// New global enhancements
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <main className="relative min-h-screen theme-bg scanline-overlay">
      <Preloader />
      <CustomCursor />
      
      <Navbar />
      <HeroSection />

      <div className="relative z-10">
        <SectionDivider />
        <AboutSection />
        
        <SectionDivider />
        <SkillsSection />
        
        <SectionDivider />
        <ExperienceSection />
        
        <SectionDivider />
        <ProjectsSection />
        
        <SectionDivider />
        <FunFactsSection />
        
        <SectionDivider />
        <BlogSection />
        
        <SectionDivider />
        <ContactSection />
      </div>

      <Footer />
      <ThemeSwitcher />
    </main>
  );
}
