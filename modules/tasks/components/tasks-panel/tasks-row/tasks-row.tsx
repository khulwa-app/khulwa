"use client";

import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useUpdateTask, type Task } from "@/services/tasks";
import { TaskList } from "../task-list";
import { EditableBody } from "./editable-body";
import { EtaChip } from "./eta-chip";
import { StepRow } from "./step-row";
import { AddStep } from "./add-step";
import { TaskActionsMenu } from "./task-actions-menu";
import { useBreakIntoSteps } from "./use-break-into-steps.hook";

const STAGGER_MS = 40;
const STAGGER_CAP = 8;

export function TaskRow({ task, index = 0 }: { task: Task; index?: number }) {
  const t = useTranslations("tasks");
  const updateTask = useUpdateTask();
  const { run } = useBreakIntoSteps(task);
  const [expanded, setExpanded] = useState(false);

  const doneSteps = task.steps.filter((step) => step.completed).length;
  const hasSteps = task.steps.length > 0;
  const delay = `${Math.min(index, STAGGER_CAP) * STAGGER_MS}ms`;

  return (
    <TaskList.Item data-active={task.isDoingNow || undefined} style={{ animationDelay: delay }}>
      <TaskList.Row>
        <Checkbox.Root
          size="md"
          checked={task.completed}
          onCheckedChange={() => updateTask.mutate({ id: task.id, patch: { completed: !task.completed } })}
          aria-label={t("aria.complete")}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>

        <EditableBody task={task} />

        <TaskList.Meta>
          <EtaChip task={task} />
          {hasSteps && (
            <TaskList.Counter
              data-toggle
              aria-label={t("aria.expand")}
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
            >
              {`${doneSteps}/${task.steps.length}`}
            </TaskList.Counter>
          )}
        </TaskList.Meta>

        <TaskActionsMenu
          task={task}
          onBreakIntoSteps={() => {
            run();
            setExpanded(true);
          }}
        />
      </TaskList.Row>

      {expanded && (
        <TaskList.Steps>
          {task.steps.map((step) => (
            <StepRow key={step.id} step={step} />
          ))}
          <TaskList.AddStepRow>
            <AddStep taskId={task.id} />
          </TaskList.AddStepRow>
        </TaskList.Steps>
      )}
    </TaskList.Item>
  );
}
