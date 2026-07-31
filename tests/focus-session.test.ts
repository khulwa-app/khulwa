import test from "node:test";
import assert from "node:assert/strict";
import {
  FocusSessionInputError,
  parseFocusSessionBody,
  parseFocusSessionRequest,
} from "../lib/services/focus-session-input";
import { recordFocusSession } from "../lib/services/tracking";
import { dailyCategoryTotal, focusSession, streak } from "../lib/db/schema/focus";

const CATEGORIES = ["deepWork", "learning", "reading", "dhikr"] as const;
const VALID_BODY = {
  durationSeconds: 1_500,
  startedAt: "2026-07-29T10:00:00.000Z",
  endedAt: "2026-07-29T10:25:00.000Z",
};

function hasCode(code: string) {
  return (error: unknown) => error instanceof FocusSessionInputError && error.code === code;
}

test("missing category is accepted and extra legacy fields are ignored", () => {
  const input = parseFocusSessionBody({ ...VALID_BODY, taskId: "legacy-task" }, CATEGORIES);

  assert.equal(input.legacyCategory, null);
  assert.equal(input.durationSeconds, 1_500);
});

test("known legacy category is accepted and unknown category is rejected", () => {
  const input = parseFocusSessionBody({ ...VALID_BODY, category: "deepWork" }, CATEGORIES);
  assert.equal(input.legacyCategory, "deepWork");

  assert.throws(
    () => parseFocusSessionBody({ ...VALID_BODY, category: "unknown" }, CATEGORIES),
    hasCode("invalid_category"),
  );
});

test("null and malformed JSON request bodies return invalid_body", async () => {
  const nullRequest = new Request("http://localhost/api/focus-sessions", {
    method: "POST",
    body: "null",
    headers: { "content-type": "application/json" },
  });
  const malformedRequest = new Request("http://localhost/api/focus-sessions", {
    method: "POST",
    body: "{",
    headers: { "content-type": "application/json" },
  });

  await assert.rejects(() => parseFocusSessionRequest(nullRequest, CATEGORIES), hasCode("invalid_body"));
  await assert.rejects(() => parseFocusSessionRequest(malformedRequest, CATEGORIES), hasCode("invalid_body"));
});

test("invalid durations are rejected before persistence", () => {
  for (const durationSeconds of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, 0.1, 2_147_483_648]) {
    assert.throws(
      () => parseFocusSessionBody({ ...VALID_BODY, durationSeconds }, CATEGORIES),
      hasCode("invalid_duration"),
    );
  }
});

test("invalid timestamps and ended-before-started order are rejected", () => {
  assert.throws(
    () => parseFocusSessionBody({ ...VALID_BODY, startedAt: "2026-02-31T10:00:00.000Z" }, CATEGORIES),
    hasCode("invalid_dates"),
  );
  assert.throws(
    () => parseFocusSessionBody({ ...VALID_BODY, endedAt: "not-a-timestamp" }, CATEGORIES),
    hasCode("invalid_dates"),
  );
  assert.throws(
    () =>
      parseFocusSessionBody(
        {
          ...VALID_BODY,
          startedAt: "2026-07-29T11:00:00.000Z",
          endedAt: "2026-07-29T10:00:00.000Z",
        },
        CATEGORIES,
      ),
    hasCode("invalid_dates"),
  );
});

type RecordedWrite = {
  table: unknown;
  values: Record<string, unknown>;
  conflict?: unknown;
};

function createRecordingDb() {
  const writes: RecordedWrite[] = [];
  const streakRow = { current: 1, longest: 1, lastActiveDay: "2026-07-29" };
  const tx = {
    select: () => ({
      from: () => ({
        where: async () => [],
      }),
    }),
    insert: (table: unknown) => ({
      values: (values: Record<string, unknown>) => {
        const write: RecordedWrite = { table, values };
        writes.push(write);
        const builder = {
          onConflictDoUpdate: (conflict: unknown) => {
            write.conflict = conflict;
            return builder;
          },
          returning: async () => [streakRow],
        };
        return builder;
      },
    }),
  };
  const database = {
    transaction: async (run: (transaction: typeof tx) => unknown) => run(tx),
  };

  return { database, writes };
}

test("missing category stores null without touching the legacy aggregate", async () => {
  const { database, writes } = createRecordingDb();
  await recordFocusSession(database as never, {
    userId: "user-a",
    legacyCategory: null,
    durationSeconds: 1_500,
    startedAt: new Date(VALID_BODY.startedAt),
    endedAt: new Date(VALID_BODY.endedAt),
  });

  assert.equal(writes.find((write) => write.table === focusSession)?.values.category, null);
  assert.equal(writes.some((write) => write.table === dailyCategoryTotal), false);
  assert.equal(writes.some((write) => write.table === streak), true);
});

test("known legacy category preserves rollback aggregate writes", async () => {
  const { database, writes } = createRecordingDb();
  await recordFocusSession(database as never, {
    userId: "user-a",
    legacyCategory: "deepWork",
    durationSeconds: 1_500,
    startedAt: new Date(VALID_BODY.startedAt),
    endedAt: new Date(VALID_BODY.endedAt),
  });

  assert.equal(writes.find((write) => write.table === focusSession)?.values.category, "deepWork");
  const aggregateWrite = writes.find((write) => write.table === dailyCategoryTotal);
  assert.equal(aggregateWrite?.values.category, "deepWork");
  assert.equal(aggregateWrite?.values.totalSeconds, 1_500);
  assert.ok(aggregateWrite?.conflict);
});
