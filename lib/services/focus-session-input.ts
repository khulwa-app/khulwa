import { z } from "zod";

export type FocusSessionInputErrorCode =
  | "invalid_body"
  | "invalid_category"
  | "invalid_duration"
  | "invalid_dates";

export class FocusSessionInputError extends Error {
  constructor(public readonly code: FocusSessionInputErrorCode) {
    super(code);
    this.name = "FocusSessionInputError";
  }
}

export type ParsedFocusSessionInput<Category extends string> = {
  legacyCategory: Category | null;
  durationSeconds: number;
  startedAt: Date;
  endedAt: Date;
};

const timestampSchema = z.iso.datetime({ offset: true });

export function parseFocusSessionBody<Category extends string>(
  raw: unknown,
  categories: readonly Category[],
): ParsedFocusSessionInput<Category> {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    throw new FocusSessionInputError("invalid_body");
  }

  const body = raw as Record<string, unknown>;
  const category = body.category;
  const durationSeconds = body.durationSeconds;
  const startedAt = body.startedAt;
  const endedAt = body.endedAt;

  if (typeof durationSeconds !== "number" || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new FocusSessionInputError("invalid_duration");
  }

  const normalizedDuration = Math.round(durationSeconds);
  if (!Number.isSafeInteger(normalizedDuration) || normalizedDuration <= 0 || normalizedDuration > 2_147_483_647) {
    throw new FocusSessionInputError("invalid_duration");
  }

  if (category != null && !categories.includes(category as Category)) {
    throw new FocusSessionInputError("invalid_category");
  }

  if (!timestampSchema.safeParse(startedAt).success || !timestampSchema.safeParse(endedAt).success) {
    throw new FocusSessionInputError("invalid_dates");
  }

  const started = new Date(startedAt as string);
  const ended = new Date(endedAt as string);
  if (ended < started) {
    throw new FocusSessionInputError("invalid_dates");
  }

  return {
    legacyCategory: (category ?? null) as Category | null,
    durationSeconds: normalizedDuration,
    startedAt: started,
    endedAt: ended,
  };
}

export async function parseFocusSessionRequest<Category extends string>(
  req: Request,
  categories: readonly Category[],
): Promise<ParsedFocusSessionInput<Category>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new FocusSessionInputError("invalid_body");
  }

  return parseFocusSessionBody(raw, categories);
}
