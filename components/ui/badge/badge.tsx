"use client";

import { createSlotRecipeContext, type HTMLChakraProps, type SlotRecipeProps } from "@chakra-ui/react";

const ctx = createSlotRecipeContext({ key: "badge" });

type RootProps = HTMLChakraProps<"span", SlotRecipeProps<"badge">>;
type SpanProps = HTMLChakraProps<"span">;

export const Badge = {
  Root: ctx.withProvider<HTMLSpanElement, RootProps>("span", "root"),
  Icon: ctx.withContext<HTMLSpanElement, SpanProps>("span", "icon"),
  Label: ctx.withContext<HTMLSpanElement, SpanProps>("span", "label"),
};
