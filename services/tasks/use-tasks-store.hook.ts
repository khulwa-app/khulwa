"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CreateTaskInput, Task, UpdateStepInput, UpdateTaskInput } from "./tasks.types";

export const DEFAULT_ETA = 15;

const uid = () => crypto.randomUUID();

type TasksState = {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => Task;
  updateTask: (id: string, patch: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
  addStep: (taskId: string, body: string) => void;
  updateStep: (stepId: string, patch: UpdateStepInput) => void;
  deleteStep: (stepId: string) => void;
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
          steps: [],
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

      addStep: (taskId, body) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === taskId
              ? { ...t, steps: [...t.steps, { id: uid(), body: body.trim(), completed: false }] }
              : t,
          ),
        })),

      updateStep: (stepId, patch) =>
        set((s) => ({
          tasks: s.tasks.map((t) => ({
            ...t,
            steps: t.steps.map((st) => (st.id === stepId ? { ...st, ...patch } : st)),
          })),
        })),

      deleteStep: (stepId) =>
        set((s) => ({
          tasks: s.tasks.map((t) => ({ ...t, steps: t.steps.filter((st) => st.id !== stepId) })),
        })),
    }),
    {
      name: "khulwa-tasks",
      storage: createJSONStorage(() => localStorage),
      version: 4,
    },
  ),
);
