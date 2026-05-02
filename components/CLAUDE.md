# components/

All React components used in the portfolio. Split into top-level feature components and the `ui/` subdirectory of base shadcn-ui primitives.

## Files

### `Navbar.tsx`
Primary navigation component. On `lg+` screens it renders a fixed left sidebar with profile image, name, role, section links, and social icon links. On mobile it shows a hamburger button that opens a `Sheet` drawer. Listens for the custom `sectionchange` event (dispatched by `MainContent`) to highlight the currently visible section.

### `MainContent.tsx`
Main scrollable content area. Renders each portfolio section (`HOME`, `ABOUT`, `MY WORK`, …) as a full-height `<section>`. Uses an `IntersectionObserver` (threshold 0.4) to detect which section is on screen and dispatches a `sectionchange` event so `Navbar` can update its active state. The `HOME` section has a hero background, greeting, and resume download button. The `ABOUT` section has biographical text and company logos.

### `ProjectCard.tsx`
Expandable project card with two visual states:
- **Collapsed** — half-width, 120 px tall, amber background; shows subtitle, title, description, and a "Show more" link button.
- **Expanded** — full width and height; left panel (60 %) shows title, long description, collapsible Features list, collapsible Audience list, collapsible Reference Links list, and a "Show less" button; right panel (40 %) is an image carousel with prev/next buttons and dot indicators.

State is managed with `useState`; the outer `<div>` swaps Tailwind classes for a `transition-all duration-500` animation between states.

### `app-sidebar.tsx`
Documentation-style sidebar used as a secondary navigation pattern. Contains a `VersionSwitcher`, a `SearchForm`, and grouped menu items (Getting Started, Build Your Application, API Reference, Architecture). Not currently wired into the main portfolio layout.

### `search-form.tsx`
Search input field styled for use inside the `app-sidebar`. Wraps a text `<input>` with a `SearchIcon` and `SidebarGroup` layout primitives.

### `version-switcher.tsx`
Dropdown selector that tracks the currently selected documentation version. Uses `DropdownMenu` and `CheckIcon` to indicate the active version. Intended as a companion to `app-sidebar`.

## Subdirectories

- `ui/` — base-layer shadcn-ui components (Button, Input, Sheet, Avatar, etc.). These are building blocks; avoid editing them unless upgrading the design system.
- `shadcn-space/` — self-contained usage examples for shadcn-ui components, used as reference or copy-paste starters.
