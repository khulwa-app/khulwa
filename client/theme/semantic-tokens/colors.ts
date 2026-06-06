import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    base: { value: { base: "#FAF7F2", _dark: "#1A1814" } },
    elevated: { value: { base: "#FFFFFF", _dark: "#252220" } },
    sunken: { value: { base: "#F2EDE5", _dark: "#141210" } },
    inverse: { value: { base: "#1A1814", _dark: "#FAF7F2" } },
  },

  surface: {
    card: { value: { base: "#FFFFFF", _dark: "#252220" } },
    muted: { value: { base: "#F5F1EA", _dark: "#1F1D1A" } },
  },

  fg: {
    default: { value: { base: "#1A1814", _dark: "#F5F1EA" } },
    muted: { value: { base: "#6B6357", _dark: "#B5A892" } },
    subtle: { value: { base: "#9B9286", _dark: "#7A7164" } },
    inverse: { value: { base: "#FAF7F2", _dark: "#1A1814" } },
  },

  border: {
    subtle: { value: { base: "#ECE5D9", _dark: "#2A2723" } },
    default: { value: { base: "#D9CFBC", _dark: "#3A352E" } },
    strong: { value: { base: "#B5A892", _dark: "#544E44" } },
  },

  primary: {
    default: { value: { base: "#7C9885", _dark: "#9CB3A4" } },
    hover: { value: { base: "#6A8473", _dark: "#B0C4B8" } },
    pressed: { value: { base: "#587062", _dark: "#C4D4CC" } },
    subtle: { value: { base: "#E3EBE3", _dark: "#2A332C" } },
  },

  accent: {
    default: { value: { base: "#D97706", _dark: "#D97706" } },
    subtle: { value: { base: "#FEF3E2", _dark: "#3A2810" } },
  },

  status: {
    success: { value: { base: "#4F7A5C", _dark: "#4F7A5C" } },
    successSubtle: { value: { base: "#E3EFE6", _dark: "#1E2A22" } },
    warning: { value: { base: "#C77E13", _dark: "#C77E13" } },
    danger: { value: { base: "#B85C3F", _dark: "#B85C3F" } },
  },
});
