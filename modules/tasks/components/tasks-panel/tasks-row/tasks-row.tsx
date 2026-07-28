"use client";

import { useState } from "react";
import { AltArrowRight, Moon, Sun, Target, TrashBinMinimalistic } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { useDeleteTask, useUpdateTask, type Task } from "@/services/tasks";
import { TaskList } from "../task-list";
import { EditableBody } from "./editable-body";
import { EtaChip } from "./eta-chip";
import { StepRow } from "./step-row";
import { AddStep } from "./add-step";
import { BreakIntoSteps } from "./break-into-steps";

const STAGGER_MS = 40;
const STAGGER_CAP = 8;

export function TaskRow({ task, index = 0 }: { task: Task; index?: number }) {
  const t = useTranslations("tasks");
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [expanded, setExpanded] = useState(false);

  const doneSteps = task.steps.filter((step) => step.completed).length;
  const delay = `${Math.min(index, STAGGER_CAP) * STAGGER_MS}ms`;

  return (
    <TaskList.Item data-active={task.isDoingNow || undefined} style={{ animationDelay: delay }}>
      <TaskList.Row>
        <input aria-label={t("aria.complete")} checked={task.completed} className="checkbox checkbox-sm mt-1 rounded border-sage-500 [--chkbg:theme(colors.sage.800)] [--chkfg:theme(colors.sage.100)]" onChange={() => updateTask.mutate({ id: task.id, patch: { completed: !task.completed } })} type="checkbox" />

        <EditableBody task={task} />

        <TaskList.Meta>
          {task.steps.length > 0 && <span>{`${doneSteps}/${task.steps.length}`}</span>}
          <EtaChip task={task} />
        </TaskList.Meta>

        <TaskList.Actions data-reveal>
          <TaskList.Action
            aria-label={t("aria.expand")}
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            <AltArrowRight className="size-4" />
          </TaskList.Action>

          <TaskList.Action
            aria-label={task.today ? t("aria.defer") : t("aria.doToday")}
            onClick={() => updateTask.mutate({ id: task.id, patch: { today: !task.today } })}
          >
            {task.today ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </TaskList.Action>

          <TaskList.Action
            aria-label={t("aria.doingNow")}
            aria-pressed={task.isDoingNow}
            onClick={() => updateTask.mutate({ id: task.id, patch: { isDoingNow: !task.isDoingNow } })}
          >
            <Target className="size-4" />
          </TaskList.Action>

          <TaskList.Action data-danger aria-label={t("aria.delete")} onClick={() => deleteTask.mutate(task.id)}>
            <TrashBinMinimalistic className="size-4" />
          </TaskList.Action>
        </TaskList.Actions>
      </TaskList.Row>

      {expanded && (
        <TaskList.Steps>
          {task.steps.map((step) => (
            <StepRow key={step.id} step={step} />
          ))}
          <TaskList.AddStepRow>
            <AddStep taskId={task.id} />
            <BreakIntoSteps task={task} />
          </TaskList.AddStepRow>
        </TaskList.Steps>
      )}
    </TaskList.Item>
  );
}
