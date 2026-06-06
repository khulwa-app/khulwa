import { defineRecipe } from "@chakra-ui/react";

export const spacesShellRecipe = defineRecipe({
  className: "khulwa-spaces-shell",
  base: {
    position: "relative",
    minHeight: "100dvh",
    width: "100%",
    overflow: "hidden",
    bg: "bg.base",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
});
