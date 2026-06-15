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
  // Row entrance, staggered per item via animation-delay.
  "row-in": {
    from: { opacity: 0, transform: "translateY(4px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  // AI chip "processing" sweep — a band of light travels across the gradient.
  shimmer: {
    from: { backgroundPosition: "200% 0" },
    to: { backgroundPosition: "-200% 0" },
  },
  // AI chip resting "alive" glow — a soft breathing halo.
  "glow-pulse": {
    "0%, 100%": { boxShadow: "0 0 0 0 rgba(241, 162, 58, 0)" },
    "50%": { boxShadow: "0 0 12px 1px rgba(241, 162, 58, 0.35)" },
  },
});
