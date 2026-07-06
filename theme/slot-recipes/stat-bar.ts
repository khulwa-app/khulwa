import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const statBarSlotRecipe = defineSlotRecipe({
  slots: ["root", "dot", "label", "track", "range", "value"],
  base: {
    root: { display: "flex", alignItems: "center", gap: "3", width: "full" },
    dot: { boxSize: "2.5", rounded: "full", flexShrink: "0" },
    label: {
      textStyle: "body-sm",
      color: "fg",
      width: "20",
      flexShrink: "0",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    track: { flex: "1", height: "2", rounded: "full", bg: "bg.emphasized", overflow: "hidden" },
    range: {
      height: "full",
      rounded: "full",
      transitionProperty: "width",
      transitionDuration: "slow",
      transitionTimingFunction: "standard",
      _motionReduce: { transitionProperty: "none" },
    },
    value: {
      textStyle: "label-md",
      color: "fg.muted",
      width: "14",
      textAlign: "end",
      flexShrink: "0",
      fontVariantNumeric: "tabular-nums",
    },
  },
});

const ctx = createSlotRecipeContext({ key: "statBar" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"statBar">>;
type DivProps = HTMLChakraProps<"div">;
type TextProps = HTMLChakraProps<"span">;

export const StatBar = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Dot: ctx.withContext<HTMLDivElement, DivProps>("div", "dot"),
  Label: ctx.withContext<HTMLSpanElement, TextProps>("span", "label"),
  Track: ctx.withContext<HTMLDivElement, DivProps>("div", "track"),
  Range: ctx.withContext<HTMLDivElement, DivProps>("div", "range"),
  Value: ctx.withContext<HTMLSpanElement, TextProps>("span", "value"),
};
