import { defineTextStyles } from "@chakra-ui/react";

export const textStyles = defineTextStyles({
  verse: {
    value: {
      fontFamily: "arabicDisplay",
      fontSize: "3xl",
      fontWeight: "normal",
      lineHeight: "1.4",
      letterSpacing: "0",
      color: "fg.default",
    },
  },
  "verse-caption": {
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0.02em",
      color: "fg.muted",
    },
  },

  "ayah-hero": {
    value: {
      fontFamily: "arabicDisplay",
      fontSize: "8xl",
      fontWeight: "medium",
      lineHeight: "1.7",
      letterSpacing: "0",
      color: "fg.default",
    },
  },

  overline: {
    value: {
      fontFamily: "body",
      fontSize: "2xs",
      fontWeight: "medium",
      lineHeight: "1.2",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
  },

  "display-xl": {
    value: {
      fontFamily: "display",
      fontSize: "7xl",
      fontWeight: "medium",
      lineHeight: "1.045",
      letterSpacing: "-0.03em",
    },
  },
  "display-lg": {
    value: {
      fontFamily: "display",
      fontSize: "6xl",
      fontWeight: "medium",
      lineHeight: "1.05",
      letterSpacing: "-0.025em",
    },
  },
  "display-md": {
    value: {
      fontFamily: "display",
      fontSize: "5xl",
      fontWeight: "medium",
      lineHeight: "1.1666",
      letterSpacing: "-0.02em",
    },
  },

  "heading-h1": {
    value: {
      fontFamily: "display",
      fontSize: "4xl",
      fontWeight: "medium",
      lineHeight: "1.2",
      letterSpacing: "-0.015em",
    },
  },
  "heading-h2": {
    value: {
      fontFamily: "display",
      fontSize: "3xl",
      fontWeight: "medium",
      lineHeight: "1.25",
      letterSpacing: "-0.01em",
    },
  },
  "heading-h3": {
    value: {
      fontFamily: "display",
      fontSize: "2xl",
      fontWeight: "semibold",
      lineHeight: "1.33",
      letterSpacing: "-0.005em",
    },
  },
  "heading-h4": {
    value: {
      fontFamily: "display",
      fontSize: "xl",
      fontWeight: "semibold",
      lineHeight: "1.4",
      letterSpacing: "-0.0025em",
    },
  },
  "heading-h5": {
    value: {
      fontFamily: "display",
      fontSize: "md",
      fontWeight: "semibold",
      lineHeight: "1.5",
      letterSpacing: "0",
    },
  },

  "body-xl": {
    value: {
      fontFamily: "body",
      fontSize: "xl",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0",
    },
  },
  "body-lg": {
    value: {
      fontFamily: "body",
      fontSize: "lg",
      fontWeight: "normal",
      lineHeight: "1.5555",
      letterSpacing: "0",
    },
  },
  "body-md": {
    value: {
      fontFamily: "body",
      fontSize: "md",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0",
    },
  },
  "body-sm": {
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "1.4285",
      letterSpacing: "0",
    },
  },

  "label-lg": {
    value: {
      fontFamily: "body",
      fontSize: "label-sm",
      fontWeight: "medium",
      lineHeight: "1.2307",
      letterSpacing: "0.03em",
      textTransform: "uppercase",
    },
  },
  "dock-label": {
    value: {
      fontFamily: "body",
      fontSize: "label-sm",
      fontWeight: "medium",
      lineHeight: "1.2307",
      letterSpacing: "0",
    },
  },
  "label-md": {
    value: {
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "1.3333",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
  },

  greeting: {
    value: {
      fontFamily: "display",
      fontSize: { base: "4xl", md: "6xl" },
      fontWeight: "medium",
      lineHeight: "1.1",
      letterSpacing: "-0.02em",
    },
  },
  "clock-display": {
    value: {
      fontFamily: "mono",
      fontSize: { base: "xl", md: "2xl" },
      fontWeight: "medium",
      lineHeight: "1",
      letterSpacing: "-0.02em",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "ayah-hero-corner": {
    value: {
      fontFamily: "arabicDisplay",
      fontSize: { base: "md", md: "lg" },
      fontWeight: "medium",
      lineHeight: "1.25",
      letterSpacing: "0",
      color: "fg.muted",
    },
  },
  "ayah-hero-compact": {
    value: {
      fontFamily: "arabicDisplay",
      fontSize: { base: "xl", md: "2xl" },
      fontWeight: "medium",
      lineHeight: "1.5",
      letterSpacing: "0",
    },
  },
  "verse-meaning": {
    value: {
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "normal",
      lineHeight: "1.3",
      letterSpacing: "0",
      color: "fg.subtle",
    },
  },

  "numeric-timer": {
    value: {
      fontFamily: "mono",
      fontSize: "timer",
      fontWeight: "medium",
      lineHeight: "1",
      letterSpacing: "-0.04em",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-sm": {
    value: {
      fontFamily: "mono",
      fontSize: "2xl",
      fontWeight: "medium",
      lineHeight: "1",
      letterSpacing: "-0.02em",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-display": {
    value: {
      fontFamily: "mono",
      fontSize: "numeric-display",
      fontWeight: "medium",
      lineHeight: "1.07",
      letterSpacing: "-0.02em",
      fontVariantNumeric: "tabular-nums",
    },
  },
});
