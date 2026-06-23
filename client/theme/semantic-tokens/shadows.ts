import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticShadows = defineSemanticTokens.shadows({
  focus: { value: "{shadows.focus}" },

  xs: { value: "0 1px 2px rgba(26, 24, 20, 0.04)" },
  sm: {
    value: "0 1px 2px rgba(26, 24, 20, 0.05), 0 2px 6px rgba(26, 24, 20, 0.06)",
  },
  md: {
    value: "0 2px 4px rgba(26, 24, 20, 0.06), 0 8px 24px rgba(26, 24, 20, 0.08)",
  },
  lg: {
    value: "0 4px 8px rgba(26, 24, 20, 0.06), 0 16px 40px rgba(26, 24, 20, 0.10)",
  },
  xl: {
    value: "0 8px 16px rgba(26, 24, 20, 0.08), 0 24px 64px rgba(26, 24, 20, 0.12)",
  },

  "glow-sage": { value: "0 0 32px 4px rgba(124, 152, 133, 0.30)" },
});
