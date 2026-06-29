import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const activeTaskSlotRecipe = defineSlotRecipe({
  className: "khulwa-active-task",
  slots: ["root", "empty", "bar", "mark", "dot", "task", "eta", "hint"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "2.5",
      maxW: "lg",
      paddingInline: "2",
    },
    empty: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3",
      width: "full",
      maxW: "sm",
    },
    bar: {
      display: "flex",
      alignItems: "center",
      width: "full",
      layerStyle: "raised",
      rounded: "surface",
      gap: "3",
      paddingInlineStart: "5",
      paddingInlineEnd: "2",
      paddingBlock: "2",
      transitionProperty: "border-color",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      _focusWithin: { borderColor: "glass.borderFocus" },
    },
    mark: {
      boxSize: "2",
      rounded: "full",
      borderWidth: "1.5px",
      borderColor: "fg.muted",
      flexShrink: "0",
    },
    dot: {
      boxSize: "1.5",
      rounded: "full",
      bg: "fg.onMesh",
      flexShrink: "0",
    },
    task: {
      textStyle: "body-md",
      color: "fg.onMeshMuted",
      lineClamp: 1,
      minW: "0",
    },
    eta: {
      textStyle: "label-lg",
      color: "fg.onMeshSubtle",
      flexShrink: "0",
      whiteSpace: "nowrap",
    },
    hint: { textStyle: "label-lg", color: "fg.onMeshSubtle" },
  },
});

const ctx = createSlotRecipeContext({ key: "activeTask" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"activeTask">>;
type DivProps = HTMLChakraProps<"div">;
type TextProps = HTMLChakraProps<"p">;

export const ActiveTask = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Empty: ctx.withProvider<HTMLDivElement, RootProps>("div", "empty"),
  Bar: ctx.withContext<HTMLDivElement, DivProps>("div", "bar"),
  Mark: ctx.withContext<HTMLDivElement, DivProps>("div", "mark"),
  Dot: ctx.withContext<HTMLDivElement, DivProps>("div", "dot"),
  Task: ctx.withContext<HTMLParagraphElement, TextProps>("p", "task"),
  Eta: ctx.withContext<HTMLParagraphElement, TextProps>("p", "eta"),
  Hint: ctx.withContext<HTMLParagraphElement, TextProps>("p", "hint"),
};
