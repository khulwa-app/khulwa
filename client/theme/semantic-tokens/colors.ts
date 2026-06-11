import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: { value: "#1A1814" },
    base: { value: "#1A1814" },
    elevated: { value: "#252220" },
    sunken: { value: "#141210" },
    inverse: { value: "#FAF7F2" },
    panel: { value: "#252220" },
    subtle: { value: "#1F1D1A" },
    muted: { value: "#252220" },
    emphasized: { value: "#2A2723" },
    inverted: { value: "#FAF7F2" },
  },

  surface: {
    card: { value: "#252220" },
    muted: { value: "#1F1D1A" },
  },

  fg: {
    DEFAULT: { value: "#F5F1EA" },
    default: { value: "#F5F1EA" },
    muted: { value: "#B5A892" },
    subtle: { value: "#7A7164" },
    inverse: { value: "#1A1814" },
    inverted: { value: "#1A1814" },
    // Always-light text for content over photo backgrounds (theme-independent),
    // paired with the on-media text styles.
    onMedia: { value: "#FAF7F2" },
    onMediaMuted: { value: "rgba(250, 247, 242, 0.8)" },
  },

  border: {
    DEFAULT: { value: "#3A352E" },
    subtle: { value: "#2A2723" },
    default: { value: "#3A352E" },
    muted: { value: "#2A2723" },
    emphasized: { value: "#544E44" },
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
