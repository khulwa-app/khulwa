"use client";

import { useTransition } from "react";
import { splitTask } from "@/modules/ai";
import { useAddStep, type Task } from "@/services/tasks";

export function useBreakIntoSteps(task: Task) {
  const addStep = useAddStep();
  const [pending, startTransition] = useTransition();

  const run = () =>
    startTransition(async () => {
      const steps = await splitTask(task.body, task.eta);
      steps?.forEach((step) => addStep.mutate({ taskId: task.id, body: step }));
    });

  return { run, pending };
}
