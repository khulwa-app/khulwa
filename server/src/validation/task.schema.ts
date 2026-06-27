import { z } from "zod";

const priority = z.enum(["low", "medium", "high"]);

export const createTaskSchema = z.object({
  body: z.string().trim().min(1),
  eta: z.number().int().min(0).optional(),
  priority: priority.optional(),
  today: z.boolean().optional(),
});

export const updateTaskSchema = z
  .object({
    body: z.string().trim().min(1).optional(),
    completed: z.boolean().optional(),
    isDoingNow: z.boolean().optional(),
    eta: z.number().int().min(0).optional(),
    priority: priority.optional(),
    today: z.boolean().optional(),
    position: z.number().int().min(0).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "empty_patch" });

export const createStepSchema = z.object({
  body: z.string().trim().min(1),
});

export const updateStepSchema = z
  .object({
    body: z.string().trim().min(1).optional(),
    completed: z.boolean().optional(),
    position: z.number().int().min(0).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "empty_patch" });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateStepInput = z.infer<typeof createStepSchema>;
export type UpdateStepInput = z.infer<typeof updateStepSchema>;
