# Portfolio Design System: The Technical Architect

This design system is a comprehensive framework for engineering a high-end, editorial portfolio. It moves away from the "generic dev site" by emphasizing tonal depth, sophisticated typography, and a "No-Line" philosophy. The result is an experience that feels technically credible yet profoundly polished—mimicking the precision of well-written code through intentional whitespace and soft, mature aesthetics.

---

## 1. Creative North Star: "The Editorial Engineer"
The Creative North Star for this system is **The Editorial Engineer**. 

While many engineering portfolios feel cold or overly "techy," this system adopts the high-end clarity of a premium architectural journal. We break the standard template look by using **intentional asymmetry**—offsetting blocks of text against large, empty voids of `surface-container-lowest` (#FFFFFF). We use the contrast between the technical precision of **Inter** and the modern, open character of **Manrope** to signal both logic and creativity.

---

## 2. Colors: Tonal Maturity
The palette is rooted in a soft, "Pastel-Olive" spectrum. It avoids the harshness of pure black and high-vibrancy greens in favor of desaturated, mature tones that suggest experience and stability.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through:
1.  **Background Color Shifts:** Placing a `surface-container-low` (#f4f4f1) block against a `surface` (#faf9f7) background.
2.  **Generous Negative Space:** Using the spacing scale to let elements breathe.
3.  **Tonal Transitions:** Defining the edge of a card through a shift in value, not a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, high-quality paper sheets. 
*   **Base:** `surface` (#faf9f7) for the main body.
*   **Elevated Hero:** `surface-container-lowest` (#ffffff) for high-impact content.
*   **Nested Components:** Use `surface-container` (#edeeec) for code snippets or project descriptions to create a "recessed" look.

### Signature Textures
While we avoid loud gradients, use **Atmospheric Tones** for CTAs. Instead of a flat hex, use a subtle linear gradient from `primary` (#50662b) to `primary_dim` (#455a20) at a 135-degree angle. This adds a "weighted" feel to buttons, making them feel like physical objects rather than flat vectors.

---

## 3. Typography: The Logic of Print
We use two sans-serifs to create a hierarchy of authority. **Manrope** provides a modern, slightly wider stance for high-level headings, while **Inter** brings the "technical credibility" required for body text and documentation.

*   **Display (Manrope):** Large, low-tracking (letter-spacing: -0.02em) headers that command attention. Use `display-lg` for your name/headline.
*   **Body (Inter):** High-readability, optimized for technical descriptions. Use `body-md` for general content.
*   **Labels (Inter Mono/All Caps):** Use `label-md` in all-caps with increased letter-spacing (+0.05em) for category tags (e.g., "FRONTEND", "SYSTEM DESIGN").

---

## 4. Elevation & Depth
In this system, depth is "baked-in" rather than "pasted-on."

*   **The Layering Principle:** Achieve hierarchy by "stacking." For example, a project card (`surface-container-lowest`) sits on a section background (`surface-container-low`). The 12-unit difference in hex value provides all the separation needed.
*   **Ambient Shadows:** Use shadows sparingly. When required for floating elements (like a navigation bar), use a "Whisper Shadow":
    *   `box-shadow: 0 12px 40px rgba(48, 51, 49, 0.05);` (using a tinted `on-surface` color at 5% opacity).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in input fields, use `outline-variant` (#b0b2b0) at **15% opacity**. High-contrast borders are strictly forbidden.

---

## 5. Components

### Buttons
*   **Primary:** Fill `primary` (#50662b) with `on-primary` (#f0ffcf) text. Radius: `md` (0.75rem).
*   **Secondary:** Fill `secondary-container` (#d8e8c9) with `on-secondary-container` (#48563e).
*   **Interaction:** On hover, the primary button should shift to `primary_dim` with a 2px vertical lift.

### Project Cards
*   **Styling:** No borders. Background: `surface-container-highest` (#e1e3e0). 
*   **Constraint:** Forbid the use of divider lines within the card. Use 24px of vertical padding to separate the title from the metadata.

### Code Snippets / Technical Blocks
*   **Container:** `inverse-surface` (#0d0e0e) or `surface-dim` (#d8dad8) for a "dark mode" contrast block within the light theme.
*   **Detail:** Use `primary-fixed-dim` (#c4de95) for syntax highlighting to keep the olive theme consistent even in code.

### Navigation Bar
*   **Style:** A "Floating Island." A centered, pill-shaped container (`radius: full`) using `surface-container-lowest` with a Whisper Shadow. This keeps the edges of the screen clear and emphasizes whitespace.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace the Asymmetric:** Align your text to the left but place your images on a slightly offset grid to create a bespoke, editorial feel.
*   **Use Large Type:** Don't be afraid of `display-lg`. Large, olive-toned type against white space is the core of this identity.
*   **Soft Corners:** Stick strictly to the `md` (0.75rem) and `lg` (1rem) roundedness scale to maintain the "mature" vibe.

### Don’t:
*   **No Dividers:** Never use a `<hr>` or a 1px border to separate sections. Use a background color change from `surface` to `surface-container-low`.
*   **No Neon:** Avoid "Dev Green" (#00FF00). Stick to the Olive tones provided in the tokens.
*   **No Clutter:** If a section feels crowded, double the padding. This system relies on the luxury of space.
*   **No Glassmorphism:** Despite the request for "modern," this system focuses on **Tonal Solidism**. Avoid blurs and transparencies that detract from technical clarity.