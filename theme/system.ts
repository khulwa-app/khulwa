import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { tokens } from "./tokens";
import { semanticTokens } from "./semantic-tokens";
import { textStyles } from "./text-styles";
import { layerStyles } from "./layer-styles";
import { recipes } from "./recipes";
import { keyframes } from "./keyframes";
import { slotRecipes } from "./slot-recipes";

const config = defineConfig({
  cssVarsPrefix: "khulwa",
  globalCss: {
    "html, body": {
      bg: "bg",
      color: "fg",
      fontFamily: "body",
      minHeight: "100%",
    },
    html: { scrollBehavior: "auto" },
    "[data-numeric]": { fontVariantNumeric: "tabular-nums" },
    // Focus model: `*:focus-visible` is the FALLBACK ring for elements with no recipe focus treatment.
    // Recipes in @layer recipes intentionally own their own focus (inputs, dock, buttons) and win
    // by both layer and specificity. `*:focus` only strips the browser's mouse outline — keyboard
    // :focus-visible always keeps a ring. Do NOT set disableLayers (un-layers Chakra's reset/defaults).
    "*:focus": { outline: "none" },
    "*:focus-visible": { outline: "none", boxShadow: "focusRing" },
  },
  theme: {
    breakpoints: { sm: "30em", md: "48em", lg: "62em", xl: "80em", "2xl": "96em" },
    tokens,
    semanticTokens,
    textStyles,
    layerStyles,
    recipes,
    keyframes,
    slotRecipes,
  },
});

export const system = createSystem(defaultConfig, config);
