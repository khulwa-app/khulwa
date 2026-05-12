import { defineTextStyles } from "@chakra-ui/react";

// Khulwa textStyles — Platform storefront-v2 naming convention.
// Display family: Reem Kufi (heading-h1..h3 + quote)
// Body family: Noto Sans Arabic (heading-h4..h6 + body/paragraph/label/eyebrow/numeric)
// Use textStyle="heading-h1" / "paragraph-md" / "numeric-timer" directly.
export const textStyles = defineTextStyles({
  // Display (Reem Kufi)
  "heading-h1": {
    value: {
      fontFamily: "display",
      fontSize: "7xl", // 88px
      fontWeight: "bold",
      lineHeight: "none",
      letterSpacing: "tight",
    },
  },
  "heading-h2": {
    value: {
      fontFamily: "display",
      fontSize: "6xl", // 56px
      fontWeight: "bold",
      lineHeight: "tight",
      letterSpacing: "tight",
    },
  },
  "heading-h3": {
    value: {
      fontFamily: "display",
      fontSize: "5xl", // 40px
      fontWeight: "medium",
      lineHeight: "snug",
      letterSpacing: "tight-h3",
    },
  },

  // Subheadings (Noto Arabic SemiBold)
  "heading-h4": {
    value: {
      fontFamily: "body",
      fontSize: "4xl", // 30px
      fontWeight: "semibold",
      lineHeight: "snug",
      letterSpacing: "tight-h3",
    },
  },
  "heading-h5": {
    value: {
      fontFamily: "body",
      fontSize: "3xl", // 24px
      fontWeight: "semibold",
      lineHeight: "snug",
      letterSpacing: "normal",
    },
  },
  "heading-h6": {
    value: {
      fontFamily: "body",
      fontSize: "2xl", // 20px
      fontWeight: "semibold",
      lineHeight: "snug",
      letterSpacing: "normal",
    },
  },

  // Body (medium weight — UI emphasis)
  "body-lg": {
    value: {
      fontFamily: "body",
      fontSize: "xl", // 18px
      fontWeight: "medium",
      lineHeight: "normal",
      letterSpacing: "tight-h3",
    },
  },
  "body-md": {
    value: {
      fontFamily: "body",
      fontSize: "lg", // 16px
      fontWeight: "medium",
      lineHeight: "normal",
      letterSpacing: "tight-body",
    },
  },
  "body-sm": {
    value: {
      fontFamily: "body",
      fontSize: "md", // 14px
      fontWeight: "medium",
      lineHeight: "tight",
      letterSpacing: "tight-sm",
    },
  },
  "body-xs": {
    value: {
      fontFamily: "body",
      fontSize: "sm", // 12px
      fontWeight: "medium",
      lineHeight: "none",
      letterSpacing: "normal",
    },
  },

  // Paragraph (regular weight — long-form reading)
  "paragraph-lg": {
    value: {
      fontFamily: "body",
      fontSize: "xl",
      fontWeight: "normal",
      lineHeight: "normal",
      letterSpacing: "tight-h3",
    },
  },
  "paragraph-md": {
    value: {
      fontFamily: "body",
      fontSize: "lg",
      fontWeight: "normal",
      lineHeight: "normal",
      letterSpacing: "tight-body",
    },
  },
  "paragraph-sm": {
    value: {
      fontFamily: "body",
      fontSize: "md",
      fontWeight: "normal",
      lineHeight: "tight",
      letterSpacing: "tight-sm",
    },
  },
  "paragraph-xs": {
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "none",
      letterSpacing: "normal",
    },
  },

  // Label (caps tracking)
  "label-md": {
    value: {
      fontFamily: "body",
      fontSize: "md",
      fontWeight: "medium",
      lineHeight: "tight",
      letterSpacing: "wide",
    },
  },
  "label-sm": {
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "none",
      letterSpacing: "wider",
    },
  },
  eyebrow: {
    value: {
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "none",
      letterSpacing: "widest",
      textTransform: "uppercase",
    },
  },

  // Numeric (Noto Arabic Bold + tabular figures)
  "numeric-timer": {
    value: {
      fontFamily: "body",
      fontSize: "timer",
      fontWeight: "bold",
      lineHeight: "none",
      letterSpacing: "tighter",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-xl": {
    value: {
      fontFamily: "body",
      fontSize: "7xl", // 88px
      fontWeight: "bold",
      lineHeight: "none",
      letterSpacing: "tight",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-streak": {
    value: {
      fontFamily: "body",
      fontSize: "8xl", // 96px
      fontWeight: "bold",
      lineHeight: "none",
      letterSpacing: "tight",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-lg": {
    value: {
      fontFamily: "body",
      fontSize: "6xl", // 56px (closest scale stop; Figma was 64px)
      fontWeight: "bold",
      lineHeight: "none",
      letterSpacing: "tight",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-md": {
    value: {
      fontFamily: "body",
      fontSize: "5xl", // 40px (closest; Figma was 48px)
      fontWeight: "bold",
      lineHeight: "none",
      letterSpacing: "tight-h3",
      fontVariantNumeric: "tabular-nums",
    },
  },

  // Quote (Reem Kufi for italic-feel via display curvature)
  quote: {
    value: {
      fontFamily: "display",
      fontSize: "md",
      fontWeight: "medium",
      lineHeight: "tight",
      letterSpacing: "normal",
    },
  },
});
