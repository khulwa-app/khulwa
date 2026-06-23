import { defineSemanticTokens } from "@chakra-ui/react";

// `_dark` emitted so values beat Chakra's defaultConfig under the `.dark` class.
const c = (v: string) => ({ value: { base: v, _dark: v } });

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: c("#1A1814"),
    base: c("#1A1814"),
    elevated: c("#252220"),
    sunken: c("#141210"),
    inverse: c("#F5F1EA"),
    panel: c("#252220"),
    subtle: c("#1F1D1A"),
    muted: c("#1F1D1A"),
    emphasized: c("#2E2A26"),
    inverted: c("#F5F1EA"),
  },

  surface: {
    card: c("#252220"),
    muted: c("#1F1D1A"),
  },

  fg: {
    DEFAULT: c("#F5F1EA"),
    default: c("#F5F1EA"),
    muted: c("#B5A892"),
    subtle: c("#6F6657"),
    inverse: c("#1A1814"),
    inverted: c("#1A1814"),
    onMedia: { value: "#F4F6F4" },
    onMediaMuted: { value: "rgba(244, 246, 244, 0.82)" },
  },

  border: {
    DEFAULT: c("#3A3327"),
    subtle: c("#2A2419"),
    default: c("#3A3327"),
    muted: c("#2A2419"),
    emphasized: c("#4A4234"),
    strong: c("#564C3C"),
  },

  primary: {
    default: c("#9CB3A4"),
    hover: c("#9BBCA8"),
    pressed: c("#ACC9B8"),
    subtle: c("#2C3A33"),
  },

  accent: {
    default: c("#F1A23A"),
    subtle: c("#3A2D18"),
  },

  status: {
    success: c("#6CB87C"),
    successSubtle: c("#16291E"),
    warning: c("#D2A24A"),
    danger: c("#DD6A5C"),
  },
});
