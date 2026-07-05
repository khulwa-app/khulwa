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
        "radial-gradient(35.6% 42.0% at 50.0% 46.7%, {colors.mesh.coreBloom} 0%, {colors.mesh.coreBloom} 20%, transparent 70%)," +
        "radial-gradient(35.6% 57.0% at 50.0% 37.8%, {colors.mesh.glowGreen} 0%, {colors.mesh.glowGreen} 20%, transparent 70%)," +
        "radial-gradient(29.0% 46.5% at 52.8% 33.3%, {colors.mesh.glowJade} 0%, {colors.mesh.glowJade} 20%, transparent 70%)," +
        "radial-gradient(21.6% 34.5% at 62.5% 20.0%, {colors.mesh.glowSage} 0%, {colors.mesh.glowSage} 20%, transparent 70%)," +
        "radial-gradient(29.0% 46.5% at 33.3% 84.4%, {colors.mesh.glowEmerald} 0%, {colors.mesh.glowEmerald} 20%, transparent 70%)," +
        "radial-gradient(24.4% 39.0% at 81.9% 84.4%, {colors.mesh.glowMint} 0%, {colors.mesh.glowMint} 20%, transparent 70%)," +
        "radial-gradient(30.0% 48.0% at 52.8% 80.0%, {colors.mesh.glowTeal} 0%, {colors.mesh.glowTeal} 20%, transparent 70%)," +
        "radial-gradient(35.6% 57.0% at 77.8% 35.6%, {colors.mesh.glowGreen} 0%, {colors.mesh.glowGreen} 20%, transparent 70%)," +
        "radial-gradient(33.8% 54.0% at 20.8% 28.9%, {colors.mesh.glowSage} 0%, {colors.mesh.glowSage} 20%, transparent 70%)",
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
