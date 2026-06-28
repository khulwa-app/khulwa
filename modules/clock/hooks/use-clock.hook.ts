"use client";

import { useEffect, useState } from "react";

type UseClockOptions = {
  intervalMs?: number;
};

export function useClock({ intervalMs = 1000 }: UseClockOptions = {}): Date {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
