"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { useDeleteNote, type Note } from "@/services/notes";

export function NoteListItem({ note, onOpen }: { note: Note; onOpen: () => void }) {
  const t = useTranslations("notes");
  const remove = useDeleteNote();
  const preview = note.content.trim();

  return (
    // The whole row carries the hover, bled to the panel edge and square — a rounded fill behind
    // only the text block reads as a stray card floating inside the list.
    <li className="group -mx-4 flex items-start gap-1 px-4 transition-colors hover:bg-surface-elevated">
      <button
        type="button"
        onClick={onOpen}
        className="min-w-0 flex-1 py-2 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <span className="block truncate text-sm font-medium">{note.title?.trim() || t("untitled")}</span>
        <span className="mt-0.5 line-clamp-2 text-xs leading-5 text-foreground-muted">
          {preview || t("noPreview")}
        </span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={t("more")}
            className="mt-2 flex size-7 shrink-0 items-center justify-center rounded-full text-foreground-muted opacity-0 transition-opacity hover:bg-surface-elevated hover:text-foreground focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring group-hover:opacity-100 data-[state=open]:opacity-100"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem variant="destructive" onSelect={() => remove.mutate(note.id)}>
            <Trash2 />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
