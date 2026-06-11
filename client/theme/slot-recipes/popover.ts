import { defineSlotRecipe } from "@chakra-ui/react";
import { popoverAnatomy } from "@chakra-ui/react/anatomy";

export const popoverSlotRecipe = defineSlotRecipe({
  slots: popoverAnatomy.keys(),
  base: {
    body: {
      p: 4,
    },
    content: {
      bg: "fg.inverse",
      display: "flex",
      flexDirection: "column",
      maxH: "min(var(--available-height), 20rem)",
    },
    arrowTip: {
      bgColor: "fg.inverse !important",
      outline: "none !important",
      border: "none !important",
    },
  },
});
