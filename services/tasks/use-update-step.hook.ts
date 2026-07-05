"use client";

import { useTasksStore } from "./use-tasks-store.hook";
import type { UpdateStepInput } from "./tasks.types";

export function useUpdateStep() {
  const updateStep = useTasksStore((s) => s.updateStep);
  return { mutate: ({ id, patch }: { id: string; patch: UpdateStepInput }) => updateStep(id, patch) };
}
