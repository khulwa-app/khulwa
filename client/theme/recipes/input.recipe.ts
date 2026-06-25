import { defineRecipe } from "@chakra-ui/react";

export const khulwaInputRecipe = defineRecipe({
  className: "khulwa-input",
  base: {
    width: "full",
    minWidth: "0",
    appearance: "none",
    fontFamily: "body",
    color: "fg.default",
    borderRadius: "controlWide",
    transitionProperty: "background-color, border-color, color, box-shadow",
    transitionDuration: "enter",
    transitionTimingFunction: "enter",
    _placeholder: { color: "fg.subtle" },
    _disabled: { opacity: 0.5, cursor: "not-allowed" },
  },
  variants: {
    variant: {
      outline: {
        bg: "bg.elevated",
        borderWidth: "1px",
        borderColor: "border.default",
        _hover: { borderColor: "border.emphasized" },
        _focusVisible: { borderColor: "border.focus" },
      },
      subtle: {
        bg: "surface.muted",
        borderWidth: "1px",
        borderColor: "transparent",
        _hover: { borderColor: "border.emphasized" },
        _focusVisible: { borderColor: "border.focus", bg: "bg.elevated" },
      },
      bare: {
        bg: "transparent",
        border: "none",
        paddingInline: "0",
        _focusVisible: { boxShadow: "none", outline: "none" },
      },
    },
    size: {
      sm: { h: "8", paddingInline: "2.5", fontSize: "sm" },
      md: { h: "10", paddingInline: "3", fontSize: "sm" },
      lg: { h: "12", paddingInline: "4", fontSize: "md" },
    },
  },
  defaultVariants: { variant: "outline", size: "md" },
});
