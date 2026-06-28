import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import { NOTES_QUERY_KEY } from "../query/constants";
import type { Note } from "./notes.types";

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation<void, Error, string, { previous?: Note[] }>({
    mutationFn: (id) => api.delete<void>(`/notes/${id}`),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: [NOTES_QUERY_KEY] });
      const previous = qc.getQueryData<Note[]>([NOTES_QUERY_KEY]);
      qc.setQueryData<Note[]>([NOTES_QUERY_KEY], (old = []) => old.filter((n) => n.id !== id));
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData([NOTES_QUERY_KEY], ctx.previous);
    },
  });
}
