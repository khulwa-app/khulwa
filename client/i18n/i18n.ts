import { DEFAULT_LOCALE, type LocaleType } from "./config";

// UI is English-only — no cookie, no switching. Kept as a function so the
// next-intl request config (request.ts) keeps a single source of truth.
export function getUserLocale(): LocaleType {
  return DEFAULT_LOCALE;
}
