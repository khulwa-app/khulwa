"use client";

import { Fire } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { useStreak } from "@/services/progress";
import { usePanels, Panel } from "@/modules/panels";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";

export function StreakBadge() { const t = useTranslations("components.badge"); const tTools = useTranslations("dock.tools"); const { data } = useStreak(); const togglePanel = usePanels((state) => state.toggle); const active = useSpace((state) => state.activeSpace); const darkSurface = active === Space.Focus || active === Space.Ambient; const count = data?.current ?? 0; if (count <= 0) return null; const label = `${t("streak", { count })} · ${tTools("progress")}`; return <button aria-label={label} className={darkSurface ? "pointer-events-auto fixed left-1/2 top-5 z-30 flex h-8 -translate-x-1/2 items-center gap-1.5 rounded-full border border-sage-700 bg-sage-900 px-3 text-sm font-semibold tabular-nums text-sage-100 hover:border-sage-500" : "pointer-events-auto fixed left-1/2 top-5 z-30 flex h-8 -translate-x-1/2 items-center gap-1.5 rounded-full border border-sage-300 bg-base-100 px-3 text-sm font-semibold tabular-nums text-sage-900 hover:border-sage-500"} onClick={() => togglePanel(Panel.Progress)} title={label} type="button"><Fire className="size-4 text-[#C97952]" weight="Bold" />{count}</button>; }
