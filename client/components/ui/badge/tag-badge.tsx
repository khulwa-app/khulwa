"use client";

import type { ReactNode } from "react";
import { Badge } from "./badge";

interface TagBadgeProps {
  children: ReactNode;
  muted?: boolean;
}

export function TagBadge({ children, muted = false }: TagBadgeProps) {
  return (
    <Badge.Root tone="neutral" emphasis={muted ? "muted" : "subtle"}>
      <Badge.Label>{children}</Badge.Label>
    </Badge.Root>
  );
}
