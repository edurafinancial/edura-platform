# The Design System: Editorial Precision & Kinetic Warmth

## 1. Overview & Creative North Star: "The Academic Curator"

This design system is built to bridge the gap between high-utility B2B administration and high-engagement student learning. Our Creative North Star is **"The Academic Curator."**

We reject the "generic SaaS" look of stiff grids and heavy borders. Instead, we draw inspiration from high-end editorial journals and modern architectural spacing. We blend the structural logic of Notion (information density and nesting) with the kinetic, rewarding warmth of Duolingo (soft corners and vibrant accents). The result is a UI that feels like a series of physical layers—stacked sheets of fine vellum and frosted glass—designed to reduce cognitive load while maintaining a premium, authoritative presence.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule

Our palette is rooted in a "Warm Minimalist" philosophy. We use color not just for decoration, but as a structural tool to define space without relying on traditional lines.

### The "No-Line" Rule

**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts or tonal transitions.

- **Correct:** A `surface-container-low` card sitting on a `surface` background.

- **Incorrect:** A white card with a #CCCCCC border.

### Surface Hierarchy & Nesting

Treat the UI as a physical stack. Use the `surface-container` tiers to create "nested" depth:

- **Surface (Base):** `#f9f9f6` - The canvas.

- **Surface-Container-Low:** `#f4f4f1` - Secondary content areas or sidebars.

- **Surface-Container-Lowest:** `#ffffff` - Active workspace cards or "floating" interactive elements.

- **Surface-Container-High:** `#e8e8e5` - Subtle wells for data entry or inactive regions.

### The "Glass & Signature" Rules

- **Glassmorphism:** For floating modals or navigation overlays, use semi-transparent `surface` colors (80% opacity) with a `24px` backdrop-blur. This ensures the layout feels integrated and airy.

- **Signature Textures:** For main CTAs or Hero sections, avoid flat fills. Use a subtle linear gradient (135°) transitioning from `primary` (#00685d) to `primary_container` (#008376) to add "visual soul."

---

## 3. Typography: The Editorial Voice

We use a tri-font strategy to balance modern utility with academic prestige.

- **Display & Headline (Epilogue):** Chosen for its geometric confidence. Use `headline-lg` for student achievements and `display-md` for impact-driven data.

- **Title & Body (Plus Jakarta Sans / Outfit):** These provide the "warmth." They are highly legible at small scales (14px-16px) and feel approachable for long-form educational content.

- **Minimal Accents (Playfair Display):** To be used sparingly (e.g., "The Year in Review" or specific pull quotes). This provides the "Premium B2B" feel, signaling authority and history.

- **Data (JetBrains Mono):** Use for all financial figures, account balances, and administrative IDs. The monospaced nature ensures financial tables remain perfectly aligned and scannable.

---

## 4. Elevation & Depth: Tonal Layering

Depth is achieved through **Tonal Layering** rather than structural shadows.

- **The Layering Principle:** To lift an element, move it "up" the surface scale. A `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f4f4f1) background creates a natural, soft lift.

- **Ambient Shadows:** Shadows are reserved for "Active" states (e.g., a card being hovered or a modal). Use extra-diffused values: `0px 20px 40px rgba(26, 28, 27, 0.06)`. The shadow must be tinted with the `on_surface` color to mimic natural light.

- **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline_variant` (#bcc9c6) at **15% opacity**. This creates a hint of a boundary without breaking the soft aesthetic.

---

## 5. Components: Softness & Intent

### Buttons

- **Primary:** `primary` fill with `on_primary` text. Use `rounded-md` (0.75rem). Apply a subtle 2px "press down" effect on active states.

- **Secondary:** `surface-container-high` fill. No border. Soft and integrated.

- **Tertiary:** Text-only in `primary` with a `surface-container-low` background on hover.

### Input Fields

- **Styling:** Use `surface-container-lowest` as the fill.

- **States:** No border by default. On focus, apply a 2px `primary` bottom-border (underline style) or a soft `primary_fixed` glow. Avoid the "box" look.

### Cards & Lists

- **Rule:** Forbid divider lines.

- **Execution:** Use `spacing-6` (1.5rem) or `spacing-8` (2rem) of vertical white space to separate list items. For complex data lists, alternate backgrounds between `surface` and `surface-container-low`.

### Unique Components

- **Progress Arc:** Using the `accent` (#E9C46A), create a soft, thick-stroke (12px) circular progress indicator for students.

- **Administrative "Curator" Pane:** A 2-column layout where the left column is a high-density `surface-container-low` list and the right column is an expansive, clean `surface-container-lowest` workspace.

---

## 6. Do’s and Don’ts

### Do

- **Do** use `spacing-4` (1rem) as your baseline padding for all containers.

- **Do** use `Playfair Display` for very short, high-level headers to add prestige.

- **Do** lean into asymmetrical layouts—place a large hero image slightly off-center to break the "template" feel.

- **Do** ensure all financial data uses `JetBrains Mono` for 100% clarity.

### Don’t

- **Don’t** use a 100% black color (#000000). Always use `on_surface` (#1a1c1b).

- **Don’t** use sharp corners. Our minimum radius is `sm` (0.25rem) and our standard is `md` (0.75rem).

- **Don’t** use standard "drop shadows" with default settings. They must be ambient, tinted, and highly diffused.

- **Don’t** use dividers. If you feel the need to "separate" something, add 16px of whitespace instead.

# Design System Document

This document outlines the core aesthetic and functional principles of our design system, reflecting the current theme.

## Visual Language

### Colors

Our color palette is carefully selected to ensure accessibility, brand recognition, and a harmonious user experience.

- **Primary Color**: `#2A9D8F` - This is our brand's most distinctive color, used for key interactive elements and calls to action.
- **Secondary Color**: `#1B2A4A` - A supporting color for less prominent UI elements, chips, and secondary actions.
- **Tertiary Color**: `#E9C46A` - An additional accent color for highlights, badges, or decorative elements.
- **Neutral Color**: `#FAFAF7` - This serves as our base for backgrounds, surfaces, and non-chromatic elements, providing a clean and understated foundation.

### Typography

We use a distinct set of fonts to establish hierarchy and enhance readability.

- **Headlines**: `Epilogue` - Chosen for its modern and expressive qualities, ideal for drawing attention to headings.
- **Body Text**: `Plus Jakarta Sans` - A highly legible and friendly sans-serif font, perfect for extended reading.
- **Labels**: `Plus Jakarta Sans` - Consistent with body text for clear and concise labels across the UI.

### Roundedness

Our UI elements feature a moderate level of roundedness (2), striking a balance between modern softness and structured clarity. This contributes to a friendly and approachable feel without sacrificing precision.

### Spacing

A normal spacing level (2) is applied throughout the interface, ensuring adequate visual separation between elements while maintaining a cohesive layout. This balance supports readability and user interaction.
