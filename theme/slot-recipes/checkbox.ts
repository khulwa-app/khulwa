import { defineSlotRecipe } from "@chakra-ui/react";

// Deep-merges onto Chakra's built-in checkbox slot recipe; only overrides the
// control surface + sizes. Consumed solely by tasks / steps (deep-space panel).
export const checkboxSlotRecipe = defineSlotRecipe({
  slots: ["root", "label", "control", "indicator", "group"],
  base: {
    control: {
      borderRadius: "xs",
      borderColor: "border",
    },
  },
  variants: {
    size: {
      sm: { control: { boxSize: "3.75" } },
      md: { control: { boxSize: "4.75" } },
    },
    variant: {
      solid: {
        control: {
          "&:is([data-state=checked], [data-state=indeterminate])": {
            bg: "primary.solid",
            borderColor: "primary.solid",
            color: "white",
          },
        },
      },
    },
  },
});
