import { DEFAULT_ETA } from "./use-tasks.hook";
import type { CreateTaskInput, Task, TaskStep, UpdateStepInput, UpdateTaskInput } from "./tasks.types";

export function makeTempTask(tempId: string, input: CreateTaskInput, position: number): Task {
  const now = new Date().toISOString();
  return {
    id: tempId,
    body: input.body,
    completed: false,
    isDoingNow: false,
    eta: input.eta ?? DEFAULT_ETA,
    priority: input.priority ?? "medium",
    today: input.today ?? true,
    position,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    steps: [],
  };
}

export function makeTempStep(tempId: string, taskId: string, body: string, position: number): TaskStep {
  return { id: tempId, taskId, body, completed: false, position, createdAt: new Date().toISOString() };
}

export function applyUpdateTask(tasks: Task[], id: string, patch: UpdateTaskInput): Task[] {
  const now = new Date().toISOString();
  const claimingDoingNow = patch.isDoingNow === true;
  return tasks.map((task) => {
    if (task.id === id) {
      const next: Task = { ...task, ...patch, updatedAt: now };
      if (patch.completed !== undefined) next.completedAt = patch.completed ? now : null;
      return next;
    }
    return claimingDoingNow ? { ...task, isDoingNow: false } : task;
  });
}

export function applyDeleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}

export function applyUpdateStep(tasks: Task[], id: string, patch: UpdateStepInput): Task[] {
  return tasks.map((task) => ({
    ...task,
    steps: task.steps.map((step) => (step.id === id ? { ...step, ...patch } : step)),
  }));
}

export function applyDeleteStep(tasks: Task[], id: string): Task[] {
  return tasks.map((task) => ({ ...task, steps: task.steps.filter((step) => step.id !== id) }));
}

export function replaceTask(tasks: Task[], updated: Task): Task[] {
  return tasks.map((task) => (task.id === updated.id ? { ...updated, steps: task.steps } : task));
}

export function replaceStep(tasks: Task[], updated: TaskStep): Task[] {
  return tasks.map((task) =>
    task.id === updated.taskId
      ? { ...task, steps: task.steps.map((step) => (step.id === updated.id ? updated : step)) }
      : task,
  );
}
