"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAddStep } from "@/services/tasks";
import { TaskList } from "@/theme/slot-recipes/task-list";

export function AddStep({ taskId }: { taskId: string }) {
  const t = useTranslations("tasks");
  const addStep = useAddStep();
  const [draft, setDraft] = useState("");

  return (
    <TaskList.AddStepInput
      value={draft}
      placeholder={t("addStep")}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        const body = draft.trim();
        if (!body) return;
        addStep.mutate({ taskId, body });
        setDraft("");
      }}
    />
  );
}
