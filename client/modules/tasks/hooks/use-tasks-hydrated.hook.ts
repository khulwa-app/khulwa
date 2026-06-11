"use client";

import { useSyncExternalStore } from "react";
import { useTasksStore } from "./use-tasks-store.hook";

export function useTasksHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => useTasksStore.persist.onFinishHydration(onChange),
    () => useTasksStore.persist.hasHydrated(),
    () => false,
  );
}
