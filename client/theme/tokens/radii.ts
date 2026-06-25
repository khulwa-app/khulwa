import { defineTokens } from "@chakra-ui/react";

// Primitive radius steps. Do NOT reference these directly in components —
// use the THREE semantic tiers in ../semantic-tokens/radii.ts (chip / control
// / surface). Only three steps carry the system; the rest exist for the rare
// one-off and to keep Chakra utilities (rounded="xl" etc.) type-valid.
// Values in rem so they respect the user's root font-size.
export const radii = defineTokens.radii({
  none: { value: "0" },
  xs: { value: "0.5rem" }, //  8px  — chip tier
  sm: { value: "0.625rem" }, // 10px
  md: { value: "0.75rem" }, //  12px — control tier (square icon chrome)
  lg: { value: "1.125rem" }, // 18px — controlWide tier (text buttons/inputs)
  xl: { value: "1.5rem" }, //   24px
  "2xl": { value: "1.75rem" }, // 28px — surface tier (containers)
  "3xl": { value: "2rem" }, //   32px
  full: { value: "9999px" }, // circles only
});
