'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FileCode, 
  Terminal as TerminalIcon, 
  Play, 
  Github, 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  Sidebar as SidebarIcon,
  Code as CodeIcon,
  Layers,
  FolderOpen
} from 'lucide-react';
import { projects, type Project, type ProjectCategory } from '@/data/projects';

// Simulated terminal build logs per project
const PROJECT_LOGS: Record<string, string[]> = {
  brenda: [
    'npm run dev',
    '>> [vite] v5.1.4 dev server running...',
    '>> [vite] local: http://localhost:5173/',
    '>> [db] Connected to PostgreSQL at localhost:5432',
    '>> [db] Prisma ORM schema synced successfully',
    '>> [socket] Socket.IO listener established on port 8080',
    '>> [ai] Google Gemini orchestrator initialized',
    '>> [system] Status: Brenda platform ONLINE'
  ],
  logiquote: [
    'python main.py',
    '>> [core] Bootstrapping Multi-Provider LLM orchestration...',
    '>> [core] Registered 7 AI Backends (OpenAI, Anthropic, Gemini, Groq, Nim, Ollama)',
    '>> [schema] Zod validators loaded for 20+ logistics attributes',
    '>> [email] Polling freight forwarder IMAP inboxes...',
    '>> [inference] Processing raw cargo text via Groq/Llama3 (latency: 380ms)',
    '>> [validation] Structured validation complete (Confidence: 98.4%)',
    '>> [system] Output exported to ERP-XML schema successfully'
  ],
  'open-bi': [
    'npm run start:mcp',
    '>> [mcp] Model Context Protocol server starting...',
    '>> [mcp] Protocol: JSON-RPC over stdio',
    '>> [pbir] PBIR Layout Generator schema v1 loaded',
    '>> [tmdl] TMDL tabular model parser online',
    '>> [audit] Collision bounds checking engine activated',
    '>> [system] Open BI server listening. Standby for LLM tool calls...'
  ],
  atash: [
    'npm run dev:v4',
    '>> [next] Next.js v16.2.10 starting...',
    '>> [next] Turbopack compiler running...',
    '>> [style] Tailwind CSS v4 assets compiled',
    '>> [db] Supabase client authentication initialized',
    '>> [auth] Parsi Invitation-Voucher verification service online',
    '>> [system] Atash Matchmaker server active'
  ],
  afterwords: [
    'flutter run',
    '>> [flutter] Launching lib/main.dart on iOS Simulator...',
    '>> [flutter] Compiling assets & Dart package dependencies...',
    '>> [db] Connecting to Supabase storage buckets',
    '>> [switch] Dead-man switch inactivity daemon running in bg',
    '>> [sms] WhatsApp Gateway service validated',
    '>> [system] Flutter application deployed successfully'
  ],
  'outlook-router': [
    'python mail_router.py',
    '>> [outlook] Outlook Graph API credentials accepted',
    '>> [llm] Loading local Mistral-7B weights (quantized 4-bit)...',
    '>> [llm] Local GPU model layer allocation complete',
    '>> [router] Inbox monitor listening for incoming mail streams...',
    '>> [router] Event extracted: Created task: Calendar Conflict Resolve',
    '>> [system] Routing daemon active. Zero-touch router running.'
  ],
  'anime-ai': [
    'python run_arena.py',
    '>> [ai] Initializing character prompt compiler...',
    '>> [ai] Loaded MBTI character sheet definitions (Naruto, Goku, etc.)',
    '>> [agent] Launching ReAct loop (Max iterations: 5)',
    '>> [arena] Council AI moderation queue initialized',
    '>> [battle] Goku vs Naruto philosophical debate active',
    '>> [system] Simulator running at http://localhost:8000'
  ]
};

