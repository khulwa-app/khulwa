"use client";

import { useRef } from "react";
import { AudioLines, Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
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
  const activeLabels = active.map((def) => tSounds(`items.${def.id}`));
  const mixTitle = isPlaying
    ? [activeLabels.slice(0, 2).join(" · "), activeLabels.length > 2 ? `+${activeLabels.length - 2}` : null]
        .filter(Boolean)
        .join(" ")
    : t("nothingPlaying");
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
      <div className="relative z-1 flex flex-1 w-full items-center justify-center px-5 pt-24 pb-30 md:px-8 md:py-18">
        <section className="flex w-full max-w-4xl flex-col items-center gap-6 text-center md:gap-7">
          <p className="kh-space-kicker text-foreground-muted">{t("title")}</p>

          <div className="relative flex aspect-square w-[min(52vw,13rem)] items-center justify-center rounded-full border border-hairline/70 bg-surface-veil/18 backdrop-blur-[2px] md:w-[15rem]">
            <div className="absolute inset-8 rounded-full border border-hairline/45 md:inset-10" aria-hidden />
            <AudioLines className={cn("relative size-10 md:size-12", isPlaying ? "text-primary" : "text-foreground-muted")} />
          </div>

          <div className="flex max-w-3xl flex-col items-center gap-3">
            <h1 className="kh-ambient-hero text-foreground">{mixTitle}</h1>

            <p aria-live="polite" className="min-h-5 text-sm text-foreground-muted">
              {isPlaying ? t("playing", { count: active.length }) : "Choose a quiet layer and let it sit behind the work."}
            </p>
          </div>

          <div className="flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {SOUNDS.map((sound) => {
              const activeSound = Boolean(playing[sound.id]);
              return (
                <button
                  key={sound.id}
                  type="button"
                  aria-pressed={activeSound}
                  onClick={() => setPlaying(sound.id, !activeSound)}
                  className={cn(
                    "kh-sound-chip",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] motion-reduce:active:scale-100",
                    activeSound
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-veil/55 text-foreground-secondary ring-1 ring-hairline hover:bg-surface-elevated hover:text-foreground",
                  )}
                >
                  {tSounds(`items.${sound.id}`)}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? t("pause") : t("play")}
              className="kh-primary-action motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {isPlaying ? <Pause className="size-4.5 fill-current" /> : <Play className="size-4.5 fill-current" />}
              {isPlaying ? t("pause") : t("play")}
            </button>

            <button
              type="button"
              onClick={() => {
                if (openPanel !== Panel.Music) togglePanel(Panel.Music);
              }}
              className="kh-secondary-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t("openSounds")}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
