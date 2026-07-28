"use client";

import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { useTasks } from "@/services/tasks";
import { QuickAdd } from "./quick-add";
import { TaskList } from "./task-list";
import { TaskRow } from "./tasks-row";
import { FoldedSection } from "./folded-section";

export function TasksPanel() {
  const t = useTranslations("tasks");
  const open = usePanels((s) => s.open === Panel.Tasks);
  const close = usePanels((s) => s.close);
  const { data: tasks = [], isPending } = useTasks();

  const hasTasks = !!tasks.length;
  const today = tasks.filter((task) => !task.completed && task.today);
  const later = tasks.filter((task) => !task.completed && !task.today);
  const done = tasks.filter((task) => task.completed);
  return (
    <SidePanel open={open} onClose={close} title={t("title")}>
      <div className="flex h-full w-full flex-col gap-3">
        <QuickAdd />

        {!isPending && (
          <ScrollArea className="min-h-0 w-full flex-1">
            <TaskList.Root>
              {hasTasks ? <>
                  {today.map((task, index) => (
                    <TaskRow key={task.id} task={task} index={index} />
                  ))}

                  <FoldedSection label={t("later")} tasks={later} />
                  <FoldedSection label={t("done")} tasks={done} />
                </> : <TaskList.Empty>{t("empty")}</TaskList.Empty>}
            </TaskList.Root>
          </ScrollArea>
        )}
      </div>
    </SidePanel>
  );
}
