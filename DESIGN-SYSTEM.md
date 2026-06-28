# Khulwa — Design System

A reference to Khulwa's **implemented** design system (Chakra UI v3, `client/theme/`).
**The code is the source of truth; this mirrors it.** After any theme change run `yarn typegen`.

> **Identity.** Khulwa (خَلوة, _sacred solitude_) is a **calm deep-work** app. Warm neutral
> surfaces, a **violet** brand with a **magenta** accent, very rounded **squircle** geometry,
> flat (non-glass) elevation, restrained motion. Bilingual (AR/EN, RTL-aware).

---

## 0. Core principles

1. **Light + dark, dual theme.** Both modes are first-class. Dark is _re-tuned tonal_
   (warm-neutral `sand` in light, violet-tinted `charcoal` in dark) — **not** an inversion.
   Always design and test both; never infer one from the other.
2. **Tokens only — no hardcoded styles in TSX.** No raw hex, no inline font stacks, no magic
   `px`. Everything routes through `tokens / semantic-tokens / text-styles / layer-styles /
recipes / slot-recipes`. Raw hex/rgba is allowed **only** in `tokens/` (the primitive layer).
3. **Semantic roles, not primitives.** Components reference roles (`bg.elevated`, `fg.muted`,
   `primary.default`). The primitive scales (`violet`, `sand`, `charcoal`…) are referenced
   **only** by the semantic layer.
4. **Flat elevation.** Surfaces lift with opaque fills + shadow, not glass/blur.
5. **Very rounded, squircle.** Generous radii paired with `corner-shape: squircle` (Chromium;
   graceful fallback elsewhere). See §3 — this is the part most often gotten wrong.
6. **Quiet motion.** 150–300ms, transform/opacity only, `prefers-reduced-motion` respected.
7. **SVG icons only** (lucide-react, global stroke width **2**). No emoji as structural icons.
8. `cssVarsPrefix: "khulwa"` → CSS vars like `var(--khulwa-colors-primary-default)`.

---

## 1. Color (`semantic-tokens/colors.ts` — authoritative)

Every role is a `dual(light, dark)` pair pointing at a primitive in `tokens/colors.ts`.
Primitive scales: `violet` (primary), `magenta` (accent), `sand` (warm neutral, light),
`charcoal` (violet-tinted neutral, dark), `teal` `amber` `green` `gold` `red`, plus
`violetA`/`magentaA` (low-alpha brand washes) and `scrim`.

### Backgrounds & surfaces

| Role                       | Light      | Dark           | Use                          |
| -------------------------- | ---------- | -------------- | ---------------------------- |
| `bg.base` / `bg.DEFAULT`   | `sand.100` | `charcoal.900` | App background               |
| `bg.elevated` / `bg.panel` | `white`    | `charcoal.800` | Cards, panels, raised chrome |
| `bg.sunken`                | `sand.200` | `charcoal.900` | Wells / inset                |
| `bg.subtle` / `bg.muted`   | `sand.200` | `charcoal.800` | Subtle fills                 |
| `bg.emphasized`            | `sand.300` | `charcoal.700` | Emphasized / pressed fills   |
| `bg.inverse`               | `sand.950` | `sand.100`     | Inverted surfaces            |
| `bg.scrim`                 | `scrim`    | `scrimStrong`  | Modal backdrop               |
| `surface.card`             | `white`    | `charcoal.800` | Card surface                 |
| `surface.muted`            | `sand.200` | `charcoal.700` | Quiet hover surface          |
| **`field.bg`**             | `sand.200` | `charcoal.700` | **Input rest fill** (§6)     |
| **`field.bgHover`**        | `sand.300` | `charcoal.600` | **Input hover fill** (§6)    |

### Foreground

| Role                      | Light      | Dark           |
| ------------------------- | ---------- | -------------- |
| `fg.default`              | `sand.950` | `charcoal.50`  |
| `fg.muted`                | `sand.700` | `charcoal.300` |
| `fg.subtle` (placeholder) | `sand.600` | `charcoal.400` |
| `fg.faint`                | `sand.500` | `charcoal.500` |
| `fg.inverse`              | `sand.100` | `charcoal.900` |

