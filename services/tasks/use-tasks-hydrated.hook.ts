"use client";

import { useSyncExternalStore } from "react";
import { useTasksStore } from "./use-tasks-store.hook";

export function useTasksHydrated(): boolean {
  return useSyncExternalStore(
    (cb) => useTasksStore.persist.onFinishHydration(cb),
    () => useTasksStore.persist.hasHydrated(),
    () => false,
  );
}
