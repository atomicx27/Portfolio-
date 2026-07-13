'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  ChevronRight, 
  X, 
  Check, 
  Terminal, 
  Sparkles, 
  Cpu, 
  Info,
  Code
} from 'lucide-react';
import { projects, type Project, type ProjectCategory } from '@/data/projects';

// 1. Brenda Mockup Component
function BrendaMockup() {
  return (
    <div className="w-full h-full flex flex-col bg-[#07070a] font-mono text-[9px] text-[#a0a0b8] p-3 overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span className="text-[var(--accent-primary)] font-bold">BRENDA DASHBOARD</span>
        </div>
        <span className="text-white/40">v2.1.0</span>
      </div>
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
        <div className="bg-white/5 border border-white/5 rounded p-1.5 text-center">
          <div className="text-[7px] text-white/40 uppercase">Earnings</div>
          <div className="text-xs font-black text-green-400">$12,450</div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded p-1.5 text-center">
          <div className="text-[7px] text-white/40 uppercase">Active Bids</div>
          <div className="text-xs font-black text-[var(--accent-primary)]">8</div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded p-1.5 text-center">
          <div className="text-[7px] text-white/40 uppercase">Success Rate</div>
          <div className="text-xs font-black text-[var(--accent-secondary)]">99%</div>
        </div>
      </div>

      {/* Bid Progress */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden justify-center">
        <div className="space-y-1">
          <div className="flex justify-between text-[8px]">
            <span>AI Matchmaker Engine</span>
            <span className="text-green-400">Match 98%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] w-[98%]" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[8px]">
            <span>Zendesk Support Integration</span>
            <span className="text-green-400">Match 92%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] w-[92%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. LogiQuote Mockup Component
function LogiQuoteMockup() {
  return (
    <div className="w-full h-full flex bg-[#07070a] font-mono text-[9px] text-[#a0a0b8] p-3 overflow-hidden select-none gap-2">
      {/* Email Box */}
      <div className="w-[45%] border-r border-white/5 pr-2 flex flex-col justify-between">
        <div className="text-[7px] text-white/30 uppercase border-b border-white/5 pb-1">Incoming Email</div>
        <div className="flex-1 flex flex-col gap-1 mt-1 text-[8px] leading-tight text-white/60">
          <div><span className="text-[var(--accent-primary)]">From:</span> Freight Corp</div>
          <div><span className="text-[var(--accent-primary)]">Subj:</span> Request Quote</div>
          <div className="text-[7px] text-white/40 mt-1 border-t border-white/5 pt-1">
            Need rates for shipping 20 pallets from Mumbai Port to New York Terminal...
          </div>
        </div>
      </div>
      
      {/* JSON Output */}
      <div className="flex-1 flex flex-col justify-between pl-1">
        <div className="text-[7px] text-[#00f0ff] uppercase border-b border-white/5 pb-1">Parsed JSON Data</div>
        <div className="flex-1 mt-1 text-[7px] text-[#00f0ff] space-y-0.5 leading-normal">
          <div>{'{'}</div>
          <div className="pl-2">&quot;origin&quot;: &quot;Mumbai Port&quot;,</div>
          <div className="pl-2">&quot;destination&quot;: &quot;New York&quot;,</div>
          <div className="pl-2">&quot;pallets&quot;: 20,</div>
          <div className="pl-2">&quot;confidence&quot;: 0.984</div>
          <div>{'}'}</div>
        </div>
        <div className="text-[8px] text-green-400 font-bold border-t border-white/5 pt-1 flex items-center gap-1">
          <Check size={10} /> Validated (Groq/Llama3)
        </div>
      </div>
    </div>
  );
}

// 3. Open BI Mockup Component
function OpenBIMockup() {
  return (
    <div className="w-full h-full flex flex-col bg-[#07070a] font-mono text-[9px] text-[#a0a0b8] p-3 overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded bg-blue-500" />
          <span className="text-[#a78bfa] font-bold">POWER BI MCP SERVER</span>
        </div>
        <span className="text-green-400 font-bold">READY</span>
      </div>
      
      {/* Grid Charts */}
      <div className="flex-1 grid grid-cols-2 gap-2 mt-1">
        <div className="bg-white/5 border border-white/5 rounded p-2 flex flex-col justify-between">
          <span className="text-[7px] text-white/40">Visual: BarChart</span>
          <div className="flex items-end gap-1 h-8 mt-1 pr-1">
            <div className="w-full bg-[var(--accent-primary)] h-[40%] rounded-t-sm" />
            <div className="w-full bg-[var(--accent-primary)] h-[85%] rounded-t-sm" />
            <div className="w-full bg-[var(--accent-primary)] h-[60%] rounded-t-sm" />
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/5 rounded p-2 flex flex-col justify-between">
          <span className="text-[7px] text-white/40">DevOps TMDL Diff</span>
          <div className="flex-1 mt-1 text-[6px] text-green-400 flex flex-col gap-0.5 font-bold">
            <span className="text-red-400">- height: 350px</span>
            <span>+ height: 420px</span>
            <span>+ theme: Glassmorphism</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Atash Mockup Component
function AtashMockup() {
  return (
    <div className="w-full h-full flex bg-[#07070a] justify-center items-center p-3 select-none">
      {/* Mobile Device */}
      <div className="w-32 h-full rounded-xl border border-white/10 bg-[#0e0e13] overflow-hidden flex flex-col relative shadow-md">
        {/* Dynamic Card */}
        <div className="flex-1 p-2 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          {/* Avatar Area */}
          <div className="flex-1 rounded bg-[#1c1c24] flex items-center justify-center text-xl">
            🔥
          </div>
          
          <div className="relative z-20 mt-1">
            <div className="text-[10px] font-bold text-white flex items-center gap-1">
              Zubin, 27 <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            </div>
            <div className="text-[7px] text-white/60">Mumbai · Parsi Heritage</div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="h-6 border-t border-white/5 bg-[#0a0a0f] flex items-center justify-around text-[10px] flex-shrink-0">
          <span className="text-red-400 cursor-pointer">✕</span>
          <span className="text-green-400 cursor-pointer">♥</span>
        </div>
      </div>
    </div>
  );
}

// 5. Words Builder Mockup Component
function WordsBuilderMockup() {
  return (
    <div className="w-full h-full flex flex-col bg-[#07070a] font-mono text-[9px] text-[#a0a0b8] p-3 overflow-hidden select-none">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-1">
          <span className="text-[var(--accent-secondary)] font-bold">WORDS BUILDER</span>
          <span className="text-[7px] bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] px-1 rounded">2D Board</span>
        </div>
        <div className="flex items-center gap-2 text-[8px]">
          <span className="text-green-400">Plays: 42/50</span>
          <span className="text-white">Score: 128</span>
        </div>
      </div>

      {/* 2D Grid Visual */}
      <div className="flex-1 bg-[#050508] border border-white/5 rounded p-1 flex items-center justify-center relative overflow-hidden">
        {/* Infinite Grid Background Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        {/* Word Placements */}
        <div className="relative flex flex-col gap-0.5 items-center justify-center scale-90">
          {/* Horizontal: BUILDER */}
          <div className="flex gap-0.5">
            {['B', 'U', 'I', 'L', 'D', 'E', 'R'].map((letter, i) => (
              <div 
                key={i} 
                className={`w-4.5 h-4.5 rounded flex items-center justify-center text-[9px] font-black shadow-sm ${
                  letter === 'L' 
                    ? 'bg-yellow-500/80 text-black border border-yellow-400/50' 
                    : 'bg-[#1c1c24] text-white border border-white/10'
                }`}
              >
                {letter}
              </div>
            ))}
          </div>

          {/* Vertical: WORD intersecting at 'L' */}
          <div className="absolute left-[33px] -top-[33px] flex flex-col gap-0.5 pointer-events-none">
            <div className="w-4.5 h-4.5 rounded bg-[#1c1c24] text-white border border-white/10 flex items-center justify-center text-[9px] font-black">W</div>
            <div className="w-4.5 h-4.5 rounded bg-[#1c1c24] text-white border border-white/10 flex items-center justify-center text-[9px] font-black">O</div>
            <div className="w-4.5 h-4.5 rounded bg-[#1c1c24] text-white border border-white/10 flex items-center justify-center text-[9px] font-black">R</div>
          </div>
          <div className="absolute left-[33px] top-[19px] flex flex-col gap-0.5 pointer-events-none">
            <div className="w-4.5 h-4.5 rounded bg-[#1c1c24] text-white border border-white/10 flex items-center justify-center text-[9px] font-black">D</div>
          </div>
        </div>

        {/* Origin Center Star Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 text-xl font-bold select-none pointer-events-none">
          ★
        </div>
      </div>

      {/* Player Rack */}
      <div className="h-6 mt-2 flex items-center justify-between border-t border-white/5 pt-1.5 flex-shrink-0 select-none">
        <span className="text-[7px] text-white/40 uppercase font-bold">Your Rack:</span>
        <div className="flex gap-0.5">
          {['A', 'K', 'E', 'T', 'P', 'S', '*'].map((letter, i) => (
            <div key={i} className="w-3.5 h-3.5 bg-[#14141c] border border-white/10 rounded flex items-center justify-center text-[7px] font-bold text-white/90">
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. General Fallback Mockup
function FallbackMockup({ project }: { project: Project }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#07070a] p-4 text-center font-mono text-[9px] relative overflow-hidden select-none">
      <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-[var(--accent-primary)]/5 rounded-full blur-xl" />
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-xl shadow-md mb-2">
        {project.icon}
      </div>
      <div className="text-white font-bold">{project.title}</div>
      <div className="text-[7px] text-white/40 mt-1 uppercase tracking-widest">{project.techStack.slice(0, 3).join(' · ')}</div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'features' | 'code'>('overview');
  const [copied, setCopied] = useState(false);

  // Group projects by category
  const categories: ProjectCategory[] = ['All', 'AI/ML', 'Full-Stack', 'Tools', 'Experiments'];

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const handleCopyClone = (githubUrl: string) => {
    const cloneCmd = `git clone ${githubUrl}`;
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter projects list
  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  // Render project mockup dynamically
  const renderProjectMockup = (project: Project) => {
    switch (project.id) {
      case 'words-builder':
        return <WordsBuilderMockup />;
      case 'brenda':
        return <BrendaMockup />;
      case 'logiquote':
        return <LogiQuoteMockup />;
      case 'open-bi':
        return <OpenBIMockup />;
      case 'atash':
        return <AtashMockup />;
      default:
        return <FallbackMockup project={project} />;
    }
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] overflow-hidden">
      {/* Background glow radial */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[850px] h-[550px] rounded-full bg-[var(--accent-primary)]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold theme-text mb-4">
            Selected Work
          </h2>
          <div
            className="h-1.5 w-24 mx-auto rounded-full mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            }}
          />
          <p className="max-w-2xl mx-auto text-base sm:text-lg theme-text-secondary">
            A curated list of my latest developer applications, MCP servers, artificial intelligence agents, and system utilities.
          </p>
        </div>

        {/* ── Filter Tab Bar ── */}
        <div className="flex justify-center flex-wrap gap-2 mb-12 select-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wide transition-all duration-300 relative overflow-hidden border cursor-pointer ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white border-transparent shadow-lg shadow-[var(--accent-primary)]/10 scale-105'
                  : 'theme-card-bg theme-border theme-text-secondary hover:theme-text hover:border-[var(--accent-primary)]/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ── Projects Cards Grid ── */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="theme-card-bg border theme-border rounded-2xl overflow-hidden flex flex-col group hover:border-[var(--accent-primary)]/50 hover:shadow-xl hover:shadow-[var(--accent-primary)]/3 transition-all duration-300 relative h-[380px]"
              >
                {/* Visual App Mockup Preview */}
                <div className="h-44 border-b theme-border overflow-hidden relative bg-[#09090d]">
                  {/* Glowing background mesh gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-primary)]/10 via-transparent to-[var(--accent-secondary)]/5 opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  {/* Dynamic Mockup viewport */}
                  <div className="w-full h-full p-3.5 flex items-center justify-center transition-transform duration-500 group-hover:scale-103">
                    <div className="w-full h-full rounded-xl border theme-border bg-[#07070a] overflow-hidden shadow-inner flex flex-col">
                      {/* Fake browser bar */}
                      <div className="h-5 bg-[#0a0a0f] border-b theme-border flex items-center px-2 gap-1.5 flex-shrink-0 select-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      </div>
                      <div className="flex-1 min-h-0">
                        {renderProjectMockup(project)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="flex-1 p-5 flex flex-col justify-between min-h-0 bg-gradient-to-b from-transparent to-[#07070a]/40">
                  <div className="space-y-2.5">
                    {/* Category tag */}
                    <div className="flex justify-between items-center select-none">
                      <span className="text-[9px] uppercase tracking-widest font-black font-mono bg-[var(--accent-primary)]/10 theme-accent-text px-2 py-0.5 rounded border border-[var(--accent-primary)]/20">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-[9px] font-bold text-yellow-500 flex items-center gap-1 select-none">
                          <Sparkles size={10} className="fill-current" /> Featured
                        </span>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-black theme-text tracking-wide group-hover:text-[var(--accent-primary)] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    
                    {/* Short Description */}
                    <p className="text-xs theme-text-secondary leading-normal line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions row */}
                  <div className="pt-4 border-t theme-border flex items-center justify-between">
                    {/* Mini tech tags */}
                    <div className="flex gap-1.5 overflow-hidden select-none">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[9px] font-semibold theme-text-muted bg-[#0c0c11] border theme-border px-2 py-0.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Trigger case study */}
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveModalTab('overview');
                      }}
                      className="flex items-center gap-1 text-[10px] font-bold font-mono uppercase tracking-wider theme-accent-text hover:theme-text transition-colors cursor-pointer select-none"
                    >
                      Case Study <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Detailed Case Study Modal ── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 bg-[#050508]/85 backdrop-blur-md flex items-center justify-center p-4">
              
              {/* Overlay click to close */}
              <div 
                className="absolute inset-0 cursor-pointer" 
                onClick={() => setSelectedProject(null)} 
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-3xl rounded-2xl border theme-border bg-[#0b0b0f]/95 overflow-hidden flex flex-col max-h-[85vh] shadow-2xl z-10 font-sans"
              >
                
                {/* Modal Title Header */}
                <div className="p-6 bg-[#08080c] border-b theme-border flex items-start justify-between gap-4 flex-shrink-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 select-none">
                      <span className="text-[10px] uppercase font-black font-mono bg-[var(--accent-primary)]/10 theme-accent-text px-2 py-0.5 rounded border border-[var(--accent-primary)]/20">
                        {selectedProject.category}
                      </span>
                      {selectedProject.featured && (
                        <span className="text-[10px] font-bold text-yellow-500 flex items-center gap-1 select-none">
                          <Sparkles size={10} className="fill-current" /> Featured Case Study
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black theme-text leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg bg-[#14141c] hover:bg-white/5 border theme-border theme-text-muted hover:theme-text transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Tab select bar */}
                <div className="h-10 bg-[#08080c] border-b theme-border flex items-center px-4 gap-1 select-none flex-shrink-0 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveModalTab('overview')}
                    className={`px-4 h-full text-xs font-mono font-bold uppercase tracking-wider relative flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeModalTab === 'overview' ? 'theme-accent-text border-b-2 border-[var(--accent-primary)]' : 'theme-text-muted hover:theme-text'
                    }`}
                  >
                    <Info size={13} />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveModalTab('features')}
                    className={`px-4 h-full text-xs font-mono font-bold uppercase tracking-wider relative flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeModalTab === 'features' ? 'theme-accent-text border-b-2 border-[var(--accent-primary)]' : 'theme-text-muted hover:theme-text'
                    }`}
                  >
                    <Cpu size={13} />
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveModalTab('code')}
                    className={`px-4 h-full text-xs font-mono font-bold uppercase tracking-wider relative flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeModalTab === 'code' ? 'theme-accent-text border-b-2 border-[var(--accent-primary)]' : 'theme-text-muted hover:theme-text'
                    }`}
                  >
                    <Code size={13} />
                    Deployment
                  </button>
                </div>

                {/* Scrollable Modal Content Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                  <AnimatePresence mode="wait">
                    
                    {activeModalTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase font-mono font-bold tracking-widest theme-text-muted">
                            Detailed Description
                          </h4>
                          <p className="text-sm theme-text-secondary leading-relaxed">
                            {selectedProject.longDescription}
                          </p>
                        </div>

                        {/* Detail Info Grid cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 select-none pt-2">
                          <div className="bg-[#0e0e13] border theme-border rounded-xl p-3">
                            <span className="text-[9px] uppercase font-mono theme-text-muted">Status</span>
                            <span className="block text-xs font-black text-green-400 mt-0.5">Production</span>
                          </div>
                          <div className="bg-[#0e0e13] border theme-border rounded-xl p-3">
                            <span className="text-[9px] uppercase font-mono theme-text-muted">Diagnostic</span>
                            <span className="block text-xs font-black text-[var(--accent-primary)] mt-0.5">Passing</span>
                          </div>
                          <div className="bg-[#0e0e13] border theme-border rounded-xl p-3">
                            <span className="text-[9px] uppercase font-mono theme-text-muted">Core Language</span>
                            <span className="block text-xs font-black text-[#a78bfa] mt-0.5">
                              {selectedProject.techStack[0]}
                            </span>
                          </div>
                          <div className="bg-[#0e0e13] border theme-border rounded-xl p-3">
                            <span className="text-[9px] uppercase font-mono theme-text-muted">Priority</span>
                            <span className="block text-xs font-black text-[var(--accent-secondary)] mt-0.5">
                              0{selectedProject.priority} / 10
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeModalTab === 'features' && (
                      <motion.div
                        key="features"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-3">
                          <h4 className="text-xs uppercase font-mono font-bold tracking-widest theme-text-muted">
                            Architectural Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2 select-none">
                            {selectedProject.techStack.map((tech) => (
                              <span key={tech} className="text-[10px] font-bold theme-text-secondary bg-[#0e0e13] border theme-border px-3 py-1 rounded-lg">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs uppercase font-mono font-bold tracking-widest theme-text-muted">
                            Key Specifications & Operations
                          </h4>
                          <ul className="space-y-2.5 font-mono text-xs text-[#a0a0b8]">
                            <li className="flex items-start gap-2.5">
                              <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                              <span>Custom decoupled framework designed with standard modular principles.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                              <span>Rigorous database schema mapping optimized for relational indexing metrics.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                              <span>High performance asynchronous network polling handlers with zero thread blocking.</span>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {activeModalTab === 'code' && (
                      <motion.div
                        key="code"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-3">
                          <h4 className="text-xs uppercase font-mono font-bold tracking-widest theme-text-muted">
                            Manual Project Setup
                          </h4>
                          
                          {/* Git Clone Box */}
                          <div className="bg-[#050508] border theme-border rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs text-white">
                            <div className="overflow-hidden truncate select-all text-[#a0a0b8] pr-2">
                              git clone {selectedProject.githubUrl}
                            </div>
                            <button
                              onClick={() => handleCopyClone(selectedProject.githubUrl)}
                              className="px-4 py-2 bg-[#0c0c11] border theme-border rounded-lg theme-text-secondary hover:theme-text font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                            >
                              {copied ? (
                                <>
                                  <Check size={14} className="text-green-500" /> Copied!
                                </>
                              ) : (
                                <>
                                  <Terminal size={14} /> Copy Clone
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Simulated config block */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-bold font-mono theme-text-muted flex items-center gap-1.5 select-none">
                            <Info size={12} className="text-[var(--accent-primary)]" />
                            Environment Configuration (.env.example)
                          </span>
                          <pre className="bg-[#050508] border theme-border rounded-xl p-4 font-mono text-[10px] text-[#00f0ff] overflow-x-auto leading-relaxed select-all">
                            {`# Environment setup for ${selectedProject.id}
PORT=8080
DATABASE_URL=postgresql://localhost:5432/${selectedProject.id}_db
API_KEY=your_secured_mcp_authentication_token_here`}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Modal Actions Footer */}
                <div className="p-6 bg-[#08080c] border-t theme-border flex flex-col sm:flex-row gap-3 flex-shrink-0 select-none">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border theme-border bg-[#0c0c11] hover:bg-white/5 transition-colors font-mono text-xs font-bold theme-text cursor-pointer"
                  >
                    <Github size={15} />
                    Inspect Repository
                  </a>

                  {selectedProject.liveUrl ? (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all font-mono text-xs font-bold text-white shadow-md shadow-[var(--accent-primary)]/10 hover:shadow-lg cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      Launch Application
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed theme-border font-mono text-xs font-semibold theme-text-muted">
                      No Live Preview Deployed
                    </div>
                  )}
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
