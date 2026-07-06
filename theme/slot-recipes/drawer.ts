import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const drawerSlotRecipe = defineSlotRecipe({
  slots: ["backdrop", "content", "header", "title", "body"],
  base: {
    backdrop: {
      position: "fixed",
      inset: 0,
      zIndex: "overlay",
      layerStyle: "scrim",
      _open: { animationName: "fade-in", animationDuration: "enter", animationTimingFunction: "enter" },
      _closed: { animationName: "fade-out", animationDuration: "exit", animationTimingFunction: "exit" },
    },
    content: {
      position: "fixed",
      top: 0,
      bottom: 0,
      insetInlineEnd: 0,
      zIndex: "overlay",
      height: "100dvh",
      w: "72rem",
      maxW: "96vw",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      layerStyle: "overlay",
      borderRadius: "0",
      borderInlineEndWidth: "0",
      boxShadow: "glass",
      _open: { animationName: "drawer-in", animationDuration: "enter", animationTimingFunction: "enter" },
      _closed: { animationName: "drawer-out", animationDuration: "exit", animationTimingFunction: "exit" },
      _motionReduce: { _open: { animationName: "fade-in" }, _closed: { animationName: "fade-out" } },
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: "0",
      paddingInline: "5",
      paddingBlock: "4",
      borderBottomWidth: "1px",
      borderColor: "glass.border",
    },
    title: {
      textStyle: "heading-h4",
      color: "fg",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      gap: "7",
      flex: "1",
      minH: "0",
      overflowY: "auto",
      overscrollBehavior: "contain",
      padding: "5",
    },
  },
});

const ctx = createSlotRecipeContext({ key: "drawer" });
type ContentProps = HTMLChakraProps<"aside", SlotRecipeProps<"drawer">>;
type BackdropProps = HTMLChakraProps<"div", SlotRecipeProps<"drawer">>;
type HeaderProps = HTMLChakraProps<"header">;
type TitleProps = HTMLChakraProps<"h2">;
type BodyProps = HTMLChakraProps<"div">;

export const Drawer = {
  Backdrop: ctx.withProvider<HTMLDivElement, BackdropProps>("div", "backdrop"),
  Content: ctx.withProvider<HTMLElement, ContentProps>("aside", "content"),
  Header: ctx.withContext<HTMLElement, HeaderProps>("header", "header"),
  Title: ctx.withContext<HTMLHeadingElement, TitleProps>("h2", "title"),
  Body: ctx.withContext<HTMLDivElement, BodyProps>("div", "body"),
};
