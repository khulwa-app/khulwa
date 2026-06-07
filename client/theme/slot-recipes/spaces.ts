import { defineSlotRecipe } from "@chakra-ui/react";

export const spacesSlotRecipe = defineSlotRecipe({
  className: "khulwa-spaces",
  slots: ["shell", "layer"],
  base: {
    shell: {
      position: "relative",
      minHeight: "100dvh",
      width: "100%",
      overflow: "hidden",
      bg: "bg.base",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    layer: {
      position: "absolute",
      inset: 0,
      animationDuration: "180ms",
      animationTimingFunction: "ease-out",
      animationFillMode: "both",
      animationName: { _open: "fade-in", _closed: "fade-out" },
      animationDelay: { _open: "220ms", _closed: "0ms" },
    },
  },
});
