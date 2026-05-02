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
    id: "cwru-ai",
    company: "Case Western Reserve University",
    location: "Cleveland, OH",
    role: "AI Engineer – Generative AI | Utech",
    duration: "Jan 2025 – Jan 2026",
    bullets: [
      "Architected and deployed a RAG pipeline to simulate an artificial patient for primary consultation training workflows.",
      "Implemented real-time event streaming using SSE to monitor orchestration flows, reducing debugging time by 60%.",
      "Developed an AI news analytics dashboard with an integrated chat interface using AWS and Streamlit, processing 10k+ articles/month.",
      "Built an AI agent for the university library that automated 40% of front desk queries using LangChain, Ollama, and context-aware document retrieval.",
      "Orchestrated a Dental Radiology Report generation system reducing draft time from 180 min to 30 min using RAG and GPT OSS models.",
    ],
    logo: "/cwru-logo.png",
  },
  {
    id: "deloitte-fse",
    company: "Deloitte India",
    location: "India",
    role: "Full Stack Software Engineer",
    duration: "Jun 2022 – Mar 2024",
    bullets: [
      "Built Spring Boot microservices for an Employee Performance Analytics platform supporting HR onboarding workflows and regional dashboards across Canada and EMEA.",
      "Implemented LDAP-based identity provisioning and approval automation services integrated with ServiceNow, enabling secure external-user onboarding ensuring 99.99% pipeline uptime.",
      "Engineered an internal LDAP-backed messaging service deployed on containerized EC2 infrastructure behind load balancers to support organization-wide communication workflows.",
      "Designed Airflow pipelines archiving Microsoft Teams metadata to Amazon S3 and developed analytics metrics from ServiceNow datasets powering workforce activity and escalation dashboards used by senior management.",
      "Executed cross-database schema migrations across PostgreSQL, MongoDB, and DynamoDB to support external REST API integrations without breaking existing services.",
    ],
    logo: "/deloitte-logo.svg",
  },
  {
    id: "deloitte-se",
    company: "Deloitte India",
    location: "India",
    role: "Software Engineer",
    duration: "Dec 2021 – Jun 2022",
    bullets: [
      "Resolved production backend incidents involving API failures, data inconsistencies, and service outages, reducing recurring issues by 20% through root-cause analysis and fixes.",
      "Investigated logs, updated queries and configurations, and supported deployment escalations across enterprise applications, improving incident resolution time by 25%.",
      "Used OpenTelemetry distributed tracing to diagnose authentication failures and contributed to release reliability through deployment support within the change management pipeline.",
    ],
    logo: "/deloitte-logo.svg",
  },
];
