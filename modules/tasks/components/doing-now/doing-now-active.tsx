"use client";

import { ArrowRight, Repeat } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { Button, IconButton } from "@/components/ui/primitives";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import type { Task } from "@/services/tasks";

export function DoingNowActive({ task }: { task: Task }) {
  const t = useTranslations("home.doingNow"); const changeSpace = useSpace((state) => state.changeSpace); const openPanel = usePanels((state) => state.open); const togglePanel = usePanels((state) => state.toggle);
  const openTasksPanel = () => { if (openPanel !== Panel.Tasks) togglePanel(Panel.Tasks); };
  return <section className="flex flex-wrap items-center gap-3 rounded-panel border border-sage-300 bg-base-100 p-4 sm:p-5"><span aria-hidden className="size-2 rounded-full bg-sage-600" /><p aria-live="polite" className="min-w-32 flex-1 truncate font-medium text-sage-1000" title={task.body}>{task.body}</p><span className="text-sm text-sage-700">{t("etaShort", { eta: task.eta })}</span><Button onClick={() => changeSpace(Space.Focus)} size="sm"><span>{t("enterFocus")}</span><ArrowRight className="size-4" /></Button><IconButton aria-label={t("changeTask")} onClick={openTasksPanel} size="sm"><Repeat className="size-4" /></IconButton></section>;
}
