import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
        set((state) => (state.dismissedHints.includes(id) ? state : { dismissedHints: [...state.dismissedHints, id] })),
      isHintDismissed: (id) => get().dismissedHints.includes(id),
    }),
    {
      name: "khulwa-ui-prefs",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
