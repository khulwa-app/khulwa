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

      <div className="relative z-1 flex flex-1 w-full flex-col items-center justify-center gap-8 px-5 pt-24 pb-30 md:px-8 md:py-18">
        <section aria-label={greeting} className="flex w-full max-w-4xl flex-col items-center text-center">
          <p
            className="kh-space-kicker text-foreground-muted"
            suppressHydrationWarning
          >
            {dateLine}
          </p>

          <h1
            className="kh-space-hero mt-7 max-w-4xl text-foreground"
            suppressHydrationWarning
          >
            {greeting}
          </h1>

          <p
            className="kh-space-time mt-8 text-primary"
            suppressHydrationWarning
          >
            {time}
          </p>

          <p className="mt-7 max-w-sm text-sm text-foreground-secondary">
            {t("subtitle")}
          </p>
        </section>

        <div className="w-full max-w-lg">
          <DoingNowCard />
        </div>
      </div>
    </div>
  );
}
