import { defineSlotRecipe } from "@chakra-ui/react";

export const fieldSlotRecipe = defineSlotRecipe({
  slots: ["root", "label", "errorText", "helperText", "requiredIndicator"],
  base: {
    root: { flexDirection: "column", gap: "1.5" },
    label: { textStyle: "body-sm" },
    errorText: { textStyle: "body-sm" },
    helperText: { textStyle: "body-sm" },
  },
  variants: {
    surface: {
      panel: {
        label: { color: "fg" },
        helperText: { color: "fg.muted" },
        errorText: { color: "fg.error" },
        requiredIndicator: { color: "fg.error" },
      },
      glass: {
        label: { color: "fg.onMesh" },
        helperText: { color: "fg.onMesh.muted" },
        errorText: { color: "red.emphasized" },
        requiredIndicator: { color: "red.emphasized" },
      },
    },
  },
  defaultVariants: { surface: "panel" },
});
