"use client";

import { Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { useStreak } from "@/services/progress";
import { usePanels, Panel } from "@/modules/panels";

export function StreakBadge() {
  const t = useTranslations("components.badge");
  const tTools = useTranslations("dock.tools");
  const { data, isPending } = useStreak();
  const togglePanel = usePanels((s) => s.toggle);
  const open = usePanels((s) => s.open === Panel.Progress);
  const count = data?.current ?? 0;
  if (isPending) return null;

  const label = `${t("streak", { count })} · ${tTools("progress")}`;

  return (
    <button
      type="button"
      onClick={() => togglePanel(Panel.Progress)}
      title={label}
      aria-label={label}
      aria-expanded={open}
      className="tabular relative flex h-8 items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 text-xs font-medium text-foreground transition-colors after:absolute after:-inset-1.5 after:content-[''] hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Flame className="size-3.5 text-primary" />
      {count}
    </button>
  );
}
