import { defineRecipe } from "@chakra-ui/react";

export const spaceLayerRecipe = defineRecipe({
  className: "khulwa-space-layer",
  base: {
    position: "absolute",
    inset: 0,
    animationDuration: "180ms",
    animationTimingFunction: "ease-out",
    animationFillMode: "both",
    animationName: { _open: "fade-in", _closed: "fade-out" },
    animationDelay: { _open: "220ms", _closed: "0ms" },
  },
});
