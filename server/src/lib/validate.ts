import type { Request, Response } from "express";
import type { ZodType } from "zod";

export function parseBody<T>(req: Request, res: Response, schema: ZodType<T>): T | null {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "invalid_body", issues: result.error.issues });
    return null;
  }
  return result.data;
}
