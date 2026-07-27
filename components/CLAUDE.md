# components/

All React components used in the portfolio. Split into top-level feature components and the `ui/` subdirectory of base shadcn-ui primitives.

## Files

### `Navbar.tsx`
Primary navigation component. On `lg+` screens it renders a fixed left sidebar with profile image, name, role, nav links, and social icon links. On mobile it shows a hamburger button that opens a `Sheet` drawer. Takes a `navItems: { label, href }[]` prop (see `lib/site-nav.ts`) — hash-anchor items (`/#ABOUT`) and real routes (`/articles`) are both rendered via `next/link`. Active-state highlighting listens for the custom `sectionchange` event (dispatched by `MainContent`) for anchor sections, and uses `usePathname()` to force-highlight `ARTICLES` whenever the route is under `/articles`.

### `MainContent.tsx`
Main scrollable content area. Renders each portfolio section (`HOME`, `ABOUT`, `MY WORK`, …) as a full-height `<section>`. Uses an `IntersectionObserver` (threshold 0.4) to detect which section is on screen and dispatches a `sectionchange` event so `Navbar` can update its active state. The `HOME` section has a hero background, greeting, and resume download button. The `ABOUT` section has biographical text and company logos.

### `ProjectCard.tsx`
Expandable project card with two visual states:
- **Collapsed** — half-width, 120 px tall, amber background; shows subtitle, title, description, and a "Show more" link button.
- **Expanded** — full width and height; left panel (60 %) shows title, long description, collapsible Features list, collapsible Audience list, collapsible Reference Links list, and a "Show less" button; right panel (40 %) is an image carousel with prev/next buttons and dot indicators.

State is managed with `useState`; the outer `<div>` swaps Tailwind classes for a `transition-all duration-500` animation between states.

### `ArticleCard.tsx`
Server Component card for the Articles list page (`app/articles/page.tsx`). Renders as a `next/link` to `/articles/[id]`, showing the posted date (via `formatArticleDate`), title, and a truncated (`line-clamp-3`) description. Neutral bordered-card style — distinct from `ProjectCard`'s per-item pastel background, since articles have no per-item color data.

### `MarkdownContent.tsx`
Server Component that renders a raw markdown string (an article body) via `react-markdown` + `remark-gfm`, with a custom `components` map so headings, paragraphs, lists, links, code blocks, and GFM tables match the site's existing typography. No `dangerouslySetInnerHTML` — markdown is parsed to real React elements.

### `app-sidebar.tsx`
Documentation-style sidebar used as a secondary navigation pattern. Contains a `VersionSwitcher`, a `SearchForm`, and grouped menu items (Getting Started, Build Your Application, API Reference, Architecture). Not currently wired into the main portfolio layout.

### `search-form.tsx`
Search input field styled for use inside the `app-sidebar`. Wraps a text `<input>` with a `SearchIcon` and `SidebarGroup` layout primitives.

### `version-switcher.tsx`
Dropdown selector that tracks the currently selected documentation version. Uses `DropdownMenu` and `CheckIcon` to indicate the active version. Intended as a companion to `app-sidebar`.

## Subdirectories

- `ui/` — base-layer shadcn-ui components (Button, Input, Sheet, Avatar, etc.). These are building blocks; avoid editing them unless upgrading the design system.
- `shadcn-space/` — self-contained usage examples for shadcn-ui components, used as reference or copy-paste starters.
