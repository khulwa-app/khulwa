"use client";

import { useTasksStore } from "./use-tasks-store.hook";
import type { CreateTaskInput, Task } from "./tasks.types";

export function useCreateTask() {
  const addTask = useTasksStore((s) => s.addTask);
  return {
    mutate: (input: CreateTaskInput, opts?: { onSuccess?: (task: Task) => void }) => {
      const task = addTask(input);
      opts?.onSuccess?.(task);
    },
  };
}
