import { defineTokens } from "@chakra-ui/react";

export const shadows = defineTokens.shadows({
  focus: { value: "0 0 0 2px {colors.bg.elevated}, 0 0 0 4px {colors.ring}" },

  xs: { value: "0 1px 2px rgba(8, 10, 30, 0.06)" },
  sm: { value: "0 1px 2px rgba(8, 10, 30, 0.06), 0 2px 6px rgba(8, 10, 30, 0.08)" },
  md: { value: "0 2px 4px rgba(8, 10, 30, 0.07), 0 8px 24px rgba(8, 10, 30, 0.10)" },
  lg: { value: "0 4px 8px rgba(8, 10, 30, 0.08), 0 16px 40px rgba(8, 10, 30, 0.12)" },
  xl: { value: "0 8px 16px rgba(8, 10, 30, 0.10), 0 24px 64px rgba(8, 10, 30, 0.14)" },

  glassRimEdge: { value: "inset 0 1px 0 rgba(255, 255, 255, 0.16)" },
  glassRimSheen: { value: "inset 0 6px 14px rgba(255, 255, 255, 0.08)" },
  glassLiftSm: { value: "0 4px 16px rgba(8, 10, 30, 0.12)" },
  glassLift: { value: "0 8px 32px rgba(8, 10, 30, 0.14)" },
  glassLiftLg: { value: "0 24px 80px rgba(8, 10, 30, 0.16)" },
});
