import { defineSemanticTokens } from "@chakra-ui/react";

const c = (token: string) => `{colors.${token}}`;
const one = (token: string) => ({ value: c(token) });

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: one("jet.950"),
    subtle: one("jet.900"),
    muted: one("jet.800"),
    emphasized: one("jet.700"),
    panel: one("jet.900"),
    raised: one("inkA.chip"),
    raisedHover: one("inkA.lift"),
    raisedActive: one("inkA.press"),
    // @deprecated light-legacy status washes — die with the auth/settings redesigns
    error: one("red.100"),
    success: one("green.100"),
    scrim: one("scrim"),
  },

  fg: {
    DEFAULT: one("whiteA.strong"),
    muted: one("whiteA.mid"),
    subtle: one("whiteA.soft"),
    disabled: one("whiteA.soft"),
    inverted: one("jet.950"),
    error: one("red.500"),
    success: one("green.500"),
  },

  border: {
    DEFAULT: one("whiteA.dim"),
    subtle: one("whiteA.faint"),
    emphasized: one("whiteA.dim"),
    focus: one("peach.500"),
  },

  primary: {
    solid: one("peach.600"),
    contrast: one("white"),
    fg: one("peach.700"),
    muted: one("peach.200"),
    subtle: one("peach.100"),
    // on the dark field a solid accent brightens on hover: 600 -> 500
    emphasized: one("peach.500"),
    focusRing: one("peach.500"),
  },

  category: {
    deepWork: one("jet.400"),
    learning: one("dust.400"),
    reading: one("desert.400"),
    dhikr: one("peach.300"),
  },
});
