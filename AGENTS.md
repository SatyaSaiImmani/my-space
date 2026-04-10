<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# AGENTS.md

This file defines global coordination rules for all agents operating in this repository.

Agent-specific implementation behavior must remain inside:

agents/frontend.md
agents/backend.md
agents/content.md
agents/metadata.md (if introduced later)
agents/infrastructure.md (optional future)

Global behavioral constraints are defined in:

CLAUDE.md

Implementation sequencing belongs in:

docs/frontend_v1_plan.md
docs/architecture.md


# Agent Model

Agents operate using domain routing.

Each task must be handled by exactly one primary agent unless collaboration is required.

Routing rules:

UI layout tasks → frontend agent
metadata tasks → metadata agent
API or storage tasks → backend agent
MDX/blog/newsletter tasks → content agent
deployment/runtime tasks → infrastructure agent


# Agent Responsibilities Boundary Rule

AGENTS.md defines:

routing
coordination
precedence
handoff rules
conflict resolution

AGENTS.md does NOT define:

implementation logic
component rules
styling strategy
metadata schemas
content pipelines

Those belong inside agent-specific files.


# Collaboration Model

If a task crosses domains:

primary agent executes
secondary agent supports

Example:

Frontend agent imports a Stitch section
→ metadata agent attaches metadata

Content agent introduces blog schema
→ metadata agent attaches route metadata


# Precedence Order

If instruction conflicts occur:

1. CLAUDE.md
2. AGENTS.md
3. docs/architecture.md
4. agent-specific files
5. implementation plan documents


# Section Registry Rule

Frontend agent owns section registration.

All homepage sections must be exported through:

components/sections/index.ts

Pages must import sections only from the registry.


# Metadata Ownership Rule

Metadata agent owns:

lib/metadata/
lib/seo/

Other agents must not modify metadata directly.


# Dependency Introduction Rule

Only backend or infrastructure agents may introduce dependencies.

Frontend agent must reuse:

Tailwind
ShadCN
existing utilities


# Stitch Import Ownership Rule

Frontend agent owns Stitch ingestion workflow.

Other agents must not modify:

stitch/
public/stitch/


# Content Directory Ownership Rule

Content agent owns:

content/blog
content/newsletter


# Backend Extension Rule

Backend agent introduces APIs only when required by:

contact workflows
newsletter persistence
analytics-safe ingestion
future integrations


# Infrastructure Rule

Infrastructure agent validates:

runtime compatibility
deployment readiness
environment variable usage

before backend features are finalized.


# Planning Rule

Agents must not create implementation plans.

Plans belong in:

docs/

# Documentation Lookup Rule

Before making structural decisions, agents must inspect:

docs/

If required information is not present:

pause execution

request clarification from the user

Agents must not invent undocumented schemas, structures, or assumptions.