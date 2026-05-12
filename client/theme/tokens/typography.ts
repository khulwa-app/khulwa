import { defineTokens } from "@chakra-ui/react";

// Two-family system aligned with Figma:
// - display: Reem Kufi (wordmark, hero headlines only)
// - body: Noto Sans Arabic (everything else, including numerics via tabular-nums)
export const fonts = defineTokens.fonts({
  display: { value: "var(--font-display), 'Reem Kufi', system-ui, sans-serif" },
  body: { value: "var(--font-body), 'Noto Sans Arabic', system-ui, sans-serif" },
  heading: { value: "var(--font-display), 'Reem Kufi', system-ui, sans-serif" },
});

// Pixel-precise scale matching Figma textStyles
export const fontSizes = defineTokens.fontSizes({
  xs: { value: "0.6875rem" }, // 11
  sm: { value: "0.75rem" }, // 12
  md: { value: "0.875rem" }, // 14
  lg: { value: "1rem" }, // 16
  xl: { value: "1.125rem" }, // 18
  "2xl": { value: "1.25rem" }, // 20
  "3xl": { value: "1.5rem" }, // 24
  "4xl": { value: "1.875rem" }, // 30
  "5xl": { value: "2.5rem" }, // 40
  "6xl": { value: "3.5rem" }, // 56
  "7xl": { value: "5.5rem" }, // 88
  "8xl": { value: "6rem" }, // 96
  timer: { value: "clamp(8rem, 18vw, 14rem)" },
});

export const fontWeights = defineTokens.fontWeights({
  light: { value: "300" },
  normal: { value: "400" },
  medium: { value: "500" },
  semibold: { value: "600" },
  bold: { value: "700" },
});

export const lineHeights = defineTokens.lineHeights({
  none: { value: "1" },
  tight: { value: "1.15" },
  snug: { value: "1.3" },
  normal: { value: "1.5" },
  relaxed: { value: "1.75" },
});

export const letterSpacings = defineTokens.letterSpacings({
  tighter: { value: "-0.04em" },
  tight: { value: "-0.025em" },
  "tight-h3": { value: "-0.015em" },
  "tight-body": { value: "-0.011em" },
  "tight-sm": { value: "-0.006em" },
  normal: { value: "0em" },
  wide: { value: "0.04em" },
  wider: { value: "0.08em" },
  widest: { value: "0.14em" },
});
