"use client";

import { AddCircle } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { Button, ScrollArea } from "@/components/ui";
import { Panel, SidePanel, usePanels } from "@/modules/panels";
import { useCreateNote, useNotes } from "@/services/notes";
import { NoteCard } from "./note-card";

export function NotesPanel() { const t = useTranslations("notes"); const open = usePanels((state) => state.open === Panel.Notes); const close = usePanels((state) => state.close); const { data: notes } = useNotes(); const create = useCreateNote(); return <SidePanel onClose={close} open={open} title={t("title")}><div className="flex h-full w-full flex-col gap-3"><Button className="w-full" loading={create.isPending} onClick={() => create.mutate({})} tone="secondary"><AddCircle className="size-4" />{t("newNote")}</Button><ScrollArea className="min-h-0 w-full flex-1"><div className="grid gap-2">{notes === undefined ? null : notes.length === 0 ? <p className="py-6 text-center text-sm text-sage-700">{t("empty")}</p> : notes.map((note) => <NoteCard key={note.id} note={note} />)}</div></ScrollArea></div></SidePanel>; }
