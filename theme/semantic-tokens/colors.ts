import { defineSemanticTokens } from "@chakra-ui/react";

const c = (token: string) => `{colors.${token}}`;
const one = (token: string) => ({ value: c(token) });

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: one("sage.50"),
    subtle: one("sage.100"),
    muted: one("sage.100"),
    emphasized: one("sage.200"),
    panel: one("white"),
    error: one("red.100"),
    success: one("green.100"),
    scrim: one("scrim"),
  },

  fg: {
    DEFAULT: one("sand.950"),
    muted: one("sand.700"),
    subtle: one("sand.600"),
    disabled: one("sand.500"),
    inverted: one("sand.100"),
    error: one("red.500"),
    success: one("green.500"),

    onMesh: {
      DEFAULT: one("whiteA.strong"),
      muted: one("whiteA.mid"),
      subtle: one("whiteA.soft"),
    },
  },

  border: {
    DEFAULT: one("sage.300"),
    subtle: one("sage.200"),
    emphasized: one("sage.400"),
    focus: one("sage.600"),
  },

  primary: {
    solid: one("teal.500"),
    contrast: one("white"),
    fg: one("teal.700"),
    muted: one("teal.200"),
    subtle: one("teal.100"),
    emphasized: one("teal.600"),
    focusRing: one("teal.500"),
  },

  category: {
    deepWork: one("indigo.500"),
    learning: one("cyan.500"),
    reading: one("teal.500"),
    dhikr: one("amber.500"),
  },

  glass: {
    sheet: one("whiteA.sheet"),
    chrome: one("inkA.chip"),
    chromeHover: one("inkA.lift"),
    chromePressed: one("inkA.press"),
    panel: one("inkA.veil"),
    clear: one("inkA.clear"),
    divider: one("whiteA.dim"),
    border: { value: "rgba(255, 255, 255, 0.16)" },
    borderLit: { value: "rgba(255, 255, 255, 0.16)" },
    borderFocus: { value: "rgba(255, 255, 255, 0.40)" },
  },
});
