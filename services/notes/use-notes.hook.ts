import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { Note } from "./notes.types";
import { NOTES_QUERY_KEY } from "../query/constants";

export function useNotes() {
  return useQuery({ queryKey: [NOTES_QUERY_KEY], queryFn: () => api.get<Note[]>("/notes") });
}
