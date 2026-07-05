import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const rhythmListSlotRecipe = defineSlotRecipe({
  className: "khulwa-rhythm-list",
  slots: ["root", "item", "check", "label"],
  base: {
    root: { display: "flex", flexDirection: "column", gap: "1.5", width: "full" },
    item: {
      display: "flex",
      alignItems: "center",
      gap: "3",
      padding: "3",
      rounded: "md",
      cursor: "pointer",
      bg: "bg.muted",
      color: "fg.muted",
      textAlign: "start",
      transitionProperty: "background-color, color, transform",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      _hover: { bg: "bg.emphasized", color: "fg" },
      _active: { transform: "scale(0.98)", transitionDuration: "instant" },
      _motionReduce: { _active: { transform: "none" } },
    },
    check: {
      boxSize: "5",
      rounded: "full",
      borderWidth: "2px",
      borderColor: "border.emphasized",
      color: "primary.contrast",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      transitionProperty: "background-color, border-color",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      _checked: { bg: "primary.solid", borderColor: "primary.solid" },
    },
    label: {
      textStyle: "body-sm",
      color: "fg",
      _checked: { color: "fg.muted", textDecoration: "line-through" },
    },
  },
});

const ctx = createSlotRecipeContext({ key: "rhythmList" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"rhythmList">>;
type ItemProps = HTMLChakraProps<"button">;
type CheckProps = HTMLChakraProps<"span">;
type LabelProps = HTMLChakraProps<"span">;

export const RhythmList = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Item: ctx.withContext<HTMLButtonElement, ItemProps>("button", "item"),
  Check: ctx.withContext<HTMLSpanElement, CheckProps>("span", "check"),
  Label: ctx.withContext<HTMLSpanElement, LabelProps>("span", "label"),
};
