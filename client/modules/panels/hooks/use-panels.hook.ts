"use client";

import { create } from "zustand";
import { Panel } from "../types";

type PanelsState = {
  open: Panel | null;
  toggle: (panel: Panel) => void;
  close: () => void;
};

/**
 * Ephemeral UI state for the floating panels (music / tasks / notepad /
 * settings) toggled from the dock. One open at a time; not persisted.
 */
export const usePanels = create<PanelsState>((set) => ({
  open: null,
  toggle: (panel) => set((s) => ({ open: s.open === panel ? null : panel })),
  close: () => set({ open: null }),
}));
