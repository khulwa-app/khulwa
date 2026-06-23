import { defineTokens } from "@chakra-ui/react";

// Primitives only — semantic layer owns color roles; duplicating them collides on the CSS var.
export const colors = defineTokens.colors({
  ring: { value: "#7C9885" },
});
