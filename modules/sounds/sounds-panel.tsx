"use client";

import { VolumeCross, VolumeLoud } from "@solar-icons/react";
import { IconButton, ScrollArea } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Panel, SidePanel, usePanels } from "../panels";
import { SOUNDS } from "./catalog";
import { type MentalState, useSounds } from "./hooks/use-sounds-store.hook";
import { SoundGrid } from "./components/sound-grid";
import { SoundTile } from "./components/sound-tile";
import { VolumeSlider } from "./components/volume-slider";

const MENTAL_STATES: Array<{ value: MentalState; label: string; detail: string }> = [
  { value: "deep", label: "Deep work", detail: "steady" },
  { value: "learn", label: "Learning", detail: "clear" },
  { value: "create", label: "Create", detail: "open" },
  { value: "reset", label: "Reset", detail: "soft" },
];

export default function SoundsPanel() {
  const open = usePanels((s) => s.open === Panel.Music);
  const close = usePanels((s) => s.close);
  const master = useSounds((s) => s.master);
  const setMaster = useSounds((s) => s.setMaster);
  const mentalState = useSounds((s) => s.mentalState);
  const setMentalState = useSounds((s) => s.setMentalState);
  const intensity = useSounds((s) => s.intensity);
  const setIntensity = useSounds((s) => s.setIntensity);
  const playingCount = useSounds((s) => Object.values(s.playing).filter(Boolean).length);
  const currentState = MENTAL_STATES.find((state) => state.value === mentalState) ?? MENTAL_STATES[0];

  const toggleMaster = () => (master <= 0 ? setMaster(0.5) : setMaster(0));
  const intensityLabel = intensity < 0.34 ? "Low" : intensity < 0.67 ? "Balanced" : "High";

  return (
    <SidePanel open={open} title="Ambient" onClose={close}>
      <div className="flex h-full w-full flex-col gap-4">
        <section className="rounded-panel border border-sage-300 bg-sage-100 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-sage-700">Mental state</p>
              <h3 className="mt-1 text-xl font-bold text-sage-1000">{currentState.label}</h3>
              <p className="mt-1 text-sm text-sage-700">{playingCount ? `${playingCount} layer${playingCount > 1 ? "s" : ""} active` : "Choose a layer to begin"}</p>
            </div>
            <div className="grid h-16 w-20 shrink-0 grid-cols-7 items-end gap-1 rounded-control bg-sage-900 p-3" aria-hidden>
              {Array.from({ length: 7 }).map((_, index) => (
                <span
                  className="rounded-full bg-sage-500"
                  key={index}
                  style={{ height: `${24 + (((index * 17) + Math.round(intensity * 40)) % 32)}px`, opacity: 0.42 + intensity * 0.5 }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {MENTAL_STATES.map((state) => {
              const active = mentalState === state.value;
              return (
                <button
                  aria-pressed={active}
                  className={cn(
                    "rounded-control border px-3 py-2 text-left transition-colors duration-200 motion-reduce:transition-none",
                    active ? "border-sage-500 bg-sage-500 text-sage-100" : "border-sage-300 bg-base-100 text-sage-800 hover:border-sage-500 hover:bg-sage-200",
                  )}
                  key={state.value}
                  onClick={() => setMentalState(state.value)}
                  type="button"
                >
                  <span className="block text-sm font-bold">{state.label}</span>
                  <span className={cn("mt-0.5 block text-xs", active ? "text-sage-200" : "text-sage-700")}>{state.detail}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-panel border border-sage-300 bg-base-100 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-sage-1000">Neural intensity</p>
              <p className="text-xs text-sage-700">{intensityLabel}</p>
            </div>
            <span className="khulwa-numeric text-sm font-bold text-sage-200">{Math.round(intensity * 100)}%</span>
          </div>
          <VolumeSlider value={intensity} onChange={setIntensity} label="Neural intensity" />
        </section>

        <ScrollArea className="min-h-0 w-full flex-1">
          <SoundGrid.Root>
            {SOUNDS.map((def) => (
              <SoundTile key={def.id} def={def} />
            ))}
          </SoundGrid.Root>
        </ScrollArea>

        <div className="flex shrink-0 items-center gap-2">
          <IconButton aria-label={master ? "Mute" : "Unmute"} onClick={toggleMaster} size="sm">
            {master ? <VolumeLoud className="size-5" /> : <VolumeCross className="size-5" />}
          </IconButton>
          <VolumeSlider className="flex-1" value={master} onChange={setMaster} label="Master volume" />
        </div>
      </div>
    </SidePanel>
  );
}
