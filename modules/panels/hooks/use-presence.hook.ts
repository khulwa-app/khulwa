"use client";

import { useEffect, useState } from "react";

export type PresenceState = "open" | "closed";

/**
 * Keeps a surface mounted through its exit transition so closing is animated rather than abrupt.
 * `exitMs` must match the CSS exit duration or the surface disappears mid-transition.
 */
export function usePresence(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open);
  const [entered, setEntered] = useState(open);

  // Adjusted during render so opening mounts in the same commit and closing flips the
  // transition target immediately; both re-render before the browser paints.
  if (open && !mounted) setMounted(true);
  if (!open && entered) setEntered(false);

  useEffect(() => {
    if (!open || entered) return;
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [open, entered]);

  useEffect(() => {
    if (open || !mounted) return;
    const timer = setTimeout(() => setMounted(false), exitMs);
    return () => clearTimeout(timer);
  }, [open, mounted, exitMs]);

  return { mounted, state: (entered ? "open" : "closed") satisfies PresenceState as PresenceState };
}