### Borders

| Role                                | Light        | Dark           |
| ----------------------------------- | ------------ | -------------- |
| `border.subtle` / `border.muted`    | `sand.300`   | `charcoal.700` |
| `border.default` / `border.DEFAULT` | `sand.400`   | `charcoal.600` |
| `border.emphasized`                 | `sand.500`   | `charcoal.500` |
| `border.strong`                     | `sand.600`   | `charcoal.500` |
| `border.focus`                      | `violet.500` | `violet.400`   |

### Brand, accent, category, status

| Role                                         | Light                                 | Dark           | Notes                                                 |
| -------------------------------------------- | ------------------------------------- | -------------- | ----------------------------------------------------- |
| `primary.default`                            | `violet.500`                          | `violet.500`   | Brand / primary CTA / active nav                      |
| `primary.hover` / `primary.pressed`          | `violet.600` / `violet.700`           | same           |                                                       |
| `primary.subtle`                             | `violet.100`                          | `charcoal.700` | **Static** chip/badge/dot fill (neutral in dark)      |
| `primary.wash`                               | `violet.100`                          | `charcoal.600` | **Interactive hover** surface — visible in both modes |
| `primary.fg`                                 | `white`                               | `white`        | clears AA on the violet fill (~4.6:1)                 |
| `accent.default`                             | `magenta.500`                         | `magenta.400`  | Secondary accent                                      |
| `category.{deepWork,learning,reading,dhikr}` | violet / magenta / violet.300 / amber | tonal          | Space/category tints                                  |
| `status.{success,danger}` (+`*Subtle`)       | green / red                           | tonal          | Functional color — always pair with icon/text         |

> **`subtle` vs `wash`:** `primary.subtle`'s dark value is a flat charcoal — fine for a
> _static_ filled chip, but it vanishes as a _hover_ on `charcoal.800` chrome. For hover/interactive
> surfaces use **`primary.wash`** (added precisely for this).

---

## 2. Typography

### Families (`tokens/typography.ts` + `app/fonts.ts`, all `next/font`)

| Role                  | CSS var                 | Family (loaded)                                      |
| --------------------- | ----------------------- | ---------------------------------------------------- |
| `display` / `heading` | `--font-display`        | **DM Sans**                                          |
| `body`                | `--font-body`           | **Inter**                                            |
| `mono`                | `--font-mono`           | **JetBrains Mono** (timers/numerics, tabular)        |
| (Arabic body)         | `--font-arabic-body`    | **IBM Plex Sans Arabic**                             |
| `arabicDisplay`       | `--font-arabic-display` | **Reem Kufi** (fallback for licensed _Klapt Arabic_) |

### Scale (`fontSizes`, rem)

`2xs` .6875 · `xs` .75 · `label-sm` .8125 · `sm` .875 · `md` 1 (base) · `lg` 1.125 · `xl` 1.25 ·
`2xl` 1.5 · `3xl` 1.875 · `4xl` 2.375 · `5xl` 3 · `6xl` 3.75 · `7xl` 4.75 · `8xl` 6 ·
`numeric-display` 3.5 · `timer` 9.

Weights `light`300…`bold`700 · line-heights `none`1…`loose`1.8 (body `normal`=1.5) ·
letter-spacings `tighter`-.04em…`widest`.12em.

### Text styles (`text-styles.ts`) — **prefer these over raw font props**

- **Display/heading:** `display-xl|lg|md`, `greeting`, `clock-display`.
- **Body:** `body-xl|lg|md|sm`.
- **Labels:** `label-lg|md`, `dock-label`, `overline`.
- **Numeric:** `numeric-timer`, `numeric-display`, `numeric-sm` (mono, tabular).
- **Arabic / Qur'an:** `verse`, `verse-caption`, `verse-meaning`, `ayah-hero`,
  `ayah-hero-corner`, `ayah-hero-compact`.

---

## 3. Radii & roundness ⭐ (the part to get right)

Primitives (`tokens/radii.ts`, rem): `none`0 · `xs`.75 (12px) · `sm`.875 (14) · `md`1 (16) ·
`lg`1.25 (20) · `xl`1.5 (24) · `2xl`1.75 (28) · `3xl`2 (32) · `full`9999px.

