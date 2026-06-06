import { create } from "zustand";
import { Space } from "../types";

type SpaceState = {
  spaces: Space[];
  activeSpace: Space;
  changeSpace: (space: Space) => void;
};

export const useSpace = create<SpaceState>((set) => ({
  spaces: [Space.Home, Space.Focus, Space.Ambient, Space.Tasks, Space.Stats],
  activeSpace: Space.Home,
  changeSpace: (space: Space) => set({ activeSpace: space }),
}));
