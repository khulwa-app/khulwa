# Khulwa — Design System

A portable reference to Khulwa's **implemented** design system (Chakra UI v3, `client/theme/`). Hand this to any AI tool to generate on-brand UI. Source of truth is the code; this mirrors it.

> **Identity.** Khulwa (خَلوة, *sacred solitude*) is a **dark-only, calm deep-work** app — a warm "obsidian" room with **champagne-gold** brand accents and **sage** highlights, where translucent **glass chrome** floats over photographic "spaces." Bilingual (AR/EN, RTL-aware). Quiet by design: minimal color, generous calm, restrained motion.

---

## 0. Core principles (the ethos)

1. **Dark-only, warm.** One theme. Backgrounds are warm near-black (`#15120E`), never cold gray. A static `dark` class on `<html>` activates Chakra's `_dark` condition so built-in recipes resolve dark values.
2. **Tokens only — no hardcoded styles in TSX.** No raw hex, no inline font stacks, no magic `px`. Everything routes through tokens / semantic-tokens / text-styles / layer-styles / recipes / slot-recipes. Run `yarn typegen` after any theme change.
3. **Glass chrome over photo spaces.** Floating UI (dock, pills, cards, panels) shares one **glass** material; the scene (a photographic background) stays visible behind it.
4. **One thing at a time.** The product centers a single focus task; UI favors calm-at-rest, reveal-on-demand (hover-reveal actions, progressive disclosure).
5. **Quiet motion.** 150–300ms, transform/opacity only, `prefers-reduced-motion` respected. No continuous/ambient animation — the one exception is the AI action chip.
6. **Bilingual & RTL.** Arabic + English; Arabic display type (Amiri) for Qur'anic verses.
7. **SVG icons only** (lucide-react, stroke 2.25). No emoji as structural icons.
8. `cssVarsPrefix: "khulwa"` → CSS vars like `var(--khulwa-colors-primary-default)`.

---

## 1. Color palette (current — champagne gold + sage)

Components consume **semantic tokens** (`semantic-tokens/colors.ts`), which is the authoritative palette. Dark-only: every token resolves to its single dark value.

### Backgrounds & surfaces
| Token | Hex | Use |
|---|---|---|
| `bg.base` / `bg.DEFAULT` | `#15120E` | App background (warm obsidian) |
| `bg.elevated` / `bg.panel` / `bg.muted` | `#1E1A14` | Cards, panels, raised surfaces |
| `bg.sunken` | `#0F0C0A` | Wells / inset areas |
| `bg.subtle` | `#1A1610` | Subtle fills |
| `bg.emphasized` | `#28231B` | Emphasized fills |
| `bg.inverse` / `bg.inverted` | `#F3ECDD` | Inverted (light) surfaces |
| `surface.card` | `#1E1A14` | Card surface |
| `surface.muted` | `#1A1610` | Hover/quiet surface |

### Foreground (text/icons)
| Token | Hex | Use |
|---|---|---|
| `fg.default` | `#F3ECDD` | Primary text |
| `fg.muted` | `#A99C85` | Secondary text |
| `fg.subtle` | `#6F6453` | Tertiary / placeholder |
| `fg.inverse` / `fg.inverted` | `#15120E` | Text on light/brand fills |
| `fg.onMedia` | `#FAF7F0` | Always-light text over photos |
| `fg.onMediaMuted` | `rgba(250,247,240,0.8)` | Muted text over photos |

### Borders
| Token | Hex |
|---|---|
| `border.subtle` / `border.muted` | `#2A2419` |
| `border.default` / `border.DEFAULT` | `#3A3327` |
| `border.emphasized` | `#4A4234` |
| `border.strong` | `#564C3C` |

### Brand — **Primary = Champagne Gold** (brand + primary CTA + active nav)
| Token | Hex |
|---|---|
| `primary.default` | `#D8B57A` |
| `primary.hover` | `#E6C892` |
| `primary.pressed` | `#F1D9AC` |
| `primary.subtle` | `#2C2417` |

> A *light metallic* — pair with dark ink (`fg.inverse`) for a luxe, high-contrast CTA.

### Accent — **Sage** (calm secondary: focus/ambient indicators, quiet highlights)
| Token | Hex |
|---|---|
| `accent.default` | `#9FB6A6` |
| `accent.subtle` | `#26302A` |

### Status
| Token | Hex |
|---|---|
| `status.success` | `#5E8C6A` |
| `status.successSubtle` | `#1E2A22` |
| `status.warning` | `#C8862A` |
| `status.danger` | `#C2674A` |

> ⚠️ **Known divergence:** the raw scale in `tokens/colors.ts` is **stale** (old palette: sage primary `#9CB3A4`, saffron accent `#F1A23A`, bg `#1A1814`). Components read the **semantic** layer above, so the table here is what actually renders. The raw token file should be reconciled.

