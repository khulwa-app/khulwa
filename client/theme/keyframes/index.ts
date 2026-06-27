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

  "row-in": {
    from: { opacity: 0, transform: "translateY(4px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },

  "rise-in": {
    from: { opacity: 0, transform: "translateY(16px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },

  "noor-pulse": {
    "0%, 100%": { transform: "scale(0.95) translateY(1px)", opacity: "0.85" },
    "50%": { transform: "scale(1.08) translateY(-1px)", opacity: "1" },
  },

  "noor-hue": {
    "0%, 100%": { filter: "blur(3px) hue-rotate(-14deg) brightness(1)" },
    "50%": { filter: "blur(3px) hue-rotate(16deg) brightness(1.12)" },
  },
  "noor-bloom": {
    "0%": { transform: "scale(1)", opacity: "0.9" },
    "45%": { transform: "scale(1.55)", opacity: "1" },
    "100%": { transform: "scale(1)", opacity: "0.85" },
  },
});
