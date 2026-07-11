export interface Skill {
  name: string;
  level: number; // Proficiency level percentage (e.g. 60 - 95)
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    icon: '🧠',
    skills: [
      { name: 'OpenAI API', level: 92 },
      { name: 'LangChain', level: 88 },
      { name: 'TensorFlow', level: 75 },
      { name: 'PyTorch', level: 70 },
      { name: 'Hugging Face', level: 82 },
      { name: 'Vector Databases', level: 88 },
      { name: 'Ollama', level: 90 },
      { name: 'Gemini AI', level: 95 },
      { name: 'Anthropic', level: 92 },
      { name: 'RAG Systems', level: 88 },
    ],
  },
  {
    title: 'Full Stack Development',
    icon: '💻',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'Node.js', level: 90 },
      { name: 'Flutter', level: 85 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'Express.js', level: 88 },
    ],
  },
  {
    title: 'Analytics & Power BI',
    icon: '📊',
    skills: [
      { name: 'Power BI', level: 85 },
      { name: 'DAX', level: 80 },
      { name: 'Power Query', level: 82 },
      { name: 'ETL Pipelines', level: 78 },
      { name: 'Tableau', level: 75 },
      { name: 'Data Modeling', level: 80 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: '⚙️',
    skills: [
      { name: 'AWS', level: 75 },
      { name: 'Docker', level: 80 },
      { name: 'Kubernetes', level: 68 },
      { name: 'Vercel', level: 90 },
      { name: 'Firebase', level: 88 },
      { name: 'Git', level: 92 },
      { name: 'GitHub Actions', level: 85 },
      { name: 'CI/CD', level: 80 },
    ],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 88 },
      { name: 'Redis', level: 75 },
      { name: 'SQL Server', level: 82 },
      { name: 'Supabase', level: 90 },
      { name: 'Prisma ORM', level: 88 },
      { name: 'SQLite', level: 85 },
    ],
  },
  {
    title: 'Tools & APIs',
    icon: '🔧',
    skills: [
      { name: 'Socket.IO', level: 85 },
      { name: 'WebXR', level: 70 },
      { name: 'Cloudinary', level: 82 },
      { name: 'Outlook APIs', level: 80 },
      { name: 'MCP Protocol', level: 88 },
      { name: 'REST APIs', level: 92 },
      { name: 'Zod', level: 90 },
    ],
  },
];
