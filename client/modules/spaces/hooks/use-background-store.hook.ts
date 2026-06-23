import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Space } from "@/modules/space/types";

// Each space keeps its own background. The picker writes to whichever space is
// active; SpaceBackground reads its own space's choice.
type SpaceBackgrounds = Record<Space, string>;

const DEFAULTS: SpaceBackgrounds = {
  [Space.Home]: "flat",
  [Space.Focus]: "flat",
  [Space.Ambient]: "flat",
};

// Removed aurora-gradient ids — any persisted choice pointing at one falls back
// to the flat themed base.
const REMOVED_IDS = new Set(["aura", "nightfall", "nebula", "prism", "blueFlare", "darkFlare"]);
const sanitize = (id: unknown): string => (typeof id === "string" && !REMOVED_IDS.has(id) ? id : "flat");

type BackgroundState = {
  bySpace: SpaceBackgrounds;
  setBackground: (space: Space, id: string) => void;
};

export const useBackground = create<BackgroundState>()(
  persist(
    (set) => ({
      bySpace: DEFAULTS,
      setBackground: (space, id) => set((s) => ({ bySpace: { ...s.bySpace, [space]: id } })),
    }),
    {
      name: "khulwa-background",
      storage: createJSONStorage(() => localStorage),
      version: 3,
      // v1 stored a single global `id`; v3 dropped the gradients. Upgrade by
      // spreading the old id across spaces, then sanitizing removed ids below.
      migrate: (persisted, version) => {
        if (version < 2 && persisted && typeof (persisted as { id?: string }).id === "string") {
          const id = (persisted as { id: string }).id;
          return { bySpace: { [Space.Home]: id, [Space.Focus]: id, [Space.Ambient]: id } };
        }
        return persisted as BackgroundState;
      },
      // Fill any missing space with its default and drop removed gradient ids.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<BackgroundState>;
        const merged = { ...current.bySpace, ...(p.bySpace ?? {}) };
        return {
          ...current,
          bySpace: {
            [Space.Home]: sanitize(merged[Space.Home]),
            [Space.Focus]: sanitize(merged[Space.Focus]),
            [Space.Ambient]: sanitize(merged[Space.Ambient]),
          },
        };
      },
    },
  ),
);
