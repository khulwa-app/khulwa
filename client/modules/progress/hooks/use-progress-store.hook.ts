"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CategoryId } from "../categories";

type DayTotals = Partial<Record<CategoryId, number>>;

type ProgressState = {
  selected: CategoryId | null;
  byDate: Record<string, DayTotals>;
  setCategory: (id: CategoryId | null) => void;
  logFocus: (dateKey: string, category: CategoryId, seconds: number) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      selected: "deepWork",
      byDate: {},
      setCategory: (id) => set({ selected: id }),
      logFocus: (dateKey, category, seconds) =>
        set((s) => {
          const day = s.byDate[dateKey] ?? {};
          return {
            byDate: {
              ...s.byDate,
              [dateKey]: { ...day, [category]: (day[category] ?? 0) + seconds },
            },
          };
        }),
    }),
    {
      name: "khulwa-progress",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
