import { defineSlotRecipe } from "@chakra-ui/react";

export const soundsSlotRecipe = defineSlotRecipe({
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
      gap: "2",
      paddingBlock: "2.5",
      paddingInline: "1",
      cursor: "pointer",
      transitionProperty: "transform",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      "@media (hover: hover)": {
        _hover: {
          "& .khulwa-sounds__iconWrap:not([data-active])": { bg: "bg.emphasized", color: "fg" },
          "& .khulwa-sounds__title:not([data-active])": { color: "fg" },
        },
      },
      _active: { transform: "scale(0.97)", transitionDuration: "instant" },
      _motionReduce: { _active: { transform: "none" } },
    },
    iconWrap: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      boxSize: "10",
      rounded: "md",
      bg: "bg.emphasized",
      color: "fg",
      transitionProperty: "background-color, color",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      "&[data-active]": { bg: "primary.solid", color: "primary.contrast" },
    },
    title: {
      textStyle: "xs",
      textAlign: "center",
      lineClamp: 1,
      color: "fg.muted",
      "&[data-active]": { color: "fg" },
    },
  },
});
