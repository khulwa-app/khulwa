import type { ProgressRange } from "./progress.types";

/**
 * Query keys live beside the fetchers that own them so an invalidation can never drift from the
 * key it is trying to clear. `all` is the prefix every progress query shares — TanStack matches on
 * prefix, so invalidating it covers each range without enumerating them.
 */
export const progressKeys = {
  all: ["progress"] as const,
  range: (range: ProgressRange) => ["progress", range] as const,
  streak: () => ["streak"] as const,
};
