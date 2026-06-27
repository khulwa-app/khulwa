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

    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    transitionProperty: "background-color, border-color, color, box-shadow",
    transitionDuration: "enter",
    transitionTimingFunction: "enter",
    _placeholder: { color: "fg.muted" },
    _disabled: { opacity: 0.5, cursor: "not-allowed" },
  },
  variants: {
    variant: {
      outline: {
        bg: "field.bg",
        borderColor: "border.default",
        _hover: { bg: "field.bgHover", borderColor: "border.strong" },
        _focus: { borderColor: "border.focus" },
      },

      subtle: {
        bg: "transparent",
        borderColor: "border.default",
        _hover: { bg: "field.bg", borderColor: "border.strong" },
        _focus: { bg: "field.bg", borderColor: "border.focus" },
      },

      bare: {
        bg: "transparent",
        borderColor: "transparent",
        paddingInline: "0",
        _focusVisible: { boxShadow: "none", outline: "none" },
      },
    },
    size: {
      sm: { h: "8", paddingInline: "2.5", fontSize: "sm" },
      md: { h: "11", paddingInline: "3", fontSize: "sm" },
      lg: { h: "12", paddingInline: "4", fontSize: "md" },
    },
  },
  defaultVariants: { variant: "outline", size: "md" },
});
