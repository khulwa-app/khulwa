"use client";

import { useTranslations } from "next-intl";
import { NumberField } from "@/components/ui";
import { usePomodoroStore } from "@/modules/pomodoro";

export function PomodoroSection() {
  const t = useTranslations("settings.pomodoro"); const options = usePomodoroStore((state) => state.options); const setOptions = usePomodoroStore((state) => state.setOptions);
  return <div className="grid gap-4"><NumberField label={t("focus")} min={1} onValueChange={(value) => setOptions({ focusMinutes: value })} unit={t("minutes")} value={options.focusMinutes} /><NumberField label={t("shortBreak")} min={1} onValueChange={(value) => setOptions({ shortBreakMinutes: value })} unit={t("minutes")} value={options.shortBreakMinutes} /><NumberField label={t("longBreak")} min={1} onValueChange={(value) => setOptions({ longBreakMinutes: value })} unit={t("minutes")} value={options.longBreakMinutes} /><NumberField label={t("rounds")} min={1} onValueChange={(value) => setOptions({ rounds: value })} unit={t("roundsUnit")} value={options.rounds} /><label className="mt-2 flex min-h-12 items-center justify-between gap-4 rounded-control border border-sage-300 px-4"><span className="text-sm font-medium text-sage-900">{t("autoStart")}</span><input checked={options.autoStart} className="toggle toggle-sm border-sage-400 bg-base-100 checked:border-sage-800 checked:bg-sage-800" onChange={(event) => setOptions({ autoStart: event.target.checked })} type="checkbox" /></label></div>;
}
