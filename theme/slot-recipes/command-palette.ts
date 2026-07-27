import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const commandPaletteSlotRecipe = defineSlotRecipe({
  slots: ["positioner", "content", "kbd"],
  base: {
    positioner: {
      position: "fixed",
      inset: "0",
      zIndex: "palette",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: "18vh",
      paddingInline: "4",
      layerStyle: "scrim",
    },
    content: {
      layerStyle: "overlay",
      width: "min({sizes.palette}, 92vw)",
      overflow: "hidden",
      "& [cmdk-input]": {
        width: "100%",
        bg: "transparent",
        border: "none",
        outline: "none",
        color: "fg",
        textStyle: "body-md",
        paddingInline: "5",
        height: "14",
      },
      "& [cmdk-input]::placeholder": { color: "fg.subtle" },
      "& [cmdk-list]": {
        maxHeight: "min(380px, 50vh)",
        overflowY: "auto",
        padding: "2",
        scrollPaddingBlock: "2",
      },
      "& [cmdk-empty]": { padding: "6", textAlign: "center", color: "fg.muted", textStyle: "body-sm" },
      "& [cmdk-group-heading]": {
        paddingInline: "3",
        paddingBlock: "2",
        textStyle: "overline",
        color: "fg.subtle",
      },
      "& [cmdk-item]": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "3",
        paddingInline: "3",
        paddingBlock: "2.5",
        rounded: "md",
        color: "fg.muted",
        textStyle: "body-sm",
        cursor: "pointer",
        transitionProperty: "background-color, color",
        transitionDuration: "enter",
        transitionTimingFunction: "enter",
      },
      "@media (hover: hover)": {
        "& [cmdk-item]:hover": { bg: "whiteA.faint", color: "fg" },
      },
      "& [cmdk-item][data-selected='true']": { bg: "whiteA.dim", color: "fg" },
    },
    kbd: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minW: "6",
      height: "6",
      paddingInline: "1.5",
      rounded: "xs",
      bg: "whiteA.faint",
      borderWidth: "1px",
      borderColor: "border",
      color: "fg.subtle",
      fontFamily: "mono",
      fontSize: "2xs",
    },
  },
});

const ctx = createSlotRecipeContext({ key: "commandPalette" });
type PositionerProps = HTMLChakraProps<"div", SlotRecipeProps<"commandPalette">>;
type ContentProps = HTMLChakraProps<"div">;
type KbdProps = HTMLChakraProps<"kbd">;

export const Palette = {
  Positioner: ctx.withProvider<HTMLDivElement, PositionerProps>("div", "positioner"),
  Content: ctx.withContext<HTMLDivElement, ContentProps>("div", "content"),
  Kbd: ctx.withContext<HTMLElement, KbdProps>("kbd", "kbd"),
};
