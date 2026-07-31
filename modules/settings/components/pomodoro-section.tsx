"use client";

import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/shadcn/switch";
import { usePomodoroStore } from "@/modules/pomodoro";

function Stepper({
  label,
  value,
  unit,
  min = 1,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min?: number;
  onChange: (value: number) => void;
}) {
  const step = (delta: number) => onChange(Math.max(min, value + delta));

  return (
    <div className="flex h-11 items-center justify-between gap-4">
      <span className="text-sm">{label}</span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`${label} −`}
          onClick={() => step(-1)}
          disabled={value <= min}
          className="flex size-8 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Minus className="size-4" />
        </button>

        <span className="tabular min-w-16 text-center text-sm">
          {value} {unit}
        </span>

        <button
          type="button"
          aria-label={`${label} +`}
          onClick={() => step(1)}
          className="flex size-8 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function PomodoroSection() {
  const t = useTranslations("settings.pomodoro");
  const options = usePomodoroStore((s) => s.options);
  const setOptions = usePomodoroStore((s) => s.setOptions);

  return (
    <div className="flex flex-col">
      <Stepper
        label={t("focus")}
        value={options.focusMinutes}
        unit={t("minutes")}
        onChange={(focusMinutes) => setOptions({ focusMinutes })}
      />
      <Stepper
        label={t("shortBreak")}
        value={options.shortBreakMinutes}
        unit={t("minutes")}
        onChange={(shortBreakMinutes) => setOptions({ shortBreakMinutes })}
      />
      <Stepper
        label={t("longBreak")}
        value={options.longBreakMinutes}
        unit={t("minutes")}
        onChange={(longBreakMinutes) => setOptions({ longBreakMinutes })}
      />
      <Stepper
        label={t("rounds")}
        value={options.rounds}
        unit={t("roundsUnit")}
        onChange={(rounds) => setOptions({ rounds })}
      />

      <div className="flex h-11 items-center justify-between gap-4">
        <span className="text-sm">{t("autoStart")}</span>
        <Switch
          checked={options.autoStart}
          onCheckedChange={(autoStart) => setOptions({ autoStart })}
          aria-label={t("autoStart")}
        />
      </div>
    </div>
  );
}
