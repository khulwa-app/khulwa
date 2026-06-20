import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const dockSlotRecipe = defineSlotRecipe({
  className: "khulwa-dock",
  slots: ["root", "item", "itemIcon"],
  base: {
    root: {
      position: "fixed",
      bottom: { base: "4", md: "6" },
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: "2",
    },
    item: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "10",
      rounded: "lg",
      border: "0",
      appearance: "none",
      cursor: "pointer",
      flexShrink: "0",
      color: "fg.muted",
      layerStyle: "glass",
      transitionProperty: "background-color, color, transform, box-shadow",
      transitionDuration: "moderate",
      transitionTimingFunction: "ease",
      _hover: {
        bg: "bg.elevated/85",
      },
      "&[aria-current='page'], &[aria-pressed='true']": {
        bg: "primary.default",
        color: "fg.inverse",
        boxShadow: "sm",
        _hover: { bg: "primary.hover", color: "fg.inverse" },
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
      "& svg": { boxSize: "4" },
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

export const Dock = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Item: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "item"),
  ItemIcon: ctx.withContext<HTMLSpanElement, ItemIconProps>("span", "itemIcon"),
};
