// Static experience database for the portfolio.
// Add new entries by appending to the `experiences` array.
// No server or CMS required — this file is the source of truth.

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  duration: string;
  bullets: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: "cwru-research-assistant",
    company: "Case Western Reserve University",
    location: "Cleveland, OH",
    role: "AI Research Assistant",
    duration: "Jul 2026 – Present",
    bullets: [
      "Building AI solutions for the university using Google's Agent Development Kit (ADK) to design and orchestrate agentic workflows.",
    ],
    logo: "/cwru-logo.png",
  },
  {
    id: "cwru-ai",
    company: "Case Western Reserve University",
    location: "Cleveland, OH",
    role: "Graduate Research Assistant – Generative AI, UTech",
    duration: "Jan 2025 – Jan 2026",
    bullets: [
      "Architected and deployed a multistep RAG pipeline simulating an artificial patient for primary-care consultation training workflows.",
      "Implemented real-time event streaming (SSE) to surface agent orchestration steps, improving observability and debugging of multi-step LLM flows.",
      "Developed an AI news analytics dashboard with an integrated chat interface using AWS and Streamlit, processing 10K+ articles/month.",
      "Built an AI agent for the university library using LangChain, open-source models, and context-aware retrieval with evals, automating ~40% of front-desk queries.",
      "Delivered a radiology report generation workflow using Microsoft Copilot Studio, reducing draft time from 180 to 30 minutes.",
    ],
    logo: "/cwru-logo.png",
  },
  {
    id: "deloitte-fse",
    company: "Deloitte India",
    location: "India",
    role: "Software Analyst – Enterprise Workflow Automation (ServiceNow Platform)",
    duration: "Jul 2022 – Mar 2024",
    bullets: [
      "Developed and maintained HR onboarding workflows serving ~300 employees in the Canada region, implementing backend business logic, background scripts, and automated database updates in JavaScript.",
      "Resolved 150+ production tickets including P1/P2 incidents, enhancements, and defects, participating in production change processes to ensure release stability.",
      "Built the ServiceNow side of a REST integration syncing HR workflow logs from Microsoft Azure into ServiceNow tables, creating a single source of truth for managers and eliminating recurring manual reconciliation work.",
      "Re-engineered an existing Canada HR onboarding workflow for the EMEA region, adapting backend scripts and business rules to region-specific requirements and delivering the workflow end to end.",
      "Led development of a performance analytics dashboard (ServiceNow Performance Analytics) for a 400–500 person org, surfacing ticket-resolution (P1–P4) and certification KPIs used for coaching and training-budget decisions.",
    ],
    logo: "/deloitte-logo.svg",
  },
  {
    id: "deloitte-se",
    company: "Deloitte India",
    location: "India",
    role: "ServiceNow Development Intern",
    duration: "Jan 2022 – Jul 2022",
    bullets: [
      "Trained on the ServiceNow platform with the Canada HR onboarding team, contributing JavaScript workflow scripts and learning enterprise development and change processes; converted to full-time.",
    ],
    logo: "/deloitte-logo.svg",
  },
];
