# components/ui/

Base-layer shadcn-ui components built on Radix UI primitives. These are low-level building blocks consumed by feature components. All components follow the same conventions:

- `"use client"` where interactivity is needed
- `data-slot` attributes for precise CSS targeting
- `cn()` from `@/lib/utils` for conditional class merging
- Class-variance-authority (CVA) for variant/size systems
- Full dark-mode support via Tailwind `dark:` variants

**Do not edit these files** unless upgrading the design system version or patching a bug — changes here affect every component that imports them.

## Files

### `button.tsx`
General-purpose button. Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`. Sizes: `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`. Supports `asChild` for rendering as a different element via Radix `Slot`. Exports `Button` and `buttonVariants`.

### `input.tsx`
Styled `<input>` element with focus ring, disabled state, and file-input styling. Use for all text, email, search, and file inputs.

### `label.tsx`
Radix `Label` primitive with flex layout and `gap-2`. Automatically dims and disables pointer events when its associated control is disabled.

### `sheet.tsx`
Sliding drawer/modal built on Radix `Dialog`. Slides in from `top`, `right`, `bottom`, or `left`. Components: `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose`. The close button (×) can be hidden via `showCloseButton={false}`.

### `avatar.tsx`
User avatar with image and text fallback. Sizes: `sm`, `default`, `lg`. Additional components: `AvatarBadge` (overlaid status indicator), `AvatarGroup` (overlapping stack with negative margins), `AvatarGroupCount` ("+N" overflow label). Exports `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount`.

### `breadcrumb.tsx`
Semantic breadcrumb navigation. Components: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator` (default: `ChevronRight`), `BreadcrumbEllipsis`. Current page receives `aria-current="page"`.

### `dropdown-menu.tsx`
Floating dropdown menu built on Radix `DropdownMenu`. Supports checkbox items, radio groups, submenus, labels, separators, and keyboard shortcut display. Item variant `destructive` is available for delete-style actions. Exports all Radix sub-components re-wrapped with project styling.

### `separator.tsx`
Thin visual divider, horizontal or vertical. Wraps Radix `Separator`; pass `decorative` to hide it from the accessibility tree.

### `sidebar.tsx`
Full-featured collapsible sidebar system. Manages state via React context (`SidebarProvider` / `useSidebar`). Keyboard shortcut `Ctrl+B` / `Cmd+B` toggles open/closed; state is persisted in a `sidebar_state` cookie. On mobile it uses a `Sheet` overlay; on desktop it uses a fixed container. Collapsible modes: `offcanvas`, `icon`, `none`. Variants: `sidebar`, `floating`, `inset`. Exports ~25 sub-components covering every structural layer (provider, shell, header, content, footer, groups, menus, skeletons, tooltips).

### `skeleton.tsx`
Minimal `animate-pulse` placeholder for loading states. Drop in wherever content is being fetched.

### `tooltip.tsx`
Radix `Tooltip` wrapper with an arrow indicator and zoom-in/out animation. Components: `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`. Wrap the app (or a subtree) in `TooltipProvider` before using tooltips.
