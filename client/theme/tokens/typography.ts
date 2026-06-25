import { defineTokens } from "@chakra-ui/react";

export const fonts = defineTokens.fonts({
  display: { value: "var(--font-display), var(--font-arabic-body), 'DM Sans', system-ui, sans-serif" },
  heading: { value: "var(--font-display), var(--font-arabic-body), 'DM Sans', system-ui, sans-serif" },
  body: { value: "var(--font-body), var(--font-arabic-body), 'Inter', system-ui, sans-serif" },
  mono: { value: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace" },
  // āyah / Arabic display: Klapt Arabic (geometric kufi — soft outside, sharp
  // inside). Self-host the licensed webfont and expose it via next/font/local
  // (see app/fonts.ts); falls back to Reem Kufi until the files land.
  arabicDisplay: {
    value: "'Klapt Arabic', var(--font-arabic-display), 'Reem Kufi', sans-serif",
  },
});

// UI end (2xs–2xl) kept stable; display end (3xl+) retuned to a calmer ~1.25
// modular ratio so large type feels composed rather than shouty.
export const fontSizes = defineTokens.fontSizes({
  "2xs": { value: "0.6875rem" }, // 11px — micro labels, overline chips
  xs: { value: "0.75rem" }, //      12px
  "label-sm": { value: "0.8125rem" }, // 13px
  sm: { value: "0.875rem" }, //     14px
  md: { value: "1rem" }, //         16px — base
  lg: { value: "1.125rem" }, //     18px
  xl: { value: "1.25rem" }, //      20px
  "2xl": { value: "1.5rem" }, //    24px
  "3xl": { value: "1.875rem" }, //  30px
  "4xl": { value: "2.375rem" }, //  38px
  "5xl": { value: "3rem" }, //      48px
  "6xl": { value: "3.75rem" }, //   60px
  "7xl": { value: "4.75rem" }, //   76px
  "8xl": { value: "6rem" }, //      96px — hero / ghosted āyah
  timer: { value: "9rem" }, //     144px — running timer
  "numeric-display": { value: "3.5rem" }, // 56px — session counters
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
