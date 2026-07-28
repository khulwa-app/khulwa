"use client";

import { TrashBinMinimalistic } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { useDeleteStep, useUpdateStep, type TaskStep } from "@/services/tasks";
import { TaskList } from "../task-list";

export function StepRow({ step }: { step: TaskStep }) {
  const t = useTranslations("tasks");
  const updateStep = useUpdateStep();
  const deleteStep = useDeleteStep();

  return (
    <TaskList.StepRow>
      <input aria-label={t("aria.completeStep")} checked={step.completed} className="checkbox checkbox-sm mt-1 rounded border-sage-500 [--chkbg:theme(colors.sage.800)] [--chkfg:theme(colors.sage.100)]" onChange={() => updateStep.mutate({ id: step.id, patch: { completed: !step.completed } })} type="checkbox" />

      <TaskList.Editable
        value={step.body}
        onCommit={(body) => updateStep.mutate({ id: step.id, patch: { body } })}
        data-tone="muted"
        data-completed={step.completed || undefined}
        aria-label={t("aria.editStep")}
      />

      <TaskList.Action data-danger aria-label={t("aria.deleteStep")} onClick={() => deleteStep.mutate(step.id)}>
        <TrashBinMinimalistic className="size-4" />
      </TaskList.Action>
    </TaskList.StepRow>
  );
}
