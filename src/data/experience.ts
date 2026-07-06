export interface Experience {
  id: string;
  type: 'work' | 'education' | 'organization';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  highlight?: string;
}

export const experiences: Experience[] = [
  {
    id: 'orange',
    type: 'work',
    title: 'Data/AI Intern',
    organization: 'Orange Business Services',
    location: 'Gurugram',
    startDate: 'January 2026',
    endDate: 'June 2026',
    description: [
      'Built an AI-powered Outlook Automation System leveraging Python, Outlook APIs, and LLMs for intelligent email routing and workflow automation.',
      'Worked on Data & AI use cases, applying analytics and automation to solve real-world business problems.',
    ],
  },
  {
    id: 'satori',
    type: 'work',
    title: 'Intern',
    organization: 'Satori Group India',
    location: 'Mumbai',
    startDate: 'May 2024',
    endDate: 'July 2024',
    description: [
      'Worked on Teradata and SQL database systems with efficient data analysis methodologies.',
      'Focused on data sanitization practices and collaborative real-world projects.',
      'Successfully cleared the ACDA (ACL Certified Data Analyst) Level 3 examination.',
    ],
  },
  {
    id: 'gdsc',
    type: 'organization',
    title: 'Chief of Operations',
    organization: 'GDSC MPSTME',
    location: 'Mumbai',
    startDate: '2023',
    endDate: '2024',
    description: [
      'Led operations for Google Developer Student Clubs at MPSTME, NMIMS University.',
      'Coordinated tech events, workshops, and collaborative development projects.',
    ],
  },
  {
    id: 'nmims',
    type: 'education',
    title: 'B.Tech + Diploma in Computer Engineering',
    organization: 'NMIMS University — Mukesh Patel School of Technology Management & Engineering',
    location: 'Mumbai',
    startDate: '2020',
    endDate: '2026',
    description: [
      'Diploma in Computer Engineering — CGPA: 2.93/4',
      'B.Tech in Computer Engineering — CGPA: 2.88/4',
    ],
  },
  {
    id: 'school',
    type: 'education',
    title: 'Class X — Secondary Education',
    organization: 'Udayachal High School',
    location: 'Mumbai',
    startDate: '2019',
    endDate: '2020',
    description: [
      'Percentage: 92.20%',
    ],
    highlight: '92.20%',
  },
];
