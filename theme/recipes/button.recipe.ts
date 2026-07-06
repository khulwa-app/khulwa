import { defineRecipe } from "@chakra-ui/react";

export const khulwaButtonRecipe = defineRecipe({
  base: {
    gap: "2",
    border: "0",
    cursor: "pointer",
    fontFamily: "body",
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
      sm: { h: "8", minW: "8", paddingInline: "3", fontSize: "sm", _icon: { boxSize: "5" } },
      md: { h: "11", minW: "11", paddingInline: "4", fontSize: "sm", _icon: { boxSize: "5" } },
      lg: { h: "12", minW: "12", paddingInline: "6", fontSize: "md", _icon: { boxSize: "5" } },
      xl: { h: "16", minW: "16", paddingInline: "8", fontSize: "lg", _icon: { boxSize: "6.5" } },
    },
    variant: {
      solid: {
        bg: "primary.solid",
        color: "primary.contrast",
        _hover: { bg: "primary.emphasized" },
        _active: { bg: "primary.emphasized", transform: "scale(0.97)" },
      },

      ghost: {
        bg: "transparent",
        color: "fg.onMesh",
        _hover: { bg: "glass.subtle" },
        _active: { bg: "glass.muted", transform: "scale(0.97)" },
      },

      subtle: {
        bg: "transparent",
        color: "fg.onMesh.subtle",
        _hover: { bg: "glass.subtle", color: "fg.onMesh" },
        _active: { bg: "glass.muted", transform: "scale(0.97)" },
      },

      outline: {
        bg: "glass.subtle",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "glass.border",
        color: "fg.onMesh",
        backdropFilter: "blur(12px) saturate(1.4)",
        _hover: { bg: "glass.muted" },
        _active: { bg: "glass.muted", transform: "scale(0.97)" },
      },

      surface: {
        bg: "glass.panel",
        color: "fg.onMesh",
        boxShadow: "glass-sm",
        backdropFilter: "blur(16px) saturate(1.5)",
        _hover: { bg: "glass.muted" },
        _active: { transform: "scale(0.97)" },
      },

      // @deprecated transitional light-panel variants — delete with each screen's redesign chunk
      "ghost.panel": {
        bg: "transparent",
        color: "fg.muted",
        _hover: { bg: "bg.muted", color: "fg" },
        _active: { bg: "bg.emphasized" },
      },

      "outline.panel": {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        color: "fg.muted",
        _hover: { bg: "bg.muted", borderColor: "border.emphasized", color: "fg" },
        _active: { bg: "bg.emphasized", borderColor: "border.emphasized" },
      },

      "surface.panel": {
        bg: "bg.panel",
        color: "fg",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        boxShadow: "dock",
        _hover: { bg: "bg.emphasized", borderColor: "border.emphasized" },
        _active: { bg: "bg.emphasized", transform: "scale(0.96)" },
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
    variant: "solid",
    size: "md",
  },
});
