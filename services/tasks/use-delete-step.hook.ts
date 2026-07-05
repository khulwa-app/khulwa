"use client";

import { useTasksStore } from "./use-tasks-store.hook";

export function useDeleteStep() {
  const deleteStep = useTasksStore((s) => s.deleteStep);
  return { mutate: (id: string) => deleteStep(id) };
}
