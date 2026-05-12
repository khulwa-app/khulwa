import { defineSemanticTokens } from "@chakra-ui/react";

// Single light theme. No _dark. Aligned with Waha v7.1 / Chakra v3 conventions.
// primary = teal, secondary = orange (CTA), danger = red.
// colorPalette/* = recipe tokens that resolve at component level via colorPalette prop.
export const semanticColors = defineSemanticTokens.colors({
  // Surfaces
  bg: {
    canvas: { value: "{colors.stone.50}" },
    DEFAULT: { value: "{colors.stone.50}" },
    subtle: { value: "{colors.stone.100}" },
    muted: { value: "{colors.stone.200}" },
    emphasized: { value: "{colors.stone.300}" },
    inverted: { value: "{colors.stone.900}" },
    panel: { value: "{colors.stone.50}" },
    error: { value: "{colors.red.50}" },
    success: { value: "{colors.teal.50}" },
  },
  // Foreground
  fg: {
    DEFAULT: { value: "{colors.stone.900}" },
    muted: { value: "{colors.stone.600}" },
    subtle: { value: "{colors.stone.500}" },
    inverted: { value: "{colors.stone.50}" },
    error: { value: "{colors.red.700}" },
    success: { value: "{colors.teal.700}" },
  },
  // Border
  border: {
    DEFAULT: { value: "{colors.stone.200}" },
    subtle: { value: "{colors.stone.100}" },
    muted: { value: "{colors.stone.300}" },
    emphasized: { value: "{colors.stone.400}" },
    error: { value: "{colors.red.500}" },
  },
  // Primary brand (teal)
  primary: {
    solid: { value: "{colors.teal.600}" },
    fg: { value: "{colors.stone.50}" },
    contrast: { value: "{colors.stone.50}" },
    subtle: { value: "{colors.teal.50}" },
    muted: { value: "{colors.teal.100}" },
    emphasized: { value: "{colors.teal.700}" },
    focusRing: { value: "{colors.teal.500}" },
  },
  // Secondary / CTA (orange)
  secondary: {
    solid: { value: "{colors.orange.600}" },
    fg: { value: "{colors.stone.50}" },
    contrast: { value: "{colors.stone.50}" },
    subtle: { value: "{colors.orange.50}" },
    muted: { value: "{colors.orange.100}" },
    emphasized: { value: "{colors.orange.700}" },
  },
  // Danger / destructive (red)
  danger: {
    solid: { value: "{colors.red.600}" },
    fg: { value: "{colors.stone.50}" },
    contrast: { value: "{colors.stone.50}" },
    subtle: { value: "{colors.red.50}" },
    muted: { value: "{colors.red.100}" },
    emphasized: { value: "{colors.red.700}" },
  },
  // Focus ring (used by all interactive elements)
  focusRing: { value: "{colors.teal.500}" },
});
