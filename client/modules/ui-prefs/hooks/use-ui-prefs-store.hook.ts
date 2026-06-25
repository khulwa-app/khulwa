import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Small persisted bag for "remember this UI choice forever" flags — currently
 * just dismissed one-off hints (e.g. the ⌘K discoverability nudge). Kept
 * separate from domain stores so hints never pollute task/timer state.
 */
type UiPrefsState = {
  dismissedHints: string[];
  dismissHint: (id: string) => void;
  isHintDismissed: (id: string) => boolean;
};

export const useUiPrefsStore = create<UiPrefsState>()(
  persist(
    (set, get) => ({
      dismissedHints: [],
      dismissHint: (id) =>
        set((state) =>
          state.dismissedHints.includes(id)
            ? state
            : { dismissedHints: [...state.dismissedHints, id] },
        ),
      isHintDismissed: (id) => get().dismissedHints.includes(id),
    }),
    {
      name: "khulwa-ui-prefs",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
