"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CreateNoteInput, Note, UpdateNoteInput } from "./notes.types";

const uid = () => crypto.randomUUID();

type NotesState = {
  notes: Note[];
  addNote: (input: CreateNoteInput) => Note;
  updateNote: (id: string, patch: UpdateNoteInput) => void;
  deleteNote: (id: string) => void;
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (input) => {
        const note: Note = { id: uid(), title: input.title ?? null, content: input.content ?? "" };
        set((s) => ({ notes: [note, ...s.notes] }));
        return note;
      },
      updateNote: (id, patch) =>
        set((s) => ({ notes: s.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)) })),
      deleteNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
    }),
    {
      name: "khulwa-notes",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

export function useNotesHydrated(): boolean {
  return useSyncExternalStore(
    (cb) => useNotesStore.persist.onFinishHydration(cb),
    () => useNotesStore.persist.hasHydrated(),
    () => false,
  );
}
