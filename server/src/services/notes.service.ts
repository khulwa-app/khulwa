import { and, desc, eq } from "drizzle-orm";
import type { DB } from "../db/index.js";
import { note } from "../db/schema/note.js";
import type { CreateNoteInput, UpdateNoteInput } from "../validation/note.schema.js";

export async function listNotes(db: DB, userId: string) {
  return db.select().from(note).where(eq(note.userId, userId)).orderBy(desc(note.updatedAt));
}

export async function createNote(db: DB, userId: string, input: CreateNoteInput) {
  const [row] = await db
    .insert(note)
    .values({ userId, title: input.title ?? null, content: input.content ?? "" })
    .returning();
  return row;
}

export async function updateNote(db: DB, userId: string, id: string, patch: UpdateNoteInput) {
  const [row] = await db
    .update(note)
    .set({ ...patch, updatedAt: new Date() })
    .where(and(eq(note.id, id), eq(note.userId, userId)))
    .returning();
  return row ?? null;
}

export async function deleteNote(db: DB, userId: string, id: string) {
  const [row] = await db
    .delete(note)
    .where(and(eq(note.id, id), eq(note.userId, userId)))
    .returning({ id: note.id });
  return row ?? null;
}
