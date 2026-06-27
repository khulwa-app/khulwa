import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { TaskStep, UpdateStepInput } from "./tasks.types";
import { TASKS_QUERY_KEY } from "../query/constants";

export function useUpdateStep() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: UpdateStepInput }) => api.patch<TaskStep>(`/steps/${id}`, patch),
    onSuccess: () => void qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] }),
  });
}
