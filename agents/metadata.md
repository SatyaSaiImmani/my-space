# Metadata Agent

This agent owns all metadata architecture inside this repository.

It is responsible for maintaining structured, programmatic metadata using the Next.js App Router Metadata API.


# Scope

The metadata agent controls:

lib/metadata/
lib/seo/
route metadata definitions
structured metadata generation
Open Graph metadata
Twitter metadata
canonical URL handling
robots configuration
sitemap configuration (future)

It does NOT control:

visible UI copy
layout composition
content schemas
section structure
backend logic


# Metadata Authority Rule

Before modifying metadata definitions:

inspect:

lib/metadata/
docs/
docs/architecture.md

If metadata structure is missing or undocumented:

pause execution

request clarification from the user

Do not invent metadata schemas.


# Metadata Implementation Standard

Metadata must be implemented using:

metadata object
generateMetadata function

inside App Router routes.

Never use:

next/head

Metadata must remain programmatic and centralized.


# Metadata Location Rule

Route metadata definitions belong in:

lib/metadata/routes.ts

Helper utilities belong in:

lib/seo/


# Layout Metadata Rule

Global metadata must be defined inside:

app/layout.tsx

Page-specific metadata must be defined using:

export const metadata

or

export async function generateMetadata()


# Dynamic Metadata Rule

Use:

generateMetadata()

when metadata depends on:

dynamic routes
MDX content
project entries
blog entries
newsletter entries

Dynamic metadata must remain server-compatible.


# Canonical URL Rule

Every public route must define a canonical URL.

Canonical values must be derived from:

config/site.ts

Do not hardcode canonical base URLs inside route files.


# Open Graph Rule

Each route must define:

title
description
image
url
type

Images must resolve from:

public/


# Twitter Metadata Rule

Each route must define:

twitter:card
twitter:title
twitter:description
twitter:image


# Structured Data Rule

Structured metadata must use JSON-LD.

Allowed schema types:

Person
Article
BlogPosting
Project
WebSite

Schema definitions belong in:

lib/seo/


# Robots Rule

robots configuration belongs in:

app/robots.ts

Do not embed robots directives inside layout files.


# Sitemap Rule

Sitemap definitions belong in:

app/sitemap.ts

Sitemap must include:

homepage
projects
blog entries (future)
newsletter entries (future)


# Metadata Merge Rule

Metadata must follow App Router inheritance model:

root layout metadata
→ nested layout metadata
→ page metadata

Never duplicate metadata across layers.


# Metadata Separation Rule

Metadata must never appear inside JSX layout content.

SEO keywords must not be embedded in visible UI text.


# Performance Rule

Prefer static metadata when possible.

Use dynamic metadata only when required.

Avoid unnecessary runtime metadata generation.


# Dependency Rule

Metadata agent must not introduce dependencies unless approved.

Allowed:

Next.js Metadata API

Optional (with approval):

next-seo


# Documentation Synchronization Rule

If metadata depends on:

site identity
author identity
canonical domain
deployment environment

inspect:

config/site.ts
docs/

If missing:

pause execution

request clarification from the user


# Completion Criteria

A metadata task is complete when:

metadata uses App Router API

canonical URL defined

Open Graph metadata defined

Twitter metadata defined

structured data valid

metadata remains outside JSX

no schema assumptions introduced