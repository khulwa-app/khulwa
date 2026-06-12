import { defineSlotRecipe } from "@chakra-ui/react";
import { scrollAreaAnatomy } from "@chakra-ui/react/anatomy";

export const scrollAreaSlotRecipe = defineSlotRecipe({
  slots: scrollAreaAnatomy.keys(),
  base: {
    content: {
      minWidth: "100% !important",
      maxWidth: "full",
    },
  },
  variants: {
    size: { xs: {} },
  },
  defaultVariants: { size: "xs" },
});
