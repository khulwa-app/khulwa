# Khulwa — Design System (source of truth)

> The **only** design-system reference. It describes what is *actually implemented* in `theme/`.
> If this doc and the code disagree, the code wins — then fix this doc.
> Last verified against the live app: 2026‑06‑30 (glass sweep).

Khulwa is a calm **focus / deep‑work dashboard**. The visual identity is **clear "liquid glass"**:
translucent surfaces floating over a deep, living indigo→violet mesh, with bright specular edges and
soft floating depth. Rounded, friendly type as the hero. **Dark‑first.** Brand companion = the
**NoorOrb** (violet→magenta), the only place a vivid gradient lives besides the backdrop mesh.

Phase names: **Khulwa** (focus) · **Waqfa** (short break) · **Raha** (long break).

---

## 0. The cardinal rule — style lives in the THEME only

**No inline styling in components.** No `style={}`, no `sx`, no Tailwind, no hardcoded hex/px/rgba.
Style only via: **tokens · semantic tokens · `textStyle` · `layerStyle` · recipes · slot‑recipes** and
Chakra style props that resolve tokens.

- Raw hex/rgba is allowed in **exactly one place**: `theme/tokens/colors.ts` (and `shadows.ts`) primitives.
  Semantic tokens reference primitives; recipes/layer‑styles reference tokens — never raw values.
- **Run `yarn typegen` after EVERY theme change** (tokens / recipes / text‑styles / layer‑styles).
- Primitives → **recipes**; compound components → **slot‑recipes** (`Component.Root` / `Component.Body`).
- **Never `focusRing: 'none'`** — keyboard focus is handled globally (see §10).
- Container sizes use the T‑shirt scale (`maxW="7xl"`); `container.*` is dead in Chakra v3.

`theme/system.ts` assembles everything: `cssVarsPrefix: "khulwa"`, tokens, semantic tokens, text‑styles,
layer‑styles, recipes, slot‑recipes, keyframes.

---

## 1. The glass material (the core identity)

Glass is **one finish vocabulary** applied to every floating surface, at two opacity registers chosen by
**surface role** — *not* a translucency mandate, and **never** a `glass-*` name prefix. The core names
(`raised`, `overlay`, `card`, `primary`…) **are** glass.

**Anatomy** = light veil · bright specular rim (brightest at the top) · 1px lit hairline · strong
backdrop blur + saturation · soft outer lift shadow. Depth comes from the rim + lift, **not** flat
drop‑shadows. The background reads *through* the veil.

| Register | Fill | Blur · Sat | Shadow | Used by | Layer‑style |
|---|---|---|---|---|---|
| **Floating chrome** | `glass.chromeBg` (white 0.09) | `blur(24px) saturate(1.75)` | `glass-rim-sm` | dock, timer pill, badges, on‑backdrop pills | `raised` |
| **Floating panel** | `glass.panelBg` (white 0.13) | `blur(30px) saturate(1.8)` | `glass-rim-lg` | modals, command palette, sheets, tool panel, menus | `overlay` |
| **Content card** | `surface.card` (opaque) | none | `glass-rim-sm` | progress/today cards, login, anchor cards | `card` / `card-anchor` |

- **Content cards stay opaque** (legibility) but wear the same finish (lit hairline + rim). They are *not*
  translucent veils.
- Buttons pick register by **context** via dot‑notation: `primary`/`outline`/`ghost` = content/solid;
  **`onGlass.ghost` / `onGlass.outline` / `onGlass.primary`** = on the deep backdrop (white text, light veils).
- The Safari `-webkit-backdrop-filter` fallbacks live in `app/globals.css` and **must move in lockstep**
  with the `backdropFilter` values in `layer-styles.ts`. Glass classes are also in the `corner-shape: squircle` list there.

**Glass tokens** (`theme/tokens/colors.ts`):
`glassChromeBg 0.09` · `glassPanelBg 0.13` · `glassFillStrong 0.20` (onGlass.primary) ·
`glassBorderLit 0.16` (hairline) · `glassBorderFocus 0.42` (focus brighten) ·
`glassBorderLight/Dark` (content‑surface dual hairline) · `whiteA.{faint .08, dim .14, disabled .40, soft .70, mid .84, strong .98}`.

---

## 2. The backdrop — living mesh (`space-backdrop` layer‑style)

A deep, **theme‑invariant** mesh (the immersive scene is the same dim theatre in light & dark). **Not flat** —
glass needs a rich, varied background to refract. The old vivid magenta mesh and the flat‑tone experiment are both retired.

