"use client";

import { Checkbox } from "@chakra-ui/react";
import { TrashBinMinimalistic } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { useDeleteStep, useUpdateStep, type TaskStep } from "@/services/tasks";
import { TaskList } from "@/theme/slot-recipes/task-list";

export function StepRow({ step }: { step: TaskStep }) {
  const t = useTranslations("tasks");
  const updateStep = useUpdateStep();
  const deleteStep = useDeleteStep();

  return (
    <TaskList.StepRow>
      <Checkbox.Root
        size="sm"
        checked={step.completed}
        onCheckedChange={() => updateStep.mutate({ id: step.id, patch: { completed: !step.completed } })}
        aria-label={t("aria.completeStep")}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
      </Checkbox.Root>

      <TaskList.Editable
        value={step.body}
        onCommit={(body) => updateStep.mutate({ id: step.id, patch: { body } })}
        data-tone="muted"
        data-completed={step.completed || undefined}
        aria-label={t("aria.editStep")}
      />

      <TaskList.Action data-danger aria-label={t("aria.deleteStep")} onClick={() => deleteStep.mutate(step.id)}>
        <Icon icon={TrashBinMinimalistic} boxSize="3.5" />
      </TaskList.Action>
    </TaskList.StepRow>
  );
}
