import { defineTokens } from "@chakra-ui/react";

// Dark-only palette (raw scale). Matches semantic-tokens/colors.ts.
export const colors = defineTokens.colors({
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
