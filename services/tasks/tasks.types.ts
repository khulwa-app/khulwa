export type Priority = "low" | "medium" | "high";

export type TaskStep = { id: string; body: string; completed: boolean };

export type Task = {
  id: string;
  body: string;
  completed: boolean;
  isDoingNow: boolean;
  eta: number;
  priority: Priority;
  today: boolean;
  steps: TaskStep[];
  createdAt: number;
  completedAt: number | null;
};

export type CreateTaskInput = { body: string; eta?: number; priority?: Priority; today?: boolean };
export type UpdateTaskInput = Partial<Omit<Task, "id" | "steps" | "createdAt">>;
export type UpdateStepInput = Partial<{ body: string; completed: boolean }>;
