"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/button";
import { estimateEta } from "@/lib/ai";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { DEFAULT_ETA, useCreateTask, useUpdateTask } from "@/services/tasks";

export function DoingNowEmpty() {
  const t = useTranslations("home.doingNow");
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const changeSpace = useSpace((s) => s.changeSpace);
  const [draft, setDraft] = useState("");

  const begin = () => {
    const body = draft.trim();
    if (body) {
      setDraft("");
      createTask.mutate(
        { body },
        {
          onSuccess: (task) => {
            updateTask.mutate({ id: task.id, patch: { isDoingNow: true } });
            void estimateEta(body).then((eta) => {
              if (eta !== null && task.eta === DEFAULT_ETA) updateTask.mutate({ id: task.id, patch: { eta } });
            });
          },
        },
      );
    }
    changeSpace(Space.Focus);
  };

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-2">
      <div className="flex w-full items-center gap-3 rounded-full border border-hairline bg-surface-veil p-2 pl-6 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
        <span className="size-1.5 shrink-0 rounded-full bg-border" aria-hidden />

        <input
          value={draft}
          placeholder={t("intentionPlaceholder")}
          aria-label={t("intentionPlaceholder")}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") begin();
          }}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground-muted"
        />

        <Button size="sm" onClick={begin}>
          {t("enterFocus")}
          <ArrowRight />
        </Button>
      </div>

      <p className="text-xs text-foreground-muted">{t("beginHint")}</p>
    </div>
  );
}
