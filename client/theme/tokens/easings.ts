import { defineTokens } from "@chakra-ui/react";

export const easings = defineTokens.easings({
  standard: { value: "cubic-bezier(0.2, 0, 0, 1)" },
  decelerate: { value: "cubic-bezier(0, 0, 0.15, 1)" },
  accelerate: { value: "cubic-bezier(0.3, 0, 1, 1)" },
  emphasized: { value: "cubic-bezier(0.2, 0, 0, 1.4)" },
});
