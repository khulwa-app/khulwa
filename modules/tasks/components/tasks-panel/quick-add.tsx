"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { estimateEta } from "@/lib/ai";
import { PlainField } from "@/components/ui/plain-field";
import { DEFAULT_ETA, useCreateTask, useUpdateTask } from "@/services/tasks";

export function QuickAdd() {
  const t = useTranslations("tasks");
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const [draft, setDraft] = useState("");

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    setDraft("");

    createTask.mutate(
      { body },
      {
        onSuccess: (task) => {
          void estimateEta(body).then((eta) => {
            if (eta !== null && task.eta === DEFAULT_ETA) updateTask.mutate({ id: task.id, patch: { eta } });
          });
        },
      },
    );
  };

  return (
    <div className="sticky top-0 z-1 flex h-11 shrink-0 items-center gap-2 rounded-lg border border-input bg-surface px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
      <PlainField
        value={draft}
        placeholder={t("placeholder")}
        aria-label={t("addTask")}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") submit();
        }}
        className="text-sm"
      />
      <button
        type="button"
        onClick={submit}
        disabled={draft.trim() === ""}
        aria-label={t("addTask")}
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-foreground disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
