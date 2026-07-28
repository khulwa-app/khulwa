"use client";

import { useState } from "react";
import { AddCircle } from "@solar-icons/react";
import { IconButton, Input } from "@/components/ui/primitives";
import { useTranslations } from "next-intl";
import { estimateEta } from "@/modules/ai";
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
    <div className="relative shrink-0">
      <Input className="pr-12"
        value={draft}
        placeholder={t("placeholder")}
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
      /><IconButton aria-label={t("addTask")} className="absolute right-1 top-1" disabled={draft.trim() === ""} onClick={submit} size="sm"><AddCircle className="size-4" /></IconButton>
    </div>
  );
}
