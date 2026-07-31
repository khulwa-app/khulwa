"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ProgressSeriesPoint } from "@/services/progress";
import { formatDuration } from "../utils";

export function WeeklyBars({ series, compact = false }: { series: ProgressSeriesPoint[]; compact?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("khulwa.progress");
  const trackHeight = compact ? 56 : 168;
  const max = Math.max(...series.map((row) => row.focusSeconds), 1);
  const formatDate = (day: string) =>
    new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${day}T00:00:00Z`));

  return (
    <div>
      <div aria-hidden="true" className="flex items-end justify-between gap-2">
        {series.map((row) => {
          const weekday = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" }).format(
            new Date(`${row.day}T00:00:00Z`),
          );
          const height = row.focusSeconds > 0 ? Math.max(2, (row.focusSeconds / max) * trackHeight) : 0;

          return (
            <div key={row.day} className="flex flex-1 flex-col items-center justify-end gap-2">
              <div className="flex w-full items-end" style={{ height: trackHeight }}>
                <div
                  className="mx-auto w-full max-w-9 rounded-sm bg-primary transition-[height] duration-400 ease-out motion-reduce:transition-none"
                  style={{ height }}
                />
              </div>
              {compact ? null : <span className="text-xs text-foreground-muted">{weekday}</span>}
            </div>
          );
        })}
      </div>

      <div className="sr-only">
        <p>{t("chartSummary")}</p>
        <ul>
          {series.map((row) => (
            <li key={row.day}>
              {t("chartDay", {
                date: formatDate(row.day),
                duration: formatDuration(row.focusSeconds),
                count: row.sessions,
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
