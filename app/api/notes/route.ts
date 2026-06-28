import { db } from "@/lib/db";
import { requireUser } from "@/lib/api/auth";
import { json, parseJson, route } from "@/lib/api/http";
import { createNoteSchema } from "@/lib/validation/note.schema";
import * as notes from "@/lib/services/notes.service";

export const GET = route(async () => {
  const user = await requireUser();
  return json(await notes.listNotes(db, user.id));
});

export const POST = route(async (req) => {
  const user = await requireUser();
  const input = await parseJson(req, createNoteSchema);
  return json(await notes.createNote(db, user.id, input), { status: 201 });
});
