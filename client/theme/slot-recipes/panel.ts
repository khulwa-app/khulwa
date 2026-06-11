import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

// Floating, non-modal tool panel anchored above the dock's start cluster
// (tasks / music / notes). The space stays visible and interactive behind it.
export const panelSlotRecipe = defineSlotRecipe({
  className: "khulwa-panel",
  slots: ["root", "header", "title", "body"],
  base: {
    root: {
      position: "fixed",
      insetInlineStart: { base: "3", md: "5" },
      // Clears the dock cluster (bottom 4/6 + item height 9).
      bottom: { base: "16", md: "20" },
      zIndex: 900,
      display: "flex",
      flexDirection: "column",
      w: "22rem",
      maxW: "calc(100vw - 1.5rem)",
      maxH: "min(70vh, 34rem)",
      overflow: "hidden",
      rounded: "2xl",
      borderWidth: "1px",
      borderColor: "border.subtle",
      bg: "bg.elevated/90",
      backdropFilter: "blur(16px)",
      boxShadow: "lg",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: "0",
      paddingInline: "4",
      paddingBlock: "2.5",
      borderBottomWidth: "1px",
      borderColor: "border.subtle",
    },
    title: {
      textStyle: "label-md",
      fontWeight: "medium",
      color: "fg.default",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      flex: "1",
      minH: "0",
      padding: "3",
    },
  },
});

const ctx = createSlotRecipeContext({ key: "panel" });
type RootProps = HTMLChakraProps<"section", SlotRecipeProps<"panel">>;
type HeaderProps = HTMLChakraProps<"header">;
type TitleProps = HTMLChakraProps<"h2">;
type BodyProps = HTMLChakraProps<"div">;

export const Panel = {
  Root: ctx.withProvider<HTMLElement, RootProps>("section", "root"),
  Header: ctx.withContext<HTMLElement, HeaderProps>("header", "header"),
  Title: ctx.withContext<HTMLHeadingElement, TitleProps>("h2", "title"),
  Body: ctx.withContext<HTMLDivElement, BodyProps>("div", "body"),
};
