import { defineLayerStyles } from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
  scrim: {
    description: "modal backdrop",
    value: {
      bg: "bg.scrim",
      
    },
  },
  "space-backdrop": {
    description: "jet linear field — the dark ramp, dark at the top for the hero, data-phase hue-shift",
    value: {
      backgroundColor: "{colors.jet.950}",
      backgroundImage:
        "linear-gradient(180deg, {colors.jet.950}, {colors.jet.900}, {colors.jet.800}, {colors.jet.700})",
      transition: "filter {durations.mood} {easings.standard}",
      "&[data-phase=shortBreak]": { filter: "saturate(0.95) hue-rotate(-24deg)" },
      "&[data-phase=longBreak]": { filter: "hue-rotate(46deg)" },
      "&[data-phase=micro]": { filter: "saturate(0.70) brightness(0.96)" },
      "&[data-phase=alert]": { filter: "saturate(1.25) hue-rotate(172deg)" },
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
      },
    },
  },

  card: {
    description: "solid deep-space card",
    value: {
      background: "bg.panel",
      color: "fg",
      borderRadius: "3xl",
    },
  },
  raised: {
    description: "translucent ink chrome (dock, timer pill, badges)",
    value: {
      background: "bg.raised",
      color: "fg",
    },
  },
  overlay: {
    description: "solid deep-space panel — modals / palette / sheets / tool panel",
    value: {
      background: "bg.panel",
      color: "fg",
      borderRadius: "3xl",
    },
  },
});
