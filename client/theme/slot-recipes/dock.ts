import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const dockSlotRecipe = defineSlotRecipe({
  className: "khulwa-dock",
  slots: ["root", "item", "itemIcon", "group", "groupItem", "streak"],
  base: {
    root: {
      position: "fixed",
      bottom: { base: "4", md: "6" },
      zIndex: "dock",
      display: "flex",
      alignItems: "center",
      gap: "2",
    },
    item: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "9",
      rounded: "control",
      border: "0",
      appearance: "none",
      cursor: "pointer",
      flexShrink: "0",
      color: "fg.muted",
      layerStyle: "raised",
      transitionProperty: "background-color, border-color, color, transform, box-shadow",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      _hover: {
        bg: "bg.emphasized",
        color: "fg.default",
      },
      _active: { transform: "scale(0.94)", transitionDuration: "instant" },
      _motionReduce: { _active: { transform: "none" } },
      "&[aria-pressed='true']": {
        bg: "primary.subtle",
        color: "primary.default",
        boxShadow: "none",
        _hover: { bg: "primary.subtle", color: "primary.default" },
      },
      "&[data-playing]::after": {
        content: '""',
        position: "absolute",
        top: "1.5",
        insetInlineEnd: "1.5",
        boxSize: "1.5",
        rounded: "full",
        bg: "accent.default",
      },
    },

    itemIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      "& svg": { boxSize: "0.9375rem" },
    },

    group: {
      display: "inline-flex",
      alignItems: "center",
      gap: "1",
      padding: "0.5",
      rounded: "control",
      layerStyle: "raised",
      flexShrink: "0",
    },

    groupItem: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "8",
      rounded: "control",
      border: "0",
      appearance: "none",
      cursor: "pointer",
      flexShrink: "0",
      color: "fg.muted",
      bg: "transparent",
      transitionProperty: "background-color, color, transform",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      _hover: { bg: "bg.emphasized", color: "fg.default" },
      _active: { transform: "scale(0.94)", transitionDuration: "instant" },
      _motionReduce: { _active: { transform: "none" } },
      "&[aria-current='page']": {
        bg: "fg.default",
        color: "fg.inverse",
        boxShadow: "xs",
        _hover: { bg: "fg.default", color: "fg.inverse" },
      },
    },

    streak: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5",
      height: "9",
      paddingInline: "2.5",
      rounded: "control",
      layerStyle: "raised",
      flexShrink: "0",
      color: "fg.default",
      fontSize: "sm",
      fontWeight: "medium",
      fontVariantNumeric: "tabular-nums",
      "& svg": { boxSize: "0.9375rem", color: "accent.default" },
    },
  },
  variants: {
    side: {
      start: { root: { insetInlineStart: { base: "3", md: "5" } } },
      end: { root: { insetInlineEnd: { base: "3", md: "5" } } },
    },
  },
});

const ctx = createSlotRecipeContext({ key: "dock" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"dock">>;
type ButtonProps = HTMLChakraProps<"button">;
type ItemIconProps = HTMLChakraProps<"span">;
type GroupProps = HTMLChakraProps<"div">;
type StreakProps = HTMLChakraProps<"div">;

export const Dock = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Item: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "item"),
  ItemIcon: ctx.withContext<HTMLSpanElement, ItemIconProps>("span", "itemIcon"),
  Group: ctx.withContext<HTMLDivElement, GroupProps>("div", "group"),
  GroupItem: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "groupItem"),
  Streak: ctx.withContext<HTMLDivElement, StreakProps>("div", "streak"),
};
