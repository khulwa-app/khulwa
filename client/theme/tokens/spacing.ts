import { defineTokens } from "@chakra-ui/react";

// 4/8 step rhythm. Maps directly to Chakra default scale.
export const spacing = defineTokens.spacing({
  "0": { value: "0" },
  px: { value: "1px" },
  "0.5": { value: "0.125rem" }, // 2
  "1": { value: "0.25rem" }, // 4
  "1.5": { value: "0.375rem" }, // 6
  "2": { value: "0.5rem" }, // 8
  "2.5": { value: "0.625rem" }, // 10
  "3": { value: "0.75rem" }, // 12
  "3.5": { value: "0.875rem" }, // 14
  "4": { value: "1rem" }, // 16
  "5": { value: "1.25rem" }, // 20
  "6": { value: "1.5rem" }, // 24
  "7": { value: "1.75rem" }, // 28
  "8": { value: "2rem" }, // 32
  "9": { value: "2.25rem" }, // 36
  "10": { value: "2.5rem" }, // 40
  "11": { value: "2.75rem" }, // 44
  "12": { value: "3rem" }, // 48
  "14": { value: "3.5rem" }, // 56
  "16": { value: "4rem" }, // 64
  "20": { value: "5rem" }, // 80
  "24": { value: "6rem" }, // 96
  "28": { value: "7rem" }, // 112
  "32": { value: "8rem" }, // 128
});

export const sizes = defineTokens.sizes({
  "xs": { value: "20rem" },
  "sm": { value: "24rem" },
  "md": { value: "28rem" },
  "lg": { value: "32rem" },
  "xl": { value: "36rem" },
  "2xl": { value: "42rem" },
  "3xl": { value: "48rem" },
  "4xl": { value: "56rem" },
  "5xl": { value: "64rem" },
  "6xl": { value: "72rem" },
  "7xl": { value: "80rem" },
  full: { value: "100%" },
  dvh: { value: "100dvh" },
  dvw: { value: "100dvw" },
});