---

## 2. Typography

### Font families (`tokens/typography.ts` + `app/fonts.ts`)
| Role | Family | CSS var | Used for |
|---|---|---|---|
| `display` / `heading` | **Hanken Grotesk** | `--font-display` | Headlines, greetings, headings |
| `body` | **IBM Plex Sans** | `--font-body` | Body, labels, UI text |
| (Arabic body) | **IBM Plex Sans Arabic** | `--font-arabic-body` | Arabic UI/body |
| `mono` | **IBM Plex Mono** | `--font-mono` | Timers & numeric displays (tabular) |
| `arabicDisplay` | **Amiri** (serif) | `--font-arabic-display` | Qur'anic verses |

All `next/font/google`, `display: swap`. Latin + Arabic subsets. Stacks fall back through Arabic body → system sans.

### Type scale (`fontSizes`)
`xs` .75rem · `label-sm` .8125 · `sm` .875 · `md` 1 · `lg` 1.125 · `xl` 1.25 · `2xl` 1.5 · `3xl` 2 · `4xl` 2.5 · `5xl` 3 · `6xl` 4 · `7xl` 5.5 · `numeric-display` 3.5 · `timer` 9 (rem).

Weights: `light` 300 · `normal` 400 · `medium` 500 · `semibold` 600 · `bold` 700.
Line-heights: `none` 1 · `tight` 1.1 · `snug` 1.25 · `normal` 1.5 · `relaxed` 1.65 · `loose` 1.8.
Letter-spacings: `tighter` -.04 · `tight` -.02 · `normal` 0 · `wide` .03 · `wider` .05 · `widest` .12 (em).

### Text styles (`text-styles.ts`) — prefer these over raw font props
- **Display:** `display-xl` (7xl) · `display-lg` (6xl) · `display-md` (5xl) — Hanken, medium, tight tracking.
- **Headings:** `heading-h1`…`heading-h5` (4xl→md) — Hanken, medium/semibold.
- **Body:** `body-xl`…`body-sm` — IBM Plex Sans, normal, line-height ~1.5.
- **Labels:** `label-lg` / `label-md` (uppercase, tracked) · `dock-label`.
- **Numeric:** `numeric-timer` (mono, 9rem, tabular) · `numeric-display` (mono, 3.5rem, tabular).
- **On-media** (white ink + baked text-shadow, for text over photo backgrounds — no per-instance color/shadow needed): `display-on-media`, `body-on-media`, `label-on-media`, `clock-on-media`, `caption-on-media`, `brand-on-media` (Amiri, gold), `verse-on-media` (Amiri).

---

## 3. Spacing & radii

- **Spacing:** Chakra default 4px scale (`1`=4px, `2`=8px, `4`=16px …) + custom `2.75` (.6875rem), `4.5` (1.125rem). Rhythm is 4/8.
- **Radii:** `xs` .25 · `sm` .5 · `md` .75 · `lg` 1 · `xl` 1.5 · `2xl` 2 (rem) · `full` 9999px. Panels/cards use `md`; pills/dots use `full`.
- **Breakpoints:** `sm` 30em · `md` 48em · `lg` 62em · `xl` 80em · `2xl` 96em.
- **Z-index:** dock `1000`, floating panels/timer `900`.

---

## 4. Shadows & elevation

Warm-black shadows (color = `rgba(10,9,7, …)`) at **35–65% opacity** — the dark backdrop needs real depth, not light-theme 4–12%. Two layers per step (tight key + wide ambient).

**Raw (`tokens/shadows.ts`):** `xs` · `sm` · `md` · `lg` · `xl` · `edge-highlight` (inset top catch-light) · `edge-ring` (hairline) · `glow-sage` (sage halo) · `focus` (3px `primary.subtle` ring).

**Semantic (`semantic-tokens/shadows.ts`):**
- **Glass chrome** (catch-light + ring + depth): `glass` (sm), `glass.hover` (md), `glass.dense` (lg).
- **Opaque elevation:** `elevation.card` (sm), `elevation.raised` (md), `elevation.overlay` (xl).

Global focus ring: `*:focus-visible { box-shadow: focus }`.

---

## 5. Layer styles — the signature glass material (`layer-styles.ts`)

The defining material: translucent, blurred, with the glass shadow. Everything floating over a photo space uses it so the chrome reads as one family.

| Layer style | Value | Use |
|---|---|---|
| `glass` | `bg.elevated/55` + `backdrop-blur(8px)` + `boxShadow: glass` | Dock items, pills, doing-now card |
| `glass.dense` | `bg.elevated/80` + `backdrop-blur(16px)` + `boxShadow: glass.dense` | Text-dense panels over media (thicker scrim) |
| `sliderSaffron` | themes Ark Slider parts: track `border.subtle`, range/thumb `primary.default` | Volume sliders |

