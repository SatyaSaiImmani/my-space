# lib/

Shared utility functions used across the project.

## Files

### `utils.ts`
Exports `cn(...inputs: ClassValue[])` — the standard Tailwind class-merging helper. Combines `clsx` (for conditional and array class values) with `tailwind-merge` (to resolve conflicting Tailwind utilities, e.g. `p-2` vs `p-4`). Import `cn` anywhere a component needs to conditionally apply or merge Tailwind classes.

### `site-nav.ts`
Shared navigation data: `navLinks` (`{ label, href }[]` — a mix of in-page anchors like `/#ABOUT` and real routes like `/articles`) and `socials`. Imported by both `app/page.tsx` and `app/articles/layout.tsx` so the `Navbar` renders identically on every route. Add new nav entries here, not inline in a page.

### `articles.ts`
Article metadata and content-loading for the Articles section. Exports the `ArticleMeta` type, `getArticles()` / `getArticleMeta(id)` (metadata only, no I/O), `getArticleContent(id)` (reads the matching file from `content/articles/` via `fs/promises`), and `formatArticleDate(postedDate)`. To add a new article: drop a `.md` file in `content/articles/` and add one entry to the `articles` array here.
