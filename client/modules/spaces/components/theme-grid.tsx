"use client";

import { createSlotRecipeContext, type HTMLChakraProps } from "@chakra-ui/react";

const ctx = createSlotRecipeContext({ key: "themePicker" });

type DivProps = HTMLChakraProps<"div">;
type ButtonProps = HTMLChakraProps<"button">;
type SpanProps = HTMLChakraProps<"span">;

export const ThemePicker = {
  Grid: ctx.withProvider<HTMLDivElement, DivProps>("div", "grid"),
  Tile: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "tile", {
    defaultProps: { type: "button" },
  }),
  Thumb: ctx.withContext<HTMLDivElement, DivProps>("div", "thumb"),
  Label: ctx.withContext<HTMLSpanElement, SpanProps>("span", "label"),
};
