import { db } from "@/lib/db";
import { requireUser } from "@/lib/api/auth";
import { HttpError, json, noContent, parseJson, route } from "@/lib/api/http";
import { updateStepSchema } from "@/lib/validation/task.schema";
import * as tasks from "@/lib/services/tasks.service";

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = route(async (req, { params }: Ctx) => {
  const user = await requireUser();
  const { id } = await params;
  const input = await parseJson(req, updateStepSchema);
  const row = await tasks.updateStep(db, user.id, id, input);
  if (!row) throw new HttpError(404, { error: "not_found" });
  return json(row);
});

export const DELETE = route(async (_req, { params }: Ctx) => {
  const user = await requireUser();
  const { id } = await params;
  const row = await tasks.deleteStep(db, user.id, id);
  if (!row) throw new HttpError(404, { error: "not_found" });
  return noContent();
});
