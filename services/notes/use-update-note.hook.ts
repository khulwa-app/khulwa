"use client";

import { useNotesStore } from "./use-notes-store.hook";
import type { UpdateNoteInput } from "./notes.types";

export function useUpdateNote() {
  const updateNote = useNotesStore((s) => s.updateNote);
  return { mutate: ({ id, patch }: { id: string; patch: UpdateNoteInput }) => updateNote(id, patch) };
}
