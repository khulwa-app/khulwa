import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().max(200).nullish(),
  content: z.string().optional(),
});

export const updateNoteSchema = z
  .object({
    title: z.string().max(200).nullish(),
    content: z.string().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "empty_patch" });

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
