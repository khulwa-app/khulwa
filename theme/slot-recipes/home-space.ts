import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const homeSpaceSlotRecipe = defineSlotRecipe({
  className: "khulwa-home",
  slots: ["root", "corner", "stage", "intro", "clock"],
  base: {
    root: {
      position: "relative",
      h: "full",
      w: "full",
      bg: "bg.base",
      overflow: "hidden",
    },
    corner: {
      position: "absolute",
      top: { base: "20", md: "24" },
      insetInlineEnd: { base: "4", md: "6" },
      zIndex: 2,
      maxW: "3xs",
      pointerEvents: "none",
    },
    stage: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      h: "full",
      w: "full",
      justifyContent: "center",
      alignItems: "center",
      gap: "10",
      padding: "6",
      paddingBlockEnd: { base: "24", md: "28" },
    },
    intro: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6",
      textAlign: "center",
    },
    clock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5",
    },
  },
});

const ctx = createSlotRecipeContext({ key: "homeSpace" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"homeSpace">>;
type DivProps = HTMLChakraProps<"div">;

export const Home = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Corner: ctx.withContext<HTMLDivElement, DivProps>("div", "corner"),
  Stage: ctx.withContext<HTMLDivElement, DivProps>("div", "stage"),
  Intro: ctx.withContext<HTMLDivElement, DivProps>("div", "intro"),
  Clock: ctx.withContext<HTMLDivElement, DivProps>("div", "clock"),
};
