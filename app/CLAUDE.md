# app/

Next.js App Router root. Contains the global layout, the main portfolio page, global styles, and sub-routes.

## Files

### `layout.tsx`
Root layout that wraps every page. Loads Google Fonts (Geist Sans, Geist Mono, Playwrite NO), sets SEO metadata (title, description, OpenGraph, Twitter), and applies CSS font variables to the `<html>` and `<body>` elements.

### `page.tsx`
The portfolio home page. Defines the ordered sections array (`HOME`, `ABOUT`, `MY WORK`, etc.) and social links record, then composes `Navbar` and `MainContent` into a responsive flex layout — sidebar visible on `lg+`, hidden on mobile.

### `globals.css`
Global stylesheet. Imports Tailwind CSS v4, `tw-animate-css`, and the shadcn/ui Tailwind preset. Also declares the `--font-main-name` CSS variable used by the custom name font.

## Sub-routes

- `scratchpad/` — isolated playground for developing and testing UI components visually before integrating them into the main portfolio.
