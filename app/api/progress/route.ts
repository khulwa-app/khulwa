import { db } from "@/lib/db";
import { requireUser } from "@/lib/api/auth";
import { HttpError, json, route } from "@/lib/api/http";
import {
  buildProgressAggregateQuery,
  buildRecentFocusSessionsQuery,
  createProgressResponse,
  createProgressWindow,
} from "@/lib/services/progress";
import type { ProgressResponse } from "@/services/progress/progress.types";

export const GET = route(async (req) => {
  const user = await requireUser();
  const requestedRange = new URL(req.url).searchParams.get("range") ?? "day";
  if (requestedRange !== "day" && requestedRange !== "week") {
    throw new HttpError(400, { error: "invalid_range" });
  }

  const range = requestedRange;
  const window = createProgressWindow(range);
  const [aggregateRows, recentRows] = await Promise.all([
    buildProgressAggregateQuery(db, user.id, window),
    buildRecentFocusSessionsQuery(db, user.id, window),
  ]);
  const response = createProgressResponse(range, window, aggregateRows, recentRows) satisfies ProgressResponse;

  return json(response);
});
