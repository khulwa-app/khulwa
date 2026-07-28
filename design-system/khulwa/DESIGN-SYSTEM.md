# Riwaq design system

Riwaq is a focus-performance workspace: dark, private-feeling, crisp, and calm under pressure. It uses
**Tailwind CSS v4** and **DaisyUI v5** only. Product logic and Solar icons remain independent of the
visual system.

## Aubergine Performance

The app uses approximately 70% dark aubergine, 20% plum surfaces, and 10% vibrant amethyst.
`#100817` is the app background, `#20112B` is the main surface, `#2D1740` is elevated surface,
`#6D28D9` is the solid primary action color, `#C56BFF` is the electric amethyst state/accent,
`#D9B6FF` is lilac support, `#A99BB7` is muted text, and `#F7F2FF` is primary text.

Keep gradients confined to artwork, waveforms, and ambient affordances only. Avoid blur-heavy glows,
glass effects, decorative shadows, and anything that makes the app feel visually heavy or choppy.
Primary buttons stay solid `#6D28D9` with accessible light text.

Brain.fm influence is limited to product behavior patterns: selectable mental states, intensity
controls, stronger play-state feedback, and bold but simple session artwork. Do not copy Brain.fm's
identity, layout, or brand language.

## Type and shape

- Nunito for interface type and numeric data; Geist Mono remains available only for technical monospace use.
- Dense but breathable: 8px rhythm, 44px minimum controls.
- Controls use `rounded-control`; panels use `rounded-panel`; application shells use `rounded-shell`.
- Strong headings use normal tracking and high contrast. Avoid squeezed negative tracking.

## Implementation rules

- Theme tokens live in `app/globals.css` as DaisyUI `@plugin` configuration and Tailwind-compatible `sage-*` aliases.
- Shared behavior lives in `components/ui/primitives/`; use those primitives before adding raw component patterns.
- Use semantic DaisyUI classes (`bg-base-100`, `btn-primary`, `toggle`, `drawer` patterns) plus Tailwind layout.
- Every interactive control exposes a label, a visible keyboard focus state, and honors reduced motion.
- Keep product state, persistence, routes, and Solar icon selection intact during visual changes.
