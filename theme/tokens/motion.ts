import { defineTokens } from "@chakra-ui/react";

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
