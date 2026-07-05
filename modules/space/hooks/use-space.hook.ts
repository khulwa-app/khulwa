"use client";

import { create } from "zustand";
import { Space } from "../types";

const SPACES: Space[] = [Space.Home, Space.Focus, Space.Ambient];

type SpaceState = {
  spaces: Space[];
  activeSpace: Space;
  changeSpace: (space: Space) => void;
};

// Ephemeral client UI state — switching spaces must not navigate or touch the
// server (keeps /app's SSR decoupled from this interaction). See modules/panels.
export const useSpace = create<SpaceState>((set) => ({
  spaces: SPACES,
  activeSpace: Space.Home,
  changeSpace: (space) => set({ activeSpace: space }),
}));
