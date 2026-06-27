import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import { TASKS_QUERY_KEY } from "../query/constants";

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/tasks/${id}`),
    onSuccess: () => void qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] }),
  });
}
