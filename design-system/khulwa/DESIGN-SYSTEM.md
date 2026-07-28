# Riwaq design system

Riwaq is a focus-performance workspace: dark, precise, private, and calm under pressure. The interface
should feel like a serious tool for entering and sustaining a mental state, not a decorative wellness app.

The implementation uses **Tailwind CSS v4** and **DaisyUI v5** only. Keep product logic, persistence,
routes, and Solar icons independent from visual styling.

## Direction

Riwaq uses a dark aubergine system with restrained amethyst state color.

| Role | Token | Hex | Use |
| --- | --- | --- | --- |
| Background | `--riwaq-background` | `#100817` | Full app canvas, screen background |
| Surface | `--riwaq-surface` | `#20112B` | Panels, cards, inputs, dock buttons |
| Elevated | `--riwaq-elevated` | `#2D1740` | Active rows, hover, selected containers |
| Border | `--riwaq-border` | `#3A1C54` | Default outlines and dividers |
| Strong border | `--riwaq-border-strong` | `#4B1C8F` | Active boundaries and important panels |
| Primary | `--riwaq-primary` | `#6D28D9` | Solid CTA/action, active navigation |
| Primary hover | `--riwaq-primary-hover` | `#7C3AED` | Hover on primary actions |
| Amethyst | `--riwaq-amethyst` | `#C56BFF` | Focus rings, play indicators, data accents |
| Lilac | `--riwaq-lilac` | `#D9B6FF` | Supporting highlighted text |
| Muted | `--riwaq-muted` | `#A99BB7` | Secondary labels and helper copy |
| Text | `--riwaq-text` | `#F7F2FF` | Main readable text |

Use approximately **70% background**, **20% plum surfaces**, **10% vibrant amethyst**. The app should
read dark first, not purple first.

## Non-Negotiables

- No Chakra UI and no Chakra setup.
- No glassmorphism, blur-heavy panels, decorative shadows, or glow-heavy backgrounds.
- Gradients are allowed only inside artwork, waveform previews, or subtle ambient indicators.
- Primary buttons stay solid `#6D28D9` with light text.
- Do not copy Brain.fm. Borrow only product patterns: mental states, intensity, stronger play feedback.
- Avoid negative letter spacing in live app text.
- Use Solar icons consistently; do not use emoji as structural icons.

## Typography

Nunito is the app font. It should be used for interface text and numeric data so the app feels human
without becoming childish. Geist Mono remains available for rare technical monospace labels only.

| Style | Class Direction | Use |
| --- | --- | --- |
| Display | `font-bold`, `tracking-normal`, tight line height | Home greeting, focus timer |
| Section title | `text-base/text-xl`, `font-bold`, `tracking-normal` | Panels, cards, settings |
| Body | `text-sm/base`, `leading-6/7`, regular or semibold | Task copy, helper text |
| Metadata | `text-xs`, `font-bold`, muted color | ETA, counters, labels |

Text must sit on one of three colors: `#F7F2FF`, `#D9B6FF`, or `#A99BB7`. Do not introduce random gray.

## Surface Rules

| Level | Visual | Use |
| --- | --- | --- |
| Canvas | `#100817` | App background |
| Surface | `#20112B` with `#3A1C54` border | Normal panels, inputs, task rows |
| Elevated | `#2D1740` with `#4B1C8F` border | Hover, selected, active row |
| Primary | `#6D28D9` solid | Main action, active nav, selected tab |

Do not place a surface inside another card unless it has a clear job: row, input, repeated item, or modal.
Panels should be compact, anchored close to dock buttons, and should not use a black backdrop.

## Components

### Buttons

- Primary: solid amethyst, light text, bold label.
- Secondary: elevated plum with strong border.
- Quiet: transparent until hover.
- Icon buttons must be at least 44px when they are standalone controls.
- Disabled state uses opacity and disabled semantics.

### Inputs

- Background is surface.
- Border is default border.
- Focus border/ring is amethyst.
- Placeholder text uses muted.
- Labels are visible; no placeholder-only labels.

### Panels

- Floating panels: surface background, strong border, compact header, no backdrop.
- Full modal/dialog: only use scrim when the background must be isolated.
- Headers use normal tracking and bold type.
- Lists inside panels use dense 8px spacing.

### Dock

- Inactive: dark background, muted icon, border.
- Active: solid primary fill, light icon.
- Playing state: small lilac/amethyst dot.
- Keep panels close to the triggering button.

### Task Rows

- Minimum row height: 44px.
- Checkbox, text, meta, and actions align on the center line.
- Active task uses elevated surface plus primary border.
- Inline edit should feel quiet: no large edit box unless multiline editing is introduced deliberately.

### Ambient And Focus

- Mental states are selectable pills/cards.
- Intensity is a real slider and must affect persisted state.
- Play state needs visible feedback through filled controls and active cards.
- Waveform/artwork can use restrained accent, but never heavy glow.

## Motion

Motion is minimal and functional.

- Duration: 150-220ms for hover and state changes.
- Respect `motion-reduce`.
- Do not animate width/height for layout-heavy surfaces.
- No decorative infinite animations.

## Implementation

- Core tokens live in `app/globals.css`.
- Use the `riwaq-*` semantic tokens/classes for new design work.
- Existing `sage-*` utility aliases map to Riwaq colors only to avoid a huge one-shot rewrite.
- Shared primitives live in `components/ui/primitives/`; use them before writing raw Tailwind controls.
- Page-specific exceptions must be documented here before being repeated.

## Quality Checklist

- Contrast is readable in dark mode.
- All interactive controls have labels and keyboard focus.
- No clipped text in panels or buttons.
- No random hex colors in feature code unless they are chart swatches.
- No new component invents its own radius, border, or hover treatment.
- The screen should still look premium with all ambient artwork disabled.
