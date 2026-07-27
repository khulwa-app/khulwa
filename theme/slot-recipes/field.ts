import { defineSlotRecipe } from "@chakra-ui/react";

export const fieldSlotRecipe = defineSlotRecipe({
  slots: ["root", "label", "errorText", "helperText", "requiredIndicator"],
  base: {
    root: { flexDirection: "column", gap: "1.5" },
    label: { textStyle: "body-sm", color: "fg" },
    errorText: { textStyle: "body-sm", color: "red.emphasized" },
    helperText: { textStyle: "body-sm", color: "fg.muted" },
    requiredIndicator: { color: "red.emphasized" },
  },
});
