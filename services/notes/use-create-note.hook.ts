import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import { NOTES_QUERY_KEY } from "../query/constants";
import type { CreateNoteInput, Note } from "./notes.types";

export function useCreateNote() {
  const qc = useQueryClient();
  return useMutation<Note, Error, CreateNoteInput>({
    mutationFn: (input) => api.post<Note>("/notes", input),
    onSuccess: (note) => {
      qc.setQueryData<Note[]>([NOTES_QUERY_KEY], (old = []) => [note, ...old]);
    },
  });
}
