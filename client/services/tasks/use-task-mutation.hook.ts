import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY } from "../query/constants";
import type { Task } from "./tasks.types";

type Optimistic<TVars> = (tasks: Task[], vars: TVars) => Task[];
type Reconcile<TVars, TData> = (tasks: Task[], data: TData, vars: TVars) => Task[];

export function useTaskMutation<TVars, TData>(
  mutationFn: (vars: TVars) => Promise<TData>,
  optimistic: Optimistic<TVars>,
  reconcile?: Reconcile<TVars, TData>,
) {
  const qc = useQueryClient();
  return useMutation<TData, Error, TVars, { previous?: Task[] }>({
    mutationFn,
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: [TASKS_QUERY_KEY] });
      const previous = qc.getQueryData<Task[]>([TASKS_QUERY_KEY]);
      qc.setQueryData<Task[]>([TASKS_QUERY_KEY], (old) => optimistic(old ?? [], vars));
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData([TASKS_QUERY_KEY], ctx.previous);
    },
    onSuccess: reconcile
      ? (data, vars) => qc.setQueryData<Task[]>([TASKS_QUERY_KEY], (old) => reconcile(old ?? [], data, vars))
      : undefined,
  });
}
