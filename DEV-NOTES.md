# Khulwa development notes — historical archive

> [!WARNING]
> **SUPERSEDED — HISTORICAL RECORD ONLY. DO NOT USE THIS FILE FOR IMPLEMENTATION.**
>
> The approved and authoritative implementation direction is
> [`docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md`](docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md). Every task, todo,
> implementation note, palette value, file path, and feature idea below records an earlier product state.
> References to Chakra UI, Arabic/RTL, focus categories, legacy indigo/violet, saffron/sage, or “Forest
> bright” palettes, and `client/` or separate `server/` paths are historical. Do not implement or revive
> them.

## Historical tasks snapshot

User will write some tasks, user can select which one to work on now, user can toggle if this task done.
I will need zustand store to handle tasks in general and read in the upnext card

Store Body:

<!-- Task -->

{
id: string
body: string
completed: boolean
isDoingNow: boolean
eta: Date
priority: high | mid | low
}

### Historical todos

[✅] Scaffold tasks store
[✅] persist store
[✅] mock store with one isDoingNow and test upnext card
[✅] build change task feature for upnext card
[✅] build panel for tasks ( side panel )

## Historical floating Pomodoro pill notes

Problem: leaving the Focus space (Home/Ambient) loses sight of a ticking
session. Solution: a quiet floating pill — the "mini player" pattern.

- **Visibility**: only when a session exists (`hasStarted`) AND the active
  space is not Focus. Running = normal; paused = dimmed (forgetting a paused
  session is the real risk). No session → nothing.
- **Placement**: fixed bottom-center, same baseline + glass material as the
  dock (bg.elevated/55, blur 8) — joins the chrome family, corners stay
  owned by the dock clusters.
- **Content**: phase dot (saffron focus / sage break) + mm:ss in
  tabular-nums. Doing-now task title in the tooltip only.
- **Interaction**: the whole pill is one button → changeSpace(Focus).
  Hover raises bg like dock items; press-scale from the button recipe.
- **Smooth/quiet rules**: tabular numerals so the ticking never jitters
  width (the #1 "choppy" cause); panel-in/out keyframes on appear/disappear;
  zero per-second animation; respects prefers-reduced-motion; no aria-live
  (a per-second live region spams screen readers — static aria-label).
- **Code**: modules/pomodoro/components/floating-timer.tsx, mounted in the
  dashboard layout beside <Dock/>; reads usePomodoro + useSpace. z-index 900.

## Historical design/Figma todos — do not implement

- **Rename phase strings** — design locks the pomodoro tabs as **Focus / Short Break / Long Break**; update `messages/en.json` + `ar.json` `khulwa.phase.*` (currently Khulwa/Waqfa/Raha) to match when implementing the new Focus space.
- **Field retarget: "Forest bright"** — the whole wallpaper = 5 `mesh.*` tokens (`theme/tokens/colors.ts:28-34`). New direction: floor → saturated emerald `#12946E`, glows → one emerald/teal family (bright spring green `#36C496`, deep emerald `#0D7A60`, aqua `#26BAAB`, pale mint `#78D6A4`), **no dark center scrim** (white hero text passes WCAG large-text 3:1 on the saturated core through the 0.20 frost — keep the core mid-lightness, never pale). Re-tune the `data-phase` hue-rotate deltas (`theme/layer-styles.ts:22-25`) for the emerald base + re-verify contrast at port time.
- **Aura/theme switcher (later)** — user wants switchable field auras (e.g. violet `#643FDB`) post-port. Port-ready violet numbers exist (tech-lead report): 5 mesh values, 4.26:1 contrast verified, phase hue-rotates re-tuned (shortBreak −30°/sat .95, longBreak +45°, alert +100°/sat 1.15). Architecture hint: aura = a set of 5 mesh values + 3 phase deltas → could become semantic-token modes or a data-attribute.

- **Glass elevation consistency** — rule: on dark glass, hover/active/elevated states must read *lighter* (a `whiteA` veil), never darker (dark ink stacks into mud). Tasks row ⋯ menu already fixed (bright `glass/sheet` surface + `whiteA/faint` hover). Still using dark-ink `glass/chrome` for their active state: **dock active item** and **Notes toolbar active "B"** — sweep them to the white-veil treatment for uniform lighter-elevation. (Sounds active tiles retired — panel redesigned to icon toggles.)
