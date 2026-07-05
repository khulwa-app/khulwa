import { defineRecipe } from "@chakra-ui/react";

export const khulwaInputRecipe = defineRecipe({
  className: "khulwa-input",
  base: {
    width: "full",
    minWidth: "0",
    appearance: "none",
    fontFamily: "body",
    color: "fg",
    borderRadius: "md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    outline: "none",
    transitionProperty: "background-color, border-color, color, box-shadow",
    transitionDuration: "enter",
    transitionTimingFunction: "enter",
    _placeholder: { color: "fg.muted" },
    _disabled: { opacity: 0.5, cursor: "not-allowed", _hover: { bg: "bg.muted" } },
  },
  variants: {
    variant: {
      outline: {
        bg: "bg.muted",
        borderColor: "border",
        _hover: { bg: "bg.emphasized", borderColor: "border.emphasized" },
        _focus: { borderColor: "border.focus", bg: "bg.muted" },
      },
      filled: {
        bg: "bg.muted",
        borderColor: "transparent",
        _hover: { bg: "bg.emphasized" },
        _focus: { borderColor: "border.focus", bg: "bg.muted" },
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
