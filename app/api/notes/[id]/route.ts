import { db } from "@/lib/db";
import { requireUser } from "@/lib/api/auth";
import { HttpError, json, noContent, parseJson, route } from "@/lib/api/http";
import { updateNoteSchema } from "@/lib/validation/note.schema";
import * as notes from "@/lib/services/notes.service";

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = route(async (req, { params }: Ctx) => {
  const user = await requireUser();
  const { id } = await params;
  const input = await parseJson(req, updateNoteSchema);
  const row = await notes.updateNote(db, user.id, id, input);
  if (!row) throw new HttpError(404, { error: "not_found" });
  return json(row);
});

export const DELETE = route(async (_req, { params }: Ctx) => {
  const user = await requireUser();
  const { id } = await params;
  const row = await notes.deleteNote(db, user.id, id);
  if (!row) throw new HttpError(404, { error: "not_found" });
  return noContent();
});
