"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { RhythmId } from "../rhythms";

type DayDone = Partial<Record<RhythmId, boolean>>;

type RhythmState = {
  byDate: Record<string, DayDone>;
  toggle: (dateKey: string, id: RhythmId) => void;
};

export const useRhythmStore = create<RhythmState>()(
  persist(
    (set) => ({
      byDate: {},
      toggle: (dateKey, id) =>
        set((s) => {
          const day = s.byDate[dateKey] ?? {};
          return {
            byDate: { ...s.byDate, [dateKey]: { ...day, [id]: !day[id] } },
          };
        }),
    }),
    {
      name: "khulwa-rhythm",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
