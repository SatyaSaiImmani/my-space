# Frontend Agent

This agent owns all UI architecture inside this repository.

It is responsible for transforming layouts into modular section-based components compatible with:

Next.js App Router
TailwindCSS v4
ShadCN primitives


# Scope

The frontend agent controls:

components/sections/
components/cards/
components/layout/
components/timeline/
components/ui/ (extension only, not duplication)

It does NOT control:

metadata definitions
content/blog
newsletter schemas
backend APIs
deployment configuration


# Primary Responsibilities

The frontend agent must:

convert Stitch exports into reusable section components

compose pages from section registry

maintain Tailwind token fidelity

reuse ShadCN primitives whenever possible

preserve layout hierarchy consistency

ensure responsive behavior across breakpoints


# Section Architecture Model

All homepage layout must follow:

layout primitives
→ sections
→ cards
→ UI atoms

Never bypass this hierarchy.

Never construct large layouts directly inside:

app/page.tsx


# Stitch Import Workflow
# Stitch MCP Integration Rule

If Stitch MCP is available:

prefer direct layout ingestion through MCP instead of file export workflows.

When importing via Stitch MCP:

extract typography scale
extract spacing scale
extract palette tokens

synchronize with:

docs/design-system.md
tailwind.config.ts

Workflow:

Stitch MCP layout
→ section decomposition
→ components/sections/*
→ Tailwind token mapping
→ ShadCN primitive alignment

Fallback workflow (only if MCP unavailable):

stitch/html
→ components/sections/

stitch/assets
→ public/stitch/

When importing from Stitch:

never paste exported HTML directly into route files

instead:

stitch/html
→ components/sections/

stitch/assets
→ public/stitch/

inline CSS
→ Tailwind utilities

icons
→ lucide-react


# Spacing Conversion Rule

Preserve exact spacing values from Stitch exports whenever possible.

Prefer:

px-[value]

instead of rounding to nearest Tailwind scale.


# Typography Rule

Use Tailwind typography tokens.

Do not introduce custom font styles unless defined in:

docs/design-system.md


# Section Registry Rule

All homepage sections must be exported via:

components/sections/index.ts

Pages must import sections from registry only.

Example:

import { Hero } from "@/components/sections"


# Layout Primitive Rule

Reusable layout wrappers belong in:

components/layout/

Examples:

Container
Section
Stack
Grid wrappers

Never duplicate wrappers inside sections.


# Card Component Rule

Reusable structured content blocks belong in:

components/cards/

Examples:

ProjectCard
ExperienceCard
AchievementCard


# Timeline Rule

Timeline UI belongs exclusively in:

components/timeline/

Timeline must remain:

vertical
responsive
data-driven
expandable


# ShadCN Usage Rule

Before writing a custom component:

check components/ui/

If equivalent exists:

reuse it

Do not duplicate primitives.


# Responsive Behavior Rule

Sections must support:

desktop
tablet
mobile

Layouts must collapse gracefully without breakpoint hacks.


# Accessibility Rule

Ensure:

semantic heading order

keyboard navigation compatibility

form labeling

Radix primitive integrity preserved


# Asset Rule

Never load external CDN assets from Stitch exports.

Always relocate:

public/stitch/


# Client Component Rule

Default to server components.

Add:

"use client"

only when interaction requires it.


# Styling Rule

Use Tailwind only.

Do not introduce:

CSS modules
styled-components
emotion


# Dependency Rule

Frontend agent must not introduce dependencies.

Allowed:

Tailwind utilities
ShadCN primitives
existing helpers


# Completion Criteria

A frontend task is complete when:

layout uses section registry

components remain modular

Tailwind tokens remain consistent

ShadCN primitives reused correctly

responsive behavior verified

no raw Stitch HTML remains in routes

# DESIGN.md Authority Rule

Before introducing spacing, typography, or palette values:

inspect:

DESIGN.md

If tokens exist:

reuse them exactly

Do not approximate Tailwind scale values when DESIGN.md defines explicit tokens.

# DESIGN.md Authority Rule

DESIGN.md is the canonical visual specification for this repository.

Before introducing:

colors
spacing
typography
radius values
shadows
component elevation

inspect DESIGN.md first.

If a token exists:

reuse it exactly.

Do not approximate Tailwind defaults when DESIGN.md defines values.