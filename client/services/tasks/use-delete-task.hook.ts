import { api } from "@/services/http";
import { applyDeleteTask } from "./optimistic";
import { useTaskMutation } from "./use-task-mutation.hook";

export function useDeleteTask() {
  return useTaskMutation(
    (id: string) => api.delete<void>(`/tasks/${id}`),
    (tasks, id) => applyDeleteTask(tasks, id),
  );
}
