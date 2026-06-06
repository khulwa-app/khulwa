import { createSlotRecipeContext, defineSlotRecipe, HTMLChakraProps } from "@chakra-ui/react";

export const dockSlotRecipe = defineSlotRecipe({
  slots: ["root", "item"],
  base: {
    root: {
      position: "fixed",
      insetInlineStart: "50%",
      transform: "translateX(-50%)",
      bottom: { base: "3", md: "6" },
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: "1",
      bg: "bg.elevated",
      rounded: "full",
      boxShadow: "lg",
      padding: "2",
      overflow: "hidden",
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "2.5",
      paddingInlineStart: "4",
      paddingInlineEnd: "4.5",
      paddingBlock: "2.75",
      rounded: "full",
      border: "0",
      appearance: "none",
      cursor: "pointer",
      textStyle: "dock-label",
      whiteSpace: "nowrap",
      userSelect: "none",
      transition: "background-color 0.15s ease, color 0.15s ease, transform 0.08s ease",
      _active: { transform: "scale(0.98)" },
      bg: "transparent",
      color: "fg.muted",
      _hover: { bg: "surface.muted", color: "fg.default" },
      "&[aria-current='page']": {
        bg: "fg.default",
        color: "fg.inverse",
        _hover: { bg: "fg.default", color: "fg.inverse" },
      },
    },
  },
});

const ctx = createSlotRecipeContext({ key: "dock" });
type DivProps = HTMLChakraProps<"div">;
type ButtonProps = HTMLChakraProps<"button">;

export const Dock = {
  Root: ctx.withProvider<HTMLDivElement, DivProps>("div", "root"),
  Item: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "item"),
};
