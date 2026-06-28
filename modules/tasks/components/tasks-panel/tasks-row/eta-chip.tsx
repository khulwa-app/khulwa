"use client";

import { useTranslations } from "next-intl";
import { useUpdateTask, type Task } from "@/services/tasks";
import { TaskList } from "../task-list";

export function EtaChip({ task }: { task: Task }) {
  const t = useTranslations("tasks");
  const updateTask = useUpdateTask();

  return (
    <TaskList.Eta>
      <TaskList.Editable
        as="span"
        data-tone="muted"
        value={String(task.eta)}
        parse={(raw) => {
          const parsed = parseInt(raw, 10);
          return Number.isNaN(parsed) ? null : String(Math.max(0, parsed));
        }}
        onCommit={(eta) => updateTask.mutate({ id: task.id, patch: { eta: Number(eta) } })}
        inputMode="numeric"
        aria-label={t("aria.eta")}
      />
      {t("minutesShort")}
    </TaskList.Eta>
  );
}
