import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import { NOTES_QUERY_KEY } from "../query/constants";
import type { Note, UpdateNoteInput } from "./notes.types";

export function useUpdateNote() {
  const qc = useQueryClient();
  return useMutation<Note, Error, { id: string; patch: UpdateNoteInput }, { previous?: Note[] }>({
    mutationFn: ({ id, patch }) => api.patch<Note>(`/notes/${id}`, patch),
    onMutate: async ({ id, patch }) => {
      await qc.cancelQueries({ queryKey: [NOTES_QUERY_KEY] });
      const previous = qc.getQueryData<Note[]>([NOTES_QUERY_KEY]);
      qc.setQueryData<Note[]>([NOTES_QUERY_KEY], (old = []) => old.map((n) => (n.id === id ? { ...n, ...patch } : n)));
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData([NOTES_QUERY_KEY], ctx.previous);
    },
    onSuccess: (note) => {
      qc.setQueryData<Note[]>([NOTES_QUERY_KEY], (old = []) => old.map((n) => (n.id === note.id ? note : n)));
    },
  });
}
