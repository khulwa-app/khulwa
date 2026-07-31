import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

/**
 * The server's error codes double as `apiErrors.*` translation keys — there is no mapping layer.
 * That only stays true if every code the server can emit has copy. Nzmly runs the same contract
 * without this check and ships 12 codes that render as raw `api.messages.x` to users.
 */
const ROOT = join(import.meta.dirname, "..");
const SERVER_DIRS = ["lib", "app/api"];

function walk(dir: string): string[] {
  const entries = readdirSync(dir);
  return entries.flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return full.endsWith(".ts") ? [full] : [];
  });
}

function emittedCodes(): Set<string> {
  const codes = new Set<string>();
  for (const dir of SERVER_DIRS) {
    for (const file of walk(join(ROOT, dir))) {
      const source = readFileSync(file, "utf8");
      // Matches `{ error: "code" }` and `error: "code",` in HttpError bodies and JSON responses.
      for (const match of source.matchAll(/\berror:\s*"([a-z][a-z0-9_]*)"/g)) {
        codes.add(match[1]);
      }
    }
  }
  return codes;
}

test("every server error code has an apiErrors translation", () => {
  const messages = JSON.parse(readFileSync(join(ROOT, "messages/en.json"), "utf8")) as {
    apiErrors: Record<string, string>;
  };
  const codes = emittedCodes();

  assert.ok(codes.size > 0, "expected to find at least one server error code");

  const missing = [...codes].filter((code) => !(code in messages.apiErrors)).sort();
  assert.deepEqual(missing, [], `server codes with no apiErrors copy: ${missing.join(", ")}`);
});

test("apiErrors carries the fallbacks the client resolves to", () => {
  const messages = JSON.parse(readFileSync(join(ROOT, "messages/en.json"), "utf8")) as {
    apiErrors: Record<string, string>;
  };
  // `apiErrorKey` falls back to "generic"; the fetcher falls back to "unknown_error"; the auth and
  // query layers surface "network". None of them are thrown by a route, so scanning cannot find them.
  for (const key of ["generic", "unknown_error", "network"]) {
    assert.ok(messages.apiErrors[key], `apiErrors.${key} is required as a client-side fallback`);
  }
});
