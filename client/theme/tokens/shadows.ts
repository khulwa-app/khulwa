import { defineTokens } from "@chakra-ui/react";

// Shadow scale tuned for warm-stone surfaces.
export const shadows = defineTokens.shadows({
  xs: { value: "0 1px 2px 0 rgba(28, 25, 23, 0.06)" },
  sm: { value: "0 2px 6px -1px rgba(28, 25, 23, 0.08), 0 1px 2px -1px rgba(28, 25, 23, 0.06)" },
  md: { value: "0 8px 18px -6px rgba(28, 25, 23, 0.12), 0 2px 6px -2px rgba(28, 25, 23, 0.08)" },
  lg: { value: "0 18px 38px -12px rgba(28, 25, 23, 0.16), 0 6px 14px -6px rgba(28, 25, 23, 0.10)" },
  xl: { value: "0 28px 60px -20px rgba(28, 25, 23, 0.20), 0 12px 24px -10px rgba(28, 25, 23, 0.12)" },
  "2xl": { value: "0 40px 90px -28px rgba(28, 25, 23, 0.28)" },
  focus: { value: "0 0 0 3px rgba(20, 184, 166, 0.45)" },
  "focus-error": { value: "0 0 0 3px rgba(239, 68, 68, 0.45)" },
});
