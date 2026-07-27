import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const dockSlotRecipe = defineSlotRecipe({
  slots: ["root", "item", "itemIcon", "group", "separator", "streak"],
  base: {
    root: {
      position: "fixed",
      bottom: { base: "4", md: "14" },
      zIndex: "dock",
      display: "flex",
      alignItems: "center",
      gap: "2.5",
    },
    item: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "chip",
      rounded: "md",
      border: "0",
      appearance: "none",
      cursor: "pointer",
      flexShrink: "0",
      layerStyle: "raised",
      boxShadow: "dock",
      color: "fg",
      transitionProperty: "background-color, border-color, color, transform, box-shadow",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      _hover: {
        bg: "bg.raisedHover",
      },
      _active: {
        transform: "scale(0.96)",
        bg: "bg.raisedActive",
        transitionDuration: "instant",
      },
      _motionReduce: { _active: { transform: "none" } },
      _focusVisible: { boxShadow: "focusRing" },
      "&[aria-pressed='true'], &[aria-current='page']": {
        bg: "primary.solid",
        color: "primary.contrast",
        boxShadow: "dock",
        "& svg [opacity]": { opacity: "0.35" },
        _hover: { bg: "primary.emphasized", color: "primary.contrast" },
      },
      "&[data-playing]::before": {
        content: '""',
        position: "absolute",
        top: "1.5",
        insetInlineEnd: "1.5",
        boxSize: "1.5",
        rounded: "full",
        bg: "primary.solid",
        pointerEvents: "none",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        insetInline: "-0.5",
        insetBlock: "-0.5",
        rounded: "inherit",
      },
    },

    itemIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      "& svg": { boxSize: "4.5" },
    },

    group: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2.5",
      flexShrink: "0",
    },

    separator: {
      flexShrink: "0",
      width: "hairline",
      height: "divider",
      rounded: "full",
      bg: "border",
    },

    streak: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5",
      height: "9",
      paddingInline: "2.5",
      rounded: "lg",
      layerStyle: "raised",
      flexShrink: "0",
      color: "fg",
      fontSize: "sm",
      fontWeight: "medium",
      fontVariantNumeric: "tabular-nums",
      "& svg": { boxSize: "0.9375rem", color: "primary.solid" },
    },
  },
  variants: {
    side: {
      start: { root: { insetInlineStart: { base: "4", md: "12" } } },
      end: { root: { insetInlineEnd: { base: "4", md: "12" } } },
    },
  },
});

const ctx = createSlotRecipeContext({ key: "dock" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"dock">>;
type ButtonProps = HTMLChakraProps<"button">;
type ItemIconProps = HTMLChakraProps<"span">;
type GroupProps = HTMLChakraProps<"div">;
type SeparatorProps = HTMLChakraProps<"div">;
type StreakProps = HTMLChakraProps<"div">;

export const Dock = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Item: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "item"),
  ItemIcon: ctx.withContext<HTMLSpanElement, ItemIconProps>("span", "itemIcon"),
  Group: ctx.withContext<HTMLDivElement, GroupProps>("div", "group"),
  Separator: ctx.withContext<HTMLDivElement, SeparatorProps>("div", "separator"),
  Streak: ctx.withContext<HTMLDivElement, StreakProps>("div", "streak"),
};