```
floor    #0A0E24      (deep navy)
glowHi   rgba(124,132,255,0.45)   top‑left periwinkle light source
glowIndigo rgba(79,70,229,0.80)   left
glowAzure  rgba(56,100,240,0.70)  centre‑right electric blue
glowViolet rgba(139,80,245,0.70)  bottom‑right
```

Four radial pools over the floor + `filter: saturate(1.15)`. **Per‑phase** mood shifts the *whole mesh* with
`filter` (transitionable; `background-image` is not) via a `data-phase` attribute on the space root, crossfading
over `durations.mood` (400 ms), reduced‑motion safe:

- `focus` → base indigo/violet · `shortBreak` → `hue-rotate(-38deg)` (teal‑calm) ·
  `longBreak` → `hue-rotate(28deg)` (plum‑rest) · `micro` → desaturate + dim · `alert` → `hue-rotate(115deg)` (warm).

The **NoorOrb** (`noor` layer‑style, violet→magenta radial) is the only other sanctioned gradient.

---

## 3. Color — primitives & semantic tokens

**Primitive ramps** (`theme/tokens/colors.ts`, 50→900): `indigo` (brand anchor, `#5A4DE6`), `azure` (accent),
`cyan`, `violet` + `magenta` (orb only), `sand` (light neutral), `charcoal` (dark neutral), `teal`, `amber`,
`green`, `gold`, `red`, and `sage` / `plum` / `umber` (reserved for break‑phase tints). `ring #5A4DE6`.

**Semantic tokens** (`theme/semantic-tokens/colors.ts`, dark‑first dual via `dual(light, dark)`):

- `bg.{base, elevated, sunken, panel, subtle, muted, emphasized, scrim}`
- `surface.{card, muted}` · `field.{bg, bgHover}`
- `fg.{default, muted, subtle, faint, inverse}` — **on the mesh:** `fg.onMesh` (white 0.98), `onMeshMuted`
  (0.84), `onMeshSubtle` (0.70), `onMeshDisabled` (0.40). On‑mesh fg is **white in both themes** (the scene is always deep).
- `border.{subtle, default, emphasized, strong, focus}`
- `primary` (indigo) · `accent` (azure) · `status.{success, danger…}`
- `category.{deepWork, learning, reading, dhikr}` (indigo / cyan / teal / amber)
- `glass.{chromeBg, panelBg, border (dual), borderLit, borderFocus}`

Identity = **indigo‑cool monochrome**. Magenta/violet are **orb‑only**. No pure‑gray text.

---

## 4. Typography

Face = **Nunito** (rounded, friendly; `next/font/google`, variable, normal + italic → `--font-nunito`),
mapped to the `display` / `heading` / `body` font tokens. **Mono = JetBrains Mono** (tabular timer/stats).
Arabic = IBM Plex Sans Arabic.

**Weights** (`theme/tokens/typography.ts`): light 300 · normal 400 · medium 500 · semibold 600 · bold 700 ·
**extrabold 800** · black 900. Hero/clock = **extrabold**; titles = bold/semibold; body = medium; type‑as‑hero
(hero ≈ 5–6 : 1 over body).

**Text styles** (`theme/text-styles.ts`) — consume via `textStyle="…"`, never ad‑hoc sizes:
`overline`, `hero-meta`, `display-{xl,lg,md}`, `heading-h{1..5}`, `body-{xl,lg,md,sm}`, `label-{lg,md}`,
`dock-label`, `greeting`, `clock-display`, `numeric-{timer,sm,display}`. Hero set (`greeting`, `clock-display`,
`display-xl`, `numeric-timer`, `numeric-display`) is **extrabold**; no body text below 12 px.

---

## 5. Radius — pill‑first

`theme/tokens/radii.ts`: `xs 12px · sm 14px · md 16px · lg 20px · xl 24px · 2xl 26px · 3xl 32px · 4xl 36px · full`.
Semantic (`semantic-tokens/radii.ts`): `chip→xs · control→md · controlWide→full · dock→lg · surface→4xl ·
pill→full · circle→full`. **Pills/buttons/badges = `full`; cards/panels = `surface` (36px).** This is identity —
do not adopt rounded‑rect card scales.

---

## 6. Shadows — glow & lift, never pure black

`theme/tokens/shadows.ts` — all lift shadows use **tinted navy** `rgba(8,10,30,…)`, never `rgba(0,0,0,…)`:

