import { defineSemanticTokens } from "@chakra-ui/react";

const c = (token: string) => `{colors.${token}}`;
const one = (token: string) => ({ value: c(token) });

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: one("sage.50"),
    subtle: one("sage.100"),
    muted: one("sage.100"),
    emphasized: one("sage.200"),
    panel: one("sand.50"),
    error: one("red.100"),
    success: one("green.100"),
    scrim: one("scrim"),
  },

  fg: {
    DEFAULT: one("sage.900"),
    muted: one("sage.700"),
    subtle: one("sand.600"),
    disabled: one("sand.500"),
    inverted: one("sand.100"),
    error: one("red.500"),
    success: one("green.500"),

    onMesh: {
      DEFAULT: one("sage.900"),
      muted: one("sage.700"),
      subtle: one("sage.600"),
    },
  },

  border: {
    DEFAULT: one("sage.300"),
    subtle: one("sage.200"),
    emphasized: one("sage.400"),
    focus: one("sage.600"),
  },

  primary: {
    solid: one("sage.800"),
    contrast: one("sand.100"),
    fg: one("sage.800"),
    muted: one("sage.200"),
    subtle: one("sage.100"),
    emphasized: one("sage.700"),
    focusRing: one("sage.600"),
  },

  category: {
    deepWork: one("sage.800"),
    learning: one("sage.600"),
    reading: one("sage.500"),
    dhikr: { value: "#C97952" },
  },

  glass: {
    sheet: one("sand.100"),
    chrome: one("sand.100"),
    chromeHover: one("sand.200"),
    chromePressed: one("sand.300"),
    panel: one("sand.50"),
    clear: one("sand.100"),
    divider: one("sage.200"),
    border: one("sage.300"),
    borderLit: one("sage.300"),
    borderFocus: one("sage.600"),
  },
});