**Reference the four semantic tiers by name — never the primitives, never a raw value:**

| Tier              | Value        | Use for                                                            |
| ----------------- | ------------ | ------------------------------------------------------------------ |
| `chip`            | `xs` · 12px  | badges, kbd, tiny square icon buttons                              |
| `control`         | `md` · 16px  | **square** icon chrome: dock items, list rows, timer, menu rows    |
| `controlWide`     | `lg` · 20px  | **text** controls: buttons, inputs, the intention bar, label chips |
| `surface`         | `2xl` · 28px | **all containers**: cards, panels, menus, overlays, palette, tiles |
| `pill` / `circle` | `full`       | genuine circles only: dots, avatars, tracks, toggle thumbs         |

**The rule of thumb:** square/iconic chrome → `control`; anything with a text label → `controlWide`;
anything that _contains_ other things → `surface`; true circles → `full`.

### Squircle (smooth superellipse corners)

`corner-shape: squircle` makes the generous radii read as smooth, premium corners instead of
plain arcs. It's a **progressive enhancement** — Chromium renders true superellipses; other
engines fall back to normal `border-radius`. Two mechanisms, by design:

1. **`app/globals.css`** applies squircle to a fixed list of **semantic recipe classes**
   (`.khulwa-input`, `.khulwa-card__root`, `.khulwa-dock__item`, …). Add a new component's
   root class here when it should be squircled.
2. **`button.recipe.ts`** sets `corner-shape` itself: `squircle` on the base, **`normal` on the
   circular `iconPrimary`/`iconGhost` variants** — squircle on a `full` radius would dent a true
   circle. Buttons are deliberately **not** in the globals.css list for this reason.

> ⚠️ Same radius + different `corner-shape` = **visibly inconsistent roundness** even when the
> px value matches. If a control looks "off" next to an input, check that it's squircled too.

---

## 4. Control sizing ⭐

Buttons (`button.recipe.ts`) and inputs (`input.recipe.ts`) share one height scale:

| `size` | Height | token  | Notes                                     |
| ------ | ------ | ------ | ----------------------------------------- |
| `sm`   | 32px   | `h:8`  | dense / inline                            |
| `md`   | 40px   | `h:10` | **default**                               |
| `lg`   | 48px   | `h:12` | forms, primary flows (≥44px touch target) |
| `xl`   | 64px   | `h:16` | hero "Begin" (buttons only)               |

> ⚠️ **Pairing rule:** controls stacked or inlined together (a form, a button row) **must share a
> `size`.** Inputs default to `md`, buttons are frequently set to `lg` — mismatching them is the
> #1 source of "inputs and buttons look inconsistent." On a `lg` button form, set inputs `size="lg"`.

---

## 5. Buttons (`recipes/button.recipe.ts`)

`<Button variant size>`. Defaults: `primary` / `md`. Base: `rounded: controlWide`, squircle,
`_active` scale 0.97, `_focusVisible` 2px `border.focus` outline (offset 2px), `_disabled` opacity .5.

| `variant`                   | Look                                                                          |
| --------------------------- | ----------------------------------------------------------------------------- |
| `primary`                   | `primary.default` fill + `primary.fg`; hover `primary.hover` (the violet CTA) |
| `secondary`                 | `bg.elevated` + `border.default` + `sm` shadow (e.g. "Continue with Google")  |
| `outline`                   | transparent + `border.default`, `fg.muted` → hover `surface.muted`            |
| `ghost`                     | transparent + `fg.muted` → hover `surface.muted`                              |
| `danger`                    | transparent + `status.danger` outline/text → hover fills danger               |
| `iconPrimary` / `iconGhost` | **circular** (`rounded: full`, `corner-shape: normal`, aspect 1) icon buttons |

---

## 6. Inputs (`recipes/input.recipe.ts`)

`<Input variant size>`. Defaults: `outline` / `md`. Base reserves a `1px solid transparent`
border so width never shifts between states; `rounded: controlWide` (squircled via globals.css).
One interaction ladder, identical behaviour in both themes (fill → lift on hover → violet on focus):

