export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    icon: '🧠',
    skills: [
      'OpenAI API',
      'LangChain',
      'TensorFlow',
      'PyTorch',
      'Hugging Face',
      'Vector Databases',
      'Ollama',
      'Gemini AI',
      'Anthropic',
      'RAG Systems',
    ],
  },
  {
    title: 'Full Stack Development',
    icon: '💻',
    skills: [
      'Python',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Flutter',
      'HTML5',
      'CSS3',
      'Express.js',
    ],
  },
  {
    title: 'Analytics & Power BI',
    icon: '📊',
    skills: [
      'Power BI',
      'DAX',
      'Power Query',
      'ETL Pipelines',
      'Tableau',
      'Data Modeling',
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: '⚙️',
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Vercel',
      'Firebase',
      'Git',
      'GitHub Actions',
      'CI/CD',
    ],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'SQL Server',
      'Supabase',
      'Prisma ORM',
      'SQLite',
    ],
  },
  {
    title: 'Tools & APIs',
    icon: '🔧',
    skills: [
      'Socket.IO',
      'WebXR',
      'Cloudinary',
      'Outlook APIs',
      'MCP Protocol',
      'REST APIs',
      'Zod',
    ],
  },
];
