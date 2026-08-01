"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/button";
import { Panel, AnchoredPanel, usePanels } from "@/modules/panels";
import { useCreateNote, useNotes } from "@/services/notes";
import { NoteEditor } from "./note-editor";
import { NoteListItem } from "./note-list-item";

export function NotesPanel() {
  const t = useTranslations("notes");
  const open = usePanels((s) => s.open === Panel.Notes);
  const close = usePanels((s) => s.close);
  const { data: notes } = useNotes();
  const create = useCreateNote();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Closing the panel returns to the list so reopening never lands inside a stale editor.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setSelectedId(null);
  }

  const selected = notes?.find((note) => note.id === selectedId) ?? null;

  return (
    <AnchoredPanel anchor="tool" width={380} open={open} title={t("title")} onClose={close}>
      {selected ? (
        <NoteEditor note={selected} onBack={() => setSelectedId(null)} />
      ) : (
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            shape="rounded"
            className="w-full justify-start"
            disabled={create.isPending}
            onClick={() => setSelectedId(create.mutate({}).id)}
          >
            <Plus />
            {t("newNote")}
          </Button>

          {notes === undefined ? null : notes.length === 0 ? (
            <p className="py-6 text-center text-sm text-foreground-muted">{t("empty")}</p>
          ) : (
            <ul className="flex flex-col">
              {notes.map((note) => (
                <NoteListItem key={note.id} note={note} onOpen={() => setSelectedId(note.id)} />
              ))}
            </ul>
          )}
        </div>
      )}
    </AnchoredPanel>
  );
}
