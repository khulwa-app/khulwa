import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { CreateTaskInput, Task } from "./tasks.types";
import { TASKS_QUERY_KEY } from "../query/constants";

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => api.post<Task>("/tasks", input),
    onSuccess: () => void qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] }),
  });
}