| `variant` | Rest                                     | Hover                             | Focus                      | Use                                          |
| --------- | ---------------------------------------- | --------------------------------- | -------------------------- | -------------------------------------------- |
| `outline` | `field.bg` fill + `border.default`       | `field.bgHover` + `border.strong` | violet `border.focus`      | prominent form field (login)                 |
| `subtle`  | transparent + `border.default` hairline  | `field.bg` fill + `border.strong` | `field.bg` + violet border | quiet field inside a panel (never invisible) |
| `bare`    | transparent, no border, no inset padding | —                                 | ring suppressed            | embedded in another control (intention bar)  |

The global focus-visible ring (`system.ts`) supplies the keyboard ring on top of the violet border.

---

## 7. Elevation & shadows

Flat, opaque tiers — no glass. Surface roles from `layer-styles.ts`:

| Layer style    | Background                                                | Use                                    |
| -------------- | --------------------------------------------------------- | -------------------------------------- |
| `card`         | `surface.card` + `border.subtle`                          | resting card (`surface` radius)        |
| `card-anchor`  | `surface.card`                                            | roundest card tier (doing-now, resume) |
| `raised`       | `bg.elevated` + `border.subtle`                           | floating chrome (dock, pills)          |
| `panel`        | `bg.elevated` + `border.default`                          | modal / popover / sheet / tool panel   |
| _(decorative)_ | brand gradients / ambient wash / Noor light / jade slider | scenes & the living orb                |

Shadows (`semantic-tokens/shadows.ts`, each a light/dark `dual`): `xs sm md lg xl`, `glow-sage`,
and `focus` (`0 0 0 2px bg.elevated, 0 0 0 4px ring`). Dark uses a deeper/cooler shadow family so
elevation still reads on charcoal. Global: `*:focus-visible { box-shadow: focus }`.

---

## 8. Motion (`tokens/motion.ts` + `keyframes/index.ts`)

Durations: `instant` 100ms (press) · `enter` 200 · `exit` 140 (~70% of enter) · `slow` 280.
Easings: `enter` (ease-out `cubic-bezier(.16,1,.3,1)`) · `exit` (ease-in) · `standard`.

Keyframes: `fade-in/out`, `panel-in/out`, `row-in` (staggered list entrance), `rise-in`,
`noor-pulse / noor-hue / noor-bloom` (the living orb). Rules: transform/opacity only;
tabular-nums on all timers; everything respects `_motionReduce`.

---

## 9. Component system (slot recipes)

Compound components live in `theme/slot-recipes/` (+ co-located React in `modules/*/components/`).
Pattern: `createSlotRecipeContext` → `Component.Root/Slot…`; **all styling in the recipe, TSX is
structure-only.** Registered: `dock`, `badge`, `menu`, `card`, `statBar`, `rhythmList`,
`commandPalette`, `spaces`, `popover`, `panel`, `scrollArea`, `taskList`, `timerPill`, `sounds`.

Dock signature patterns: items use `layerStyle: raised` + `control` radius; active = violet fill
(`aria-current` / `aria-pressed`); hover = `primary.wash` (not `subtle`); `data-playing` → magenta
status dot.

---

## 10. How to use this (humans & AI tools)

- **Color:** semantic roles only (`bg.base`, `fg.muted`, `primary.default`, `field.bg`,
  `status.danger`). Never raw hex in components. Design both themes.
- **Roundness:** pick a tier by §3's rule of thumb (`control` / `controlWide` / `surface` / `full`);
  add the root class to the globals.css squircle list if it's a new squircled component.
- **Sizing:** pick a `size`; keep paired controls on the **same** size (§4).
- **Type:** `textStyle="heading…|body-md|label-md|numeric-timer"`; never inline font stacks.
- **Surfaces:** `layerStyle="card|raised|panel"`; shadows via `boxShadow="md"` etc.
- **Motion:** 150–300ms, ease-out, `_motionReduce` fallback; transform/opacity only.
- **Don't:** hardcode hex/px, use emoji icons, reach for primitives in components, use
  `primary.subtle` as a hover, or mismatch sizes/roundness between paired controls.
