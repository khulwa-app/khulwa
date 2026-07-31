"use client";

import { useLocale, useTranslations } from "next-intl";
import { apiErrorKey } from "@/services/http";
import { useProgress, useStreak } from "@/services/progress";
import { formatDuration } from "../utils";
import { WeeklyBars } from "./weekly-bars";

function Panel({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-hairline bg-surface p-5">
      <header className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {meta ? <span className="tabular text-xs text-foreground-muted">{meta}</span> : null}
      </header>
      {children}
    </section>
  );
}

function Notice({ children, isError = false }: { children: React.ReactNode; isError?: boolean }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-10">
      <p
        role={isError ? "alert" : undefined}
        className={`text-center text-sm ${isError ? "text-destructive" : "text-foreground-muted"}`}
      >
        {children}
      </p>
    </div>
  );
}

export function ProgressPage() {
  const t = useTranslations("khulwa.progress");
  const tCommon = useTranslations("common");
  const tApi = useTranslations("apiErrors");
  const locale = useLocale();
  const progress = useProgress("week");
  const streak = useStreak();
  const isPending = progress.isPending || streak.isPending;
  const isError = progress.isError || streak.isError;
  const data = progress.data;
  const streakData = streak.data;
  const isEmpty = !isPending && !isError && data?.totals.sessions === 0;
  const formatCompletedAt = (value: string) =>
    new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

  return (
    <div className="bg-environment h-dvh overflow-y-auto px-5 pt-20 pb-16 md:px-8 md:pt-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-foreground-muted">{t("subtitle")}</p>
        </header>

        {isPending ? (
          <Notice>{tCommon("loading")}</Notice>
        ) : isError || !data || !streakData ? (
          <Notice isError>{tApi(apiErrorKey(progress.error ?? streak.error))}</Notice>
        ) : isEmpty ? (
          <Notice>{t("empty")}</Notice>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: t("focusTime"), value: formatDuration(data.totals.focusSeconds) },
                { label: t("sessions"), value: String(data.totals.sessions) },
                { label: t("averageSession"), value: formatDuration(data.totals.averageSessionSeconds) },
                { label: t("streak"), value: String(streakData.current) },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col gap-1 rounded-xl border border-hairline bg-surface p-5"
                >
                  <span className="tabular text-2xl font-semibold">{metric.value}</span>
                  <span className="text-xs text-foreground-muted">{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Panel title={t("last7Days")} meta={formatDuration(data.totals.focusSeconds)}>
                <WeeklyBars series={data.series} />
              </Panel>

              <Panel title={t("recentSessions")}>
                <ul className="flex flex-col">
                  {data.recentSessions.map((session) => (
                    <li
                      key={session.id}
                      className="flex items-center justify-between gap-4 border-b border-hairline py-3 last:border-b-0"
                    >
                      <span className="text-sm text-foreground-muted">{formatCompletedAt(session.endedAt)}</span>
                      <span className="tabular text-sm font-medium">
                        {formatDuration(session.durationSeconds)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
