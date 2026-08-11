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

  const label = `${t("streak", { count })} · ${tTools("progress")}`;

  return (
    <button
      type="button"
      onClick={() => togglePanel(Panel.Progress)}
      title={label}
      aria-label={label}
      aria-expanded={open}
      aria-busy={isPending || undefined}
      data-active={open || undefined}
      className="group tabular relative flex h-9 min-w-9 shrink-0 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-medium text-foreground-secondary transition-[background-color,color,transform] duration-[var(--duration-press)] ease-out after:absolute after:-inset-1 after:content-[''] hover:bg-surface-elevated hover:text-foreground active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:hover:bg-primary-hover motion-reduce:active:scale-100"
    >
      <Flame className="size-[16px] text-primary group-data-[active]:text-primary-foreground" />
      <span className={isPending ? "text-foreground-muted" : undefined}>{count}</span>
    </button>
  );
}
