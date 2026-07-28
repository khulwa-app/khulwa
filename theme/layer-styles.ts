import { defineLayerStyles } from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
  scrim: {
    description: "Sanctuary Dusk modal backdrop",
    value: { bg: "bg.scrim" },
  },
  "space-backdrop": {
    description: "flat Sanctuary Dusk workspace field",
    value: { backgroundColor: "bg" },
  },
  sliderAccent: {
    description: "slim juniper volume slider",
    value: {
      "& [data-part=track]": { bg: "border.subtle" },
      "& [data-part=range]": { bg: "primary.solid" },
      "& [data-part=thumb]": { bg: "primary.solid", borderColor: "bg.panel", boxShadow: "none" },
    },
  },
  card: {
    description: "warm elevated Sanctuary Dusk card",
    value: { background: "bg.panel", color: "fg", borderColor: "border", borderWidth: "1px", borderRadius: "xl" },
  },
  "card-anchor": {
    description: "warm elevated Sanctuary Dusk anchor card",
    value: { background: "bg.panel", color: "fg", borderColor: "border", borderWidth: "1px", borderRadius: "xl" },
  },
  raised: {
    description: "warm Sanctuary Dusk chrome",
    value: { background: "bg.panel", color: "fg", borderColor: "border", borderWidth: "1px", borderRadius: "xl" },
  },
  overlay: {
    description: "warm Sanctuary Dusk overlay panel",
    value: { background: "bg.panel", color: "fg", borderColor: "border", borderWidth: "1px", borderRadius: "xl" },
  },
});
