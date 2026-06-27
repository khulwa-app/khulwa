import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import { TASKS_QUERY_KEY } from "../query/constants";
import { makeTempStep } from "./optimistic";
import type { Task, TaskStep } from "./tasks.types";

export function useAddStep() {
  const qc = useQueryClient();
  return useMutation<TaskStep, Error, { taskId: string; body: string }, { previous?: Task[]; tempId: string }>({
    mutationFn: ({ taskId, body }) => api.post<TaskStep>(`/tasks/${taskId}/steps`, { body }),
    onMutate: async ({ taskId, body }) => {
      await qc.cancelQueries({ queryKey: [TASKS_QUERY_KEY] });
      const previous = qc.getQueryData<Task[]>([TASKS_QUERY_KEY]);
      const tempId = `temp-${crypto.randomUUID()}`;
      qc.setQueryData<Task[]>([TASKS_QUERY_KEY], (old = []) =>
        old.map((task) =>
          task.id === taskId
            ? { ...task, steps: [...task.steps, makeTempStep(tempId, taskId, body, task.steps.length)] }
            : task,
        ),
      );
      return { previous, tempId };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData([TASKS_QUERY_KEY], ctx.previous);
    },
    onSuccess: (step, { taskId }, ctx) => {
      qc.setQueryData<Task[]>([TASKS_QUERY_KEY], (old = []) =>
        old.map((task) =>
          task.id === taskId
            ? { ...task, steps: task.steps.map((s) => (s.id === ctx.tempId ? step : s)) }
            : task,
        ),
      );
    },
  });
}
