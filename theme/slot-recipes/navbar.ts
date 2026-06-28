import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const navbarSlotRecipe = defineSlotRecipe({
  className: "khulwa-navbar",
  slots: ["root", "brand", "actions", "quote"],
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
    quote: {
      maxW: "16rem",
      textAlign: "end",
      textWrap: "balance",
      fontFamily: "body",
      fontStyle: "italic",
      fontSize: { base: "xs", md: "sm" },
      fontWeight: "medium",
      lineHeight: "1.4",
      color: "fg.onMeshMuted",
      display: { base: "none", sm: "block" },
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
  Quote: ctx.withContext<HTMLParagraphElement, HTMLChakraProps<"p">>("p", "quote"),
};
