// Static project database for the portfolio.
// Add new projects by appending entries to the `projects` array.
// No server or CMS required — this file is the source of truth.

export interface AudienceItem {
  title: string;
}

export interface ReferenceLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  expandedDescription: string;
  features: string[];
  audience: AudienceItem[];
  referenceLinks: ReferenceLink[];
  images: string[];
  imageAlts?: string[];
  /** CSS color string applied as the collapsed card background, e.g. "#f59e0b" */
  color: string;
}

export const projects: Project[] = [
  {
    id: "rabbit-hole",
    title: "RabbitHole",
    subtitle: "Python / Next.js / FastAPI",
    description:
      "An AI-powered research gap analyzer that automates literature review — reducing weeks of reading to minutes.",
    expandedDescription:
      "Built with FastAPI, Gemini LLMs, and citation graph traversal using embedding similarity and MMR re-ranking. RabbitHole ingests a research topic, maps the citation graph, identifies under-explored connections, and surfaces actionable research gaps — compressing a literature review from weeks to minutes.",
    features: [
      "Citation graph traversal with embedding similarity scoring",
      "MMR re-ranking to surface diverse, non-redundant research gaps",
      "Gemini LLM integration for natural-language gap synthesis",
      "FastAPI backend with async processing",
      "Next.js frontend for interactive exploration",
    ],
    audience: [
      { title: "Academic researchers scoping new projects" },
      { title: "Graduate students conducting literature reviews" },
      { title: "R&D teams identifying whitespace in a domain" },
    ],
    referenceLinks: [
      { label: "GitHub", href: "https://github.com/SatyaSaiImmani/rabbit-hole" },
      { label: "Devpost", href: "https://devpost.com/software/rabbithole-at1pgy" },
    ],
    images: [],
    imageAlts: [],
    color: "#f0fdf4",
  },
  {
    id: "urban-stress",
    title: "Urban Stress Indicator Dashboard",
    subtitle: "Python / Apache Spark / Airflow / AWS",
    description:
      "A data pipeline and analytics dashboard that generates composite urban stress indicators from heterogeneous public datasets.",
    expandedDescription:
      "Engineered a Spark, Airflow, and AWS data pipeline implementing medallion-architecture ETL to process heterogeneous public datasets — crime, transit, housing, noise, and environmental data — into composite urban stress scores. The output powers an analytics dashboard for city planners and researchers.",
    features: [
      "Medallion-architecture ETL (bronze → silver → gold layers)",
      "Apache Spark for distributed data processing at scale",
      "Apache Airflow for pipeline orchestration and scheduling",
      "AWS S3 and Athena for storage and serverless querying",
      "Composite stress score derived from multi-source public datasets",
    ],
    audience: [
      { title: "Urban planners and city government analysts" },
      { title: "Public health and social science researchers" },
      { title: "Data engineers evaluating medallion architecture patterns" },
    ],
    referenceLinks: [
      { label: "GitHub", href: "https://github.com/SatyaSaiImmani/urban-stress-indicator" },
    ],
    images: [],
    imageAlts: [],
    color: "#fefce8",
  },
];
