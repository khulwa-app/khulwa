"use client";

import { useNotesHydrated, useNotesStore } from "./use-notes-store.hook";

export function useNotes() {
  const hydrated = useNotesHydrated();
  const notes = useNotesStore((s) => s.notes);
  return { data: hydrated ? notes : undefined };
}
