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
      bg: "bg",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    layer: {
      position: "absolute",
      inset: 0,
      // Scroll-safe: when a space's content is taller than the viewport it
      // scrolls here instead of clipping (paired with minH content below).
      overflowY: "auto",
      overflowX: "hidden",
      overscrollBehavior: "contain",
      animationDuration: "enter",
      animationTimingFunction: "enter",
      animationFillMode: "both",
      animationName: { _open: "fade-in", _closed: "fade-out" },
      animationDelay: { _open: "220ms", _closed: "0ms" },
    },
  },
});
