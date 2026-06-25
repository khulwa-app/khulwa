import { defineTokens } from "@chakra-ui/react";

// Unified motion vocabulary. Enter is ease-out (decelerate), exit ease-in
// (accelerate) and ~70% of enter so dismissals feel responsive. Press feedback
// uses `instant`. Recipes reference these by name; never inline raw ms.
export const durations = defineTokens.durations({
  instant: { value: "100ms" },
  enter: { value: "200ms" },
  exit: { value: "140ms" },
  slow: { value: "280ms" },
});

export const easings = defineTokens.easings({
  enter: { value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  exit: { value: "cubic-bezier(0.4, 0, 1, 1)" },
  standard: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
});
