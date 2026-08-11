"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { useCreateTask, useUpdateTask } from "@/services/tasks";

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
          },
        },
      );
    }
    changeSpace(Space.Focus);
  };

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-2">
      <div className="flex w-full items-center gap-2 rounded-full border border-hairline bg-surface-veil p-1.5 pl-4 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 sm:gap-3 sm:pl-5">
        <span className="size-1.5 shrink-0 rounded-full bg-border" aria-hidden />

        <Input
          variant="plain"
          value={draft}
          placeholder={t("intentionPlaceholder")}
          aria-label={t("intentionPlaceholder")}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") begin();
          }}
          className="min-w-0 text-sm"
        />

        <Button size="sm" onClick={begin} className="h-9 px-3 text-xs sm:px-3.5 sm:text-sm">
          {t("enterFocus")}
          <ArrowRight />
        </Button>
      </div>

      <p className="text-xs text-foreground-muted">{t("beginHint")}</p>
    </div>
  );
}
