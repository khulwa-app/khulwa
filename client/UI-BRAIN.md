# Khulwa — UI Brain

A design-research synthesis: what five reference frames teach, the reusable concept library distilled from them, and a proposed new UI direction for Khulwa (خَلوة — *sacred solitude*; calm deep-work for ADHD students).

---

## Part 1 — Reference teardown

### A. "Anne" — AI Companion (frames 9–11)

| Dimension | Observation |
|---|---|
| **Product** | AI virtual *friend* + habit tracker + chat. A relationship, not a tool. |
| **Theme** | Deep cool navy (`~#0E1B2E`), never pure black — warm-cool dark, soft. |
| **Hero device** | A full-body **3D character** (Pixar-grade, expressive pose, eye contact). The character *is* the brand. |
| **Onboarding** | "Choose your AI friend" — character casting call; identity-first onboarding. |
| **Habits** | Weekly grid (day columns × habit rows), playful emoji/icon avatars per habit, checkmarks. A date strip of day-pills (active = filled circle). Reminder list = rounded cards w/ checkbox + title + sub-label. |
| **Chat** | Character stands *beside* the conversation. User bubbles = filled blue, right; AI = transparent, left. 👍/👎 micro-feedback. Input row with quick-action icons (calendar / task / game). |
| **Components** | Pill buttons (full-round), outlined "Select", rounded cards, soft inner depth, blue accent (`~#3B82F6`). |
| **Emotion** | Warm, supportive, *human*. Calm-dark but never clinical. |

**Concepts to steal:** companion-as-presence · conversational coaching · habit grid with personality · supportive micro-feedback · identity-first onboarding.

### B. Editorial Real-Estate (frame 12)

| Dimension | Observation |
|---|---|
| **Theme** | **Light**, warm greige canvas, white cards, **monochrome black** accents. Photography carries the color. |
| **Layout** | Massive whitespace, single-focus screens, content floats on calm paper. |
| **Controls** | **Segmented pills** (Any / Villa / Apartment) with **black-fill active**; range **sliders**; toggle chips for counts. The clearest, most reusable control grammar of all five. |
| **Type** | Light/regular weights, restrained, editorial. Lets the imagery and controls speak. |
| **Emotion** | Premium, sophisticated, *calm*, trustworthy. Restraint = luxury. |

**Concepts to steal:** editorial restraint as the *container* · segmented-pill + slider control grammar · monochrome base that lets one accent pop · photography-forward calm.

### C. "FOCO" — Focus app (frame 13) — *most on-nose for Khulwa*

| Dimension | Observation |
|---|---|
| **Theme** | **Light** off-white + **vibrant violet→indigo + magenta** gradients. Color = energy. |
| **Brand** | Chunky rounded "FOCO" wordmark, gradient fill. Confident, dopaminergic. |
| **Timer** | Big tabular `01:02:14` with progress bar + **circular** play/pause/stop controls. On phone *and* watch (continuity). |
| **Reward system** | **Category-color-coded** time: Working = violet, Learning = pink, Reading = light-purple — each with a labelled progress bar + hours. *Visible accumulation = dopamine.* |
| **Greeting** | "Good Morning, Sarah!" + avatar + "Continue today's session" resume card. Motivational, personal. |
| **Emotion** | Energetic, motivating, achievement-driven. |

**Concepts to steal:** **category-colour-coded progress** (the single most ADHD-relevant idea here) · big confident timer · circular transport controls · resume-session card · motivational greeting · vivid brand *moments*.

---

## Part 2 — The reusable concept library ("the brain")

Cross-cutting patterns worth keeping regardless of final direction:

**Layout**
- One-thing-per-screen; generous whitespace as the default container.
- Floating rounded cards on a calm canvas (radius 16–28px).
- A persistent "resume / continue" card as the home anchor.

**Color**
- A **calm neutral base** + **one identity accent** + a small **category palette** for progress.
- Color earns its place: neutral at rest, vivid at moments of progress/reward.

**Type**
- A confident **rounded display** for headlines/brand + a clean **geometric sans** for UI + **tabular mono** for timers/numbers. (Skill picks: Nunito/DM Sans for friendly-bold; current Geist/Inter is the restrained cousin.)

**Depth & material**
- Soft, real shadows + subtle borders. Optional: a *single* hero with extra depth (3D character / gradient brand) — never everywhere.

**Components (control grammar)**
- Segmented pills (active = solid fill), toggle chips, range sliders, circular transport controls, checkbox list-cards, day-pill strips, chat bubbles.

**Motion & reward**
- 150–300ms micro-interactions; reserve *one* place for celebratory motion (a completed session, a streak) — controlled dopamine, not ambient noise.

**Companion**
- A gentle persistent presence (avatar/character) that greets, coaches, and reacts — the emotional through-line.

---

## Part 3 — Proposed new direction for Khulwa

### Thesis: **"Stillness & Spark"**

