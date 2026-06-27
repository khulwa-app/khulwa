import { and, asc, eq, inArray } from "drizzle-orm";
import type { DB } from "../db/index.js";
import { task, taskStep } from "../db/schema/task.js";
import type {
  CreateStepInput,
  CreateTaskInput,
  UpdateStepInput,
  UpdateTaskInput,
} from "../validation/task.schema.js";

function ownedTaskIds(db: DB, userId: string) {
  return db.select({ id: task.id }).from(task).where(eq(task.userId, userId));
}

export async function listTasks(db: DB, userId: string) {
  const tasks = await db
    .select()
    .from(task)
    .where(eq(task.userId, userId))
    .orderBy(asc(task.position), asc(task.createdAt));
  if (tasks.length === 0) return [];

  const steps = await db
    .select()
    .from(taskStep)
    .where(inArray(taskStep.taskId, tasks.map((t) => t.id)))
    .orderBy(asc(taskStep.position), asc(taskStep.createdAt));

  const byTask = new Map<string, typeof steps>();
  for (const step of steps) {
    const list = byTask.get(step.taskId) ?? [];
    list.push(step);
    byTask.set(step.taskId, list);
  }

  return tasks.map((t) => ({ ...t, steps: byTask.get(t.id) ?? [] }));
}

export async function createTask(db: DB, userId: string, input: CreateTaskInput) {
  const [row] = await db
    .insert(task)
    .values({
      userId,
      body: input.body,
      eta: input.eta,
      priority: input.priority,
      today: input.today ?? true,
    })
    .returning();
  return { ...row, steps: [] };
}

export async function updateTask(db: DB, userId: string, id: string, patch: UpdateTaskInput) {
  return db.transaction(async (tx) => {
    if (patch.isDoingNow === true) {
      await tx
        .update(task)
        .set({ isDoingNow: false })
        .where(and(eq(task.userId, userId), eq(task.isDoingNow, true)));
    }

    const set: Partial<typeof task.$inferInsert> = { ...patch, updatedAt: new Date() };
    if (patch.completed !== undefined) set.completedAt = patch.completed ? new Date() : null;

    const [row] = await tx
      .update(task)
      .set(set)
      .where(and(eq(task.id, id), eq(task.userId, userId)))
      .returning();
    return row ?? null;
  });
}

export async function deleteTask(db: DB, userId: string, id: string) {
  const [row] = await db
    .delete(task)
    .where(and(eq(task.id, id), eq(task.userId, userId)))
    .returning({ id: task.id });
  return row ?? null;
}

export async function addStep(db: DB, userId: string, taskId: string, input: CreateStepInput) {
  const [owner] = await db
    .select({ id: task.id })
    .from(task)
    .where(and(eq(task.id, taskId), eq(task.userId, userId)));
  if (!owner) return null;

  const [row] = await db.insert(taskStep).values({ taskId, body: input.body }).returning();
  return row;
}

export async function updateStep(db: DB, userId: string, stepId: string, patch: UpdateStepInput) {
  const [row] = await db
    .update(taskStep)
    .set(patch)
    .where(and(eq(taskStep.id, stepId), inArray(taskStep.taskId, ownedTaskIds(db, userId))))
    .returning();
  return row ?? null;
}

export async function deleteStep(db: DB, userId: string, stepId: string) {
  const [row] = await db
    .delete(taskStep)
    .where(and(eq(taskStep.id, stepId), inArray(taskStep.taskId, ownedTaskIds(db, userId))))
    .returning({ id: taskStep.id });
  return row ?? null;
}
