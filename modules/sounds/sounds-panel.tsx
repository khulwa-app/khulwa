"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Panel, AnchoredPanel, usePanels } from "../panels";
import { SOUNDS } from "./catalog";
import { useSounds } from "./hooks/use-sounds-store.hook";
import { SoundTile } from "./components/sound-tile";
import { VolumeSlider } from "./components/volume-slider";

export default function SoundsPanel() {
  const t = useTranslations("sounds");
  const open = usePanels((s) => s.open === Panel.Music);
  const close = usePanels((s) => s.close);
  const master = useSounds((s) => s.master);
  const setMaster = useSounds((s) => s.setMaster);
  const volume = useSounds((s) => s.volume);
  const setVolume = useSounds((s) => s.setVolume);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = SOUNDS.find((def) => def.id === selectedId) ?? null;
  const toggleMaster = () => setMaster(master <= 0 ? 0.5 : 0);

  return (
    <AnchoredPanel
      anchor="tool"
      width={420}
      open={open}
      title={t("title")}
      onClose={close}
      footer={
        <div className="flex flex-col gap-3">
          {/* Fixed-height detail row: selecting a sound must never reflow the grid above it. */}
          <div className="flex h-8 items-center gap-3">
            {selected ? (
              <>
                <span className="w-20 shrink-0 truncate text-xs text-foreground-secondary">
                  {t(`items.${selected.id}`)}
                </span>
                <VolumeSlider
                  value={volume[selected.id] ?? 0.5}
                  onChange={(next) => setVolume(selected.id, next)}
                  label={t("volumeFor", { name: t(`items.${selected.id}`) })}
                />
              </>
            ) : (
              <span className="text-xs text-foreground-muted">{t("pickOne")}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={master ? t("mute") : t("unmute")}
              onClick={toggleMaster}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {master ? <Volume2 className="size-[18px]" /> : <VolumeX className="size-[18px]" />}
            </button>
            <VolumeSlider value={master} onChange={setMaster} label={t("master")} />
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SOUNDS.map((def) => (
          <SoundTile key={def.id} def={def} onSelect={() => setSelectedId(def.id)} />
        ))}
      </div>
    </AnchoredPanel>
  );
}
