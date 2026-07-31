"use client";

import { useLocale, useTranslations } from "next-intl";
import { useUser } from "@/components/providers/session-provider";
import { formatClock, formatGregorianDate, getTimeBand, getWeekdayName, useClock } from "@/modules/clock";
import { useMounted } from "@/hooks/use-mounted";
import { DoingNowCard } from "@/modules/tasks/components/doing-now/doing-now-card";
import { SpaceBackground } from "./space-background";

const NBSP = " ";

export function HomeSpace() {
  const t = useTranslations("home");
  const locale = useLocale();
  const user = useUser();
  const name = user?.name?.split(" ")[0]?.trim() || t("guest");
  const now = useClock({ intervalMs: 60_000 });
  const band = getTimeBand(now);
  const mounted = useMounted();

  const time = mounted ? formatClock(now, { hour12: true, meridiem: false, locale }) : NBSP;
  const dateLine = mounted
    ? [getWeekdayName(now, locale), formatGregorianDate(now, locale)].filter(Boolean).join(" · ")
    : NBSP;
  const greeting = mounted ? t(`headline.${band}`, { name }) : NBSP;

  return (
    <div className="relative flex min-h-full w-full flex-col overflow-x-hidden bg-canvas">
      <SpaceBackground />

      <div className="relative z-1 flex flex-1 w-full flex-col items-center justify-center gap-10 px-6 py-16 md:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-foreground-secondary" suppressHydrationWarning>
            {greeting}
          </p>

          <p className="tabular text-6xl leading-none font-semibold md:text-7xl" suppressHydrationWarning>
            {time}
          </p>

          <p className="text-xs text-foreground-muted" suppressHydrationWarning>
            {dateLine}
          </p>
        </div>

        <DoingNowCard />
      </div>
    </div>
  );
}
