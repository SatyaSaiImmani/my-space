# app/articles/

Real App Router routes for the Articles section — unlike the rest of the site, these are actual pages, not in-page scroll anchors.

## Files

### `layout.tsx`
Reproduces the same sidebar shell as `app/page.tsx` (`Navbar` + scrollable body), using the shared `navLinks`/`socials` from `lib/site-nav.ts`, so `/articles` and `/articles/[id]` look identical to the rest of the site.

### `page.tsx`
List page. Server Component that reads `getArticles()` from `lib/articles.ts` and renders one `ArticleCard` per article in a responsive grid.

### `[id]/page.tsx`
Detail page. Server Component that looks up the article by `id` (`params` is a `Promise` per Next.js 16 conventions — must be `await`ed), reads its raw markdown via `getArticleContent`, strips the leading `# Title` line (already shown separately as the page `<h1>`), and renders the rest through `MarkdownContent`. Exports `generateStaticParams` (one static page per article) and `generateMetadata` (per-article title/description). Calls `notFound()` for unknown ids.
