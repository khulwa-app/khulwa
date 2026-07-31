"use client";

import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnchoredPanel, usePanels, Panel } from "@/modules/panels";
import { Routes } from "@/constants/routes";
import { useProgress, useStreak } from "@/services/progress";
import { formatDuration } from "../utils";
import { WeeklyBars } from "./weekly-bars";

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="tabular text-xl font-semibold">{value}</span>
      <span className="text-xs text-foreground-muted">{label}</span>
    </div>
  );
}

export function ProgressPanel() {
  const t = useTranslations("khulwa.progress");
  const tCommon = useTranslations("common");
  const open = usePanels((s) => s.open === Panel.Progress);
  const close = usePanels((s) => s.close);
  const progress = useProgress("week");
  const streak = useStreak();
  const isPending = progress.isPending || streak.isPending;
  const isError = progress.isError || streak.isError;
  const data = progress.data;
  const streakData = streak.data;

  return (
    <AnchoredPanel
      anchor="header"
      width={360}
      open={open}
      onClose={close}
      title={t("title")}
      footer={
        <NextLink
          href={Routes.Progress}
          onClick={close}
          className="flex items-center justify-end gap-1 rounded-full text-xs text-foreground-secondary transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("seeAll")}
          <ArrowRight className="size-3.5" />
        </NextLink>
      }
    >
      {isPending ? (
        <p className="text-sm text-foreground-muted">{tCommon("loading")}</p>
      ) : isError || !data || !streakData ? (
        <p role="alert" className="text-sm text-destructive">
          {t("loadError")}
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          <p className="text-xs text-foreground-muted">{t("last7Days")}</p>

          <div className="grid grid-cols-3 gap-3">
            <Metric value={formatDuration(data.totals.focusSeconds)} label={t("focusTime")} />
            <Metric value={data.totals.sessions} label={t("sessions")} />
            <Metric value={streakData.current} label={t("streak")} />
          </div>

          {data.totals.sessions > 0 ? (
            <WeeklyBars series={data.series} compact />
          ) : (
            <p className="text-sm text-foreground-muted">{t("empty")}</p>
          )}
        </div>
      )}
    </AnchoredPanel>
  );
}
