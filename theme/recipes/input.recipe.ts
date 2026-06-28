import { defineRecipe } from "@chakra-ui/react";

export const khulwaInputRecipe = defineRecipe({
  className: "khulwa-input",
  base: {
    width: "full",
    minWidth: "0",
    appearance: "none",
    fontFamily: "body",
    color: "fg.default",
    borderRadius: "control",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    outline: "none",
    transitionProperty: "background-color, border-color, color, box-shadow",
    transitionDuration: "enter",
    transitionTimingFunction: "enter",
    _placeholder: { color: "fg.muted" },
    _disabled: { opacity: 0.5, cursor: "not-allowed", _hover: { bg: "field.bg" } },
  },
  variants: {
    variant: {
      outline: {
        bg: "field.bg",
        borderColor: "border.default",
        _hover: { bg: "field.bgHover", borderColor: "border.strong" },
        _focus: { borderColor: "border.focus", bg: "field.bg" },
      },
      filled: {
        bg: "field.bg",
        borderColor: "transparent",
        _hover: { bg: "field.bgHover" },
        _focus: { borderColor: "border.focus", bg: "field.bg" },
      },
      plain: {
        bg: "transparent",
        borderColor: "transparent",
        paddingInline: "0",
      },
    },
    size: {
      sm: { h: "9", paddingInline: "3", fontSize: "sm" },
      md: { h: "11", paddingInline: "3.5", fontSize: "sm" },
      lg: { h: "12", paddingInline: "4", fontSize: "md" },
    },
  },
  defaultVariants: { variant: "outline", size: "md" },
});
