"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const MIN_ETA = 5;
const MAX_ETA = 240;
const STEP = 5;

const clampEta = (value: number) => Math.min(MAX_ETA, Math.max(MIN_ETA, Math.round(value / STEP) * STEP));

interface EtaStepperProps {
  value: number;
  unit: string;
  label: string;
  onChange: (value: number) => void;
}

export function EtaStepper({ value, unit, label, onChange }: EtaStepperProps) {
  const eta = clampEta(value);
  const decrementDisabled = eta <= MIN_ETA;
  const incrementDisabled = eta >= MAX_ETA;

  const commit = (next: number) => {
    const normalized = clampEta(next);
    if (normalized !== eta) onChange(normalized);
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="flex h-8 shrink-0 items-center rounded-full bg-surface px-1 text-xs text-foreground-secondary ring-1 ring-hairline transition-colors group-data-[doing-now]:bg-primary/10"
    >
      <button
        type="button"
        aria-label="Decrease estimated minutes"
        disabled={decrementDisabled}
        onClick={() => commit(eta - STEP)}
        className={cn(
          "flex size-6 items-center justify-center rounded-full transition-colors",
          "hover:bg-surface-elevated hover:text-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
          "disabled:pointer-events-none disabled:opacity-35",
        )}
      >
        <Minus className="size-3.5" />
      </button>

      <span className="flex min-w-10 items-baseline justify-center gap-0.5 px-1 font-medium tabular-nums text-foreground">
        {eta}
        <span className="text-[0.6875rem] font-normal text-foreground-muted">{unit}</span>
      </span>

      <button
        type="button"
        aria-label="Increase estimated minutes"
        disabled={incrementDisabled}
        onClick={() => commit(eta + STEP)}
        className={cn(
          "flex size-6 items-center justify-center rounded-full transition-colors",
          "hover:bg-surface-elevated hover:text-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
          "disabled:pointer-events-none disabled:opacity-35",
        )}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
