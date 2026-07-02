import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticRadii = defineSemanticTokens.radii({
  chip: { value: "{radii.xs}" },
  control: { value: "{radii.md}" },
  controlWide: { value: "{radii.full}" },
  cardInner: { value: "{radii.xl}" },
  dock: { value: "{radii.lg}" },
  surface: { value: "{radii.4xl}" },
  pill: { value: "{radii.full}" },
  circle: { value: "{radii.full}" },
});
