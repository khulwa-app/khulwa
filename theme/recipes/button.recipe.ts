import { defineRecipe } from "@chakra-ui/react";

export const khulwaButtonRecipe = defineRecipe({
  className: "khulwa-button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    appearance: "none",
    border: "0",
    cursor: "pointer",
    fontFamily: "body",
    fontWeight: "medium",
    whiteSpace: "nowrap",
    userSelect: "none",
    flexShrink: "0",
    rounded: "full",

    cornerShape: "normal",
    transitionProperty: "background-color, border-color, color, transform, box-shadow, opacity",
    transitionDuration: "enter",
    transitionTimingFunction: "enter",
    _active: { transform: "scale(0.97)", transitionDuration: "instant" },
    _motionReduce: { _active: { transform: "none" } },
    _disabled: { opacity: 0.5, cursor: "not-allowed" },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "border.focus",
      outlineOffset: "2px",
    },
  },
  variants: {
    size: {
      sm: { h: "8", minW: "8", paddingInline: "3", fontSize: "sm" },
      md: { h: "11", minW: "11", paddingInline: "4", fontSize: "sm" },
      lg: { h: "12", minW: "12", paddingInline: "6", fontSize: "md" },
      xl: { h: "16", minW: "16", paddingInline: "8", fontSize: "lg" },
    },
    variant: {
      primary: {
        bg: "primary.solid",
        color: "primary.contrast",
        _hover: { bg: "primary.emphasized" },
        _active: { bg: "primary.emphasized", transform: "scale(0.97)" },
      },

      secondary: {
        bg: "bg.panel",
        color: "fg",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        boxShadow: "dock",
        _hover: { bg: "bg.emphasized", borderColor: "border.emphasized" },
        _active: { bg: "bg.emphasized", transform: "scale(0.96)" },
      },

      outline: {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        color: "fg.muted",
        _hover: { bg: "bg.muted", borderColor: "border.emphasized", color: "fg" },
        _active: { bg: "bg.emphasized", borderColor: "border.emphasized" },
      },

      ghost: {
        bg: "transparent",
        color: "fg.muted",
        _hover: { bg: "bg.muted", color: "fg" },
        _active: { bg: "bg.emphasized" },
      },

      "onGlass.ghost": {
        bg: "transparent",
        color: "fg.onMesh",
        _hover: { bg: "whiteA.faint" },
        _active: { bg: "whiteA.dim", transform: "scale(0.97)" },
      },

      "onGlass.outline": {
        bg: "whiteA.faint",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "glass.borderLit",
        color: "fg.onMesh",
        backdropFilter: "blur(12px) saturate(1.4)",
        _hover: { bg: "whiteA.dim" },
        _active: { bg: "whiteA.dim", transform: "scale(0.97)" },
      },

      "onGlass.primary": {
        bg: "glass.panel",
        color: "fg.onMesh",
        boxShadow: "glass-sm",
        backdropFilter: "blur(16px) saturate(1.5)",
        _hover: { bg: "whiteA.dim" },
        _active: { transform: "scale(0.97)" },
      },
      danger: {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "fg.error",
        color: "fg.error",
        _hover: { bg: "fg.error", color: "fg.inverted" },
        _active: { bg: "fg.error", color: "fg.inverted", transform: "scale(0.97)" },
      },

      link: {
        bg: "transparent",
        color: "primary.solid",
        fontWeight: "medium",
        h: "auto",
        minW: "0",
        paddingInline: "0",
        rounded: "0",
        display: "inline",
        _hover: { color: "primary.emphasized", textDecoration: "underline" },
        _active: { transform: "none" },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
