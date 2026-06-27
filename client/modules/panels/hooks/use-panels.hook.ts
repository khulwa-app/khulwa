"use client";

import { create } from "zustand";
import { Panel } from "../types";

type PanelsState = {
  open: Panel | null;
  toggle: (panel: Panel) => void;
  close: () => void;
};

export const usePanels = create<PanelsState>((set) => ({
  open: null,
  toggle: (panel) => set((s) => ({ open: s.open === panel ? null : panel })),
  close: () => set({ open: null }),
}));
