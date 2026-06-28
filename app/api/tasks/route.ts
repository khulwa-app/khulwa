import { db } from "@/lib/db";
import { requireUser } from "@/lib/api/auth";
import { json, parseJson, route } from "@/lib/api/http";
import { createTaskSchema } from "@/lib/validation/task.schema";
import * as tasks from "@/lib/services/tasks.service";

export const GET = route(async () => {
  const user = await requireUser();
  return json(await tasks.listTasks(db, user.id));
});

export const POST = route(async (req) => {
  const user = await requireUser();
  const input = await parseJson(req, createTaskSchema);
  return json(await tasks.createTask(db, user.id, input), { status: 201 });
});
