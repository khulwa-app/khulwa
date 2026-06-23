import { defineLayerStyles } from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
  // Fine film grain — subtle texture layered over photo wallpapers only.
  grain: {
    description: "fine film grain overlay",
    value: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.05,
      mixBlendMode: "overlay",
    },
  },
  sliderAccent: {
    description: "slim jade volume slider",
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

  // Solid elevation tiers — the flat v3 surfaces (no glass/blur). Cards, the
  // floating chrome (dock, pills, doing-now card), and overlays (panels).
  card: {
    description: "resting surface card",
    value: {
      background: "surface.card",
      borderWidth: "1px",
      borderColor: "border.subtle",
      boxShadow: "sm",
    },
  },
  raised: {
    description: "raised / floating chrome (dock, pills, cards)",
    value: {
      background: "bg.elevated",
      borderWidth: "1px",
      borderColor: "border.subtle",
      boxShadow: "md",
    },
  },
  overlay: {
    description: "modal / popover / sheet / tool panel",
    value: {
      background: "bg.elevated",
      borderWidth: "1px",
      borderColor: "border.default",
      boxShadow: "xl",
    },
  },
});
