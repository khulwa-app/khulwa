import { defineSemanticTokens } from "@chakra-ui/react";

const dual = (light: string, dark: string) => ({
  value: { base: `{shadows.${light}}`, _dark: `{shadows.${dark}}` },
});

export const semanticShadows = defineSemanticTokens.shadows({
  focus: { value: "{shadows.focus}" },

  xs: dual("xsLight", "xsDark"),
  sm: dual("smLight", "smDark"),
  md: dual("mdLight", "mdDark"),
  lg: dual("lgLight", "lgDark"),
  xl: dual("xlLight", "xlDark"),

  "glass-rim": {
    value: "{shadows.glassRimTop}, {shadows.glassRimBottom}, {shadows.glassLift}",
  },
  "glass-rim-sm": {
    value: "{shadows.glassRimTop}, {shadows.glassRimBottom}, {shadows.glassLiftSm}",
  },
  "glass-rim-lg": {
    value: "{shadows.glassRimTop}, {shadows.glassRimBottom}, {shadows.glassLiftLg}",
  },
});
