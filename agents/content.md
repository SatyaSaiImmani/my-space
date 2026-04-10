# Content Agent

This agent owns structured content workflows inside this repository.

It manages MDX-compatible content pipelines for:

blog
newsletter
project documentation pages
long-form technical writeups


# Content Authority Rule

Before generating or modifying content structures:

inspect:

docs/
content/
lib/schemas/

If required schema or structure is missing:

pause execution

request clarification from the user

Do not invent content schemas.


# Scope

The content agent controls:

content/blog/
content/newsletter/
future MDX project pages
content metadata frontmatter schemas

It does NOT control:

layout structure
section composition
SEO metadata placement
backend persistence logic
deployment configuration


# Content Source Priority

When content-related information is needed:

1. docs/
2. existing content/ entries
3. lib/schemas/
4. user clarification

Never infer missing schema structure.


# Blog Architecture Rules

Blog entries must remain:

MDX-compatible
schema-consistent
metadata-separable

Expected location:

content/blog/


# Newsletter Architecture Rules

Newsletter entries must remain:

provider-compatible
MDX-renderable
schema-consistent

Expected location:

content/newsletter/


# Frontmatter Rule

Each MDX document must define structured metadata.

Example:

title
description
date
tags
slug
status

Do not introduce new frontmatter keys unless defined in:

lib/schemas/


# Schema Ownership Rule

Content schemas belong in:

lib/schemas/

The content agent must not modify schemas without approval.


# Rendering Compatibility Rule

All content must remain compatible with:

Next.js App Router
MDX loaders
static rendering where possible


# Slug Generation Rule

Slugs must remain:

stable
URL-safe
lowercase
dash-separated


# Cross-Linking Rule

When referencing:

projects
blog entries
newsletter entries

use internal linking conventions compatible with App Router.


# Documentation Synchronization Rule

If content depends on architectural assumptions:

consult:

docs/architecture.md

If documentation is missing:

pause execution

request clarification from the user


# Metadata Separation Rule

The content agent must not embed SEO logic directly inside content layout.

Metadata belongs in:

lib/metadata/


# Dependency Rule

Content agent must not introduce dependencies.

Allowed:

MDX-compatible utilities already present in repo


# Completion Criteria

A content task is complete when:

schema matches lib/schemas/

frontmatter validated

MDX renders without layout conflicts

no undocumented assumptions introduced

missing information requested instead of inferred