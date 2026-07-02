import { defineSemanticTokens } from "@chakra-ui/react";

const ref = (token: string) => ({ value: `{shadows.${token}}` });

export const semanticShadows = defineSemanticTokens.shadows({
  focus: ref("focus"),

  xs: ref("xs"),
  sm: ref("sm"),
  md: ref("md"),
  lg: ref("lg"),
  xl: ref("xl"),

  "glass-rim": {
    value: "{shadows.glassRimEdge}, {shadows.glassRimSheen}, {shadows.glassLift}",
  },
  "glass-rim-sm": {
    value: "{shadows.glassRimEdge}, {shadows.glassRimSheen}, {shadows.glassLiftSm}",
  },
  "glass-rim-lg": {
    value: "{shadows.glassRimEdge}, {shadows.glassRimSheen}, {shadows.glassLiftLg}",
  },
});
