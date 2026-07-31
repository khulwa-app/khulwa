"use client";

import { ArrowRight, Repeat } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/button";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import type { Task } from "@/services/tasks";

export function DoingNowActive({ task }: { task: Task }) {
  const t = useTranslations("home.doingNow");
  const changeSpace = useSpace((s) => s.changeSpace);
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);

  const openTasksPanel = () => {
    if (openPanel !== Panel.Tasks) togglePanel(Panel.Tasks);
  };

  return (
    <div className="flex w-full max-w-lg items-center gap-3 rounded-full border border-hairline bg-surface-veil p-2 pl-6">
      <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />

      <span aria-live="polite" title={task.body} className="min-w-0 flex-1 truncate text-sm">
        {task.body}
      </span>

      <span className="tabular shrink-0 text-xs text-foreground-muted">{t("etaShort", { eta: task.eta })}</span>

      <Button size="sm" onClick={() => changeSpace(Space.Focus)}>
        {t("enterFocus")}
        <ArrowRight />
      </Button>

      <button
        type="button"
        aria-label={t("changeTask")}
        onClick={openTasksPanel}
        className="relative flex size-8 shrink-0 items-center justify-center rounded-full text-foreground-muted transition-colors after:absolute after:-inset-1.5 after:content-[''] hover:bg-surface-elevated hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Repeat className="size-4" />
      </button>
    </div>
  );
}
