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
    subtitle: "Python / Next.js / FastAPI / Gemini",
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
  {
    id: "gnn-cwe-classification",
    title: "Multiclass CWE Classification with Graph Neural Networks",
    subtitle: "Python / PyTorch / PyTorch Geometric / SLURM",
    description:
      "An end-to-end GNN pipeline classifying C/C++ vulnerabilities into the top-30 CWE classes from the BigVul dataset.",
    expandedDescription:
      "Built an end-to-end graph neural network pipeline classifying C/C++ vulnerabilities into the top-30 CWE classes using the BigVul dataset. Source code is represented as Inter-Procedural Abstract Graphs and used to train Gated Graph Neural Networks on SLURM-managed GPU clusters, with class-level disparity analysis to surface where the model under-performs.",
    features: [
      "Code-to-graph representation via Inter-Procedural Abstract Graphs",
      "Gated Graph Neural Network architecture for multiclass classification",
      "Training on SLURM-managed GPU clusters for HPC-scale workloads",
      "Class-level disparity analysis across 30 CWE categories",
      "End-to-end pipeline from BigVul dataset ingestion to evaluation",
    ],
    audience: [
      { title: "Security researchers studying vulnerability classification" },
      { title: "ML engineers working with graph-structured code representations" },
      { title: "HPC practitioners benchmarking GNN training at scale" },
    ],
    referenceLinks: [
      { label: "GitHub", href: "https://github.com/SatyaSaiImmani" },
    ],
    images: [],
    imageAlts: [],
    color: "#eff6ff",
  },
  {
    id: "hpc-sorting-benchmark",
    title: "HPC Sorting Algorithm Benchmark",
    subtitle: "C++ / CUDA / SLURM / CMake",
    description:
      "A benchmark suite comparing sorting algorithms across CPU and GPU implementations on an HPC cluster.",
    expandedDescription:
      "Benchmarked comparison-based and non-comparison-based sorting algorithms across CPU and GPU (CUDA) implementations on an HPC cluster, automating dataset generation, SLURM job submission, and performance visualization to compare throughput and scaling behavior.",
    features: [
      "CPU and GPU (CUDA) implementations of comparison and non-comparison sorts",
      "Automated dataset generation across problem sizes",
      "SLURM job scripts for reproducible HPC benchmarking",
      "Performance visualization comparing throughput and scaling",
      "CMake-based build system for cross-platform compilation",
    ],
    audience: [
      { title: "HPC engineers evaluating sorting algorithm performance" },
      { title: "Systems researchers comparing CPU vs. GPU workloads" },
      { title: "Students studying parallel algorithm design" },
    ],
    referenceLinks: [
      { label: "GitHub", href: "https://github.com/SatyaSaiImmani" },
    ],
    images: [],
    imageAlts: [],
    color: "#fdf4ff",
  },
];
