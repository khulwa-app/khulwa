import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { TaskStep } from "./tasks.types";
import { TASKS_QUERY_KEY } from "../query/constants";

export function useAddStep() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, body }: { taskId: string; body: string }) =>
      api.post<TaskStep>(`/tasks/${taskId}/steps`, { body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] }),
  });
}
