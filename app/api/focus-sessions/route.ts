import { db } from "@/lib/db";
import { requireUser } from "@/lib/api/auth";
import { HttpError, json, route } from "@/lib/api/http";
import { FocusSessionInputError, parseFocusSessionRequest } from "@/lib/services/focus-session-input";
import { CATEGORIES, recordFocusSession } from "@/lib/services/tracking";
import type { LogFocusResponse } from "@/services/progress/progress.types";

export const POST = route(async (req) => {
  const user = await requireUser();
  let input;
  try {
    input = await parseFocusSessionRequest(req, CATEGORIES);
  } catch (error) {
    if (error instanceof FocusSessionInputError) {
      throw new HttpError(400, { error: error.code });
    }
    throw error;
  }

  const result = await recordFocusSession(db, {
    userId: user.id,
    ...input,
  });

  const response = {
    streak: {
      current: result.streak.current,
      longest: result.streak.longest,
      lastActiveDay: result.streak.lastActiveDay,
    },
  } satisfies LogFocusResponse;

  return json(response, { status: 201 });
});
