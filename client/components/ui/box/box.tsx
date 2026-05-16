"use client";

import {
  type HTMLChakraProps,
  type RecipeProps,
  createRecipeContext,
} from "@chakra-ui/react";

const { withContext } = createRecipeContext({ key: "box" });

export interface BoxProps extends HTMLChakraProps<"div">, RecipeProps<"box"> {}

export const Box = withContext<HTMLDivElement, BoxProps>("div");
