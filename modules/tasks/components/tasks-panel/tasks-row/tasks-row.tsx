"use client";

import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { ChevronRight, Moon, Sun, Target, Trash2 } from "lucide-react";
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
        <Checkbox.Root
          size="sm"
          checked={task.completed}
          onCheckedChange={() => updateTask.mutate({ id: task.id, patch: { completed: !task.completed } })}
          aria-label={t("aria.complete")}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>

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
            <ChevronRight size={14} />
          </TaskList.Action>

          <TaskList.Action
            aria-label={task.today ? t("aria.defer") : t("aria.doToday")}
            onClick={() => updateTask.mutate({ id: task.id, patch: { today: !task.today } })}
          >
            {task.today ? <Moon size={15} /> : <Sun size={15} />}
          </TaskList.Action>

          <TaskList.Action
            aria-label={t("aria.doingNow")}
            aria-pressed={task.isDoingNow}
            onClick={() => updateTask.mutate({ id: task.id, patch: { isDoingNow: !task.isDoingNow } })}
          >
            <Target size={15} />
          </TaskList.Action>

          <TaskList.Action data-danger aria-label={t("aria.delete")} onClick={() => deleteTask.mutate(task.id)}>
            <Trash2 size={15} />
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
