export type Note = {
  id: string;
  title: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateNoteInput = { title?: string | null; content?: string };

export type UpdateNoteInput = Partial<{ title: string | null; content: string }>;
