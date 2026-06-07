"use client";

import type { TimeBand } from "../types";
import { getTimeBand } from "../utils";
import { useClock } from "./use-clock.hook";

/**
 * Current time-of-day band. Seeded instantly (the band only changes on the
 * hour, so tick per minute). Client-only — use inside ssr: false trees.
 */
export function useTimeBand(): TimeBand {
  return getTimeBand(useClock({ intervalMs: 60_000 }));
}