// Default logs for other projects
const DEFAULT_LOGS = [
  'npm run dev',
  '>> [next] Starting local server...',
  '>> [next] Compiled assets successfully',
  '>> [db] Mock database connectivity ready',
  '>> [system] Project running at http://localhost:3000'
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'AI/ML': true,
    'Full-Stack': true,
    'Tools': true,
    'Open Source': false,
    'Experiments': false
  });
  const [activeTab, setActiveTab] = useState<string>('code'); // 'code' | 'preview'
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const terminalIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Group projects by category
  const categories: ProjectCategory[] = ['AI/ML', 'Full-Stack', 'Tools', 'Open Source', 'Experiments'];

  // Handle project selection and trigger terminal log animation
  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    triggerTerminalAnimation(project.id);
  };

  const triggerTerminalAnimation = (projectId: string) => {
    if (terminalIntervalRef.current) {
      clearInterval(terminalIntervalRef.current);
    }

    const logs = PROJECT_LOGS[projectId] || DEFAULT_LOGS;
    setTerminalLines([`$ ${logs[0]}`]);
    let index = 1;

    const interval = setInterval(() => {
      if (index < logs.length) {
        const nextLine = logs[index];
        setTerminalLines(prev => [...prev, nextLine]);
        index++;
      } else {
        if (terminalIntervalRef.current) {
          clearInterval(terminalIntervalRef.current);
          terminalIntervalRef.current = null;
        }
      }
    }, 180);

    terminalIntervalRef.current = interval;
  };

  // Run terminal build on initial load and clean up interval on unmount
  useEffect(() => {
    triggerTerminalAnimation(activeProject.id);
    return () => {
      if (terminalIntervalRef.current) {
        clearInterval(terminalIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleCopyClone = () => {
    const cloneCmd = `git clone ${activeProject.githubUrl}`;
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[550px] rounded-full bg-[var(--accent-primary)]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold theme-text mb-4">
            Projects Workspace
          </h2>
          <div
            className="h-1.5 w-24 mx-auto rounded-full mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            }}
          />
          <p className="max-w-2xl mx-auto text-base sm:text-lg theme-text-secondary">
            Explore my code editor. Click folders in the explorer panel on the left to inspect file structures, tech specs, and run live diagnostic builds.
          </p>
        </div>

        {/* ── IDE Container ── */}
        <div className="w-full rounded-2xl border theme-border overflow-hidden shadow-2xl flex flex-col h-[700px] md:h-[650px] bg-[#07070a] backdrop-blur-md">
          
          {/* 1. IDE Top Title Bar */}
          <div className="h-10 bg-[#0e0e13] border-b theme-border flex items-center justify-between px-4 select-none flex-shrink-0">
            {/* Windows Style Control Buttons */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            {/* File name path */}
            <div className="text-xs font-mono theme-text-muted flex items-center gap-1.5">
              <span className="text-[#ff2d95] font-bold">pashin-dev-editor</span>
              <span>/</span>
              <span>src</span>
              <span>/</span>
              <span>projects</span>
              <span>/</span>
              <span className="theme-text font-semibold">{activeProject.id}.tsx</span>
            </div>

            {/* Editor toggle button */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="theme-text-muted hover:theme-text p-1 rounded transition-colors cursor-pointer"
              title="Toggle Sidebar"
            >
              <SidebarIcon size={16} />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* 2. IDE Sidebar Activity Bar (Thin icon list) */}
            <div className="w-12 bg-[#0a0a0f] border-r theme-border flex flex-col items-center py-4 gap-5 select-none flex-shrink-0">
              <div className="p-2 text-[var(--accent-primary)] border-l-2 border-[var(--accent-primary)]">
                <CodeIcon size={20} />
              </div>
              <div className="p-2 theme-text-muted hover:theme-text cursor-pointer transition-colors">
                <Layers size={20} />
              </div>
              <div className="p-2 theme-text-muted hover:theme-text cursor-pointer transition-colors mt-auto">
                <TerminalIcon size={20} />
              </div>
            </div>

            {/* 3. IDE File Explorer Sidebar */}
            <AnimatePresence initial={false}>
              {sidebarOpen && (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="bg-[#0c0c11] border-r theme-border flex flex-col select-none flex-shrink-0 overflow-hidden"
                >
                  {/* Explorer Title */}
                  <div className="p-3 border-b theme-border flex items-center justify-between text-[10px] font-bold font-mono uppercase tracking-wider theme-text-muted">
                    <span>Explorer</span>
                    <span className="text-[var(--accent-primary)] font-semibold">Workspace</span>
                  </div>

                  {/* Sidebar Search Bar */}
                  <div className="p-2.5 border-b theme-border relative">
                    <Search className="w-3.5 h-3.5 absolute left-4.5 top-1/2 -translate-y-1/2 theme-text-muted" />
                    <input 
                      type="text" 
                      placeholder="Search files..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#07070a] border theme-border rounded-lg pl-8 pr-3 py-1 text-xs font-mono theme-text placeholder:theme-text-muted outline-none focus:border-[var(--accent-primary)]/50 transition-colors"
                    />
                  </div>

                  {/* Folder File Tree */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
                    {categories.map(category => {
                      const categoryProjects = filteredProjects.filter(p => p.category === category);
                      if (categoryProjects.length === 0) return null;
                      
                      const isOpen = openFolders[category];

                      return (
                        <div key={category} className="space-y-0.5">
                          {/* Folder Header */}
                          <button
                            onClick={() => toggleFolder(category)}
                            className="w-full flex items-center gap-1.5 px-2 py-1 text-xs font-mono font-semibold theme-text-secondary hover:bg-white/5 rounded transition-colors text-left cursor-pointer"
                          >
                            <span className="theme-text-muted">
                              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </span>
                            <span className="text-yellow-500/80">
                              {isOpen ? <FolderOpen size={14} /> : <Folder size={14} />}
                            </span>
                            <span className="truncate">{category}</span>
                          </button>

                          {/* Folder Files */}
                          {isOpen && (
                            <div className="pl-4 space-y-0.5">
                              {categoryProjects.map(project => {
                                const isActive = activeProject.id === project.id;
                                return (
                                  <button
                                    key={project.id}
                                    onClick={() => handleSelectProject(project)}
                                    className={`w-full flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-colors text-left cursor-pointer ${
                                      isActive 
                                        ? 'bg-[var(--accent-primary)]/10 theme-accent-text font-bold border-l-2 border-[var(--accent-primary)]' 
                                        : 'theme-text-muted hover:bg-white/5 hover:theme-text'
                                    }`}
                                  >
                                    <FileCode size={13} className={isActive ? 'text-[var(--accent-primary)]' : 'text-[#a78bfa]/80'} />
                                    <span className="truncate">{project.id}.tsx</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. Main Code Editor Panel */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              
              {/* Tab Header bar */}
              <div className="h-9 bg-[#0c0c11] border-b theme-border flex items-center px-2 select-none overflow-x-auto no-scrollbar flex-shrink-0">
                <div className="flex items-center h-full">
                  <div className="flex items-center gap-1.5 px-4 h-full bg-[#07070a] border-t-2 border-[var(--accent-primary)] border-r theme-border text-xs font-mono font-semibold theme-text">
                    <FileCode size={13} className="text-[var(--accent-primary)]" />
                    <span>{activeProject.id}.tsx</span>
                  </div>
                </div>

                {/* Switcher Tab View (Code / Live Preview) */}
                <div className="ml-auto flex items-center gap-1 px-3">
                  <button 
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'code' 
                        ? 'bg-[var(--accent-primary)]/15 theme-accent-text border border-[var(--accent-primary)]/30' 
                        : 'theme-text-muted hover:theme-text'
                    }`}
                  >
                    Code Config
                  </button>
                  <button 
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'preview' 
                        ? 'bg-[var(--accent-primary)]/15 theme-accent-text border border-[var(--accent-primary)]/30' 
                        : 'theme-text-muted hover:theme-text'
                    }`}
                  >
                    Live Preview
                  </button>
                </div>
              </div>

              {/* Editor Workspace */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#07070a] scrollbar-thin">
                <AnimatePresence mode="wait">
                  {activeTab === 'code' ? (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                    >
                      {/* Left: Code Block Syntax */}
                      <div className="lg:col-span-8 bg-[#09090d] border theme-border rounded-xl p-4 font-mono text-xs overflow-x-auto relative group">
                        
                        {/* Copy button */}
                        <button
                          onClick={handleCopyClone}
                          className="absolute right-3 top-3 p-2 bg-[#0c0c11] border theme-border rounded-lg theme-text-muted hover:theme-text transition-colors cursor-pointer"
                          title="Copy Git Clone Command"
                        >
                          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>

                        <div className="flex gap-4">
                          {/* Line numbers */}
                          <div className="text-[var(--text-muted)] select-none text-right border-r theme-border pr-3 flex flex-col gap-1 min-w-[24px]">
                            {Array.from({ length: 18 }).map((_, i) => (
                              <span key={i}>{i + 1}</span>
                            ))}
                          </div>

                          {/* Colored JSON Editor Syntax */}
                          <div className="flex-1 space-y-1 text-[#a0a0b8]">
                            <div>
                              <span className="text-[#ff2d95]">import</span> {'{'} Project {'}'} <span className="text-[#ff2d95]">from</span> <span className="text-[#00f0ff]">&apos;@/types/project&apos;</span>;
                            </div>
                            <div className="h-2" />
                            <div>
                              <span className="text-[#b026ff]">const</span> <span className="text-[var(--text-primary)] font-semibold">config</span>: Project = {'{'}
                            </div>
                            <div className="pl-4">
                              <span className="text-[#a78bfa]">&apos;id&apos;</span>: <span className="text-[#00f0ff]">&apos;{activeProject.id}&apos;</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-[#a78bfa]">&apos;title&apos;</span>: <span className="text-[#00f0ff]">&apos;{activeProject.title}&apos;</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-[#a78bfa]">&apos;category&apos;</span>: <span className="text-[#00f0ff]">&apos;{activeProject.category}&apos;</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-[#a78bfa]">&apos;featured&apos;</span>: <span className="text-[#ff2d95]">{activeProject.featured ? 'true' : 'false'}</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-[#a78bfa]">&apos;description&apos;</span>: <span className="text-[#00f0ff]">&apos;{activeProject.description}&apos;</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-[#a78bfa]">&apos;techStack&apos;</span>: [
                              <div className="pl-4 flex flex-wrap gap-x-2">
                                {activeProject.techStack.map((tech, i) => (
                                  <span key={tech} className="text-[#00f0ff]">
                                    &apos;{tech}&apos;{i < activeProject.techStack.length - 1 ? ',' : ''}
                                  </span>
                                ))}
                              </div>
                              ],
                            </div>
                            <div className="pl-4">
                              <span className="text-[#a78bfa]">&apos;longDescription&apos;</span>: <span className="text-[#00f0ff]">&apos;{activeProject.longDescription}&apos;</span>
                            </div>
                            <div>{'};'}</div>
                            <div className="h-2" />
                            <div>
                              <span className="text-[#ff2d95]">export default</span> config;
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions and Tech Overview */}
                      <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className="theme-card-bg border theme-border rounded-xl p-5">
                          <h4 className="text-sm font-bold font-mono tracking-widest uppercase theme-text-muted mb-4">
                            Workspace Actions
                          </h4>
                          
                          <div className="space-y-3">
                            <a 
                              href={activeProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border theme-border bg-[#0c0c11] hover:bg-white/5 transition-colors font-mono text-xs font-bold theme-text cursor-pointer"
                            >
                              <Github size={15} />
                              Open Source Repo
                            </a>

                            {activeProject.liveUrl ? (
                              <a 
                                href={activeProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all font-mono text-xs font-bold text-white shadow-md shadow-[var(--accent-primary)]/10 hover:shadow-lg cursor-pointer"
                              >
                                <Play size={14} className="fill-current" />
                                Launch Live Preview
                              </a>
                            ) : (
                              <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed theme-border font-mono text-xs font-semibold theme-text-muted">
                                Live link not deployed
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Git clone box */}
                        <div className="theme-card-bg border theme-border rounded-xl p-5">
                          <h4 className="text-xs font-bold font-mono tracking-wider uppercase theme-text-muted mb-2">
                            Quick Clone Cmd
                          </h4>
                          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#07070a] border theme-border font-mono text-[10px] theme-text-secondary select-all overflow-hidden truncate">
                            <span>git clone {activeProject.githubUrl}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Live UI Device Mockup Rendering
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex justify-center py-4"
                    >
                      {/* Browser Window frame mockup */}
                      <div className="w-full max-w-2xl rounded-xl border theme-border bg-[#0c0c11] overflow-hidden shadow-lg flex flex-col aspect-[16/10]">
                        {/* Browser Header */}
                        <div className="h-8 bg-[#09090d] border-b theme-border flex items-center px-4 gap-2 flex-shrink-0">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          </div>
                          <div className="mx-auto w-3/5 h-4.5 rounded bg-[#07070a] border theme-border text-[9px] font-mono theme-text-muted flex items-center justify-center truncate">
                            {activeProject.liveUrl || `https://${activeProject.id}.local`}
                          </div>
                        </div>

                        {/* Dynamic Mockup Body based on Category */}
                        <div className="flex-1 bg-[#07070a] p-4 flex flex-col overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-primary)]/5 via-transparent to-transparent pointer-events-none" />

                          {activeProject.category === 'AI/ML' && (
                            <div className="flex-1 flex flex-col font-mono text-xs overflow-hidden gap-3">
                              {/* Custom AI Chat simulator */}
                              <div className="flex-shrink-0 text-[#ff2d95] font-semibold border-b theme-border pb-1">
                                [AI AGENT CONSOLE]
                              </div>
                              <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-none pr-1">
                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 self-end max-w-[85%] text-[10px] theme-text-secondary">
                                  Run diagnostic on project extraction pipeline.
                                </div>
                                <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 self-start max-w-[85%] text-[10px] theme-accent-text flex flex-col gap-1">
                                  <span className="font-bold">[System Answer]</span>
                                  <span>Inference loaded. Executed {activeProject.title} matching algorithm. 7/7 local models active.</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 self-end max-w-[85%] text-[10px] theme-text-secondary">
                                  Show extracted fields metadata.
                                </div>
                                <div className="p-2.5 rounded-xl bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/25 self-start max-w-[85%] text-[10px] text-[var(--accent-secondary)] font-bold animate-pulse">
                                  Generating structured data logs...
                                </div>
                              </div>
                            </div>
                          )}

                          {activeProject.category === 'Full-Stack' && (
                            <div className="flex-1 flex flex-col gap-3">
                              {/* Custom Dashboard Admin simulator */}
                              <div className="flex items-center justify-between border-b theme-border pb-1.5 flex-shrink-0">
                                <span className="text-xs font-bold theme-text uppercase tracking-wide">Dashboard Console</span>
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                              </div>
                              <div className="grid grid-cols-3 gap-2.5 flex-shrink-0">
                                <div className="p-2.5 rounded-xl bg-white/5 border theme-border text-center">
                                  <div className="text-[10px] theme-text-muted font-mono uppercase">Vouchers</div>
                                  <div className="text-base font-black text-[var(--accent-primary)] mt-0.5">840</div>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white/5 border theme-border text-center">
                                  <div className="text-[10px] theme-text-muted font-mono uppercase">API Load</div>
                                  <div className="text-base font-black text-[#a78bfa] mt-0.5">14%</div>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white/5 border theme-border text-center">
                                  <div className="text-[10px] theme-text-muted font-mono uppercase">Threads</div>
                                  <div className="text-base font-black text-[var(--accent-secondary)] mt-0.5">1,200</div>
                                </div>
                              </div>
                              {/* Dummy Chart Mockup */}
                              <div className="flex-1 bg-white/5 rounded-xl border theme-border flex items-end p-2 gap-1.5 overflow-hidden">
                                <div className="w-full h-[30%] bg-gradient-to-t from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-t-sm" />
                                <div className="w-full h-[50%] bg-gradient-to-t from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-t-sm animate-pulse" />
                                <div className="w-full h-[40%] bg-gradient-to-t from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-t-sm" />
                                <div className="w-full h-[75%] bg-gradient-to-t from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-t-sm" />
                                <div className="w-full h-[60%] bg-gradient-to-t from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-t-sm" />
                                <div className="w-full h-[90%] bg-gradient-to-t from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-t-sm" />
                              </div>
                            </div>
                          )}

                          {activeProject.category !== 'AI/ML' && activeProject.category !== 'Full-Stack' && (
                            <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center">
                              {/* Abstract general mockup view */}
                              <div className="relative w-20 h-20 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-dashed border-[var(--accent-primary)] animate-[border-dance_12s_linear_infinite]" />
                                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-10 animate-pulse" />
                                <span className="text-4xl relative z-10">{activeProject.icon}</span>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold theme-text">{activeProject.title}</h4>
                                <p className="text-[10px] theme-text-muted mt-1 font-mono max-w-sm">
                                  PROGRAMMATIC FILE ACCESS ONLY · RUN DIAGNOSTIC LOGS BELOW FOR BUILD DETAILS
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 5. Bottom Terminal Panel */}
              <div className="h-40 bg-[#050508] border-t theme-border flex flex-col overflow-hidden font-mono text-[11px] flex-shrink-0">
                {/* Terminal Header */}
                <div className="h-8 bg-[#0a0a0f] border-b theme-border flex items-center px-4 gap-2 justify-between flex-shrink-0 select-none">
                  <div className="flex items-center gap-2 theme-text-secondary">
                    <TerminalIcon size={13} className="text-green-500" />
                    <span className="font-bold">Terminal</span>
                  </div>
                  <div className="text-[9px] theme-text-muted">
                    bash · active-job
                  </div>
                </div>

                {/* Terminal Output Logs */}
                <div className="flex-1 p-3.5 overflow-y-auto space-y-1 scrollbar-none text-[#a0a0b8]">
                  {terminalLines.map((line, i) => {
                    if (!line) return null;
                    const isCommand = line.startsWith('$');
                    const isError = line.toLowerCase().includes('error');
                    const isSuccess = line.toLowerCase().includes('success') || line.toLowerCase().includes('online') || line.toLowerCase().includes('active');
                    
                    let textColor = 'text-[#a0a0b8]';
                    if (isCommand) textColor = 'text-[var(--accent-primary)] font-bold';
                    else if (isError) textColor = 'text-red-500';
                    else if (isSuccess) textColor = 'text-green-400 font-semibold';

                    return (
                      <div key={i} className={`${textColor} leading-normal`}>
                        {line}
                      </div>
                    );
                  })}
                  <div ref={terminalBottomRef} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
