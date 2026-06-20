import { defineLayerStyles } from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
  glass: {
    description: "quiet glass — dock items, pills, doing-now card",
    value: {
      background: "bg.elevated/55",
      backdropFilter: "blur(8px)",
      boxShadow: "glass",
    },
  },
  "glass.dense": {
    description: "dense glass — panels with body text over media",
    value: {
      background: "bg.elevated/80",
      backdropFilter: "blur(16px)",
      boxShadow: "glass.dense",
    },
  },
  sliderSaffron: {
    description: "slim saffron volume slider",
    value: {
      "& [data-part=track]": { bg: "border.subtle" },
      "& [data-part=range]": { bg: "primary.default" },
      "& [data-part=thumb]": {
        bg: "primary.default",
        borderColor: "bg.elevated",
        boxShadow: "sm",
      },
    },
  },
});
