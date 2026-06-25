import { defineSemanticTokens } from "@chakra-ui/react";

// Every role references a primitive via {colors.<scale>.<step>}.
// ZERO hardcoded hex/rgba in this file. Roles never share a CSS var with the
// primitive layer. Dark is re-tuned tonal variants (charcoal end), not inverted
// light — verified for contrast independently.
const c = (token: string) => `{colors.${token}}`;
const dual = (light: string, dark: string) => ({ value: { base: c(light), _dark: c(dark) } });

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: dual("sand.100", "charcoal.900"),
    base: dual("sand.100", "charcoal.900"),
    elevated: dual("white", "charcoal.800"),
    sunken: dual("sand.200", "charcoal.900"),
    inverse: dual("sand.950", "sand.100"),
    panel: dual("white", "charcoal.800"),
    subtle: dual("sand.200", "charcoal.800"),
    muted: dual("sand.200", "charcoal.800"),
    emphasized: dual("sand.300", "charcoal.700"),
    scrim: dual("scrim", "scrimStrong"),
  },

  surface: {
    card: dual("white", "charcoal.800"),
    muted: dual("sand.200", "charcoal.700"),
  },

  fg: {
    DEFAULT: dual("sand.950", "charcoal.50"),
    default: dual("sand.950", "charcoal.50"),
    muted: dual("sand.700", "charcoal.300"),
    subtle: dual("sand.600", "charcoal.400"),
    faint: dual("sand.500", "charcoal.500"),
    inverse: dual("sand.100", "charcoal.900"),
    inverseMuted: dual("sand.300", "charcoal.600"),
  },

  border: {
    DEFAULT: dual("sand.400", "charcoal.600"),
    subtle: dual("sand.300", "charcoal.700"),
    default: dual("sand.400", "charcoal.600"),
    muted: dual("sand.300", "charcoal.700"),
    emphasized: dual("sand.500", "charcoal.500"),
    strong: dual("sand.600", "charcoal.500"),
    focus: dual("violet.500", "violet.400"),
  },

  primary: {
    default: dual("violet.500", "violet.400"),
    hover: dual("violet.600", "violet.300"),
    pressed: dual("violet.700", "violet.500"),
    subtle: dual("violet.100", "charcoal.700"),
    fg: dual("white", "charcoal.900"),
  },

  accent: {
    default: dual("magenta.500", "magenta.400"),
    hover: dual("magenta.400", "magenta.300"),
    pressed: dual("magenta.600", "magenta.500"),
    subtle: dual("magenta.100", "charcoal.700"),
    fg: dual("white", "charcoal.900"),
  },

  category: {
    deepWork: dual("violet.500", "violet.400"),
    learning: dual("magenta.500", "magenta.400"),
    reading: dual("teal.500", "teal.400"),
    dhikr: dual("amber.500", "amber.400"),
  },

  status: {
    success: dual("green.500", "green.400"),
    successSubtle: dual("green.100", "green.900"),
    danger: dual("red.500", "red.400"),
    dangerSubtle: dual("red.100", "red.900"),
  },
});
