import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  body: string;
  completed: boolean;
  isDoingNow: boolean;
  eta: number;
  priority: Priority;
};

type TasksState = {
  tasks: Task[];
  addTask: (body: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, patch: Partial<Omit<Task, "id">>) => void;
  toggleCompleted: (id: string) => void;
  setDoingNow: (id: string) => void;
};

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],
      // Tasks are created from quick-add text, never empty — avoids junk
      // empty rows accumulating in localStorage.
      addTask: (body: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              body: body.trim(),
              completed: false,
              isDoingNow: false,
              eta: 30,
              priority: "medium",
            },
          ],
        })),
      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      updateTask: (id, patch) =>
        set((state) => ({ tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...patch } : task)) })),
      toggleCompleted: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
        })),
      // Exclusive: only one task can be "doing now". Clicking the active task
      // again clears it.
      setDoingNow: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => ({ ...task, isDoingNow: task.id === id ? !task.isDoingNow : false })),
        })),
    }),
    {
      name: "khulwa-tasks",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      // v1 allowed empty-body tasks (created blank, edited in place) and
      // shipped a seeded mock task — drop both on upgrade.
      migrate: (persisted) => {
        const state = persisted as { tasks?: Task[] };
        return {
          ...state,
          tasks: (state.tasks ?? []).filter((task) => task.body.trim() !== "" && task.id !== "mock-id"),
        };
      },
    },
  ),
);
