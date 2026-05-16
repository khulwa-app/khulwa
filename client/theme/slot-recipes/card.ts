import { defineSlotRecipe } from "@chakra-ui/react";

export const cardSlotRecipe = defineSlotRecipe({
  className: "khulwa-card",
  slots: ["root", "header", "body", "footer", "title", "description"],
  base: {},
  variants: {
    variant: {
      "login-page": {
        root: {
          boxShadow: "sm",
          bgImage: "var(--khulwa-gradients-login-page)",
        },
      },
    },
  },
});
