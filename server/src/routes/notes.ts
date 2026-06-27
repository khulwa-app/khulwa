import { Router } from "express";
import { db } from "../db/index.js";
import { parseBody } from "../lib/validate.js";
import { createNoteSchema, updateNoteSchema } from "../validation/note.schema.js";
import * as notes from "../services/notes.service.js";

export const notesRouter = Router();

notesRouter.get("/", async (req, res) => {
  res.json(await notes.listNotes(db, req.user!.id));
});

notesRouter.post("/", async (req, res) => {
  const input = parseBody(req, res, createNoteSchema);
  if (!input) return;
  res.status(201).json(await notes.createNote(db, req.user!.id, input));
});

notesRouter.patch("/:id", async (req, res) => {
  const input = parseBody(req, res, updateNoteSchema);
  if (!input) return;
  const row = await notes.updateNote(db, req.user!.id, req.params.id, input);
  if (!row) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.json(row);
});

notesRouter.delete("/:id", async (req, res) => {
  const row = await notes.deleteNote(db, req.user!.id, req.params.id);
  if (!row) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.status(204).end();
});
