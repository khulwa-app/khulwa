import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const ayahSlotRecipe = defineSlotRecipe({
  className: "khulwa-ayah",
  slots: ["root", "arabic", "meaning"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1",
      alignItems: "flex-end",
      textAlign: "end",
      animationName: "fade-in",
      animationDuration: "slowest",
      animationTimingFunction: "ease-out",
      _motionReduce: { animationName: "none" },
    },
    arabic: { textStyle: "ayah-hero-corner", color: "fg.onMeshMuted" },
    meaning: { textStyle: "verse-meaning", color: "fg.onMeshSubtle" },
  },
});

const ctx = createSlotRecipeContext({ key: "ayah" });
type RootProps = HTMLChakraProps<"div", SlotRecipeProps<"ayah">>;
type TextProps = HTMLChakraProps<"p">;

export const Ayah = {
  Root: ctx.withProvider<HTMLDivElement, RootProps>("div", "root"),
  Arabic: ctx.withContext<HTMLParagraphElement, TextProps>("p", "arabic"),
  Meaning: ctx.withContext<HTMLParagraphElement, TextProps>("p", "meaning"),
};
