"use client";

import { useTranslations } from "next-intl";
import { usePanels, Panel } from "@/modules/panels";
import { useTasks } from "@/services/tasks";

export function DoingNowCaption() {
  const t = useTranslations("home.doingNow");
  const { data: tasks } = useTasks();
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);

  const currentTask = tasks?.find((task) => task.isDoingNow);

  return (
    <div aria-live="polite" className="flex h-6 items-center justify-center">
      {currentTask ? (
        <button
          type="button"
          title={currentTask.body}
          aria-label={t("changeTask")}
          onClick={() => {
            if (openPanel !== Panel.Tasks) togglePanel(Panel.Tasks);
          }}
          className="relative max-w-md truncate rounded-full text-sm text-foreground-secondary transition-colors after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-[''] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {currentTask.body}
        </button>
      ) : null}
    </div>
  );
}
