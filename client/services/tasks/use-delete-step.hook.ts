import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import { TASKS_QUERY_KEY } from "../query/constants";

export function useDeleteStep() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/steps/${id}`),
    onSuccess: () => void qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] }),
  });
}
