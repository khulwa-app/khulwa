import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticShadows = defineSemanticTokens.shadows({
  focusRing: { value: "0 0 0 2px {colors.primary.focusRing}" },

  dock: {
    value: "0 1px 2px rgba(0, 17, 28, 0.12), 0 3px 7px -1px rgba(0, 17, 28, 0.10)",
  },
  "hero-text": {
    value: "0 2px 4px rgba(0,17,28,0.06), 0 8px 24px rgba(0,17,28,0.08)",
  },
  "hero-meta-text": {
    value: "0 1px 2px rgba(0,17,28,0.05), 0 2px 6px rgba(0,17,28,0.06)",
  },
});
