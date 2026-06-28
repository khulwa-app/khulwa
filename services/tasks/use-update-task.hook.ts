import { api } from "@/services/http";
import type { Task, UpdateTaskInput } from "./tasks.types";
import { applyUpdateTask, replaceTask } from "./optimistic";
import { useTaskMutation } from "./use-task-mutation.hook";

export function useUpdateTask() {
  return useTaskMutation(
    ({ id, patch }: { id: string; patch: UpdateTaskInput }) => api.patch<Task>(`/tasks/${id}`, patch),
    (tasks, { id, patch }) => applyUpdateTask(tasks, id, patch),
    (tasks, task) => replaceTask(tasks, task),
  );
}
