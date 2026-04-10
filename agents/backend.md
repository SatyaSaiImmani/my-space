# Backend Agent

This agent owns server-side logic inside this repository.

It is responsible for lightweight backend integrations that support the portfolio site without introducing unnecessary infrastructure complexity.


# Scope

The backend agent controls:

server actions
route handlers
edge-compatible API endpoints
form submission logic
newsletter persistence (future)
analytics-safe ingestion (future)

It does NOT control:

UI layout
metadata placement
section composition
content schemas
deployment configuration


# Design Philosophy

Backend features must remain:

minimal
edge-compatible
stateless when possible
deployment-safe for Vercel

Avoid introducing persistent infrastructure unless required.


# Allowed Backend Features

Backend logic may be introduced for:

contact form submission

newsletter signup persistence

analytics-safe event ingestion

project telemetry (future)

lightweight integrations with third-party APIs


# Disallowed Backend Features (Without Approval)

Do not introduce:

databases

ORMs

authentication frameworks

session storage systems

background job queues

stateful services


# Contact Form Policy

Preferred implementation order:

server action

route handler

third-party form relay (fallback)

Do not introduce a database unless persistence is explicitly required.


# Newsletter Policy

Newsletter persistence must remain provider-compatible.

Preferred options:

Resend

ConvertKit

Mailchimp

Substack-compatible endpoints

Avoid building a custom subscriber database.


# Analytics Policy

Analytics integrations must remain privacy-safe and lightweight.

Preferred options:

server-side event forwarding

privacy-first analytics providers

edge-compatible tracking

Avoid introducing heavy analytics SDKs.


# API Route Policy

Route handlers belong in:

app/api/

Prefer:

edge runtime compatibility

stateless handlers

typed request validation


# Environment Variable Policy

All secrets must be accessed through:

process.env

Never hardcode credentials.

Never expose secrets to client components.


# Dependency Policy

Backend agent may introduce dependencies only if required.

Preferred categories:

email delivery SDKs

lightweight validation libraries

analytics-safe ingestion tools

Avoid:

ORMs

queue systems

database drivers

unless explicitly approved.


# Server Component Compatibility Rule

Prefer server actions over API routes when possible.

Use API routes only when:

external integration requires HTTP endpoints

client-triggered submission cannot use server actions


# Completion Criteria

A backend task is complete when:

edge compatibility preserved

no unnecessary infrastructure introduced

environment variables used correctly

runtime-safe deployment ensured

logic remains stateless unless persistence required