"use client";

import { useRef } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { SOUNDS } from "@/modules/sounds";
import { useSounds } from "@/modules/sounds";
import { usePanels, Panel } from "@/modules/panels";
import { SpaceBackground } from "./space-background";

export function AmbientSpace() {
  const t = useTranslations("khulwa.ambient");
  const tSounds = useTranslations("sounds");
  const playing = useSounds((s) => s.playing);
  const setPlaying = useSounds((s) => s.setPlaying);
  const stopAll = useSounds((s) => s.stopAll);
  const togglePanel = usePanels((s) => s.toggle);
  const openPanel = usePanels((s) => s.open);

  const active = SOUNDS.filter((def) => playing[def.id]);
  const isPlaying = active.length > 0;
  // Remembers what was on so pausing and resuming restores the same mix.
  const lastMix = useRef<string[]>([]);

  const toggle = () => {
    if (isPlaying) {
      lastMix.current = active.map((def) => def.id);
      stopAll();
      return;
    }
    const restore = lastMix.current.length ? lastMix.current : [SOUNDS[0].id];
    restore.forEach((id) => setPlaying(id, true));
  };

  return (
    <div className="relative flex min-h-full w-full flex-col overflow-x-hidden bg-canvas">
      <SpaceBackground />
      <div className="relative z-1 flex flex-1 w-full flex-col items-center justify-center gap-6 px-6 py-16 md:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-foreground-muted uppercase">{t("title")}</p>

        <p className="max-w-md text-center text-2xl font-semibold">
          {isPlaying ? active.map((def) => tSounds(`items.${def.id}`)).join(" · ") : t("nothingPlaying")}
        </p>

        <p aria-live="polite" className="text-sm text-foreground-muted">
          {isPlaying ? t("playing", { count: active.length }) : null}
        </p>

        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? t("pause") : t("play")}
          className="flex size-15 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[background-color,transform] duration-[var(--duration-press)] hover:bg-primary-hover active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {isPlaying ? <Pause className="size-6 fill-current" /> : <Play className="size-6 fill-current" />}
        </button>

        <button
          type="button"
          onClick={() => {
            if (openPanel !== Panel.Music) togglePanel(Panel.Music);
          }}
          className="flex h-11 items-center rounded-full px-3 text-xs text-foreground-secondary transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("openSounds")}
        </button>
      </div>
    </div>
  );
}
