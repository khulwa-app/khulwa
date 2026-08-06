"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CreateTaskInput, Priority, Task, UpdateTaskInput } from "./tasks.types";

export const DEFAULT_ETA = 15;

const uid = () => crypto.randomUUID();
const PRIORITIES = new Set<Priority>(["low", "medium", "high"]);

type PersistedTasksState = Partial<{ tasks: unknown[] }>;
type LegacyTask = Partial<Task> & { steps?: unknown };

const numberOr = (value: unknown, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

const normalizeTask = (value: unknown): Task | null => {
  if (typeof value !== "object" || value === null) return null;
  const task = value as LegacyTask;
  if (typeof task.id !== "string" || typeof task.body !== "string") return null;

  const priority = typeof task.priority === "string" && PRIORITIES.has(task.priority as Priority)
    ? (task.priority as Priority)
    : "medium";

  return {
    id: task.id,
    body: task.body.trim(),
    completed: Boolean(task.completed),
    isDoingNow: Boolean(task.isDoingNow),
    eta: numberOr(task.eta, DEFAULT_ETA),
    priority,
    today: typeof task.today === "boolean" ? task.today : true,
    createdAt: numberOr(task.createdAt, Date.now()),
    completedAt: typeof task.completedAt === "number" && Number.isFinite(task.completedAt) ? task.completedAt : null,
  };
};

const migrateTasks = (persisted: unknown): Pick<TasksState, "tasks"> => {
  const state = persisted as PersistedTasksState;
  const tasks = Array.isArray(state.tasks) ? state.tasks.map(normalizeTask).filter((task): task is Task => Boolean(task)) : [];
  return { tasks };
};

type TasksState = {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => Task;
  updateTask: (id: string, patch: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
};

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (input) => {
        const task: Task = {
          id: uid(),
          body: input.body.trim(),
          completed: false,
          isDoingNow: false,
          eta: input.eta ?? DEFAULT_ETA,
          priority: input.priority ?? "medium",
          today: input.today ?? true,
          createdAt: Date.now(),
          completedAt: null,
        };
        set((s) => ({ tasks: [...s.tasks, task] }));
        return task;
      },

      updateTask: (id, patch) =>
        set((s) => {
          // "doing now" is exclusive — claiming it clears every other task.
          const base = patch.isDoingNow === true ? s.tasks.map((t) => ({ ...t, isDoingNow: false })) : s.tasks;
          return {
            tasks: base.map((t) => {
              if (t.id !== id) return t;
              const next: Task = { ...t, ...patch };
              if (patch.completed !== undefined) {
                next.completedAt = patch.completed ? Date.now() : null;
                if (patch.completed) next.isDoingNow = false;
              }
              return next;
            }),
          };
        }),

      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
    }),
    {
      name: "khulwa-tasks",
      storage: createJSONStorage(() => localStorage),
      version: 5,
      migrate: migrateTasks,
    },
  ),
);
