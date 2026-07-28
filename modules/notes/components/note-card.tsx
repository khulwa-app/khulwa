"use client";

import { TrashBinMinimalistic } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { IconButton, Input, Textarea } from "@/components/ui/primitives";
import { useDeleteNote, useUpdateNote, type Note } from "@/services/notes";

export function NoteCard({ note }: { note: Note }) {
  const t = useTranslations("notes"); const update = useUpdateNote(); const remove = useDeleteNote();
  const saveTitle = (raw: string) => { const next = raw.trim() || null; if (next !== (note.title ?? null)) update.mutate({ id: note.id, patch: { title: next } }); };
  const saveContent = (raw: string) => { if (raw !== note.content) update.mutate({ id: note.id, patch: { content: raw } }); };
  return <article className="rounded-control border border-sage-300 bg-base-100 p-3"><div className="flex items-center gap-1"><Input aria-label={t("titlePlaceholder")} className="min-h-9 border-0 bg-transparent px-0 font-semibold shadow-none" defaultValue={note.title ?? ""} onBlur={(event) => saveTitle(event.target.value)} placeholder={t("titlePlaceholder")} /><IconButton aria-label={t("delete")} className="text-sage-600 hover:text-error" onClick={() => remove.mutate(note.id)} size="sm"><TrashBinMinimalistic className="size-4" /></IconButton></div><Textarea aria-label={t("contentPlaceholder")} className="min-h-20 resize-none border-0 bg-transparent px-0 py-1 shadow-none" defaultValue={note.content} onBlur={(event) => saveContent(event.target.value)} placeholder={t("contentPlaceholder")} /></article>;
}
