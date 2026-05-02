@AGENTS.md

# MySpace — Portfolio Site

Personal portfolio for Sri Satya Sai Immani. Built with **Next.js 16.2.4**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui** on Radix UI primitives.

---

## Folder Structure

```
app/                    # App Router pages and global styles
  layout.tsx            # Root layout: fonts, SEO metadata
  page.tsx              # Home page: sections array, social links, Navbar + MainContent
  globals.css           # Tailwind v4 import, tw-animate-css, shadcn preset, CSS vars
  scratchpad/           # Isolated component dev playground (not linked from main nav)
components/             # Feature components
  Navbar.tsx            # Sidebar (desktop) + Sheet drawer (mobile), active-section tracking
  MainContent.tsx       # Scrollable sections with IntersectionObserver
  ProjectCard.tsx       # Expandable project card with carousel
  app-sidebar.tsx       # Docs-style sidebar (not wired to main layout)
  search-form.tsx       # Search input for app-sidebar
  version-switcher.tsx  # Version dropdown for app-sidebar
  ui/                   # shadcn-ui base components — do not edit casually
  shadcn-space/         # Usage examples / copy-paste starters for shadcn components
hooks/
  use-mobile.ts         # useIsMobile() — 768px matchMedia hook
lib/
  utils.ts              # cn() — clsx + tailwind-merge helper
public/                 # Static assets served at /filename (images, icons, SVGs)
```

Each subfolder has its own `CLAUDE.md` with per-file descriptions.

---

## Design Patterns

### Component Model
- **Feature components** live in `components/` (Navbar, MainContent, ProjectCard). They are allowed to hold state, fire effects, and compose `ui/` primitives.
- **Base components** live in `components/ui/`. They are design-system primitives — thin wrappers around Radix UI with CVA variants. Do not add business logic here.
- All interactive components must have `"use client"` at the top. Server components are the default for non-interactive pages.

### Styling
- Use **Tailwind CSS v4** utility classes exclusively. Do not write inline `style` props or add new CSS files.
- Merge conditional classes with `cn()` from `@/lib/utils` — never string-concatenate class names.
- Use **CVA** (`class-variance-authority`) when a component needs multiple visual variants or sizes. See `components/ui/button.tsx` as the reference pattern.
- Tailwind v4 canonical class forms are preferred (e.g. `h-30` not `h-[120px]`, `flex-3` not `flex-[3]`). Accept linter suggestions.
- Dark mode is supported via Tailwind `dark:` variants — keep parity when touching `ui/` components.

### State Management
- Use `useState` / `useEffect` / `useContext` directly. There is no global state library.
- Cross-component communication uses **custom DOM events** (`dispatchEvent` / `addEventListener`) — see the `sectionchange` event between `MainContent` and `Navbar`.
- Persist lightweight UI state (sidebar open/closed) in cookies, not localStorage, to avoid hydration mismatches.

### Responsive Layout
- **Mobile-first**: default styles target mobile; `lg:` breakpoints add desktop behaviour.
- 768 px is the mobile/desktop boundary (`useIsMobile`, Tailwind `md`).
- Navigation pattern: fixed sidebar on `lg+`, `Sheet` drawer on mobile.

### Animations & Transitions
- Use `transition-all duration-{n} ease-in-out` on the wrapper element for geometry changes (expand/collapse).
- Use the `max-h-0` → `max-h-96` pattern for accordion-style content reveals.
- `tw-animate-css` utilities are available for entrance/exit animations.

### Images
- Use `public/` for static assets referenced by path string (carousel images, logos, icons).
- Use `<img>` with `object-cover` inside a sized container for flexible image display. Add `// eslint-disable-next-line @next/next/no-img-element` when the linter flags it.
- Use `next/image` (`<Image>`) only when built-in optimisation (lazy load, srcset, WebP) is explicitly needed.

---

## Security Rules

These rules apply to every code change in this project.

### Links and Navigation
- Every `<a>` that points to an external URL **must** have `target="_blank" rel="noopener noreferrer"` to prevent tab-napping.
- Never construct `href` values by concatenating user-supplied strings — use a static allowlist or validate against a known-safe URL pattern.

### External Content
- Do not render user-supplied or externally fetched strings as HTML (no `dangerouslySetInnerHTML`). If rich text is ever needed, use a sanitiser library.
- Do not embed third-party `<script>` tags or `<iframe>` elements without explicit approval.

### Environment Variables
- API keys, tokens, and secrets must go in `.env.local` (gitignored) and be prefixed `NEXT_PUBLIC_` only if they are intentionally public.
- Never hard-code credentials, tokens, or personal contact details in source files.

### Dependencies
- Do not add new `npm` packages without checking that they are actively maintained and have no known high-severity CVEs (`npm audit`).
- Prefer packages already in the dependency tree (Radix UI, Lucide, clsx, tailwind-merge) over adding new ones for overlapping functionality.

### Input Handling
- This is a static portfolio — there are no forms that POST data today. If a contact form is added, validate and sanitise all inputs server-side before any processing.
- Do not `eval()` or use `new Function()` with any dynamic content.

### Asset Integrity
- Images and SVGs in `public/` are served as-is. Do not place untrusted or third-party SVGs there — SVGs can contain embedded scripts.

---

## Conventions

- **No default exports from `ui/`** — all ui components use named exports.
- **Feature components use default exports** — `export default function Navbar(...)`.
- Keep prop interfaces in the same file as the component (no separate `types.ts` unless shared across 3+ files).
- Do not add comments unless the logic is non-obvious. Code should be self-documenting.
- Do not add error boundaries, fallbacks, or loading states for data that cannot fail (static props, hardcoded arrays).
- The `app/scratchpad/` route is development-only. Do not link to it from the main navigation.
