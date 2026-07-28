"use client";

import { useTransition } from "react";
import { StarsMinimalistic } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { splitTask } from "@/modules/ai";
import { useAddStep, type Task } from "@/services/tasks";
import { TaskList } from "../task-list";

export function BreakIntoSteps({ task }: { task: Task }) {
  const t = useTranslations("tasks");
  const addStep = useAddStep();
  const [pending, startTransition] = useTransition();

  return (
    <TaskList.AiAction
      data-pending={pending || undefined}
      disabled={pending}
      aria-label={t("breakIntoSteps")}
      onClick={() =>
        startTransition(async () => {
          const steps = await splitTask(task.body, task.eta);
          steps?.forEach((step) => addStep.mutate({ taskId: task.id, body: step }));
        })
      }
    >
      {pending ? <span aria-hidden className="loading loading-spinner loading-xs" /> : <StarsMinimalistic className="size-4" />}
      {pending ? t("breaking") : t("breakIntoSteps")}
    </TaskList.AiAction>
  );
}
