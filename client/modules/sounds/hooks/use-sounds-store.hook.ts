import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SOUNDS } from "../catalog";

type SoundsState = {
  playing: Record<string, boolean>;
  volume: Record<string, number>;
  master: number;
  toggle: (id: string) => void;
  setPlaying: (id: string, playing: boolean) => void;
  setVolume: (id: string, volume: number) => void;
  setMaster: (volume: number) => void;
  stopAll: () => void;
};

const clampVolume = (v: number) => Math.min(1, Math.max(0, Math.round(v * 100) / 100));
const DEFAULT_VOLUME = Object.fromEntries(SOUNDS.map((s) => [s.id, 0.5]));

export const useSounds = create<SoundsState>()(
  persist(
    (set) => ({
      playing: {},
      volume: DEFAULT_VOLUME,
      master: 0.8,
      toggle: (id) => set((s) => ({ playing: { ...s.playing, [id]: !s.playing[id] } })),
      setPlaying: (id, playing) => set((s) => ({ playing: { ...s.playing, [id]: playing } })),
      setVolume: (id, volume) => set((s) => ({ volume: { ...s.volume, [id]: clampVolume(volume) } })),
      setMaster: (volume) => set({ master: clampVolume(volume) }),
      stopAll: () => set({ playing: {} }),
    }),
    {
      name: "khulwa-sounds",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (s) => ({ volume: s.volume, master: s.master, playing: s.playing }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Pick<SoundsState, "volume" | "master" | "playing">>;
        return {
          ...current,
          master: p.master ?? current.master,
          volume: { ...current.volume, ...(p.volume ?? {}) },
          playing: { ...current.playing, ...(p.playing ?? {}) },
        };
      },
    },
  ),
);
