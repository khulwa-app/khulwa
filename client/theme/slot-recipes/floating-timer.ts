import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

// The pomodoro "mini player": a quiet glass pill floating bottom-center,
// same chrome family as the dock. data-paused recedes the pill (a paused
// session stays visible — forgetting it is the focus-loss the pill
// prevents); data-phase=focus switches the dot to the jade accent.
export const timerPillSlotRecipe = defineSlotRecipe({
  className: "khulwa-timer-pill",
  slots: ["positioner", "root", "dot"],
  base: {
    // Centering transform lives on the always-mounted positioner so the
    // panel-in/out animation (which also transforms) can't fight it.
    positioner: {
      position: "fixed",
      bottom: { base: "4", md: "6" },
      insetInlineStart: "50%",
      transform: "translateX(-50%)",
      zIndex: 900,
    },
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
      h: "9",
      paddingInline: "4",
      rounded: "full",
      border: "0",
      cursor: "pointer",
      layerStyle: "raised",
      color: "fg.default",
      fontSize: "sm",
      fontWeight: "medium",
      fontVariantNumeric: "tabular-nums",
      transitionProperty: "background-color, box-shadow, opacity",
      transitionDuration: "moderate",
      _hover: { bg: "bg.emphasized", boxShadow: "lg" },
      _active: { transform: "scale(0.98)" },
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
