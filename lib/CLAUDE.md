# lib/

Shared utility functions used across the project.

## Files

### `utils.ts`
Exports `cn(...inputs: ClassValue[])` — the standard Tailwind class-merging helper. Combines `clsx` (for conditional and array class values) with `tailwind-merge` (to resolve conflicting Tailwind utilities, e.g. `p-2` vs `p-4`). Import `cn` anywhere a component needs to conditionally apply or merge Tailwind classes.
