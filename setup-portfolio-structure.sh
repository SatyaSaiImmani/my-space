#!/usr/bin/env bash

set -e

echo "Creating scalable portfolio project structure..."

mkdir -p \
app/\(marketing\)/{components,sections} \
app/\(content\)/blog \
app/\(content\)/newsletter \
app/contact \
app/projects \
components/{ui,layout,timeline,cards,forms,icons,sections} \
lib/{seo,metadata,utils,constants,schemas} \
content/{blog,newsletter} \
styles \
hooks \
public/{images,avatars,icons} \
config \
docs \
agents

touch \
app/layout.tsx \
app/page.tsx \
app/contact/page.tsx \
app/projects/page.tsx \
components/layout/Navbar.tsx \
components/layout/Footer.tsx \
components/layout/Container.tsx \
components/layout/Section.tsx \
lib/metadata/site.ts \
lib/metadata/seo.ts \
lib/utils/cn.ts \
config/site.ts \
docs/architecture.md \
agents/frontend.md \
agents/backend.md \
agents/content.md

echo "Portfolio structure created successfully."
