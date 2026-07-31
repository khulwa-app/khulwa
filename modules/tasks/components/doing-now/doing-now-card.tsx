"use client";

import { useTasks } from "@/services/tasks";
import { DoingNowActive } from "./doing-now-active";
import { DoingNowEmpty } from "./doing-now-empty";

export function DoingNowCard() {
  const { data: tasks, isPending } = useTasks();

  if (isPending) return <div className="h-13" aria-hidden />;
  const currentTask = tasks?.find((task) => task.isDoingNow);
  return currentTask ? <DoingNowActive task={currentTask} /> : <DoingNowEmpty />;
}
