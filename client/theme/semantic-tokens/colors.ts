import { defineSemanticTokens } from "@chakra-ui/react";

// Khulwa is dark-only. Every token resolves to its dark counterpart.
export const semanticColors = defineSemanticTokens.colors({
  bg: {
    base: { value: "#1A1814" },
    elevated: { value: "#252220" },
    sunken: { value: "#141210" },
    inverse: { value: "#FAF7F2" },
  },

  surface: {
    card: { value: "#252220" },
    muted: { value: "#1F1D1A" },
  },

  fg: {
    default: { value: "#F5F1EA" },
    muted: { value: "#B5A892" },
    subtle: { value: "#7A7164" },
    inverse: { value: "#1A1814" },
    // Always-light text for content over photo backgrounds (theme-independent),
    // paired with the on-media text styles.
    onMedia: { value: "#FAF7F2" },
    onMediaMuted: { value: "rgba(250, 247, 242, 0.8)" },
  },

  border: {
    subtle: { value: "#2A2723" },
    default: { value: "#3A352E" },
    strong: { value: "#544E44" },
  },

  primary: {
    default: { value: "#9CB3A4" },
    hover: { value: "#B0C4B8" },
    pressed: { value: "#C4D4CC" },
    subtle: { value: "#2C3A33" },
  },

  accent: {
    default: { value: "#F1A23A" },
    subtle: { value: "#3A2D18" },
  },

  status: {
    success: { value: "#4F7A5C" },
    successSubtle: { value: "#1E2A22" },
    warning: { value: "#C77E13" },
    danger: { value: "#B85C3F" },
  },
});
