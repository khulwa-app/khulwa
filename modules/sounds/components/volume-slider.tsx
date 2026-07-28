"use client";

import { cn } from "@/lib/cn";

interface VolumeSliderProps { value: number; onChange: (value: number) => void; label: string; className?: string; }
export function VolumeSlider({ value, onChange, label, className }: VolumeSliderProps) { return <input aria-label={label} className={cn("range range-xs accent-[#24473F]", className)} max="100" min="0" onChange={(event) => onChange(Number(event.target.value) / 100)} step="5" type="range" value={Math.round(value * 100)} />; }
