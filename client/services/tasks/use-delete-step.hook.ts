import { api } from "@/services/http";
import { applyDeleteStep } from "./optimistic";
import { useTaskMutation } from "./use-task-mutation.hook";

export function useDeleteStep() {
  return useTaskMutation(
    (id: string) => api.delete<void>(`/steps/${id}`),
    (tasks, id) => applyDeleteStep(tasks, id),
  );
}
