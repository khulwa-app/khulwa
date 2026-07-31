import type { ApiError } from "./fetcher";

/**
 * The server answers with `{ error: "<snake_case_code>" }`, and that code doubles as the i18n key
 * under `apiErrors.*` — there is no lookup table to keep in sync. Anything unrecognised falls back
 * to the generic message rather than rendering a raw code at the user.
 */
export function apiErrorKey(error: unknown): string {
  const code = (error as ApiError | undefined)?.code;
  if (!code || !/^[a-z][a-z0-9_]*$/.test(code)) return "generic";
  return code;
}

export function isUnauthorized(error: unknown): boolean {
  return (error as ApiError | undefined)?.status === 401;
}
