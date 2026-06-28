import { api } from "@/services/http";
import type { TaskStep, UpdateStepInput } from "./tasks.types";
import { applyUpdateStep, replaceStep } from "./optimistic";
import { useTaskMutation } from "./use-task-mutation.hook";

export function useUpdateStep() {
  return useTaskMutation(
    ({ id, patch }: { id: string; patch: UpdateStepInput }) => api.patch<TaskStep>(`/steps/${id}`, patch),
    (tasks, { id, patch }) => applyUpdateStep(tasks, id, patch),
    (tasks, step) => replaceStep(tasks, step),
  );
}