```
glassRimTop    inset 0 1px 0 rgba(255,255,255,0.45),  inset 0 2px 5px rgba(255,255,255,0.10)   ← specular top
glassRimBottom inset 0 -1px 0 rgba(255,255,255,0.06)                                            ← thickness
glassLiftSm    0 4px 16px  rgba(8,10,30,0.22)     ← chrome
glassLift      0 8px 32px  rgba(8,10,30,0.28)     ← default
glassLiftLg    0 24px 80px rgba(8,10,30,0.34)     ← dramatic float (modals/panels)
```

Composed semantic shadows (`semantic-tokens/shadows.ts`): **`glass-rim-sm`** (rim + `glassLiftSm`),
**`glass-rim`** (rim + `glassLift`), **`glass-rim-lg`** (rim + `glassLiftLg`). Plus `focus` and the dual
`xs–xl` scale for non‑glass needs. The bright specular rim (0.45) is the system's signature — keep it bright.

---

## 7. Motion

`theme/tokens/motion.ts` — durations: `instant 100 · enter 200 · exit 140 · slow 280 · mood 400` (backdrop
crossfade). Easings: `enter cubic-bezier(0.16,1,0.3,1) · exit cubic-bezier(0.4,0,1,1) · standard
cubic-bezier(0.4,0,0.2,1)`. Exits ~70 % of enter. **Always honor `prefers-reduced-motion`** (`_motionReduce`).
Press feedback: `scale(0.97)` on `_active`.

---

## 8. Spacing & sizing

Chakra's default 4 px spacing scale + custom half‑steps in `theme/tokens/spacing.ts` (`2.75`, `4.5`).
`sizes` and `z-index` tokens in their own files (e.g. `zIndex.dock`).

---

## 9. Recipes & slot‑recipes (how to consume)

- **Recipes** (`theme/recipes/`): `button` (variants `primary · secondary · outline · ghost · danger · link` +
  **`onGlass.ghost · onGlass.outline · onGlass.primary`**; sizes `sm–xl`), `input` (`outline · filled · plain`).
- **Slot‑recipes** (`theme/slot-recipes/`): `active-task`, `badge`, `card`, `command-palette`, `dock`, `drawer`,
  `floating-timer`, `home-space`, `menu`, `navbar`, `panel`, `rhythm-list`, `scroll-area`, `settings`, `sounds`,
  `spaces`, `stat-bar`, `task-list`. Each exposes a compound `Component.Root` / `…Body` API.
- **Layer‑styles** (`theme/layer-styles.ts`): `space-backdrop`, `raised`, `overlay`, `card`, `card-anchor`,
  `noor`, `scrim`, `sliderAccent`.

---

## 10. Theme, accessibility & i18n

- **Dark‑first**: `ColorModeProvider` is `defaultTheme="dark"`, `enableSystem={false}`. The immersive scene is
  deep in both themes; content surfaces still flip light/dark.
- **Focus**: global `*:focus-visible { outline: none; boxShadow: "focus" }` in `system.ts` is the real keyboard
  focus indicator — never remove it or add `focusRing: 'none'`. Decorative `_focusWithin` brightens use
  `glass.borderFocus`.
- **Touch targets ≥ 44px**; decorative icons get `aria-hidden`.
- **RTL**: logical properties only (`insetInlineStart/End`, `ms/me`, `paddingInline*`) — never `left`/`right`.
  `dir="ltr"` on email/url inputs inside RTL.
- **i18n**: every user‑facing string in `messages/en.json` + `ar.json` via `useTranslations` (real Arabic, not
  transliteration).

---

## 11. Do / Don't

**Do** — clear light‑veil glass made glossy by blur + saturation + one bright top rim; a soft tinted‑navy lift;
the living indigo→violet mesh; pill‑first radii; white on‑mesh text; one `onGlass.primary` per screen; Nunito
extrabold heroes; restraint over richness.

**Don't** — `glass-*` prefixed names (glass *is* the system); dark/opaque glass fills (≥ ~20% reads as plastic);
a flat backdrop (glass has nothing to refract); full‑surface white "sheen" washes (milky); pure‑black shadows;
gradients other than the NoorOrb + mesh; heavy/garish borders or focus rings; pure‑gray text; sharp corners;
the timer as hero on break screens; rounded‑rect card scales.

---

## 12. Definition of Done (every task)

1. `yarn lint && npx tsc --noEmit` clean.
2. Tokens/recipes only — no inline styles, no raw hex/px.
3. Both themes verified for any UI; `prefers-reduced-motion` respected.
4. Every new user‑facing string in `en.json` + `ar.json`.
5. `yarn typegen` run if the theme changed.
