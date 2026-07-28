# Phase 1 Review — Sanctuary Dusk Foundation

## Review gate

Phase 1 establishes the new styling stack and visual foundation. It does not
redesign a production feature screen. Review the temporary foundation surface
at:

`http://localhost:3000/redesign/foundation`

Phase 2 must not begin until this foundation is approved or revised.

## Installed stack

- Tailwind CSS 4 with the official PostCSS plugin.
- DaisyUI 5 configured through CSS.
- One custom DaisyUI theme named `khulwa`; built-in themes are disabled.
- The modern browser target recommended by DaisyUI for Next.js Turbopack.

Chakra UI and Emotion remain installed only to keep existing routes operational
during the staged migration. Their providers, theme setup, recipes, generated
types, packages, and scripts will be removed in the final cleanup phase.

## Approved color direction

The foundation now uses Sanctuary Dusk. Legacy `sage-*` Tailwind utility names
remain only as a migration-safe implementation detail; their semantic values
are mapped to the approved palette below.

| Step | Value |
| --- | --- |
| Bone | `#F7F2E8` |
| Sand | `#E9DDC8` |
| Field | `#D7C7B0` |
| Mist | `#A7B7A1` |
| Sage | `#7FA08D` |
| Deep sage | `#5C7C6E` |
| Canopy | `#3D5F53` |
| Juniper | `#24473F` |
| Deep juniper | `#182D29` |
| Night | `#101A19` |

The interface is light-first and flat. Gradients, colored glows, blur-heavy
glass effects, texture noise, and simulated component depth are disabled.

### Semantic roles

- Canvas: bone `#F7F2E8`
- Main environment: warm near-white `#FFFDF9`
- Elevated surface: warm near-white `#FFFDF9`
- Quiet border and field: sand `#E9DDC8`
- Primary text and action: juniper `#24473F`
- Strongest text: night `#101A19`
- Supporting text: canopy `#3D5F53`
- Selected and calm progress: sage `#7FA08D`
- Rare meaningful highlight: copper `#C97952`

Copper is not a decorative brand colour. It remains reserved for a meaningful,
rare highlight; warning and error semantics retain their dedicated tones.

## Typography

- Interface and display: Instrument Sans.
- Timer, streak, and statistics: Geist Mono with tabular numbers and slashed
  zeroes.
- Body: 400.
- Controls: 500.
- Section headings: 600.
- Large emphasis is reserved for the focus timer and one page-level statement.

Nunito remains available only for the existing Chakra screens during migration.
It is excluded from the new foundation and will leave with Chakra.

## Coexistence safeguard

Tailwind and Chakra both use named CSS cascade layers. A shared layer order is
declared before Tailwind is imported so DaisyUI components and Tailwind
utilities reliably outrank the temporary Chakra reset without using `!important`.
This keeps the migration reversible and prevents styling bugs on each converted
screen.

## Validation

- Next.js 16.2.5 with Turbopack compiles the Tailwind and DaisyUI stylesheet.
- The custom theme is the only DaisyUI theme emitted.
- The review route renders at 375 px and 1440 px without horizontal overflow.
- Instrument Sans, Geist Mono, the primary DaisyUI button, input, badge, and
  progress treatment render from the compiled CSS.
- Existing feature modules were not redesigned in this phase.
- Gradients are absent from the authored foundation.

## Review decisions

1. Approve or revise Instrument Sans + Geist Mono.
2. Approve or revise the Sanctuary Dusk color proportions and juniper action weight.
3. Approve or revise the 14 px control radius, 20 px panel radius, and 28 px
   outer shell radius.
4. Confirm the light-first direction; a dark companion theme is not included.
