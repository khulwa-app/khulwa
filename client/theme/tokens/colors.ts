import { defineTokens } from "@chakra-ui/react";

// Primitive palette ONLY. Raw hex/rgba is permitted here and NOWHERE else.
// Scale names (violet, magenta, sand, charcoal, teal, amber, green, gold, red)
// never collide with semantic role names. The semantic layer owns all roles and
// references these via {colors.<scale>.<step>}.
export const colors = defineTokens.colors({
  white: { value: "#FFFFFF" },
  black: { value: "#000000" },

  // Modal/backdrop scrim — rgba allowed in primitives only.
  scrim: { value: "rgba(20, 18, 28, 0.55)" },
  scrimStrong: { value: "rgba(10, 9, 14, 0.7)" },

  // 0-alpha violet/magenta — explicit final stops for Safari gradient banding.
  violetClear: { value: "rgba(107, 92, 246, 0)" },
  magentaClear: { value: "rgba(236, 72, 153, 0)" },

  // Low-alpha brand tints — the calm space backdrop wash (P3). Keeps semantic
  // + layer-styles hex/rgba-free.
  violetA: {
    100: { value: "rgba(107, 92, 246, 0.06)" },
    200: { value: "rgba(107, 92, 246, 0.10)" },
    300: { value: "rgba(107, 92, 246, 0.16)" },
    400: { value: "rgba(107, 92, 246, 0.28)" },
    500: { value: "rgba(107, 92, 246, 0.45)" },
  },
  magentaA: {
    100: { value: "rgba(236, 72, 153, 0.06)" },
    200: { value: "rgba(236, 72, 153, 0.10)" },
    300: { value: "rgba(236, 72, 153, 0.16)" },
    400: { value: "rgba(236, 72, 153, 0.30)" },
    500: { value: "rgba(236, 72, 153, 0.48)" },
  },

  // Primary — violet. 500 is the brand anchor; hover one step darker, pressed two.
  violet: {
    50: { value: "#F4F2FE" },
    100: { value: "#ECEAFE" },
    200: { value: "#D6D1FB" },
    300: { value: "#B7AEF8" },
    400: { value: "#9385F4" },
    500: { value: "#6B5CF6" },
    600: { value: "#5B4AE8" },
    700: { value: "#4C3CD4" },
    800: { value: "#3B2FA6" },
    900: { value: "#2A2178" },
  },

  // Accent — magenta. 400 is hover-up (brighter), 600 pressed (darker).
  magenta: {
    50: { value: "#FDF2F8" },
    100: { value: "#FCE7F1" },
    200: { value: "#F9CCE0" },
    300: { value: "#F5A3C9" },
    400: { value: "#F05BA6" },
    500: { value: "#EC4899" },
    600: { value: "#D83A87" },
    700: { value: "#B92E72" },
    800: { value: "#94235A" },
    900: { value: "#6E1A43" },
  },

  // Warm neutral — light surfaces, borders, and the inverse/fg near-black.
  sand: {
    50: { value: "#FBFAF7" },
    100: { value: "#F7F4EF" },
    200: { value: "#F1EDE4" },
    300: { value: "#E7E2D6" },
    400: { value: "#DDD7CA" },
    500: { value: "#C9C2B2" },
    600: { value: "#ADA694" },
    700: { value: "#6E6A60" },
    800: { value: "#444038" },
    900: { value: "#2B2823" },
    950: { value: "#1C1C1C" },
  },

  // Dark base — violet-tinted charcoal. 900 darkest; 50 lightest text.
  charcoal: {
    50: { value: "#EDECEF" },
    100: { value: "#D6D4DA" },
    200: { value: "#ABA8B5" },
    300: { value: "#7E7A8B" },
    400: { value: "#565163" },
    500: { value: "#3D3950" },
    600: { value: "#2E2A3D" },
    700: { value: "#242030" },
    800: { value: "#1B1822" },
    900: { value: "#14121A" },
  },

  // Reading category.
  teal: {
    50: { value: "#ECFBF8" },
    100: { value: "#D0F4ED" },
    200: { value: "#A2E9DC" },
    300: { value: "#6FD8C7" },
    400: { value: "#43C7B3" },
    500: { value: "#2BB8A6" },
    600: { value: "#1F9587" },
    700: { value: "#19756B" },
    800: { value: "#155A53" },
    900: { value: "#114540" },
  },

  // Dhikr / AI category.
  amber: {
    50: { value: "#FEF6E9" },
    100: { value: "#FCE9C8" },
    200: { value: "#F9D693" },
    300: { value: "#F6C260" },
    400: { value: "#F4B44C" },
    500: { value: "#F2A93C" },
    600: { value: "#D88E22" },
    700: { value: "#AE6F1A" },
    800: { value: "#855415" },
    900: { value: "#623E10" },
  },

  // Success.
  green: {
    50: { value: "#EAF8F1" },
    100: { value: "#DBF1E7" },
    200: { value: "#B3E2CC" },
    300: { value: "#7FCFA8" },
    400: { value: "#48B987" },
    500: { value: "#1F9D6B" },
    600: { value: "#198057" },
    700: { value: "#146646" },
    800: { value: "#0F4E35" },
    900: { value: "#0B3A28" },
  },

  // Warning.
  gold: {
    50: { value: "#FCF3E2" },
    100: { value: "#FBEED6" },
    200: { value: "#F5DCAC" },
    300: { value: "#EDC277" },
    400: { value: "#E3A748" },
    500: { value: "#D98A1A" },
    600: { value: "#B57115" },
    700: { value: "#8E5811" },
    800: { value: "#6C430D" },
    900: { value: "#503209" },
  },

  // Danger.
  red: {
    50: { value: "#FCEEEF" },
    100: { value: "#FBE3DD" },
    200: { value: "#F5C5C0" },
    300: { value: "#EE9A98" },
    400: { value: "#E97A7E" },
    500: { value: "#E25563" },
    600: { value: "#C53D4E" },
    700: { value: "#A02E3E" },
    800: { value: "#7C2331" },
    900: { value: "#5C1A25" },
  },

  // Focus ring — resolves to violet 500. Kept as a primitive so shadows.focus
  // and border.focus stay token-driven.
  ring: { value: "#6B5CF6" },
});
