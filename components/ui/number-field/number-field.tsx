"use client";

import type { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/primitives";

interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
  label: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  onValueChange: (value: number) => void;
}

export function NumberField({ label, value, min, max, unit, onValueChange, ...rest }: NumberFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm text-sage-900">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <Input
          className="min-h-10 w-16 px-2 text-center"
          type="number"
          min={min}
          max={max}
          inputMode="numeric"
          value={value}
          aria-label={label}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            if (Number.isNaN(parsed)) return;
            let next = parsed;
            if (min !== undefined) next = Math.max(min, next);
            if (max !== undefined) next = Math.min(max, next);
            onValueChange(next);
          }}
          {...rest}
        />
        {unit ? (
          <span className="min-w-13 text-sm text-sage-700">{unit}</span>
        ) : null}
      </div>
    </div>
  );
}
