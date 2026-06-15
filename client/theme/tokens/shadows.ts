import { defineTokens } from "@chakra-ui/react";

// Shadows tuned for Khulwa's dark warm theme. The backdrop is already dark
// (#1A1814), so depth needs real opacity (35–65%) — the old light-theme
// values (4–12%) were invisible. Two layers per step: a tight key shadow
// (contact) plus a wide soft ambient (depth). The shadow color is the
// palette's warm black (deeper cut of bg.sunken), never a cold neutral.
export const shadows = defineTokens.shadows({
  xs: { value: "0 1px 2px rgba(10, 9, 7, 0.45)" },
  sm: {
    value: "0 1px 1px rgba(10, 9, 7, 0.35), 0 3px 10px -2px rgba(10, 9, 7, 0.35)",
  },
  md: {
    value: "0 2px 4px rgba(10, 9, 7, 0.35), 0 10px 24px -4px rgba(10, 9, 7, 0.45)",
  },
  lg: {
    value: "0 4px 8px rgba(10, 9, 7, 0.35), 0 20px 48px -8px rgba(10, 9, 7, 0.55)",
  },
  xl: {
    value: "0 8px 16px rgba(10, 9, 7, 0.40), 0 32px 80px -12px rgba(10, 9, 7, 0.65)",
  },
  "edge-highlight": { value: "inset 0 1px 0 rgba(245, 241, 234, 0.07)" },
  "edge-ring": { value: "0 0 0 1px rgba(245, 241, 234, 0.05)" },

  "glow-sage": { value: "0 0 32px 4px rgba(124, 152, 133, 0.30)" },
  focus: { value: "0 0 0 3px {colors.primary.subtle}" },
});
