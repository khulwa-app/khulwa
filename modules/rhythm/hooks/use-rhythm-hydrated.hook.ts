"use client";

import { useSyncExternalStore } from "react";
import { useRhythmStore } from "./use-rhythm-store.hook";

export function useRhythmHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => useRhythmStore.persist.onFinishHydration(onChange),
    () => useRhythmStore.persist.hasHydrated(),
    () => false,
  );
}
