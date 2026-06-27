import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Priority = "low" | "medium" | "high";

export type Step = {
  id: string;
  body: string;
  completed: boolean;
};

export type Task = {
  id: string;
  body: string;
  completed: boolean;
  isDoingNow: boolean;
  eta: number;
  priority: Priority;

  today: boolean;

  steps: Step[];
  createdAt: number;
  completedAt: number | null;
};

export const DEFAULT_ETA = 30;

type TasksState = {
  tasks: Task[];
  addTask: (body: string) => string;

  quickStart: (body: string) => string;
  removeTask: (id: string) => void;
  updateTask: (id: string, patch: Partial<Omit<Task, "id">>) => void;
  toggleCompleted: (id: string) => void;
  setDoingNow: (id: string) => void;
  toggleToday: (id: string) => void;
  addStep: (taskId: string, body: string) => void;
  updateStep: (taskId: string, stepId: string, body: string) => void;
  toggleStep: (taskId: string, stepId: string) => void;
  removeStep: (taskId: string, stepId: string) => void;
};

function patchTask(tasks: Task[], id: string, patch: (task: Task) => Partial<Task>): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, ...patch(task) } : task));
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (body: string) => {
        const id = crypto.randomUUID();
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id,
              body: body.trim(),
              completed: false,
              isDoingNow: false,
              eta: DEFAULT_ETA,
              priority: "medium",
              today: true,
              steps: [],
              createdAt: Date.now(),
              completedAt: null,
            },
          ],
        }));
        return id;
      },
      quickStart: (body: string) => {
        const id = crypto.randomUUID();
        set((state) => ({
          tasks: [
            ...state.tasks.map((task) => ({ ...task, isDoingNow: false })),
            {
              id,
              body: body.trim(),
              completed: false,
              isDoingNow: true,
              eta: DEFAULT_ETA,
              priority: "medium",
              today: true,
              steps: [],
              createdAt: Date.now(),
              completedAt: null,
            },
          ],
        }));
        return id;
      },
      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      updateTask: (id, patch) => set((state) => ({ tasks: patchTask(state.tasks, id, () => patch) })),
      toggleCompleted: (id) =>
        set((state) => ({
          tasks: patchTask(state.tasks, id, (task) => ({
            completed: !task.completed,
            completedAt: !task.completed ? Date.now() : null,

            isDoingNow: task.completed ? task.isDoingNow : false,
          })),
        })),
      setDoingNow: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => ({ ...task, isDoingNow: task.id === id ? !task.isDoingNow : false })),
        })),
      toggleToday: (id) => set((state) => ({ tasks: patchTask(state.tasks, id, (task) => ({ today: !task.today })) })),
      addStep: (taskId, body) =>
        set((state) => ({
          tasks: patchTask(state.tasks, taskId, (task) => ({
            steps: [...task.steps, { id: crypto.randomUUID(), body: body.trim(), completed: false }],
          })),
        })),
      updateStep: (taskId, stepId, body) =>
        set((state) => ({
          tasks: patchTask(state.tasks, taskId, (task) => ({
            steps: task.steps.map((step) => (step.id === stepId ? { ...step, body } : step)),
          })),
        })),
      toggleStep: (taskId, stepId) =>
        set((state) => ({
          tasks: patchTask(state.tasks, taskId, (task) => ({
            steps: task.steps.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)),
          })),
        })),
      removeStep: (taskId, stepId) =>
        set((state) => ({
          tasks: patchTask(state.tasks, taskId, (task) => ({
            steps: task.steps.filter((step) => step.id !== stepId),
          })),
        })),
    }),
    {
      name: "khulwa-tasks",
      storage: createJSONStorage(() => localStorage),
      version: 3,

      migrate: (persisted) => {
        const state = persisted as { tasks?: Array<Partial<Task> & { id: string; body: string }> };
        const now = Date.now();
        return {
          ...state,
          tasks: (state.tasks ?? [])
            .filter((task) => (task.body ?? "").trim() !== "" && task.id !== "mock-id")
            .map((task) => ({
              today: true,
              steps: [],
              createdAt: now,
              completedAt: task.completed ? now : null,
              ...task,
            })),
        };
      },
    },
  ),
);
