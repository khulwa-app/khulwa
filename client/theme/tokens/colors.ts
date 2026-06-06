import { defineTokens } from "@chakra-ui/react";

export const colors = defineTokens.colors({
  bg: {
    base: { value: "#FAF7F2" },
    elevated: { value: "#FFFFFF" },
    sunken: { value: "#F2EDE5" },
    inverse: { value: "#1A1814" },
  },

  surface: {
    card: { value: "#FFFFFF" },
    muted: { value: "#F5F1EA" },
  },

  fg: {
    default: { value: "#1A1814" },
    muted: { value: "#6B6357" },
    subtle: { value: "#9B9286" },
    inverse: { value: "#FAF7F2" },
  },

  border: {
    subtle: { value: "#ECE5D9" },
    default: { value: "#D9CFBC" },
    strong: { value: "#B5A892" },
  },

  primary: {
    default: { value: "#7C9885" },
    hover: { value: "#6A8473" },
    pressed: { value: "#587062" },
    subtle: { value: "#E3EBE3" },
  },

  accent: {
    default: { value: "#D97706" },
    subtle: { value: "#FEF3E2" },
  },

  status: {
    success: { value: "#4F7A5C" },
    successSubtle: { value: "#E3EFE6" },
    warning: { value: "#C77E13" },
    danger: { value: "#B85C3F" },
  },
});
