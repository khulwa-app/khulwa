"use client";

import type { TimeBand } from "../types";
import { getTimeBand } from "../utils";
import { useClock } from "./use-clock.hook";

export function useTimeBand(): TimeBand {
  return getTimeBand(useClock({ intervalMs: 60_000 }));
}
