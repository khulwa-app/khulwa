import { defineTokens } from "@chakra-ui/react";

// Raw shadows hold only the focus ring (a solid sage ring, visible in both
// themes). The elevation scale (xs–xl) lives in semantic tokens so it can carry
// light + dark values — see semantic-tokens/shadows.ts.
export const shadows = defineTokens.shadows({
  focus: { value: "0 0 0 3px {colors.ring}" },
});
