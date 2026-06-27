"use client";

import { useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";
import { DoingNowActive } from "./doing-now-active";
import { DoingNowEmpty } from "./doing-now-empty";

export function DoingNowCard() {
  const hydrated = useTasksHydrated();
  const currentTask = useTasksStore((s) => s.tasks.find((task) => task.isDoingNow));

  if (!hydrated) return null;
  return currentTask ? <DoingNowActive task={currentTask} /> : <DoingNowEmpty />;
}
