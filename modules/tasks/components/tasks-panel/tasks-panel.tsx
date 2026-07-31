"use client";

import { useTranslations } from "next-intl";
import { AnchoredPanel, usePanels, Panel } from "@/modules/panels";
import { useTasks } from "@/services/tasks";
import { QuickAdd } from "./quick-add";
import { TaskRow } from "./task-row";
import { TaskSection } from "./task-section";

export function TasksPanel() {
  const t = useTranslations("tasks");
  const open = usePanels((s) => s.open === Panel.Tasks);
  const close = usePanels((s) => s.close);
  const { data: tasks = [], isPending } = useTasks();

  const today = tasks.filter((task) => !task.completed && task.today);
  const later = tasks.filter((task) => !task.completed && !task.today);
  const done = tasks.filter((task) => task.completed);

  return (
    <AnchoredPanel anchor="tool" width={360} open={open} onClose={close} title={t("title")}>
      <div className="flex flex-col gap-3">
        <QuickAdd />

        {isPending ? null : tasks.length === 0 ? (
          <p className="py-6 text-center text-sm text-foreground-muted">{t("empty")}</p>
        ) : (
          <div className="flex flex-col">
            <ul className="flex flex-col">
              {today.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </ul>

            <TaskSection label={t("later")} tasks={later} />
            <TaskSection label={t("done")} tasks={done} />
          </div>
        )}
      </div>
    </AnchoredPanel>
  );
}
