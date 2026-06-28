import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import { TASKS_QUERY_KEY } from "../query/constants";
import { makeTempTask } from "./optimistic";
import type { CreateTaskInput, Task } from "./tasks.types";

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation<Task, Error, CreateTaskInput, { previous?: Task[]; tempId: string }>({
    mutationFn: (input) => api.post<Task>("/tasks", input),
    onMutate: async (input) => {
      await qc.cancelQueries({ queryKey: [TASKS_QUERY_KEY] });
      const previous = qc.getQueryData<Task[]>([TASKS_QUERY_KEY]);
      const tempId = `temp-${crypto.randomUUID()}`;
      qc.setQueryData<Task[]>([TASKS_QUERY_KEY], (old = []) => [...old, makeTempTask(tempId, input, old.length)]);
      return { previous, tempId };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData([TASKS_QUERY_KEY], ctx.previous);
    },
    onSuccess: (task, _vars, ctx) => {
      qc.setQueryData<Task[]>([TASKS_QUERY_KEY], (old = []) => old.map((t) => (t.id === ctx.tempId ? task : t)));
    },
  });
}
