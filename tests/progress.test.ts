import test from "node:test";
import assert from "node:assert/strict";
import { drizzle } from "drizzle-orm/postgres-js";
import * as databaseSchema from "../lib/db/schema";
import {
  buildProgressAggregateQuery,
  buildRecentFocusSessionsQuery,
  createProgressResponse,
  createProgressWindow,
} from "../lib/services/progress";

const NOW = new Date("2026-07-29T18:30:00.000Z");

test("week range uses seven complete UTC days with an exclusive next-midnight boundary", () => {
  const window = createProgressWindow("week", NOW);

  assert.equal(window.dayCount, 7);
  assert.equal(window.start.toISOString(), "2026-07-23T00:00:00.000Z");
  assert.equal(window.endExclusive.toISOString(), "2026-07-30T00:00:00.000Z");
});

test("day range contains only the current UTC calendar day", () => {
  const window = createProgressWindow("day", NOW);
  const response = createProgressResponse("day", window, [], []);

  assert.equal(window.dayCount, 1);
  assert.equal(window.start.toISOString(), "2026-07-29T00:00:00.000Z");
  assert.equal(window.endExclusive.toISOString(), "2026-07-30T00:00:00.000Z");
  assert.deepEqual(response.series, [{ day: "2026-07-29", focusSeconds: 0, sessions: 0 }]);
});

test("empty progress has the documented contract and seven zero-filled UTC points", () => {
  const window = createProgressWindow("week", NOW);
  const response = createProgressResponse("week", window, [], []);

  assert.deepEqual(Object.keys(response), ["range", "totals", "series", "recentSessions"]);
  assert.deepEqual(response.totals, {
    focusSeconds: 0,
    sessions: 0,
    averageSessionSeconds: 0,
  });
  assert.equal(response.series.length, 7);
  assert.deepEqual(response.series[0], { day: "2026-07-23", focusSeconds: 0, sessions: 0 });
  assert.deepEqual(response.series[6], { day: "2026-07-29", focusSeconds: 0, sessions: 0 });
  assert.deepEqual(response.recentSessions, []);
});

test("populated progress computes totals, average, series, and recent sessions", () => {
  const window = createProgressWindow("week", NOW);
  const response = createProgressResponse(
    "week",
    window,
    [
      { day: "2026-07-23", focusSeconds: 600, sessions: 1 },
      { day: "2026-07-29", focusSeconds: 3_000, sessions: 2 },
    ],
    [
      {
        id: "latest",
        durationSeconds: 1_500,
        startedAt: new Date("2026-07-29T11:35:00.000Z"),
        endedAt: new Date("2026-07-29T12:00:00.000Z"),
      },
      {
        id: "earlier",
        durationSeconds: 600,
        startedAt: new Date("2026-07-23T00:00:00.000Z"),
        endedAt: new Date("2026-07-23T00:10:00.000Z"),
      },
    ],
  );

  assert.deepEqual(response.totals, {
    focusSeconds: 3_600,
    sessions: 3,
    averageSessionSeconds: 1_200,
  });
  assert.deepEqual(response.series[0], { day: "2026-07-23", focusSeconds: 600, sessions: 1 });
  assert.deepEqual(response.series[6], { day: "2026-07-29", focusSeconds: 3_000, sessions: 2 });
  assert.equal(response.recentSessions[0]?.id, "latest");
  assert.equal(response.recentSessions[1]?.id, "earlier");
});

test("corrupt aggregates and recent rows outside validity and UTC boundaries are excluded", () => {
  const window = createProgressWindow("week", NOW);
  const response = createProgressResponse(
    "week",
    window,
    [
      { day: "2026-07-22", focusSeconds: 500, sessions: 1 },
      { day: "2026-07-24", focusSeconds: -1, sessions: 1 },
      { day: "2026-07-25", focusSeconds: 500, sessions: 0 },
      { day: "2026-07-26", focusSeconds: 900, sessions: 1 },
    ],
    [
      {
        id: "inclusive-start",
        durationSeconds: 60,
        startedAt: new Date("2026-07-22T23:59:00.000Z"),
        endedAt: new Date("2026-07-23T00:00:00.000Z"),
      },
      {
        id: "exclusive-end",
        durationSeconds: 60,
        startedAt: new Date("2026-07-29T23:59:00.000Z"),
        endedAt: new Date("2026-07-30T00:00:00.000Z"),
      },
      {
        id: "reversed",
        durationSeconds: 60,
        startedAt: new Date("2026-07-27T12:01:00.000Z"),
        endedAt: new Date("2026-07-27T12:00:00.000Z"),
      },
      {
        id: "zero-duration",
        durationSeconds: 0,
        startedAt: new Date("2026-07-28T12:00:00.000Z"),
        endedAt: new Date("2026-07-28T12:00:00.000Z"),
      },
    ],
  );

  assert.deepEqual(response.totals, {
    focusSeconds: 900,
    sessions: 1,
    averageSessionSeconds: 900,
  });
  assert.deepEqual(response.recentSessions.map((session) => session.id), ["inclusive-start"]);
});

test("aggregate and recent queries enforce user, UTC range, validity, grouping, ordering, and limit", () => {
  const database = drizzle.mock({ schema: databaseSchema });
  const window = createProgressWindow("week", NOW);
  const aggregate = buildProgressAggregateQuery(database, "user-a", window).toSQL();
  const recent = buildRecentFocusSessionsQuery(database, "user-a", window).toSQL();

  assert.match(aggregate.sql, /"focus_session"\."user_id" = \$1/);
  assert.match(aggregate.sql, /"ended_at" >= \$2/);
  assert.match(aggregate.sql, /"ended_at" < \$3/);
  assert.match(aggregate.sql, /"duration_seconds" > \$4/);
  assert.match(aggregate.sql, /"ended_at" >= "focus_session"\."started_at"/);
  assert.match(aggregate.sql, /AT TIME ZONE 'UTC'/);
  assert.match(aggregate.sql, /group by/i);
  assert.doesNotMatch(aggregate.sql, /category/);
  assert.deepEqual(aggregate.params, [
    "user-a",
    "2026-07-23T00:00:00.000Z",
    "2026-07-30T00:00:00.000Z",
    0,
  ]);

  assert.match(recent.sql, /order by "focus_session"\."ended_at" desc/i);
  assert.match(recent.sql, /limit \$5/i);
  assert.deepEqual(recent.params, [
    "user-a",
    "2026-07-23T00:00:00.000Z",
    "2026-07-30T00:00:00.000Z",
    0,
    10,
  ]);

  const otherUser = buildProgressAggregateQuery(database, "user-b", window).toSQL();
  assert.equal(otherUser.params[0], "user-b");
  assert.notEqual(otherUser.params[0], aggregate.params[0]);
});
