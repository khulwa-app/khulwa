import { defineSemanticTokens } from "@chakra-ui/react";

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

  field: {
    bg: dual("sand.200", "charcoal.700"),
    bgHover: dual("sand.300", "charcoal.600"),
  },

  fg: {
    DEFAULT: dual("sand.950", "charcoal.50"),
    default: dual("sand.950", "charcoal.50"),
    muted: dual("sand.700", "charcoal.300"),
    subtle: dual("sand.600", "charcoal.400"),
    faint: dual("sand.500", "charcoal.500"),
    inverse: dual("sand.100", "charcoal.900"),
    inverseMuted: dual("sand.300", "charcoal.600"),

    onMesh: dual("inkA.strong", "whiteA.strong"),
    onMeshMuted: dual("inkA.mid", "whiteA.mid"),
    onMeshSubtle: dual("inkA.soft", "whiteA.soft"),
  },

  border: {
    DEFAULT: dual("sand.400", "charcoal.600"),
    subtle: dual("sand.300", "charcoal.700"),
    default: dual("sand.400", "charcoal.600"),
    muted: dual("sand.300", "charcoal.700"),
    emphasized: dual("sand.500", "charcoal.500"),
    strong: dual("sand.600", "charcoal.500"),
    focus: dual("indigo.500", "indigo.400"),
  },

  primary: {
    default: dual("indigo.500", "indigo.500"),
    hover: dual("indigo.600", "indigo.400"),
    pressed: dual("indigo.700", "indigo.600"),
    subtle: dual("indigo.100", "charcoal.700"),

    onSubtle: dual("indigo.700", "indigo.300"),

    wash: dual("indigo.100", "charcoal.600"),
    fg: dual("white", "white"),
  },

  accent: {
    default: dual("azure.600", "azure.400"),
    hover: dual("azure.500", "azure.300"),
    pressed: dual("azure.700", "azure.500"),
    subtle: dual("azure.100", "charcoal.700"),
    fg: dual("white", "charcoal.900"),
  },

  category: {
    deepWork: dual("indigo.500", "indigo.400"),
    learning: dual("cyan.500", "cyan.400"),
    reading: dual("teal.500", "teal.400"),
    dhikr: dual("amber.500", "amber.400"),
  },

  glass: {
    chromeBg: dual("glassChromeBgLight", "glassChromeBgDark"),
    panelBg: dual("glassPanelBgLight", "glassPanelBgDark"),
    border: dual("glassBorderLight", "glassBorderDark"),
  },

  status: {
    success: dual("green.500", "green.400"),
    successSubtle: dual("green.100", "green.900"),
    danger: dual("red.500", "red.400"),
    dangerSubtle: dual("red.100", "red.900"),
  },
});
