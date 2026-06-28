import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const timerPillSlotRecipe = defineSlotRecipe({
  className: "khulwa-timer-pill",
  slots: ["positioner", "root", "dot"],
  base: {
    positioner: {
      position: "fixed",
      bottom: { base: "4", md: "6" },
      insetInlineStart: "50%",
      transform: "translateX(-50%)",
      zIndex: "panel",
    },
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
      h: "11",
      paddingInline: "4",
      rounded: "pill",
      border: "0",
      cursor: "pointer",
      layerStyle: "raised",
      color: "fg.default",
      fontSize: "sm",
      fontWeight: "medium",
      fontVariantNumeric: "tabular-nums",
      transitionProperty: "background-color, box-shadow, opacity, transform",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      _hover: { bg: "bg.emphasized", boxShadow: "lg" },
      _active: { transform: "scale(0.98)", transitionDuration: "instant" },
      _motionReduce: { _active: { transform: "none" } },
      "&[data-paused]": { opacity: 0.6 },
    },
    dot: {
      boxSize: "2",
      rounded: "full",
      flexShrink: "0",
      bg: "primary.default",
      "&[data-phase=focus]": { bg: "accent.default" },
    },
  },
});

const ctx = createSlotRecipeContext({ key: "timerPill" });
type PositionerProps = HTMLChakraProps<"div", SlotRecipeProps<"timerPill">>;
type RootProps = HTMLChakraProps<"button">;
type DotProps = HTMLChakraProps<"div">;

export const TimerPill = {
  Positioner: ctx.withProvider<HTMLDivElement, PositionerProps>("div", "positioner"),
  Root: ctx.withContext<HTMLButtonElement, RootProps>("button", "root"),
  Dot: ctx.withContext<HTMLDivElement, DotProps>("div", "dot"),
};
