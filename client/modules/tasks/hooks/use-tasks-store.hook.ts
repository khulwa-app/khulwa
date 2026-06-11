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
  addTask: () => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, patch: Partial<Omit<Task, "id">>) => void;
  toggleCompleted: (id: string) => void;
  setDoingNow: (id: string) => void;
};

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "mock-id",
          body: "Scaffold tasks UI using mock data from store",
          completed: false,
          isDoingNow: true,
          eta: 30,
          priority: "high",
        },
      ],
      addTask: () =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              body: "",
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
    { name: "khulwa-tasks", storage: createJSONStorage(() => localStorage), version: 1 },
  ),
);