Usage: `<Box layerStyle="glass" />`.

---

## 6. Buttons (`recipes/button.recipe.ts`)

`<Button>` props: **`visual`** · **`size`** · **`shape`**. Defaults: `solid` / `md` / `pill`.
Base: inline-flex, `fontFamily: body`, medium weight, `_active` scale 0.98, `_focusVisible` 2px `primary.default` outline, `_disabled` opacity .5.

### `visual` variants
| Variant | Look |
|---|---|
| `solid` | `primary.default` bg + `fg.inverse` + edge-highlight → hover `primary.hover` (the gold CTA) |
| `tonal` | `primary.subtle` bg + `primary.hover` text → hover fills gold |
| `accent` | `accent.default` (sage) bg + `fg.inverse` |
| `ink` | `fg.default` bg + `fg.inverse` (high-contrast neutral) |
| `outline` | transparent + `border.default`, hover `surface.muted` |
| `ghost` | transparent + `fg.muted`, hover `surface.muted` + `fg.default` (default for icon buttons) |
| `danger` | transparent + `status.danger` outline/text, hover fills danger |

### `size`: `sm` (h8) · `md` (h10) · `lg` (h12) · `xl` (h16) — `xl` is the focus "Begin" button.
### `shape`: `pill` (full) · `rounded` (md).

---

## 7. Component system (slot recipes)

Custom compound components live in `theme/slot-recipes/` (+ co-located React in `modules/*/components/`). Pattern: `createSlotRecipeContext` → `Component.Root/Slot…`; **all styling in the recipe, TSX is structure-only**.

| Recipe | Component | Notes / signature patterns |
|---|---|---|
| `dock` | bottom floating toolbar | glass items; active = gold fill (`aria-current`/`aria-pressed`); `data-playing` → saffron status dot |
| `panel` | `SidePanel` | floating glass.dense tool panel above the dock; rounded `md`; non-modal |
| `taskList` | compact task panel | calm rows; **hover-reveal action cluster** (`@media (hover)` only, touch keeps visible); active task = gold **left-accent bar** (`data-active`); staggered `row-in` entrance; **`aiAction`** = gradient chip (see Motion) |
| `sounds` | ambient sound grid | icon tiles, tap-toggle, active = `primary.subtle` tint; volume slider revealed on play |
| `timerPill` (`floating-timer`) | floating Pomodoro pill | quiet glass pill; tabular-nums; phase dot |
| `popover` · `badge` · `spaces` · `scrollArea` | misc | thin scrollbar; badge chips; space shell |

**Reusable building blocks:** `InlineEdit` (contentEditable in-place editing), `VolumeSlider`, `ScrollArea` (capped to viewport width — prevents x-overflow).

---

## 8. Motion (`keyframes/index.ts`)

Tokens: durations use Chakra names — `fast` 150ms · `moderate` 200 · `slow` 300 · `slowest` 500. Enter = ease-out.

| Keyframe | Use |
|---|---|
| `fade-in` / `fade-out` | content appearance / crossfade-on-change (keyed remount) |
| `panel-in` / `panel-out` | panels & pills (rise + fade + slight scale) |
| `row-in` | staggered task-row entrance (~40ms/row, capped) |
| `shimmer` | AI chip "generating" light-sweep across gradient |
| `glow-pulse` | AI chip resting breathing halo |

**Rules:** transform/opacity only; tabular-nums on all timers (no width jitter); the **AI "Break into steps" chip** is the single place with continuous motion (gradient `primary→accent→primary`, glow-pulse at rest, shimmer while pending) — effects are confined there so the rest stays calm; everything respects `_motionReduce`.

---

## 9. Iconography

- **lucide-react** only. Global stroke width **2.25** (`svg.lucide`). Sizes 14–20px in dense UI.
- One icon per concept; no emoji as structural icons.

---

## 10. How an AI tool should use this

- **Color:** reference semantic tokens (`bg.base`, `fg.muted`, `primary.default`, `accent.default`, `status.danger`) — never raw hex.
- **Type:** use `textStyle="heading-h4"` / `body-md` / `label-md` / `numeric-timer`; on photos use the `*-on-media` styles.
- **Surfaces:** floating chrome → `layerStyle="glass"` (or `glass.dense` for panels). Opaque cards → `boxShadow="elevation.card"`.
- **Buttons:** `<Button visual="solid|ghost|outline|accent|danger" size shape>`.
- **Motion:** 150–300ms, ease-out, `_motionReduce` fallback; reserve space, no layout-animating.
- **Density:** calm at rest, reveal on hover (with a touch fallback); one primary action per surface.
- **Don't:** hardcode hex/px in components, use emoji icons, add ambient/continuous motion, or use cold-gray shadows.
