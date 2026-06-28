# Khulwa — Glass & Atmosphere System (GLASS.md)

Source of truth for the visual language, synthesized from the Flocus-class references the user
provided (2026-06-29). Pairs with [MASTER.md] and [TYPE-SCALE.md]. Implement within the existing
Chakra token system (`theme/`), never as ad-hoc styles.

## 0. Essence

Calm, **simple, glossy glassmorphism**. Content floats on a **flat, mood-shifting backdrop**. Everything is
**pill-first** and soft. Typography is **rounded and friendly**, **type-as-hero**. Emotion is carried by
**a single background tone + hierarchy (what's big vs. muted)** — not by chrome, shadows, or busy color.

**No background / color-wash gradients.** Backgrounds are **flat tints**. But the **glass itself is pure
and glossy** — translucent fill + a *subtle* top sheen + a crisp hairline border + a soft outer glow, so it
reads as lit, floating glass (see §3.1 — matches the reference). The sheen is *light*, not a color gradient.
Simple over rich; **never overwhelming**. The brand orb (NoorOrb, violet→magenta) keeps its gradient.

## 1. Atmosphere — phase-tinted backdrops (the biggest idea), now FLAT

There is **one** immersive scene; its **single background tone changes per phase**. **Flat, deep,
low-saturation solid tones — not gradient meshes.** At most a *whisper-soft* vignette (one barely-there
radial darkening at the edges) for depth — no visible color stops, no blobs.

| Phase / context | Mood | Flat tone |
|---|---|---|
| Focus | energizing | deep indigo |
| Short break ("quick rest") | restful, natural | deep sage / olive |
| Long break | deep rest | deep plum |
| Micro intermission | barely-there | charcoal / near-black |
| Alert / "almost time" | gentle urgency | deep amber-brown |

**Implement:** a `data-phase` attribute on the space root + a `space-backdrop` layerStyle variant per
phase (or `bg.mood.*` semantic tokens swapped by phase) resolving to a **solid color token**. Crossfade
the tone between phases (~400ms, reduced-motion safe). The existing colorful brand-mesh backdrop is
**retired in favor of these flat tones** (the orb remains the lone gradient accent).

## 2. Typography — rounded, friendly, dramatic

- **Display/UI face: Nunito** (rounded geometric, weights 400–900 + italic). Add via `next/font/google`,
  map to the `display` + `body` font tokens. **Not Varela Round** (single weight 400 — can't carry the
  hierarchy; accent-only at most).
- **Mono: keep JetBrains Mono** for tabular timer/stat figures.
- Weights: hero/H1 **800**, titles/buttons **700**, body **500–600**, labels **600**.
- Scale: per [TYPE-SCALE.md]. Hero ≈ 5–6:1 over body.
- **Text color behavior:** primary = **white**; secondary/tertiary = white **stepped down in opacity AND
  tinted toward the phase hue** (e.g. olive-muted on the green break). Reuse our `fg.onMesh*` tokens; add
  per-mood tints where needed.

## 3. The glass surface system

### 3.1 Anatomy — pure glass (matches the reference exactly)
- **Fill:** translucent lavender/tint with a **subtle top→bottom sheen** (lighter at the top, ~34%→12%) —
  the localized gloss. This surface sheen is allowed; the no-gradient rule is about *backgrounds*, not the
  glass's own light.
- **Border:** **1px crisp light hairline** (~50% lavender/white) — clearly visible, the lit glass edge.
- **Top highlight:** a thin bright line just inside the top edge (~28% white) for the wet sheen.
- **Outer glow:** a **soft, low-opacity lavender halo** around the pill (gentle blur) — reads as lit,
  floating glass. Keep it subtle.
- **Blur:** `backdrop-filter: blur(16–28px) saturate(1.3)`.
- **Depth comes from** sheen + border + glow + blur — **not** hard drop shadows.
- **Radius:** `full` for pills/buttons/badges, `2xl`/`surface` for cards.

### 3.2 Button registers — a 3-tier emphasis ladder
Emphasis = **border presence + text contrast + flat fill opacity** (all on glass; no gradient fills).
1. **`glass-ghost`** (subtle / waiting / secondary) — faint flat fill, muted text, little/no border. → `Skip`, `Wait for skip`, badges.
2. **`glass-outline`** (available action) — defined solid hairline border, white text. → `Lock Screen`, `+5m`.
3. **`glass-primary`** (the one commit) — fuller flat tinted fill + top sheen, white text. → `Start break now`, `Enter focus`.
Map to our button recipe variants (extend `primary`/`secondary`/`ghost` → add `glass-outline`). One primary per screen.

### 3.3 Surfaces
- `glass.chrome` — dock, nav, floating pills (lighter blur, opaque-ish).
- `glass.panel` — cards/panels (img 9), with nested **glass sub-cards** for captions/stats.
- States carry parity in light & dark; borders stay visible in both.

## 4. Component catalog (observed)

### 4.1 Break-screen template ← apply to our focus/break spaces
The hero of this system. Same layout, re-tinted per phase. **Message leads; timer recedes.**
1. **Top label** — `Current time is HH:MM` (`hero-meta`, muted).
2. **Hero title** — short evocative line ("Catch a quick rest", "A well-deserved eye retreat") — `greeting` scale, white, Nunito 800.
3. **Subtitle** — gentle instruction (`body-lg`/`body-xl`, phase-tinted muted).
4. **Divider** — thin 1px, ~96px wide, centered, low-opacity.
5. **Timer** — large but **muted/phase-tinted** (recedes — opposite of the focus screen where the timer is the hero).
6. **Actions** — `[Skip = glass-ghost]` `[Lock Screen = glass-outline]`, centered.
7. **Footer hint** — `Press Esc twice to skip` (label, faint).

### 4.2 Other components
- **Pill badge / eyebrow** — `glass-ghost` pill ("Long Break").
- **Segmented toggle** — glass track, active = lighter glass pill ("Now / Stats").
- **Stepper pill** — `glass-outline` pill with chevron icon-buttons (`< Today's Screen Score >`).
- **Score gauge** — semicircle arc in a **solid accent** (or solid per-category segments) over a **dotted track**, big number centered — **no gradient arc**. → evolve our progress donut toward this.
- **Notification card** — flat-tinted panel: icon + title + body + action row (`glass-primary` + `glass-outline` pills).
- **Brand mark** — the NoorOrb (the one sanctioned gradient) with the **closed-eyes calm face**.

## 5. Depth & motion
- Layered translucency + a single glossy top highlight; **no harsh shadows, no glow gradients**.
- Calm transitions (fades 220–400ms; exits ~70% of enter). Reduced-motion: crossfade only.
- "Stacked-frost" extra pane behind an element = elevated/active emphasis.

## 6. Map to our code — what we have vs. add
| Pattern | Have | Add |
|---|---|---|
| Brand mesh background | ✅ one mesh | **per-phase mood gradients** (`data-phase`) |
| Pills, selective glass, onMesh text | ✅ | luminous-border + layered-depth refinement |
| Type-as-hero scale | ✅ (TYPE-SCALE.md) | **Nunito** rounded face |
| Buttons | `primary/secondary/ghost` | **3-tier glass ladder** (add `glass-outline`) |
| Focus space (timer-hero) | ✅ | **break-screen template** (message-led, muted timer) |
| Progress donut | ✅ | **gradient score gauge** + dotted track |
| — | — | segmented toggle, stepper pill, glass sub-cards |

## 7. Do / Don't
- **Do:** pills; **flat** tinted surfaces made glossy by translucency + blur + one top highlight; solid hairline borders; white + phase-tinted text; one flat mood tone per phase; message-led break screens; one primary CTA. Keep it **simple — restraint over richness**.
- **Don't:** **gradients** (the NoorOrb is the only exception); busy/multi-stop color; glow washes; hard drop shadows; pure-gray text; sharp corners; timer-as-hero on breaks; more than one primary; anything that overwhelms.
