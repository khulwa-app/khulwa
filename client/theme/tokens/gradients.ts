import { defineTokens } from "@chakra-ui/react";

// Single, calm canvas gradient. Per-space variety lives in the BG picker, not tokens.
export const gradients = defineTokens.gradients({
  appCanvas: {
    value:
      "radial-gradient(at 50% 0%, rgba(20, 184, 166, 0.08) 0%, transparent 60%), linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 100%)",
  },
  brandSheen: {
    value:
      "linear-gradient(135deg, #14B8A6 0%, #0D9488 50%, #0F766E 100%)",
  },
  ctaSheen: {
    value:
      "linear-gradient(135deg, #FB923C 0%, #EA580C 50%, #C2410C 100%)",
  },
});
