import { db } from "@/lib/db";
import { listTasks } from "./tasks.service";
import type { Task } from "@/services/tasks/tasks.types";

/**
 * Server-side read for SSR prefetch. JSON round-trips the Drizzle rows so the
 * shape (Date -> ISO string) matches the /api/tasks HTTP response exactly,
 * keeping the dehydrated cache consistent with what the client refetches.
 */
export async function getTasks(userId: string): Promise<Task[]> {
  const rows = await listTasks(db, userId);
  return JSON.parse(JSON.stringify(rows)) as Task[];
}
