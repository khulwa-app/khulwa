"use client";

import { useTasksStore } from "./use-tasks-store.hook";
import { useTasksHydrated } from "./use-tasks-hydrated.hook";

export { DEFAULT_ETA } from "./use-tasks-store.hook";

export function useTasks() {
  const hydrated = useTasksHydrated();
  const tasks = useTasksStore((s) => s.tasks);
  return { data: hydrated ? tasks : undefined, isPending: !hydrated };
}
