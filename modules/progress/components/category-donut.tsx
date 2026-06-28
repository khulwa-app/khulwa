"use client";

import type { ReactNode } from "react";
import { chakra } from "@chakra-ui/react";
import { CATEGORIES, type CategoryId } from "../categories";

const SIZE = 184;
const STROKE = 18;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const MID = SIZE / 2;

type Totals = Partial<Record<CategoryId, number>>;

export function CategoryDonut({ totals, children }: { totals: Totals; children?: ReactNode }) {
  const total = CATEGORIES.reduce((sum, c) => sum + (totals[c.id] ?? 0), 0);

  let acc = 0;
  const segments =
    total > 0
      ? CATEGORIES.flatMap((c) => {
          const value = totals[c.id] ?? 0;
          if (value <= 0) return [];
          const len = (value / total) * C;
          const segment = { id: c.id, color: c.color, len, offset: acc };
          acc += len;
          return [segment];
        })
      : [];

  return (
    <chakra.div position="relative" w={`${SIZE}px`} h={`${SIZE}px`} flexShrink="0">
      <chakra.svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} css={{ transform: "rotate(-90deg)" }}>
        <chakra.circle cx={MID} cy={MID} r={R} fill="transparent" stroke="bg.emphasized" strokeWidth={STROKE} />
        {segments.map((s) => (
          <chakra.circle
            key={s.id}
            cx={MID}
            cy={MID}
            r={R}
            fill="transparent"
            stroke={s.color}
            strokeWidth={STROKE}
            strokeDasharray={`${s.len} ${C - s.len}`}
            strokeDashoffset={-s.offset}
            css={{
              transition: "stroke-dasharray 400ms ease, stroke-dashoffset 400ms ease",
              "@media (prefers-reduced-motion: reduce)": { transition: "none" },
            }}
          />
        ))}
      </chakra.svg>
      <chakra.div
        position="absolute"
        inset="0"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </chakra.div>
    </chakra.div>
  );
}
