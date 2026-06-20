import { defineSlotRecipe } from "@chakra-ui/react";

export const soundsSlotRecipe = defineSlotRecipe({
  className: "khulwa-sounds",
  slots: ["grid", "tile", "toggle", "iconWrap", "title"],
  base: {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      alignItems: "start",
      gap: "1",
    },
    tile: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "1.5",
    },
    toggle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5",
      paddingBlock: "2.5",
      paddingInline: "1",
      rounded: "lg",
      cursor: "pointer",
      transitionProperty: "background-color",
      transitionDuration: "fast",
    },
    iconWrap: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      boxSize: "9",
      rounded: "full",
      bg: "bg.elevated",
      color: "fg.muted",
      transitionProperty: "background-color, color",
      transitionDuration: "fast",
      "&[data-active]": { bg: "primary.default", color: "fg.inverse" },
    },
    title: {
      textStyle: "xs",
      textAlign: "center",
      lineClamp: 1,
      color: "fg.muted",
      "&[data-active]": { color: "fg.default" },
    },
  },
});
