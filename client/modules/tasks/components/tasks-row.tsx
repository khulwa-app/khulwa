"use client";

import { useState, useTransition } from "react";
import { Checkbox, Spinner } from "@chakra-ui/react";
import { ChevronRight, Moon, Sparkles, Sun, Target, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { splitTask } from "@/modules/ai";
import {
  useAddStep,
  useDeleteStep,
  useDeleteTask,
  useUpdateStep,
  useUpdateTask,
  type Task,
  type TaskStep,
} from "@/services/tasks";
import { TaskList } from "./task-list";

function EditableBody({ task }: { task: Task }) {
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

function EtaChip({ task }: { task: Task }) {
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

function StepRow({ step }: { step: TaskStep }) {
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
        <Trash2 size={14} />
      </TaskList.Action>
    </TaskList.StepRow>
  );
}

function AddStep({ taskId }: { taskId: string }) {
  const t = useTranslations("tasks");
  const addStep = useAddStep();
  const [draft, setDraft] = useState("");

  return (
    <TaskList.AddStepInput
      value={draft}
      placeholder={t("addStep")}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        const body = draft.trim();
        if (!body) return;
        addStep.mutate({ taskId, body });
        setDraft("");
      }}
    />
  );
}

function BreakIntoSteps({ task }: { task: Task }) {
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
      {pending ? <Spinner size="xs" /> : <Sparkles size={14} />}
      {pending ? t("breaking") : t("breakIntoSteps")}
    </TaskList.AiAction>
  );
}

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
