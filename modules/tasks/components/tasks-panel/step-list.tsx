"use client";

import { useState, useTransition } from "react";
import { Loader2, Sparkles, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Input } from "@/components/shadcn/input";
import { splitTask } from "@/lib/ai";
import { useAddStep, useDeleteStep, useUpdateStep, type Task, type TaskStep } from "@/services/tasks";
import { InlineText } from "./inline-text";

function StepRow({ step }: { step: TaskStep }) {
  const t = useTranslations("tasks");
  const updateStep = useUpdateStep();
  const deleteStep = useDeleteStep();

  return (
    <li className="group/step flex min-h-10 items-center gap-2.5">
      <Checkbox
        checked={step.completed}
        onCheckedChange={() => updateStep.mutate({ id: step.id, patch: { completed: !step.completed } })}
        aria-label={t("aria.completeStep")}
        className="size-4 shrink-0"
      />
      <InlineText
        value={step.body}
        label={t("aria.editStep")}
        onCommit={(body) => updateStep.mutate({ id: step.id, patch: { body } })}
        className={cn("text-xs text-foreground-secondary", step.completed && "text-foreground-muted line-through")}
      />
      <button
        type="button"
        aria-label={t("aria.deleteStep")}
        onClick={() => deleteStep.mutate(step.id)}
        className="flex size-6 shrink-0 items-center justify-center rounded-full text-foreground-muted opacity-0 transition-opacity hover:text-destructive focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring group-hover/step:opacity-100"
      >
        <Trash2 className="size-3.5" />
      </button>
    </li>
  );
}

export function StepList({ task }: { task: Task }) {
  const t = useTranslations("tasks");
  const addStep = useAddStep();
  const [draft, setDraft] = useState("");
  const [pending, startTransition] = useTransition();

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    addStep.mutate({ taskId: task.id, body });
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-1 border-l border-border pb-2 pl-4 ml-2">
      <ul className="flex flex-col">
        {task.steps.map((step) => (
          <StepRow key={step.id} step={step} />
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <Input
          variant="plain"
          value={draft}
          placeholder={t("addStep")}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
          aria-label={t("addStep")}
          className="py-1.5 text-xs"
        />

        <button
          type="button"
          disabled={pending}
          aria-label={t("breakIntoSteps")}
          onClick={() =>
            startTransition(async () => {
              const steps = await splitTask(task.body, task.eta);
              steps?.forEach((step) => addStep.mutate({ taskId: task.id, body: step }));
            })
          }
          className="flex shrink-0 items-center gap-1.5 rounded-full px-1.5 py-1 text-xs text-foreground-muted transition-colors hover:text-foreground disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {pending ? <Loader2 className="size-3.5 animate-spin motion-reduce:animate-none" /> : <Sparkles className="size-3.5" />}
          {pending ? t("breaking") : t("breakIntoSteps")}
        </button>
      </div>
    </div>
  );
}
