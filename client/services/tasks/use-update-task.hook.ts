import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { Task, UpdateTaskInput } from "./tasks.types";
import { TASKS_QUERY_KEY } from "../query/constants";

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: UpdateTaskInput }) => api.patch<Task>(`/tasks/${id}`, patch),
    onSuccess: () => void qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] }),
  });
}
