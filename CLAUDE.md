@AGENTS.md
# CLAUDE.md

This file defines how Claude should operate inside this repository.

It does NOT define implementation plans.

Implementation sequencing lives in:

docs/frontend_*.md
docs/backend_*.md
docs/architecture.md

Agent-specific behavior lives in:

AGENTS.md
agents/frontend.md
agents/backend.md
agents/content.md

# Project Intent

This repository is a modular engineering portfolio site built with:

Next.js App Router
TailwindCSS v4
ShadCN UI
TypeScript strict mode

Primary goals:

clarity
maintainability
extensibility
design-token consistency
metadata-first SEO architecture
Stitch-compatible layout ingestion

Claude must optimize for recruiter readability and architectural cleanliness.

# Operating Principles

Before writing code, Claude must:

1. inspect existing primitives
2. reuse instead of recreate
3. follow directory boundaries
4. avoid layout duplication
5. keep sections modular
6. preserve metadata separation

# Decision Hierarchy

When implementing UI:

components/ui → first choice
components/layout → second choice
components/sections → third choice
new component → last resort

When implementing structure:

prefer composition over nesting

# Stitch Import Policy
If Stitch MCP is available, prefer MCP layout ingestion over manual export pipelines.

Manual Export pipeline;

Stitch exports must never be pasted directly into route files.

Instead:

stitch/html → components/sections
stitch/assets → public/stitch
inline styles → Tailwind tokens
icons → lucide-react

Spacing values must remain exact unless impossible.

# Metadata Policy

Metadata is programmatic.

Never embed SEO-driven text into visible UI.

Metadata definitions belong in:

lib/metadata/

# Styling Policy

Use Tailwind only.

Do not introduce:

CSS modules
styled-components
emotion

Use:

cn() helper from lib/utils.ts

Prefer ShadCN primitives before writing custom UI.

# Section Architecture Policy

Homepage structure must remain section-based.

Sections belong in:

components/sections/

Pages import sections only through:

components/sections/index.ts

# Layout Primitive Policy

Containers, wrappers, and spacing abstractions belong in:

components/layout/

Never duplicate layout wrappers inside pages.

# Asset Policy

Remote assets from Stitch must be downloaded locally:

public/stitch/

Prefer next/image when appropriate.

# Accessibility Policy

Ensure:

semantic heading order
keyboard accessibility
form labeling
Radix compatibility preservation

# Dependency Policy

Do not introduce dependencies unless necessary.

Prefer:

Tailwind utilities
ShadCN primitives
existing helpers

Ask before adding:

state libraries
animation frameworks
ORMs
analytics SDKs

# Component Size Policy

Components larger than ~300 lines should be split.

Prefer server components unless interaction requires client components.

# Timeline Component Constraint

Experience timeline must remain:

vertical
responsive
section-scoped
data-driven

# Blog / Newsletter Constraint

Content rendering must remain MDX-compatible.

Do not hardcode assumptions about content schemas.

# Registry Policy

Sections must be exported through:

components/sections/index.ts

Avoid deep imports from section files.

# Agent Delegation Rule

When task scope is identifiable:

frontend tasks → agents/frontend.md
backend tasks → agents/backend.md
content tasks → agents/content.md

Claude should consult those before acting.

# Design Token Rule

Before modifying layout styling:

consult docs/design-system.md

# Planning Rule

Claude must not invent implementation roadmaps.

Roadmaps belong in:

docs/