Khulwa lives on a contradiction that these references resolve: **ADHD users need dopamine and stimulation, but the brand is calm sacred solitude.** The answer isn't to pick one — it's to **layer** them:

> **A calm, editorial sanctuary as the resting canvas (Ref B) — that hosts a gentle companion (Ref A) and releases vivid, color-coded bursts of reward only when focus is earned (Ref C).**

Calm is the *default state*; spark is *earned*, surgical, and meaningful. This is uniquely suited to ADHD focus: the environment never over-stimulates at rest, but progress is made gloriously visible.

### Three pillars

1. **Calm Canvas** — editorial restraint as the home/rest state. Warm-neutral paper, huge whitespace, one quiet accent, the segmented-pill control grammar from Ref B. This is where the user *breathes*.
2. **Living Companion** — a gentle Khulwa presence (a calm guide, abstract or character) that greets by name, suggests the one thing, and offers spiritual/supportive nudges (ties to the existing "compassionate virtual friend" + the ayah system). Conversational, never naggy.
3. **Earned Spark** — focus sessions and streaks unlock **category-color-coded** progress (e.g. *Study*, *Read*, *Pray/Dhikr*, *Rest*), a confident timer, circular transport, and *one* celebratory motion on completion. Dopamine, but rationed.

### Concrete system sketch

| Layer | Proposal |
|---|---|
| **Base palette** | Warm-neutral paper (keep the light direction). Identity accent stays a focus hue (teal or violet — see open question). |
| **Category palette** | 4 muted-but-distinct hues for time categories (study / read / dhikr / rest), used *only* in progress viz — the FOCO idea, calmed down. |
| **Type** | Rounded-confident display for greeting/brand + Inter/Geist for UI + mono for the timer. Greeting becomes a real hero (already moving this way). |
| **Home** | "Good morning, Saif" + companion + **resume-session card** (Ref C) + one-thing input + quiet stats teaser. |
| **Focus** | Big timer + circular transport + category pill + a *single* completion celebration. |
| **Habits/Rhythm** | Ref-A habit grid reframed as gentle daily rhythm (prayers, study blocks, dhikr) — playful icons, calm cadence. |
| **Companion/Chat** | Optional: a supportive coach surface (ask for a plan, break a task into steps — you already have AI assist). |
| **Stats** | Category-color-coded accumulation bars — the dopamine payoff screen. |

### What's genuinely new vs. today

- Today: calm but *flat and quiet* — no reward loop, no companion presence, no category progress. The "boring" you flagged.
- Proposed: same calm, but with a **reward economy** (earned spark), a **companion through-line**, and **color-coded visible progress** — the three things that make ADHD focus apps *stick*, layered onto Khulwa's sanctuary identity rather than replacing it.

### Resolved direction (locked)

- **Accent:** Violet/indigo (FOCO energy) + magenta spark.
- **Companion:** Abstract presence — no character. A soft light + the ayah + supportive copy.
- **Approach:** Spec the full system here first, then build.

---

## Part 4 — System Spec v1: "Stillness & Spark"

Violet identity · abstract companion · **single light theme** (dual/dark + next-themes removed for a clean slate).

### 4.1 Palette

Light is the resting canvas; violet is identity; magenta is *spark* (reward only); the category palette appears **only** in progress viz. Values are starting points to tune in `theme/`.

**Neutrals & surfaces**

| Role | Light | Dark |
|---|---|---|
| `bg.base` | `#F7F6FC` | `#141221` |
| `bg.elevated` / `surface.card` | `#FFFFFF` | `#1E1B2E` |
| `bg.sunken` | `#EFEDF7` | `#0E0C17` |
| `surface.muted` | `#F1EFF9` | `#191627` |
| `fg.default` | `#1A1726` | `#ECEAF6` |
| `fg.muted` | `#5B5470` | `#A29CB8` |
| `fg.subtle` | `#8B85A0` | `#6F6889` |
| `border.subtle` | `#E8E5F2` | `#2A2740` |
| `border.default` | `#D7D2E8` | `#383350` |

**Identity — Violet (primary)**

| Role | Light | Dark |
|---|---|---|
| `primary.default` | `#6C4CE0` | `#8B6FF0` |
| `primary.hover` | `#5B3DD0` | `#9D85F4` |
| `primary.pressed` | `#4C30B8` | `#B0A0F8` |
| `primary.subtle` | `#ECE7FB` | `#241F3D` |
| `primary.fg` | `#FFFFFF` | `#0E0B1C` |

**Spark — Magenta (reward accent, used sparingly)**

| Role | Light | Dark |
|---|---|---|
| `accent.default` | `#EC4899` | `#F472B6` |
| `accent.subtle` | `#FCE7F1` | `#2E1322` |
| `accent.fg` | `#FFFFFF` | `#2A0A18` |

**Category palette** (progress viz **only** — never chrome)

