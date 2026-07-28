# Riwaq design system

Riwaq is a calm focus workspace: durable, private-feeling, warm, and clear. It uses **Tailwind CSS v4** and
**DaisyUI v5** only. Product logic and Solar icons remain independent of the visual system.

## Sanctuary Dusk

Light-first surfaces create room to think. `Bone #F7F2E8` is the canvas, `Sand #E9DDC8` defines quiet edges,
`Juniper #24473F` carries primary actions, `Sage #7FA08D` supports selection and calm status, and
`Copper #C97952` is reserved for warmth and attention. Night `#101A19` supplies strong text and dark contrast.

No gradients. No glass or blur-heavy layers. No decorative shadows.

## Type and shape

- Instrument Sans for interface type; Geist Mono for timers and numeric data.
- Dense but breathable: 8px rhythm, 44px minimum controls.
- Controls use `rounded-control`; panels use `rounded-panel`; application shells use `rounded-shell`.
- Strong headings use tight tracking; supporting copy remains high-contrast and unhurried.

## Implementation rules

- Theme tokens live in `app/globals.css` as DaisyUI `@plugin` configuration and Tailwind-compatible `sage-*` aliases.
- Shared behavior lives in `components/ui/primitives/`; use those primitives before adding raw component patterns.
- Use semantic DaisyUI classes (`bg-base-100`, `btn-primary`, `toggle`, `drawer` patterns) plus Tailwind layout.
- Every interactive control exposes a label, a visible keyboard focus state, and honors reduced motion.
- Keep product state, persistence, routes, and Solar icon selection intact during visual changes.
