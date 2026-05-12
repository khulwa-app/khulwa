import { defineTokens } from "@chakra-ui/react";

export const durations = defineTokens.durations({
  fastest: { value: "90ms" },
  fast: { value: "150ms" },
  base: { value: "220ms" },
  slow: { value: "320ms" },
  slower: { value: "500ms" },
  bg: { value: "650ms" },
});
