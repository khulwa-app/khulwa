"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CategoryId } from "../categories";

type ProgressState = {
  selected: CategoryId | null;
  setCategory: (id: CategoryId | null) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      selected: "deepWork",
      setCategory: (id) => set({ selected: id }),
    }),
    {
      name: "khulwa-progress",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persisted) => {
        const prev = persisted as { selected?: CategoryId | null } | null;
        return { selected: prev?.selected ?? "deepWork" } as ProgressState;
      },
    },
  ),
);
