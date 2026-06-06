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
    transitionProperty: "background-color, color, border-color, transform, box-shadow",
    transitionDuration: "0.15s",
    transitionTimingFunction: "ease",
    _disabled: { opacity: 0.5, cursor: "not-allowed" },
    _active: { transform: "scale(0.98)" },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "primary.default",
      outlineOffset: "2px",
    },
  },
  variants: {
    visual: {
      solid: {
        bg: "primary.default",
        color: "fg.inverse",
        _hover: { bg: "primary.hover" },
        _active: { bg: "primary.pressed" },
      },
      accent: {
        bg: "accent.default",
        color: "fg.inverse",
        _hover: { filter: "brightness(0.95)" },
      },
      ink: {
        bg: "fg.default",
        color: "fg.inverse",
        _hover: { bg: "fg.muted" },
      },
      outline: {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border.default",
        color: "fg.default",
        _hover: { bg: "surface.muted", borderColor: "border.strong" },
      },
      ghost: {
        bg: "transparent",
        color: "fg.muted",
        _hover: { bg: "surface.muted", color: "fg.default" },
      },
      danger: {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "status.danger",
        color: "status.danger",
        _hover: { bg: "status.danger", color: "fg.inverse" },
      },
    },
    size: {
      sm: { h: "8", minW: "8", paddingInline: "3", textStyle: "label-md" },
      md: { h: "10", minW: "10", paddingInline: "4", textStyle: "label-lg" },
      lg: { h: "12", minW: "12", paddingInline: "6", textStyle: "label-lg" },
      xl: { h: "14", minW: "14", paddingInline: "8", textStyle: "heading-h5" },
    },
    shape: {
      pill: { rounded: "full" },
      rounded: { rounded: "md" },
    },
  },
  defaultVariants: {
    visual: "solid",
    size: "md",
    shape: "pill",
  },
});
