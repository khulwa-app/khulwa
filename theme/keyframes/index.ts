import { defineKeyframes } from "@chakra-ui/react";

export const keyframes = defineKeyframes({
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "fade-out": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  "panel-in": {
    from: { opacity: 0, transform: "translateY(12px) scale(0.98)" },
    to: { opacity: 1, transform: "translateY(0) scale(1)" },
  },
  "panel-out": {
    from: { opacity: 1, transform: "translateY(0) scale(1)" },
    to: { opacity: 0, transform: "translateY(12px) scale(0.98)" },
  },
  "drawer-in": {
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "drawer-out": {
    from: { opacity: 1, transform: "translateX(0)" },
    to: { opacity: 0, transform: "translateX(100%)" },
  },

  "row-in": {
    from: { opacity: 0, transform: "translateY(4px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },

  "rise-in": {
    from: { opacity: 0, transform: "translateY(16px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});
