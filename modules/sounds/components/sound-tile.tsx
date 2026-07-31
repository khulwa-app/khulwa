"use client";

import { Coffee, Cloud, CloudRain, Flame, Keyboard, AudioWaveform, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { type SoundDef } from "../catalog";
import { useSounds } from "../hooks/use-sounds-store.hook";

const ICONS: Record<string, LucideIcon> = {
  rain: CloudRain,
  "rain-birds": Cloud,
  fire: Flame,
  cafe: Coffee,
  theta: AudioWaveform,
  typing: Keyboard,
};

export function SoundTile({ def, onSelect }: { def: SoundDef; onSelect: () => void }) {
  const t = useTranslations("sounds");
  const playing = useSounds((s) => s.playing[def.id] ?? false);
  const toggle = useSounds((s) => s.toggle);
  const Icon = ICONS[def.id] ?? AudioWaveform;
  const label = t(`items.${def.id}`);

  return (
    <button
      type="button"
      aria-pressed={playing}
      data-playing={playing || undefined}
      onClick={() => {
        toggle(def.id);
        onSelect();
      }}
      className={cn(
        // Every tile carries its own surface at rest, so playing changes the fill rather than making
        // a container appear out of nowhere.
        "group relative flex h-[5.5rem] flex-col items-center justify-center gap-2 rounded-2xl border border-hairline bg-surface text-xs font-medium text-foreground-secondary transition-colors",
        "hover:bg-surface-elevated hover:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "data-[playing]:border-primary/45 data-[playing]:bg-primary/15 data-[playing]:text-foreground",
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-surface-elevated text-foreground-secondary transition-colors group-data-[playing]:bg-primary group-data-[playing]:text-primary-foreground">
        <Icon className="size-[18px]" />
      </span>
      {label}
      {playing ? (
        <span title={t("playing")} className="absolute top-2 right-2 size-1.5 rounded-full bg-success" aria-hidden />
      ) : null}
    </button>
  );
}
