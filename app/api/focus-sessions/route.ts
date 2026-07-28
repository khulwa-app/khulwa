import { db } from "@/lib/db";
import { requireUser } from "@/lib/api/auth";
import { HttpError, json, route } from "@/lib/api/http";
import { recordFocusSession } from "@/lib/services/tracking";

export const POST = route(async (req) => {
  const user = await requireUser();
  const body = (await req.json().catch(() => ({}))) as {
    durationSeconds?: unknown;
    startedAt?: unknown;
    endedAt?: unknown;
  };
  const { durationSeconds, startedAt, endedAt } = body;

  if (typeof durationSeconds !== "number" || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new HttpError(400, { error: "invalid_duration" });
  }
  const started = new Date(startedAt as string);
  const ended = new Date(endedAt as string);
  if (Number.isNaN(started.getTime()) || Number.isNaN(ended.getTime())) {
    throw new HttpError(400, { error: "invalid_dates" });
  }

  const result = await recordFocusSession(db, {
    userId: user.id,
    durationSeconds: Math.round(durationSeconds),
    startedAt: started,
    endedAt: ended,
  });

  return json(result, { status: 201 });
});
