"use client";

import { useNotesStore } from "./use-notes-store.hook";

export function useDeleteNote() {
  const deleteNote = useNotesStore((s) => s.deleteNote);
  return { mutate: (id: string) => deleteNote(id) };
}
