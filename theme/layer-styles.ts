import { defineLayerStyles } from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
  scrim: {
    description: "modal backdrop",
    value: {
      bg: "bg.scrim",
      backdropFilter: "blur(2px)",
    },
  },
  "space-backdrop": {
    description: "bright sage-aurora bloom — pale field, sage/teal/green glows, data-phase hue-shift, crossfade",
    value: {
      backgroundColor: "{colors.mesh.floor}",
      backgroundImage:
        "radial-gradient(55% 55% at 20% 16%, {colors.mesh.glowHaze} 0%, transparent 48%)," +
        "radial-gradient(75% 70% at 8% 22%, {colors.mesh.glowSage} 0%, transparent 52%)," +
        "radial-gradient(80% 75% at 90% 85%, {colors.mesh.glowGreen} 0%, transparent 55%)," +
        "radial-gradient(70% 65% at 70% 55%, {colors.mesh.glowTeal} 0%, transparent 58%)",
      filter: "saturate(1.05)",
      transition: "filter {durations.mood} {easings.standard}",
      "&[data-phase=shortBreak]": { filter: "saturate(0.95) hue-rotate(-20deg)" },
      "&[data-phase=longBreak]": { filter: "hue-rotate(40deg)" },
      "&[data-phase=micro]": { filter: "saturate(0.70) brightness(0.96)" },
      "&[data-phase=alert]": { filter: "saturate(1.15) hue-rotate(160deg)" },
      _after: {
        content: '""',
        position: "absolute",
        inset: 0,
        bg: "glass.sheet",
        pointerEvents: "none",
      },
      _motionReduce: { transition: "none" },
    },
  },
  sliderAccent: {
    description: "slim jade volume slider",
    value: {
      "& [data-part=track]": { bg: "border.subtle" },
      "& [data-part=range]": { bg: "primary.solid" },
      "& [data-part=thumb]": {
        bg: "primary.solid",
        borderColor: "bg.panel",
        boxShadow: "glass-sm",
      },
    },
  },

  card: {
    description: "frosted dark glass card — borderless, graduated rim + light lift, white text",
    value: {
      background: "glass.panel",
      color: "fg.onMesh",
      borderRadius: "3xl",
      backdropFilter: "blur(24px) saturate(1.6)",
      boxShadow: "glass-sm",
    },
  },
  "card-anchor": {
    description: "frosted dark glass anchor card — roundest tier (doing-now, resume)",
    value: {
      background: "glass.panel",
      color: "fg.onMesh",
      borderRadius: "3xl",
      backdropFilter: "blur(24px) saturate(1.6)",
      boxShadow: "glass-sm",
    },
  },
  raised: {
    description: "frosted dark glass chrome (dock, timer pill, badges) — borderless, graduated rim + lift",
    value: {
      background: "glass.chrome",
      color: "fg.onMesh",
      backdropFilter: "blur(24px) saturate(1.75)",
      boxShadow: "glass-sm",
    },
  },
  overlay: {
    description: "frosted dark glass panel — modals / palette / sheets / tool panel / menus",
    value: {
      background: "glass.panel",
      color: "fg.onMesh",
      borderRadius: "3xl",
      backdropFilter: "blur(30px) saturate(1.8)",
      boxShadow: "glass",
    },
  },
});
