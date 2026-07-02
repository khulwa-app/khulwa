import { defineSemanticTokens } from "@chakra-ui/react";

const c = (token: string) => `{colors.${token}}`;
const one = (token: string) => ({ value: c(token) });

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: one("sage.50"),
    base: one("sage.50"),
    elevated: one("white"),
    sunken: one("sage.100"),
    inverse: one("sand.950"),
    panel: one("white"),
    subtle: one("sage.100"),
    muted: one("sage.100"),
    emphasized: one("sage.200"),
    scrim: one("scrim"),
  },

  surface: {
    card: one("white"),
    muted: one("sage.100"),
  },

  field: {
    bg: one("sage.100"),
    bgHover: one("sage.200"),
  },

  fg: {
    DEFAULT: one("sand.950"),
    default: one("sand.950"),
    muted: one("sand.700"),
    subtle: one("sand.600"),
    faint: one("sand.500"),
    inverse: one("sand.100"),
    inverseMuted: one("sand.300"),

    onMesh: one("whiteA.strong"),
    onMeshMuted: one("whiteA.mid"),
    onMeshSubtle: one("whiteA.soft"),
    onMeshDisabled: one("whiteA.disabled"),
  },

  border: {
    DEFAULT: one("sage.300"),
    subtle: one("sage.200"),
    default: one("sage.300"),
    muted: one("sage.200"),
    emphasized: one("sage.400"),
    strong: one("sage.500"),
    focus: one("sage.600"),
  },

  primary: {
    default: one("sage.600"),
    hover: one("sage.700"),
    pressed: one("sage.800"),
    subtle: one("sage.100"),

    onSubtle: one("sage.700"),

    wash: one("sage.100"),
    fg: one("white"),
  },

  accent: {
    default: one("teal.600"),
    hover: one("teal.500"),
    pressed: one("teal.700"),
    subtle: one("teal.100"),
    fg: one("white"),
  },

  category: {
    deepWork: one("indigo.500"),
    learning: one("cyan.500"),
    reading: one("teal.500"),
    dhikr: one("amber.500"),
  },

  glass: {
    chromeBg: one("inkA.soft"),
    panelBg: one("inkA.mid"),
    border: one("glassRim"),
    borderLit: one("glassRim"),
    borderFocus: one("glassRimFocus"),
  },

  status: {
    success: one("green.500"),
    successSubtle: one("green.100"),
    danger: one("red.500"),
    dangerSubtle: one("red.100"),
  },
});
