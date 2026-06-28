import { defineTextStyles } from "@chakra-ui/react";

export const textStyles = defineTextStyles({
  overline: {
    value: {
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "1.2",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
  },

  "hero-meta": {
    value: {
      fontFamily: "body",
      fontSize: { base: "sm", md: "md" },
      fontWeight: "medium",
      lineHeight: "1.4",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },

  "display-xl": {
    value: {
      fontFamily: "display",
      fontSize: "7xl",
      fontWeight: "semibold",
      lineHeight: "1.045",
      letterSpacing: "-0.01em",
    },
  },
  "display-lg": {
    value: {
      fontFamily: "display",
      fontSize: "6xl",
      fontWeight: "semibold",
      lineHeight: "1.05",
      letterSpacing: "-0.01em",
    },
  },
  "display-md": {
    value: {
      fontFamily: "display",
      fontSize: "5xl",
      fontWeight: "semibold",
      lineHeight: "1.1666",
      letterSpacing: "-0.005em",
    },
  },

  "heading-h1": {
    value: {
      fontFamily: "display",
      fontSize: "4xl",
      fontWeight: "semibold",
      lineHeight: "1.2",
      letterSpacing: "0",
    },
  },
  "heading-h2": {
    value: {
      fontFamily: "display",
      fontSize: "3xl",
      fontWeight: "semibold",
      lineHeight: "1.25",
      letterSpacing: "0",
    },
  },
  "heading-h3": {
    value: {
      fontFamily: "display",
      fontSize: "2xl",
      fontWeight: "semibold",
      lineHeight: "1.33",
      letterSpacing: "0.005em",
    },
  },
  "heading-h4": {
    value: {
      fontFamily: "display",
      fontSize: "xl",
      fontWeight: "semibold",
      lineHeight: "1.4",
      letterSpacing: "0.005em",
    },
  },
  "heading-h5": {
    value: {
      fontFamily: "display",
      fontSize: "md",
      fontWeight: "semibold",
      lineHeight: "1.5",
      letterSpacing: "0.01em",
    },
  },

  "body-xl": {
    value: {
      fontFamily: "body",
      fontSize: "xl",
      fontWeight: "medium",
      lineHeight: "1.5",
      letterSpacing: "0.01em",
    },
  },
  "body-lg": {
    value: {
      fontFamily: "body",
      fontSize: "lg",
      fontWeight: "medium",
      lineHeight: "1.5555",
      letterSpacing: "0.01em",
    },
  },
  "body-md": {
    value: {
      fontFamily: "body",
      fontSize: "md",
      fontWeight: "medium",
      lineHeight: "1.5",
      letterSpacing: "0.01em",
    },
  },
  "body-sm": {
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "1.4285",
      letterSpacing: "0.01em",
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
      letterSpacing: "0.01em",
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
      fontWeight: "bold",
      lineHeight: "1.1",
      letterSpacing: "-0.005em",
    },
  },
  "clock-display": {
    value: {
      fontFamily: "display",
      fontSize: { base: "6xl", md: "8xl" },
      fontWeight: "bold",
      lineHeight: "1",
      letterSpacing: "-0.03em",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-timer": {
    value: {
      fontFamily: "display",
      fontSize: "timer",
      fontWeight: "bold",
      lineHeight: "1",
      letterSpacing: "-0.01em",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-sm": {
    value: {
      fontFamily: "display",
      fontSize: "2xl",
      fontWeight: "semibold",
      lineHeight: "1",
      letterSpacing: "0",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-display": {
    value: {
      fontFamily: "display",
      fontSize: "numeric-display",
      fontWeight: "bold",
      lineHeight: "1.07",
      letterSpacing: "-0.005em",
      fontVariantNumeric: "tabular-nums",
    },
  },
});
