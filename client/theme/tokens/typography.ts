import { defineTokens } from "@chakra-ui/react";

export const fonts = defineTokens.fonts({
  // v3 "Quiet Focus": Geist for display/heading, Inter for body, Geist Mono for
  // timers/data. IBM Plex Sans Arabic carries Arabic UI; Amiri the āyah.
  display: { value: "var(--font-display), var(--font-arabic-body), 'Geist', system-ui, sans-serif" },
  heading: { value: "var(--font-display), var(--font-arabic-body), 'Geist', system-ui, sans-serif" },
  body: { value: "var(--font-body), var(--font-arabic-body), 'Inter', system-ui, sans-serif" },
  mono: { value: "var(--font-mono), 'Geist Mono', ui-monospace, monospace" },
  arabicDisplay: { value: "var(--font-arabic-display), 'Reem Kufi', sans-serif" },
});

export const fontSizes = defineTokens.fontSizes({
  xs: { value: "0.75rem" },
  "label-sm": { value: "0.8125rem" },
  sm: { value: "0.875rem" },
  md: { value: "1rem" },
  lg: { value: "1.125rem" },
  xl: { value: "1.25rem" },
  "2xl": { value: "1.5rem" },
  "3xl": { value: "2rem" },
  "4xl": { value: "2.5rem" },
  "5xl": { value: "3rem" },
  "6xl": { value: "4rem" },
  "7xl": { value: "5.5rem" },
  timer: { value: "9rem" },
  "numeric-display": { value: "3.5rem" },
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
  tight: { value: "1.1" },
  snug: { value: "1.25" },
  normal: { value: "1.5" },
  relaxed: { value: "1.65" },
  loose: { value: "1.8" },
});

export const letterSpacings = defineTokens.letterSpacings({
  tighter: { value: "-0.04em" },
  tight: { value: "-0.02em" },
  normal: { value: "0em" },
  wide: { value: "0.03em" },
  wider: { value: "0.05em" },
  widest: { value: "0.12em" },
});
