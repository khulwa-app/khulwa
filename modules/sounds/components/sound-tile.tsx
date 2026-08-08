"use client";

import { Coffee, Cloud, CloudRain, Flame, Keyboard, AudioWaveform, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { type SoundDef } from "../catalog";
import { useSounds } from "../hooks/use-sounds-store.hook";
import { VolumeSlider } from "./volume-slider";

const ICONS: Record<string, LucideIcon> = {
  rain: CloudRain,
  "rain-birds": Cloud,
  fire: Flame,
  cafe: Coffee,
  theta: AudioWaveform,
  typing: Keyboard,
};

export function SoundTile({ def }: { def: SoundDef }) {
  const t = useTranslations("sounds");
  const playing = useSounds((s) => s.playing[def.id] ?? false);
  const volume = useSounds((s) => s.volume[def.id] ?? 0.5);
  const toggle = useSounds((s) => s.toggle);
  const setVolume = useSounds((s) => s.setVolume);
  const Icon = ICONS[def.id] ?? AudioWaveform;
  const label = t(`items.${def.id}`);
  const toggleSound = () => toggle(def.id);
  const ignoreToggle = (target: EventTarget | null) => target instanceof HTMLElement && Boolean(target.closest("[data-volume-control]"));

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={playing}
      data-playing={playing || undefined}
      onClick={(event) => {
        if (ignoreToggle(event.target)) return;
        toggleSound();
      }}
      onKeyDown={(event) => {
        if (ignoreToggle(event.target)) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleSound();
        }
      }}
      className={cn(
        "group flex min-h-[7.75rem] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl px-3 py-3 text-center",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <button
        type="button"
        aria-label={label}
        aria-pressed={playing}
        onClick={(event) => {
          event.stopPropagation();
          toggleSound();
        }}
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full text-foreground-secondary transition-colors",
          "hover:bg-primary/20 hover:text-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "group-data-[playing]:bg-primary group-data-[playing]:text-primary-foreground",
        )}
      >
        <Icon className="size-[18px]" />
      </button>

      <span className="max-w-full truncate text-sm font-medium text-foreground-secondary transition-colors group-data-[playing]:text-foreground">
        {label}
      </span>

      <VolumeSlider
        value={volume}
        onChange={(next) => setVolume(def.id, next)}
        label={t("volumeFor", { name: label })}
        data-volume-control
        className={cn("w-full transition-opacity", !playing && "opacity-55")}
      />
    </div>
  );
}
