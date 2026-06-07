"use client";

import { useSyncExternalStore } from "react";
import { usePomodoroStore } from "./use-pomodoro-store.hook";

export function usePomodoroHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => usePomodoroStore.persist.onFinishHydration(onChange),
    () => usePomodoroStore.persist.hasHydrated(),
    () => false,
  );
}