| Category | Hue | Light | Dark |
|---|---|---|---|
| Focus / Study | violet | `#6C4CE0` | `#8B6FF0` |
| Read / Learn | indigo | `#5B73F0` | `#7E92F6` |
| Dhikr / Spirit | magenta | `#EC4899` | `#F472B6` |
| Rest / Break | teal-mint | `#2BB8A6` | `#43D3C0` |

**Brand gradient** (logo / spark moments only): `linear-gradient(135deg, #7C5CF0 0%, #6C4CE0 45%, #EC4899 100%)`.

**Status:** success `#1F9D6B`, warning `#D98A1A`, danger `#E25563` (+ subtle washes).

### 4.2 Typography

| Role | Family | Use |
|---|---|---|
| Display / greeting / brand | **Hanken Grotesk** (rounded-confident) | the hero greeting, brand wordmark |
| UI / body | **Inter** | controls, labels, lists |
| Numeric / timer | **Geist Mono** (tabular) | timers, stats, streak counts |
| Arabic display | **Reem Kufi** | the ayah |

Scale: Display 48–64 / Greeting-hero 40–56 / H 32→16 / Body 16 / Label 12–13 tracked / Timer 56–144 mono. Greeting is a true hero.

### 4.3 The companion — "Noor" (نور · light)

No character. The companion is a **soft light**: a radial violet→magenta orb that *behaves*.

| State | Behaviour |
|---|---|
| Rest (home) | Slow breathe (scale 0.98→1.02, opacity pulse, ~6s), violet. Anchors the ayah. |
| Greeting | Sits beside the greeting; tints to time-of-day. |
| In focus | Shifts to the **active category** colour; steady glow while the timer runs. |
| Completion | **Blooms** once — a single spark burst (gradient sweep + brief scale) as the session/streak lands. |
| Reduced-motion | Static glow, no breathe/bloom. |

Implementation: a CSS radial-gradient element + keyframes; respects `_motionReduce`. This is the entire "presence" — calm, spiritual, cheap.

### 4.4 The spark economy (reward rules)

The discipline that keeps calm from going boring **and** spark from going noisy:

- **At rest:** neutral canvas, violet identity only. No category colour, no gradient.
- **During a session:** the active category colour tints *chrome edges only* (timer ring, orb) — subtle.
- **On completion:** exactly **one** celebration — orb bloom + streak increment + a brief gradient sweep. Nowhere else gets celebratory motion.
- **On the Stats screen:** full category-colour accumulation bars — the deliberate dopamine payoff, contained to its own surface.

### 4.5 Motion tokens

Durations: `fast 150 · moderate 200 · slow 300 · celebrate 600`. Enter ease-out, exit ~70%. Transform/opacity only. One celebration surface. All respect `prefers-reduced-motion`.

### 4.6 Component library

Carry the **control grammar** from Ref B + the **reward components** from Ref C:

- Segmented pills (active = solid `primary`), toggle chips, range sliders.
- **Circular transport** (play/pause/stop/skip) for the timer.
- **Resume-session card** (home anchor): "Continue — 01:02:14 · Working", play/stop.
- **Category progress bars** (label + colour + value).
- Day-pill strip, checkbox list-cards (rhythm/habits).
- The **Noor orb**.
- Chip-style chrome over media (built); buttons (`solid` ink CTA, `tonal` violet, `chip`).

### 4.7 Key screens

- **Home (Calm Canvas):** Noor orb + "Good morning, Saif" hero + ayah + **resume-session card** + one-thing input + a quiet stats teaser. Calm at rest.
- **Focus (Earned Spark):** big mono timer + circular transport + category pill; orb tints to category; one bloom on complete.
- **Stats (Payoff):** today/total focus + category accumulation bars (FOCO-style, calmed).
- **Rhythm (Habits):** Ref-A grid reframed as daily rhythm (study / read / dhikr / rest) — playful icons, day strip, calm cadence.

### 4.8 Theme-layer mapping (for implementation)

- `theme/semantic-tokens/colors.ts` — swap to the 4.1 palette (dual light/dark; `dual()` already supports it).
- `theme/tokens/typography.ts` + `app/fonts.ts` — add Hanken Grotesk display; keep Inter/Geist Mono/Reem Kufi.
- New `category` token group (or layer-styles) for progress hues — quarantined from chrome.
- New layer-styles/keyframes: `noor` (orb + breathe/bloom), `sparkSweep`.
- Components: `CircularTransport`, `ResumeCard`, `CategoryBar`, `NoorOrb` (co-located in modules).
- Single light theme — semantic tokens are single-value; no `_dark`/`_light`, no toggle.

### 4.9 Build phases

1. **Tokens & type** — palette + Hanken display + category group + Noor/spark keyframes.
2. **Noor orb** — the presence, standalone.
3. **Home vertical slice** — orb + greeting + resume card + one-thing   .
4. **Focus** — timer + transport + category tint + completion bloom.
5. **Stats** — category accumulation payoff.
6. **Rhythm** — habits-as-rhythm.

*Next: review/adjust this spec (palette hexes, font, category set), then start Phase 1.*
