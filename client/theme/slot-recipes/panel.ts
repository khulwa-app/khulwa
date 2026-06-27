import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const panelSlotRecipe = defineSlotRecipe({
  className: "khulwa-panel",
  slots: ["root", "header", "title", "body"],
  base: {
    root: {
      position: "fixed",
      insetInlineStart: { base: "3", md: "5" },

      bottom: { base: "16", md: "20" },
      zIndex: "panel",
      display: "flex",
      flexDirection: "column",
      w: "22rem",
      maxW: "calc(100vw - 1.5rem)",
      maxH: "min(70vh, 34rem)",
      overflow: "hidden",
      rounded: "surface",

      layerStyle: "overlay",
      transformOrigin: "bottom",
      _open: { animationName: "panel-in", animationDuration: "enter", animationTimingFunction: "enter" },
      _closed: { animationName: "panel-out", animationDuration: "exit", animationTimingFunction: "exit" },
      _motionReduce: { _open: { animationName: "fade-in" }, _closed: { animationName: "fade-out" } },
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
