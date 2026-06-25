import { defineSemanticTokens } from "@chakra-ui/react";

// FOUR functional radius tiers — a "very rounded" language that stays
// proportional: wide controls go pill-ish and containers get very round,
// while square icon chrome keeps a capped radius so it reads as a
// rounded-SQUARE, never an accidental circle. Reference these names only.
//   chip        →  badges, kbd, tiny square icon buttons
//   control     →  square icon chrome: dock items, list rows, timer, menu rows
//   controlWide →  text controls: buttons, inputs, the intention bar, label chips
//   surface     →  ALL containers: cards, panels, menus, overlays, palette, tiles
//   pill/circle →  genuine circles only: dots, avatars, tracks, toggle thumbs
export const semanticRadii = defineSemanticTokens.radii({
  chip: { value: "{radii.xs}" }, //          8px
  control: { value: "{radii.md}" }, //       12px
  controlWide: { value: "{radii.lg}" }, //   18px
  surface: { value: "{radii.2xl}" }, //      28px
  pill: { value: "{radii.full}" },
  circle: { value: "{radii.full}" },
});
