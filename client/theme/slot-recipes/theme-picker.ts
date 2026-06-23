import { defineSlotRecipe } from "@chakra-ui/react";

// Background "Theme Library" grid — preview tiles for aurora gradients + photo
// wallpapers. Selected tile gets a jade ring.
export const themePickerSlotRecipe = defineSlotRecipe({
  className: "khulwa-theme-picker",
  slots: ["grid", "tile", "thumb", "label"],
  base: {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "3",
    },
    tile: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      padding: "0",
      border: "0",
      bg: "transparent",
      cursor: "pointer",
      textAlign: "start",
    },
    thumb: {
      position: "relative",
      aspectRatio: "16 / 10",
      w: "full",
      rounded: "md",
      overflow: "hidden",
      borderWidth: "2px",
      borderColor: "transparent",
      transitionProperty: "border-color, transform",
      transitionDuration: "fast",
      _hover: { borderColor: "border.strong" },
      "&[data-active]": { borderColor: "primary.default" },
    },
    label: {
      textStyle: "xs",
      color: "fg.muted",
      "&[data-active]": { color: "fg.default" },
    },
  },
});
