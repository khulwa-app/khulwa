import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticShadows = defineSemanticTokens.shadows({
  focus: { value: "0 0 0 2px {colors.bg.panel}, 0 0 0 4px {colors.primary.focusRing}" },

  dock: {
    value: "0 1px 2px rgba(10, 16, 20, 0.12), 0 3px 7px -1px rgba(10, 16, 20, 0.10)",
  },
  glass: {
    value:
      "0 2px 6px rgba(10, 16, 20, 0.10), 0 16px 40px -4px rgba(10, 16, 20, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.30), inset 0 -1px 0 rgba(255, 255, 255, 0.05)",
  },
  "glass-sm": {
    value:
      "0 1px 2px rgba(10, 16, 20, 0.12), 0 4px 10px -1px rgba(10, 16, 20, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.30), inset 0 -1px 0 rgba(255, 255, 255, 0.05)",
  },
});
