"use client";

import { Slider } from "@/components/shadcn/slider";
import { cn } from "@/lib/utils";

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  disabled?: boolean;
  className?: string;
  "data-volume-control"?: boolean;
}

export function VolumeSlider({
  value,
  onChange,
  label,
  disabled,
  className,
  "data-volume-control": dataVolumeControl,
}: VolumeSliderProps) {
  return (
    <div data-volume-control={dataVolumeControl || undefined} className={cn("flex-1", className)}>
      <Slider
        aria-label={label}
        disabled={disabled}
        min={0}
        max={100}
        step={5}
        value={[Math.round(value * 100)]}
        onValueChange={(next) => onChange(next[0] / 100)}
        className="w-full"
      />
    </div>
  );
}
