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
    rounded: "controlWide",

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
        bg: "primary.default",
        color: "primary.fg",
        _hover: { bg: "primary.hover" },
        _active: { bg: "primary.pressed", transform: "scale(0.97)" },
      },

      secondary: {
        bg: "bg.elevated",
        color: "fg.default",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border.default",
        boxShadow: "sm",
        _hover: { bg: "bg.emphasized", borderColor: "border.strong" },
        _active: { bg: "bg.emphasized", transform: "scale(0.96)" },
      },

      outline: {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border.default",
        color: "fg.muted",
        _hover: { bg: "surface.muted", borderColor: "border.emphasized", color: "fg.default" },
        _active: { bg: "bg.emphasized", borderColor: "border.strong" },
      },

      ghost: {
        bg: "transparent",
        color: "fg.muted",
        _hover: { bg: "surface.muted", color: "fg.default" },
        _active: { bg: "bg.emphasized" },
      },
      danger: {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "status.danger",
        color: "status.danger",
        _hover: { bg: "status.danger", color: "fg.inverse" },
        _active: { bg: "status.danger", color: "fg.inverse", transform: "scale(0.97)" },
      },

      link: {
        bg: "transparent",
        color: "primary.default",
        fontWeight: "medium",
        h: "auto",
        minW: "0",
        paddingInline: "0",
        rounded: "0",
        display: "inline",
        _hover: { color: "primary.hover", textDecoration: "underline" },
        _active: { transform: "none" },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
