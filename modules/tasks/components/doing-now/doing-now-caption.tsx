"use client";

import { useTranslations } from "next-intl";
import { usePanels, Panel } from "@/modules/panels";
import { useTasks } from "@/services/tasks";

export function DoingNowCaption() {
  const t = useTranslations("home.doingNow");
  const tasks = useTasks().data;
  const openPanel = usePanels((state) => state.open);
  const togglePanel = usePanels((state) => state.toggle);
  const task = tasks?.find((item) => item.isDoingNow);
  if (!task) return <div className="min-h-6" />;
  return <div className="min-h-6 text-center"><button aria-label={t("changeTask")} className="max-w-md truncate text-sm font-medium text-sage-700 transition-colors hover:text-sage-1000" onClick={() => { if (openPanel !== Panel.Tasks) togglePanel(Panel.Tasks); }} title={task.body} type="button">{task.body}</button></div>;
}
