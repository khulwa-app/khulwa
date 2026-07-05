"use client";

import { useSyncExternalStore } from "react";
import { useProgressStore } from "./use-progress-store.hook";

export function useProgressHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => useProgressStore.persist.onFinishHydration(onChange),
    () => useProgressStore.persist.hasHydrated(),
    () => false,
  );
}
