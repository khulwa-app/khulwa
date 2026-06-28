# Khulwa — Type System (Source of Truth)

Modular, immersive-first type scale. Mapped to Chakra `textStyle` tokens in `theme/text-styles.ts`
and `fontSizes` in `theme/tokens/typography.ts`. Validated against ui-ux-pro-max "type-as-hero"
guidance: **labels 12 · body 16 · sub 22 · section 32 · H2 40 · H1 56 · Hero 72+, ~5:1 hero:body.**

## Rules (non-negotiable)

1. **No visible text below 12px (`xs`).** The `2xs` (11px) token is retired from primary use; `overline` is now `xs`.
2. **Hero:body ratio ≈ 5–6:1.** On the immersive home the clock (96px) anchors the scene; body sits at 16px.
3. **Two register split:**
   - **Immersive surfaces** (home / focus / ambient spaces) use the **large register** — `clock-display`, `greeting`, `hero-meta`, `body-md`. Supporting text is never micro-labels here.
   - **Dense surfaces** (panels, settings, progress, task rows) use the **compact register** — `heading-h*`, `body-sm`, `label-md`, `overline`.
4. Weight reinforces hierarchy: hero/H1 **bold (700)**, titles/buttons **semibold (600)**, body **medium (500)**, labels **medium (500)**.
5. Tighten tracking as size grows (heroes `-0.03em`), loosen for uppercase labels (`+0.08–0.1em`). Tabular figures for clock/timer/stats.

## The scale (textStyle → token → px)

| Role | textStyle | size token | px (base→md) |
|------|-----------|-----------|------|
| Hero (clock) | `clock-display` | 6xl→8xl | 60→96, bold, -0.03em |
| Timer | `numeric-timer` / `numeric-display` | timer / 3.5rem | 144 / 56 |
| Display | `display-xl/lg/md` | 7xl/6xl/5xl | 76/60/48 |
| H1 (greeting) | `greeting` | 4xl→6xl | 38→60, bold |
| Headings | `heading-h1…h5` | 4xl…md | 38/30/24/20/16 |
| **Hero meta** (date, eta under hero) | **`hero-meta`** | sm→md | **14→16, uppercase, +0.08em** |
| Body | `body-xl/lg/md/sm` | xl/lg/md/sm | 20/18/16/14 |
| Labels | `label-lg` / `label-md` | label-sm / xs | 13 / 12, uppercase |
| Overline (micro eyebrow) | `overline` | xs | 12, uppercase |

## Immersive home hierarchy (the scene, top→bottom)

1. **Orb** (visual anchor)
2. **Clock** — `clock-display` (96px) — the hero
3. **Date** — `hero-meta` (16px uppercase) — *was `overline` 11px → fixed*
4. **Greeting** — `greeting` (60px) — H1
5. **Doing-now** — task `body-md` (16px), eta/hint `label-lg` (13px) — *was 14/11px → fixed*

> When adding home/space UI, pull supporting text from the **large register**. Reserve `overline`/`label-md`
> for dense panels. This keeps the 5:1 hero ratio intact and avoids the "huge hero, tiny everything-else" gap.
