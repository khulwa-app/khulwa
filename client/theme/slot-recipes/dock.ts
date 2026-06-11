import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const dockSlotRecipe = defineSlotRecipe({
  className: "khulwa-dock",
  slots: ["root", "item"],
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
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "9",
      rounded: "lg",
      border: "0",
      appearance: "none",
      cursor: "pointer",
      flexShrink: "0",
      color: "fg.muted",
      // Translucent glass box — sits over photo backgrounds, reads premium.
      bg: "bg.elevated/55",
      boxShadow: "sm",
      backdropFilter: "blur(8px)",
      transitionProperty: "background-color, color, transform, box-shadow",
      transitionDuration: "0.18s",
      transitionTimingFunction: "ease",
      _hover: {
        bg: "bg.elevated/85",
        color: "fg.default",
        boxShadow: "md",
      },
      // Selected — filled brand square. nav uses aria-current, togglers aria-pressed.
      "&[aria-current='page'], &[aria-pressed='true']": {
        bg: "primary.default",
        color: "fg.inverse",
        boxShadow: "md",
        _hover: { bg: "primary.hover", color: "fg.inverse" },
      },
    },
  },
  variants: {
    // Corner anchor for the cluster.
    side: {
      start: { root: { insetInlineStart: { base: "3", md: "5" } } },
      end: { root: { insetInlineEnd: { base: "3", md: "5" } } },
    },
  },
});

const ctx = createSlotRecipeContext({ key: "dock" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"dock">>;
type ButtonProps = HTMLChakraProps<"button">;

export const Dock = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Item: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "item"),
};
