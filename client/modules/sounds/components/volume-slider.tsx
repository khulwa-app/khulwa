"use client";

import { Box, Slider, type BoxProps } from "@chakra-ui/react";

interface VolumeSliderProps extends Omit<BoxProps, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export function VolumeSlider({ value, onChange, label, ...boxProps }: VolumeSliderProps) {
  return (
    <Box layerStyle="sliderAccent" paddingInline="1" {...boxProps}>
      <Slider.Root
        size="sm"
        min={0}
        max={100}
        step={5}
        value={[Math.round(value * 100)]}
        onValueChange={(details) => onChange(details.value[0] / 100)}
        aria-label={[label]}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
}
