import { defineSlotRecipe } from "@chakra-ui/react";

export const badgeSlotRecipe = defineSlotRecipe({
  className: "khulwa-badge",
  slots: ["root", "icon", "label"],
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      width: "fit-content",
      borderStyle: "solid",
      borderWidth: "0",
      rounded: "chip",
      whiteSpace: "nowrap",
      flexShrink: "0",
      transitionProperty: "background-color, color, transform",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      "&[data-interactive]": {
        cursor: "pointer",
        "@media (hover: hover)": { _hover: { bg: "bg.emphasized" } },
        _active: { transform: "scale(0.97)", transitionDuration: "instant" },
      },
      _motionReduce: { "&[data-interactive]": { _active: { transform: "none" } } },
    },
    icon: { flexShrink: "0" },
    label: { textStyle: "label-md" },
  },
  variants: {
    tone: {
      neutral: {},
      primary: {},
      accent: {},
      success: {},
    },
    emphasis: {
      subtle: {},
      solid: {},
      muted: {},
    },
    size: {
      sm: { root: { h: "6", paddingInline: "2", gap: "1" }, icon: { boxSize: "3" } },
      md: { root: { h: "7", paddingInline: "3", gap: "1.5" }, icon: { boxSize: "3.5" } },
    },
  },
  compoundVariants: [
    // neutral
    { tone: "neutral", emphasis: "subtle", css: { root: { bg: "surface.muted", color: "fg.default" } } },
    { tone: "neutral", emphasis: "muted", css: { root: { bg: "surface.muted", color: "fg.muted" } } },
    { tone: "neutral", emphasis: "solid", css: { root: { bg: "fg.default", color: "fg.inverse" } } },
    // primary · jade
    { tone: "primary", emphasis: "subtle", css: { root: { bg: "primary.subtle", color: "primary.default" } } },
    // accent · sage
    { tone: "accent", emphasis: "subtle", css: { root: { bg: "accent.subtle", color: "accent.default" } } },
    // success
    { tone: "success", emphasis: "subtle", css: { root: { bg: "status.successSubtle", color: "status.success" } } },
  ],
  defaultVariants: { tone: "neutral", emphasis: "subtle", size: "md" },
});
