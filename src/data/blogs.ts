export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  icon: string;
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'brenda',
    title: 'Building Brenda: 50,000 Lines of Code to Rethink Freelancing',
    excerpt: 'What happens when you spend your entire final year trying to build a platform that could genuinely compete with Upwork? You end up with 50,000+ lines of TypeScript and a project called Brenda.',
    date: 'July 2025',
    readTime: '5 min read',
    icon: '🚀',
    category: 'Full-Stack',
    content: `Every freelancing platform I'd used felt like it was designed in 2012 and never updated. Job matching was keyword-based and dumb. Communication was clunky. And if you wanted any kind of workflow automation — you were out of luck. I wanted to build a marketplace that felt modern: AI-native, real-time, and genuinely helpful.

Brenda is a full-stack TypeScript application built on React and Node.js, with PostgreSQL as the backbone and Prisma as the ORM. Choosing Prisma was deliberate — its type-safe queries and migration system made managing a complex relational schema significantly less painful. The frontend is styled with Tailwind CSS and animated with Framer Motion, giving it that polished, fluid feel.

The real architectural bets were on two things: Gemini AI for intelligent features, and Socket.IO for anything real-time.

🤖 AI-Powered Job Matching — Instead of basic keyword search, I integrated Google's Gemini AI to analyze freelancer profiles and job descriptions semantically. It considers skills, experience level, portfolio work, and past project history to surface matches that actually make sense.

💬 Real-Time Messaging — Built on Socket.IO, the chat system supports instant messaging with typing indicators, read receipts, and online presence.

⚡ 8 Workflow Automation Types — Users can configure automations for proposal submissions, milestone tracking, deadline reminders, payment triggers, status updates, review requests, contract renewals, and notification routing. Each automation type has its own trigger-action pipeline.

The hardest problem was designing a system flexible enough to handle 8 distinct automation types while keeping the data model clean. I ended up building a generic automation engine with a plugin-like architecture: each automation type registers its own trigger conditions and action handlers, but they all flow through a unified execution pipeline.

Key takeaway: 50,000 lines teaches you discipline. At that scale, architectural decisions made in week one haunt you in month six. I learned to think in systems, not features.`,
  },
  {
    id: 'logiquote',
    title: 'LogiQuote AI: Teaching 7 AI Models to Read Messy Shipping Emails',
    excerpt: 'A freight forwarder sends a casual email with 20+ data points your ERP needs. Multiply that by hundreds daily, and you have a data entry nightmare. LogiQuote AI solves it in under 2 seconds.',
    date: 'July 2025',
    readTime: '5 min read',
    icon: '📦',
    category: 'AI/ML',
    content: `The logistics industry runs on email. Rate requests, booking confirmations, cargo specifications — they all arrive as unstructured text in wildly different formats. Every operations team I spoke with had the same pain: someone manually reads these emails, extracts the relevant fields, and punches them into their ERP system.

The most interesting architectural decision was not locking into a single AI provider. I engineered a multi-provider LLM orchestration layer that supports 7 different AI backends: Groq, OpenAI, Anthropic, Gemini, NVIDIA NIM, and Ollama. Each provider is wrapped behind a unified interface, and the system supports hot-swappable model switching.

Why 7 backends? Cloud LLMs go down. Rate limits hit. Some models are better at certain extraction tasks. And for companies with data sovereignty concerns, the Ollama integration means the entire pipeline can run locally.

The pipeline is built with Next.js and TypeScript, with Zod serving as the schema validation backbone. I defined strict Zod schemas for 20+ logistics fields (origin port, destination, Incoterms, container type, hazmat classification, and more). The LLM output is parsed and validated against these schemas in real-time.

The trickiest part wasn't the LLM calls — it was getting reliable structured output. LLMs hallucinate field names, swap date formats, and occasionally invent port codes. My solution was a layered validation approach: Zod schemas enforce structural correctness, custom refinements handle domain-specific rules, and a confidence scoring system flags extractions that need human review.

The full pipeline — email parsing, LLM inference, schema validation, and structured output — completes in under 2 seconds. With Groq's inference speed, some extractions finish in under 500ms.

Key takeaway: Provider diversity is a feature, not complexity. Supporting multiple LLM backends isn't over-engineering — it's insurance against outages, cost spikes, and performance variability.`,
  },
  {
    id: 'open-bi',
    title: 'Open BI — Teaching AI to Design Power BI Dashboards',
    excerpt: 'What if your AI coding assistant could design an entire Power BI dashboard — not just suggest code, but actually generate the layout, pick the visuals, and make sure nothing overlaps?',
    date: 'July 2025',
    readTime: '5 min read',
    icon: '📊',
    category: 'Tools',
    content: `Power BI is incredibly powerful, but building reports is still a manual, visual-first process. You open the desktop app, drag visuals onto a canvas, tweak positions pixel by pixel, and hope your layout doesn't turn into a cluttered mess. There's no programmatic way to generate report layouts at scale.

Meanwhile, the Model Context Protocol (MCP) — the emerging standard for connecting AI assistants to tools — was opening up an entirely new paradigm. I saw the opportunity: what if I could make Power BI speakable to AI?

Open BI is a local-first MCP server built on Node.js that communicates via JSON-RPC. It speaks the MCP protocol natively, meaning any compatible AI assistant can invoke its tools as naturally as calling a function. Under the hood, it parses and generates PBIR (Power BI Enhanced Report format).

For the data modeling side, I built a TMDL parser that lets the server understand and manipulate Power BI's tabular models, including DAX measures and calculated columns.

Key features include 31+ native visual types, a layout collision auditing system that detects bounding-box collisions across the canvas, modern style presets (glassmorphism, darkMinimal, neonGradient), and DevOps snapshots with report diffing for true version control.

The hardest problem was layout intelligence. Generating visuals is easy; generating visuals that make spatial sense on a fixed-dimension canvas is hard. I solved this by building a constraint-based layout engine that assigns default sizing per visual type, respects a configurable grid system, and runs collision detection as a post-processing step.

Key takeaway: MCP is a game-changer for developer tools. By building on the Model Context Protocol, Open BI doesn't need its own UI — every MCP-compatible AI assistant becomes the interface.`,
  },
  {
    id: 'atash',
    title: 'Building Atash — A Dating Platform to Help Save My Community',
    excerpt: 'There are fewer than 100,000 Parsis left on Earth. I\u0027m one of them. So I built a premium dating platform designed exclusively for the global Parsi community.',
    date: 'July 2025',
    readTime: '5 min read',
    icon: '🔥',
    category: 'Full-Stack',
    content: `There are fewer than 100,000 Parsis left on Earth. I'm one of them. That number has been declining for decades, and it's a reality that sits in the back of my mind every time I'm at a community gathering where the crowd feels a little thinner than last year. So I built something my people actually need.

Atash (named after the Zoroastrian sacred fire) is a premium dating and matchmaking platform designed exclusively for the global Parsi community. Most mainstream dating apps treat cultural identity as a filter checkbox. But for a community as small as ours, the problem isn't just finding someone — it's finding someone who understands the weight of preserving something beautiful.

I built Atash on Next.js with Tailwind CSS v4 and Framer Motion for a fluid, immersive swipe-based interface. The backend runs on Supabase, giving me real-time capabilities out of the box. The decision to go with Supabase over a custom backend was deliberate — for a community this small, I needed something that could scale down gracefully.

The proprietary quiz-based compatibility system digs into shared values, religious observance levels, lifestyle preferences, and family traditions. It asks the questions that matter — things like dietary practices, views on interfaith marriage, and connection to Zoroastrian rituals.

Atash uses a voucher-based invite-only membership system. Existing members invite new ones — keeping the community trusted, the environment safe, and preventing the platform from becoming another open-registration free-for-all.

The biggest challenge wasn't the code — it was the compatibility algorithm design. How do you quantify cultural compatibility without being reductive? I spent weeks talking to Parsis across generations to understand what actually matters in matchmaking. The quiz system went through four iterations before it felt right.

Key takeaway: Technology can serve cultural preservation — not every app needs to disrupt an industry. Sometimes the most impactful thing you can build is something that helps a small community hold on to what makes them unique.`,
  },
  {
    id: 'outlook-router',
    title: 'An AI System That Manages My Inbox With Zero Human Intervention',
    excerpt: 'The average knowledge worker spends 28% of their workday managing email. At Orange Business Services, I built an autonomous routing system that makes the inbox manage itself.',
    date: 'July 2025',
    readTime: '5 min read',
    icon: '📧',
    category: 'AI/ML',
    content: `The average knowledge worker spends 28% of their workday managing email. At Orange Business Services, I watched this inefficiency play out across an entire enterprise — hundreds of employees drowning in inbox noise. I decided to build a system that would make the inbox manage itself.

The architecture is a Python + FastAPI backend connected to Microsoft Outlook via the Graph API, with a React frontend for monitoring and override controls. I made a deliberate decision to use local LLMs instead of cloud-based APIs. In an enterprise environment, sending email content to third-party cloud endpoints is a non-starter. Local inference keeps every byte of sensitive corporate communication within the company's infrastructure.

The system implements four distinct AI-driven workflows:

Automatic Email Categorization — The LLM classifies incoming emails by intent (action required, informational, scheduling, escalation) and routes them into appropriate Outlook folders with priority flags.

Calendar Conflict Resolution — When a meeting request arrives, the system cross-references the user's calendar, detects conflicts, and drafts resolution proposals with alternative time slots.

Action Item Extraction — Long email threads get parsed for concrete action items, which are automatically created as Outlook Tasks with inferred deadlines and assignees.

Context-Aware Reply Drafts — For emails requiring a response, the system generates drafts that account for thread history, the sender's relationship, and the email's intent.

The biggest challenge was making local LLMs consistent enough to be trusted in an autonomous pipeline. I solved this with strict output schema validation at every stage — if the LLM's response didn't conform, the system retried with a reformulated prompt before falling back to rule-based logic.

Key takeaway: Local LLMs are enterprise-ready — with the right validation layer, you can build production-grade AI tools that never leak sensitive data to third-party APIs.`,
  },
  {
    id: 'anime-ai',
    title: 'I Built 10+ AI Apps Where Anime Characters Argue and Judge Each Other',
    excerpt: 'What happens when you combine a lifelong obsession with anime and a deep curiosity about agentic AI? You build a suite where Naruto debates philosophy with Goku.',
    date: 'July 2025',
    readTime: '5 min read',
    icon: '🎌',
    category: 'AI/ML',
    content: `Most agentic AI demos feel sterile. You see a "travel planner agent" or a "research assistant" — functional but soulless. I wanted to explore multi-agent simulation in a way that was actually fun. Anime characters — with their deeply defined personalities, core philosophies, and emotional signatures — turned out to be the perfect testbed. Each character is essentially a walking system prompt.

The suite is built on Python and FastAPI on the backend, with a Tailwind CSS frontend. LLM calls are routed through LangChain and Ollama for local inference, with OpenAI as a fallback.

The heart of the system is a Dynamic Prompt Engine — a custom compiler that parses character definitions from structured Markdown tables and translates them into rich system prompts. Each character's archetype, MBTI type, core emotion, personality profile, and unique philosophy get injected into a template with strict constraints.

The agents implement a ReAct (Reason + Act) loop, running up to 5 iterations of thinking, tool selection, execution, and observation before producing a final in-character response.

What started as a CLI experiment became 10+ distinct applications: Council AI (moderated panel debates), Group Chat (Discord-like multi-agent chatroom), Debate Arena & Courtroom AI (adversarial simulations), Detective Agency (collaborative mystery-solving), Power Scaler, Matchmaker, Scenario Ranker, Team Builder, and World Simulator.

The biggest engineering challenge was persona consistency at scale. When four agents with strong personalities debate a nuanced topic, LLMs love to homogenize. My solution was a three-layer constraint system: character-specific system prompts with hard personality rails, a ModeratorAgent that evaluates engagement metrics and re-injects context, and a history windowing strategy for focused memory.

Key takeaway: Passion projects are the best classrooms. I internalized ReAct loops, multi-agent orchestration, and prompt engineering patterns because I cared about making Goku sound like Goku. Intrinsic motivation beats any curriculum.`,
  },
];
