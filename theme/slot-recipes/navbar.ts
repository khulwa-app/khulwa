import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const navbarSlotRecipe = defineSlotRecipe({
  slots: ["root", "brand", "actions"],
  base: {
    root: {
      position: "absolute",
      insetInlineStart: 0,
      insetInlineEnd: 0,
      top: 0,
      zIndex: "navbar",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "4",
      paddingInline: { base: "4", md: "6" },
      paddingBlock: { base: "4", md: "5" },
    },
    brand: { display: "inline-flex", alignItems: "center", flexShrink: "0" },
    actions: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "2",
      minW: "0",
    },
  },
});

const ctx = createSlotRecipeContext({ key: "navbar" });
type RootProps = HTMLChakraProps<"header", SlotRecipeProps<"navbar">>;
type DivProps = HTMLChakraProps<"div">;

export const Nav = {
  Root: ctx.withProvider<HTMLElement, RootProps>("header", "root"),
  Brand: ctx.withContext<HTMLDivElement, DivProps>("div", "brand"),
  Actions: ctx.withContext<HTMLDivElement, DivProps>("div", "actions"),
};
