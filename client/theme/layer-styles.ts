import { defineLayerStyles } from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
  scrim: {
    description: "modal backdrop",
    value: {
      bg: "bg.scrim",
      backdropFilter: "blur(2px)",
    },
  },
  // Brand gradients — kept as layer-styles (consistent with `noor`), not tokens.
  "gradient-brand-radial": {
    description: "brand hero accent — violet core blooming to magenta",
    value: {
      backgroundImage:
        "radial-gradient(circle at 50% 42%, {colors.violet.500} 0%, {colors.magenta.500} 58%, {colors.magentaClear} 72%)",
    },
  },
  "gradient-brand-linear": {
    description: "brand linear accent",
    value: {
      backgroundImage: "linear-gradient(135deg, {colors.violet.500}, {colors.magenta.500})",
    },
  },
  "space-backdrop": {
    description: "calm ambient wash behind spaces — subtle violet/magenta tints",
    value: {
      bg: "bg.base",
      backgroundImage:
        "radial-gradient(60% 50% at 12% 8%, {colors.violetA.200} 0%, {colors.violetClear} 70%), radial-gradient(55% 45% at 88% 92%, {colors.magentaA.200} 0%, {colors.magentaClear} 70%)",
      _dark: {
        backgroundImage:
          "radial-gradient(60% 50% at 12% 8%, {colors.violetA.100} 0%, {colors.violetClear} 70%), radial-gradient(55% 45% at 88% 92%, {colors.magentaA.100} 0%, {colors.magentaClear} 70%)",
      },
    },
  },
  noor: {
    description: "the Noor companion — living violet→magenta light",
    value: {
      // Richer, fuller gradient (color carries further out) + crisper edge —
      // less blur, more colour. The glow + hue cycle live on the component.
      backgroundImage:
        "radial-gradient(circle at 50% 40%, {colors.violet.400} 0%, {colors.violet.500} 26%, {colors.magenta.500} 60%, {colors.magenta.400} 74%, {colors.magentaClear} 86%)",
      borderRadius: "full",
      filter: "blur(3px)",
      boxShadow: "0 0 40px 8px {colors.magentaA.400}, 0 0 22px 2px {colors.violetA.500}",
      _dark: {
        backgroundImage:
          "radial-gradient(circle at 50% 40%, {colors.violet.300} 0%, {colors.violet.400} 26%, {colors.magenta.400} 60%, {colors.magenta.500} 74%, {colors.magentaClear} 86%)",
      },
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
      borderRadius: "surface", // general card tier
      boxShadow: "sm",
    },
  },
  "card-anchor": {
    description: "anchor surface card — roundest tier (doing-now, resume)",
    value: {
      background: "surface.card",
      borderWidth: "1px",
      borderColor: "border.subtle",
      borderRadius: "surface", // anchor cards share the one container tier
      boxShadow: "sm",
    },
  },
  raised: {
    description: "raised / floating chrome (dock, pills, cards)",
    value: {
      background: "bg.elevated",
      borderWidth: "1px",
      borderColor: "border.subtle",
      // No radius here — `raised` is shared by large cards and small chrome
      // (dock items, pills), so each consumer sets its own `rounded` token.
      boxShadow: "md",
    },
  },
  overlay: {
    description: "modal / popover / sheet / tool panel",
    value: {
      background: "bg.elevated",
      borderWidth: "1px",
      borderColor: "border.default",
      borderRadius: "surface", // modals / palette / sheets
      boxShadow: "xl",
    },
  },
});
