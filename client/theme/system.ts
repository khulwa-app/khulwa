import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { tokens } from "./tokens";
import { semanticTokens } from "./semantic-tokens";
import { textStyles } from "./text-styles";
import { slotRecipes } from "./slot-recipes";

const config = defineConfig({
  cssVarsPrefix: "khulwa",
  globalCss: {
    "html, body": {
      bg: "bg.canvas",
      color: "fg",
      fontFamily: "body",
    },
    "[data-numeric]": {
      fontVariantNumeric: "tabular-nums",
    },
    "*:focus-visible": {
      outline: "none",
      boxShadow: "focus",
    },
  },
  theme: {
    breakpoints: {
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
      "2xl": "96em",
    },
    slotRecipes,
    tokens,
    semanticTokens,
    textStyles,
  },
});

export const system = createSystem(defaultConfig, config);
