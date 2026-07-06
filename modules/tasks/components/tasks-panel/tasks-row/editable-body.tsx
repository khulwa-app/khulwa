"use client";

import { useTranslations } from "next-intl";
import { useUpdateTask, type Task } from "@/services/tasks";
import { TaskList } from "@/theme/slot-recipes/task-list";

export function EditableBody({ task }: { task: Task }) {
  const t = useTranslations("tasks");
  const updateTask = useUpdateTask();

  return (
    <TaskList.Editable
      value={task.body}
      onCommit={(body) => updateTask.mutate({ id: task.id, patch: { body } })}
      data-completed={task.completed || undefined}
      aria-label={t("aria.editBody")}
    />
  );
}
