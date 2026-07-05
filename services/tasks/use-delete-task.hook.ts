"use client";

import { useTasksStore } from "./use-tasks-store.hook";

export function useDeleteTask() {
  const deleteTask = useTasksStore((s) => s.deleteTask);
  return { mutate: (id: string) => deleteTask(id) };
}
