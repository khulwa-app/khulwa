"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { useDeleteNote, useUpdateNote, type Note } from "@/services/notes";

const AUTOSAVE_MS = 500;

export function NoteEditor({ note, onBack }: { note: Note; onBack: () => void }) {
  const t = useTranslations("notes");
  const update = useUpdateNote();
  const remove = useDeleteNote();
  const [title, setTitle] = useState(note.title ?? "");
  const [content, setContent] = useState(note.content);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const dirty = useRef(false);

  useEffect(() => {
    if (!dirty.current) return;
    setStatus("saving");

    const timer = setTimeout(() => {
      update.mutate({ id: note.id, patch: { title: title.trim() || null, content } });
      dirty.current = false;
      setStatus("saved");
    }, AUTOSAVE_MS);

    return () => clearTimeout(timer);
    // The mutation object is recreated each render; depending on it would restart the timer forever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, note.id]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onBack}
          className="flex h-8 items-center gap-1 rounded-full pr-2 text-xs text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ChevronLeft className="size-4" />
          {t("back")}
        </button>

        <span aria-live="polite" className="ml-auto text-xs text-foreground-muted">
          {status === "saving" ? t("saving") : status === "saved" ? t("saved") : null}
        </span>

        <button
          type="button"
          aria-label={t("delete")}
          onClick={() => {
            remove.mutate(note.id);
            onBack();
          }}
          className="flex size-8 items-center justify-center rounded-full text-foreground-muted transition-colors hover:text-destructive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <Input
        variant="filled"
        value={title}
        aria-label={t("titlePlaceholder")}
        placeholder={t("titlePlaceholder")}
        onChange={(event) => {
          dirty.current = true;
          setTitle(event.target.value);
        }}
        className="font-semibold"
      />

      <Textarea
        variant="filled"
        value={content}
        aria-label={t("contentPlaceholder")}
        placeholder={t("contentPlaceholder")}
        onChange={(event) => {
          dirty.current = true;
          setContent(event.target.value);
        }}
        className="min-h-56 resize-none text-foreground-secondary"
      />
    </div>
  );
}
