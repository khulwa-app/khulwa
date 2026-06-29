import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const cardSlotRecipe = defineSlotRecipe({
  className: "khulwa-card",
  slots: ["root", "header", "title", "meta", "body"],
  base: {
    root: {
      layerStyle: "card",
      rounded: "surface",
      width: "full",
      maxW: "sm",
      padding: "4",
      display: "flex",
      flexDirection: "column",
      gap: "3",
      transitionProperty: "box-shadow, transform, border-color",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      "&[data-interactive]": {
        cursor: "pointer",
        "@media (hover: hover)": {
          _hover: { transform: "translateY(-1px)", borderColor: "glass.borderFocus" },
        },
        _active: { transform: "scale(0.99)", transitionDuration: "instant" },
      },
      _motionReduce: { "&[data-interactive]": { _hover: { transform: "none" }, _active: { transform: "none" } } },
    },
    header: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "3",
    },
    title: { textStyle: "label-md", color: "fg.subtle" },
    meta: { textStyle: "label-md", color: "fg.default", fontVariantNumeric: "tabular-nums" },
    body: { display: "flex", flexDirection: "column", gap: "3" },
  },
});

const ctx = createSlotRecipeContext({ key: "card" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"card">>;
type DivProps = HTMLChakraProps<"div">;
type TextProps = HTMLChakraProps<"p">;

export const Card = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Header: ctx.withContext<HTMLDivElement, DivProps>("div", "header"),
  Title: ctx.withContext<HTMLParagraphElement, TextProps>("p", "title"),
  Meta: ctx.withContext<HTMLParagraphElement, TextProps>("p", "meta"),
  Body: ctx.withContext<HTMLDivElement, DivProps>("div", "body"),
};
