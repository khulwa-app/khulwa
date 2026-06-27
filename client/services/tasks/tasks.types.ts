export type Priority = "low" | "medium" | "high";

export type TaskStep = {
  id: string;
  taskId: string;
  body: string;
  completed: boolean;
  position: number;
  createdAt: string;
};

export type Task = {
  id: string;
  body: string;
  completed: boolean;
  isDoingNow: boolean;
  eta: number;
  priority: Priority;
  today: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  steps: TaskStep[];
};

export type CreateTaskInput = { body: string; eta?: number; priority?: Priority; today?: boolean };

export type UpdateTaskInput = Partial<{
  body: string;
  completed: boolean;
  isDoingNow: boolean;
  eta: number;
  priority: Priority;
  today: boolean;
  position: number;
}>;

export type UpdateStepInput = Partial<{ body: string; completed: boolean; position: number }>;
