"use client";

import { useTasksStore } from "./use-tasks-store.hook";
import type { UpdateTaskInput } from "./tasks.types";

export function useUpdateTask() {
  const updateTask = useTasksStore((s) => s.updateTask);
  return { mutate: ({ id, patch }: { id: string; patch: UpdateTaskInput }) => updateTask(id, patch) };
}
