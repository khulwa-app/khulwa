"use client";

import { createSlotRecipeContext, type HTMLChakraProps } from "@chakra-ui/react";

const ctx = createSlotRecipeContext({ key: "sounds" });

type DivProps = HTMLChakraProps<"div">;
type SpanProps = HTMLChakraProps<"span">;
type ButtonProps = HTMLChakraProps<"button">;

export const SoundGrid = {
  Root: ctx.withProvider<HTMLDivElement, DivProps>("div", "grid"),
  Tile: ctx.withContext<HTMLDivElement, DivProps>("div", "tile"),
  Toggle: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "toggle", {
    defaultProps: { type: "button" },
  }),
  Icon: ctx.withContext<HTMLSpanElement, SpanProps>("span", "iconWrap"),
  Title: ctx.withContext<HTMLSpanElement, SpanProps>("span", "title"),
};
