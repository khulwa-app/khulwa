"use client";

import { useNotesStore } from "./use-notes-store.hook";
import type { CreateNoteInput } from "./notes.types";

export function useCreateNote() {
  const addNote = useNotesStore((s) => s.addNote);
  return { mutate: (input: CreateNoteInput) => addNote(input), isPending: false };
}
