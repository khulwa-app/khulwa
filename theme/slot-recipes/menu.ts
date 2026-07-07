import { defineSlotRecipe } from "@chakra-ui/react";

export const menuSlotRecipe = defineSlotRecipe({
  slots: ["content", "item", "itemText", "itemGroup", "itemGroupLabel", "separator", "indicator"],
  base: {
    content: {
      borderWidth: "1px",
      borderColor: "glass.border",
      borderRadius: "xl",
      backdropFilter: "blur(28px) saturate(1.4)",
      padding: "1.5",
      display: "flex",
      flexDirection: "column",
      gap: "0.5",
      zIndex: "overlay",
      transformOrigin: "var(--transform-origin)",
      _open: { animationName: "panel-in", animationDuration: "enter", animationTimingFunction: "enter" },
      _closed: { animationName: "panel-out", animationDuration: "exit", animationTimingFunction: "exit" },
      _motionReduce: { _open: { animationName: "fade-in" }, _closed: { animationName: "fade-out" } },
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: "2.5",
      paddingInline: "2.5",
      paddingBlock: "2",
      borderRadius: "md",
      fontSize: "sm",
      lineHeight: "1.2",
      cursor: "pointer",
      userSelect: "none",
      outline: "none",
      transitionProperty: "background-color, color",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      "& svg": { boxSize: "4" },
      _disabled: { opacity: 0.5, cursor: "not-allowed", _hover: { bg: "transparent" } },
    },
    itemText: { flex: "1" },
    itemGroupLabel: {
      paddingInline: "2.5",
      paddingBlock: "1.5",
      textStyle: "label-md",
      color: "fg.subtle",
    },
    separator: {
      height: "1px",
      marginBlock: "1",
      borderWidth: "0",
    },
    indicator: { color: "fg.muted" },
  },
  variants: {
    surface: {
      veil: {
        content: {
          bg: "glass.panel",
          boxShadow: "glass",
          minW: "11rem",
        },
        item: {
          color: "fg",
          _hover: { bg: "bg.muted", color: "fg" },
          _highlighted: { bg: "bg.muted", color: "fg" },
          _active: { bg: "bg.emphasized" },
          "&[data-checked]": {
            bg: "primary.solid",
            color: "primary.contrast",
            _hover: { bg: "primary.emphasized", color: "primary.contrast" },
          },
          "&[data-danger]": { color: "red.emphasized" },
        },
        separator: { bg: "border.subtle" },
      },
      bright: {
        content: {
          bg: "glass.sheet",
          boxShadow: "glass-sm",
          borderColor: "glass.border",
          minW: "11.25rem",
        },
        item: {
          color: "fg.onMesh",
          _hover: { bg: "glass.subtle", color: "fg.onMesh" },
          _highlighted: { bg: "glass.subtle", color: "fg.onMesh" },
          _active: { bg: "glass.subtle", color: "fg.onMesh" },
          "&[data-checked]": {
            bg: "primary.solid",
            color: "primary.contrast",
            _hover: { bg: "primary.emphasized", color: "primary.contrast" },
            _highlighted: { bg: "primary.emphasized", color: "primary.contrast" },
          },
          "&[data-danger]": {
            color: "fg.onMesh",
            "& svg": { color: "fg.error" },
            _hover: { bg: "fg.error", color: "fg.inverted", "& svg": { color: "fg.inverted" } },
            _highlighted: { bg: "fg.error", color: "fg.inverted", "& svg": { color: "fg.inverted" } },
          },
        },
        separator: { bg: "glass.divider" },
      },
    },
  },
  defaultVariants: {
    surface: "veil",
  },
});
