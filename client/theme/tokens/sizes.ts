import { defineTokens } from "@chakra-ui/react";

// Named layout sizes for surfaces that aren't on the spacing scale.
// Reference by token (e.g. "min({sizes.palette}, 92vw)"), never raw px.
export const sizes = defineTokens.sizes({
  palette: { value: "560px" }, // command-palette overlay max width
});
