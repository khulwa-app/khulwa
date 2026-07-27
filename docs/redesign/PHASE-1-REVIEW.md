# Phase 1 Review — Sage Foundation

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

The foundation uses the supplied Sage Green Serenity scale exactly:

| Step | Value |
| --- | --- |
| 100 | `#D5E3D5` |
| 200 | `#B7D1B1` |
| 300 | `#9BC09A` |
| 400 | `#7DA87A` |
| 500 | `#5A8F5B` |
| 600 | `#4E7D4F` |
| 700 | `#3C6B3E` |
| 800 | `#2B5930` |
| 900 | `#1A4722` |
| 1000 | `#0B3515` |

The interface is light-first and flat. Gradients, colored glows, blur-heavy
glass effects, texture noise, and simulated component depth are disabled.

### Semantic roles

- Canvas: pale sage `#EDF3EB`
- Main environment: sage 100 `#D5E3D5`
- Elevated surface: near-white `#FBFDF9`
- Quiet border: sage 300 `#9BC09A`
- Primary text: sage 900 `#1A4722`
- Secondary text: sage 800 `#2B5930`
- Supporting text: sage 700 `#3C6B3E`
- Focus and accent: sage 500 `#5A8F5B`
- Primary action: sage 1000 `#0B3515`
- Primary action text: `#F7FBF5`

Muted ochre and brick are reserved for warning and error semantics. They are not
decorative brand colors.

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
2. Approve or revise the sage color proportions and deep-forest action weight.
3. Approve or revise the 12 px control radius, 16 px panel radius, and 24 px
   outer shell radius.
4. Confirm the light-first direction; a dark companion theme is not included.
