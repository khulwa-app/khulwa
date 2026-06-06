"use client";

import type { ReactNode } from "react";
import { Badge } from "./badge";

interface TagBadgeProps {
  children: ReactNode;
  muted?: boolean;
}

/**
 * TagBadge — generic neutral tag for content-driven labels (space names,
 * states). The label is passed by the caller (already translated), so it
 * carries no scoped copy of its own. `muted` dims the text for secondary
 * tags (e.g. "Quiet hours").
 */
export function TagBadge({ children, muted = false }: TagBadgeProps) {
  return (
    <Badge.Root tone="neutral" emphasis={muted ? "muted" : "subtle"}>
      <Badge.Label>{children}</Badge.Label>
    </Badge.Root>
  );
}
