# Deep Juniper implementation reference

> **Status:** Approved target; phased migration in progress
> **Authority:** The
> [UI/UX Audit and Redesign Plan](../../docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md) is the source of truth for
> behavior, detailed specifications, sequencing, and acceptance criteria. This file is intentionally only a
> concise implementation reference.

## Current versus target

| Area | Current migration state | Approved target |
| --- | --- | --- |
| Identity | Khulwa repository/project working identity; existing package name `focus-den` | Visible brand becomes Riwaq once; technical/package identifiers stay unchanged |
| UI foundation | Chakra UI and theme recipes | Fresh pinned native shadcn base with Tailwind composition |
| Availability | Tailwind, shadcn, and Lucide are not installed | Install and pin them in Phase 1 |
| Typography | Nunito | Manrope Variable, weights 400–700, tabular timer/stat numerals |
| Icons | Solar | Lucide only |
| Theme | Legacy theme infrastructure and toggle | Dark-first/dark-only across the whole product; toggle hidden |
| Color | Indigo/violet liquid-glass legacy | Deep Juniper + Quiet Amethyst |
| Focus data | Category UI/API/aggregates remain | Category-free flow and Progress contract via non-destructive expand/contract |
| Breaks | Standalone break takeover | Short and Long Break inside the Focus stage |
| Shell | Oversized drawers and mixed anchors | Compact dock; anchored panels; Progress beneath the header streak badge |

Light and System are future work. They stay unavailable until a complete second semantic palette and every
surface/state pass the same review gates.

## Token summary

| Token role | Value |
| --- | ---: |
| Canvas | `#071713` |
| Canvas elevated | `#0B211B` |
| Surface | `#102A23` |
| Surface elevated | `#17372E` |
| Surface interactive | `#1C4438` |
| Border | `#2D4D42` |
| Primary text | `#F7F4ED` |
| Secondary text | `#B9C6C0` |
| Muted text | `#8FA39A` |
| Primary action | `#6D28D9` |
| Primary hover | `#7C3AED` |
| Focus/accent | `#C4B5FD` |
| Success | `#5FBF91` |
| Warning | `#D5A45F` |
| Danger | `#E46C76` |

- Every background/surface token must have an explicit foreground partner.
- Use Manrope Variable for all public and application UI.
- Use Lucide at 16px utility, 18px standard, and 20px rare prominent sizes.
- Use 18–20px shared panel radii and smaller radii for nested controls.
- Keep normal UI motion within 150–220ms and honor reduced motion.
- Keep atmosphere static; no glowing borders, animated blur fields, or gradient buttons.

## Component boundary

- Install a fresh native shadcn preset/base; do not translate the old Chakra recipes into shadcn files.
- Keep shadcn primitive geometry native. Compose product layout and behavior with Tailwind.
- Use semantic CSS variables mapped into Tailwind for color, foreground, border, focus, elevation, radius,
  and motion.
- Primary primitives are Button, Input, Textarea, Popover, Sheet, Dialog, Tabs, ScrollArea, DropdownMenu,
  Tooltip, Slider, and Progress.
- Shared product compositions live under `components/ui/**`; domain compositions live under
  `modules/<domain>/**`.
- Do not fork base primitives for page-level layout. Do not introduce DaisyUI.

## Migration rules

1. Phase 1 installs and pins Tailwind/PostCSS integration, the fresh shadcn base, Lucide, Manrope, and minimal
   class utilities. The current repository must not be described as already having them.
2. Chakra and Tailwind coexist temporarily. Untouched legacy surfaces keep Chakra while each approved feature
   slice moves completely to native shadcn plus Tailwind. Remove Chakra only after parity in the quality pass.
3. Ship a coherent dark-only product. Hide/remove the theme toggle before migrated surfaces are user-visible;
   do not expose a mixed legacy/redesign theme.
4. Category removal is expand/contract: derive the new Progress contract from `focus_session`, migrate its
   producers and consumers together, retain legacy schema for rollback, and defer destructive migrations.
   Do not use `db:push` for this change.
5. The left/right dock capsules never contain Progress. Desktop/tablet Progress opens beneath the header streak
   badge; mobile uses a top or bottom sheet.
6. Keep Khulwa as the repository/project working identity. Change only the visible product brand to Riwaq in
   the dedicated brand step; retain technical/package identifiers such as `focus-den` unless separately
   approved.
7. Preserve product behavior unless the authoritative plan explicitly removes it. Break integration and
   category removal are approved behavior changes.

## Review gates

1. Source-of-truth, behavior, category rollout, break integration, and naming.
2. Installed foundation, semantic tokens, dark-only theme, typography, icons, primitives, and contrast.
3. Compact dock and anchored-panel shell, including the separate Progress anchor.
4. Each panel: hierarchy, states, keyboard behavior, and mobile treatment.
5. Focus/break, Home, Ambient, and full Progress.
6. Coordinated Riwaq brand migration, authentication, and landing.
7. Responsive, accessibility, contrast/zoom, performance, rollback verification, and legacy cleanup.

Use the
[authoritative plan](../../docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md#12-implementation-sequence-and-review-gates)
for exact geometry, API rollout details, page/panel specifications, and acceptance criteria.
