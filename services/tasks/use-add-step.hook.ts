"use client";

import { useTasksStore } from "./use-tasks-store.hook";

export function useAddStep() {
  const addStep = useTasksStore((s) => s.addStep);
  return { mutate: ({ taskId, body }: { taskId: string; body: string }) => addStep(taskId, body) };
}
