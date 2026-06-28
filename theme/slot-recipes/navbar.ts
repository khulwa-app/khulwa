import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const navbarSlotRecipe = defineSlotRecipe({
  className: "khulwa-navbar",
  slots: ["root", "brand", "actions"],
  base: {
    root: {
      position: "absolute",
      insetInlineStart: 0,
      insetInlineEnd: 0,
      top: 0,
      zIndex: "navbar",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingInline: { base: "4", md: "6" },
      paddingBlock: "4",
    },
    brand: { display: "inline-flex", alignItems: "center" },
    actions: { display: "inline-flex", alignItems: "center", gap: "2" },
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
