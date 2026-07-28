"use client";

import { useLocale, useTranslations } from "next-intl";
import { useUser } from "@/components/providers/session-provider";
import { formatClock, formatGregorianDate, getTimeBand, getWeekdayName, useClock } from "@/modules/clock";
import { useMounted } from "@/hooks/use-mounted";
import { SpaceBackground } from "./space-background";

export function HomeSpace() {
  const t = useTranslations("home");
  const locale = useLocale();
  const user = useUser();
  const now = useClock({ intervalMs: 60_000 });
  const mounted = useMounted();
  const name = user?.name?.split(" ")[0]?.trim() || t("guest");
  const time = mounted ? formatClock(now, { hour12: true, meridiem: false, locale }) : "";
  const date = mounted ? [getWeekdayName(now, locale), formatGregorianDate(now, locale)].filter(Boolean).join(" · ") : "";

  return <section className="relative grid min-h-dvh place-items-center overflow-hidden bg-base-200 px-5 py-24 text-center"><SpaceBackground /><div className="relative max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage-700">{date}</p><h1 className="mt-5 text-[clamp(2.75rem,8vw,6.75rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-sage-1000">{mounted ? t(`headline.${getTimeBand(now)}`, { name }) : ""}</h1><p className="khulwa-numeric mt-8 text-[clamp(3rem,7vw,6rem)] font-medium tracking-[-0.09em] text-sage-800">{time}</p><p className="mt-5 text-base text-sage-700">{t("subtitle")}</p></div></section>;
}
