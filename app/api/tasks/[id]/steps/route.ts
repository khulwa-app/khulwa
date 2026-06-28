import { db } from "@/lib/db";
import { requireUser } from "@/lib/api/auth";
import { HttpError, json, parseJson, route } from "@/lib/api/http";
import { createStepSchema } from "@/lib/validation/task.schema";
import * as tasks from "@/lib/services/tasks.service";

type Ctx = { params: Promise<{ id: string }> };

export const POST = route(async (req, { params }: Ctx) => {
  const user = await requireUser();
  const { id } = await params;
  const input = await parseJson(req, createStepSchema);
  const row = await tasks.addStep(db, user.id, id, input);
  if (!row) throw new HttpError(404, { error: "not_found" });
  return json(row, { status: 201 });
});
