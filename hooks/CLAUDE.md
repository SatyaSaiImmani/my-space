# hooks/

Custom React hooks shared across components.

## Files

### `use-mobile.ts`
Returns `true` when the viewport width is below 768 px (Tailwind's `md` breakpoint), `false` otherwise. Uses `window.matchMedia` with a `change` listener so the value updates live on resize. Initializes as `undefined` during SSR and resolves on first client render. Used by `components/ui/sidebar.tsx` to switch between the Sheet overlay (mobile) and fixed sidebar (desktop) layouts.
