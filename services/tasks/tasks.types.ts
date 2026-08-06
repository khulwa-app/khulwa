export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  body: string;
  completed: boolean;
  isDoingNow: boolean;
  eta: number;
  priority: Priority;
  today: boolean;
  createdAt: number;
  completedAt: number | null;
};

export type CreateTaskInput = { body: string; eta?: number; priority?: Priority; today?: boolean };
export type UpdateTaskInput = Partial<Omit<Task, "id" | "createdAt">>;
