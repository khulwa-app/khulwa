"use client";

import { Collapsible, VStack } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { Task, useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";
import { QuickAdd } from "./quick-add";
import { TaskList } from "./task-list";
import { TaskRow } from "./tasks-row";

// Folded section (Later / Done) — today's list stays unfolded: progressive
// disclosure keeps the panel showing only the current intention by default.
function FoldedSection({ label, tasks }: { label: string; tasks: Task[] }) {
  if (tasks.length === 0) return null;

  return (
    <Collapsible.Root>
      <Collapsible.Trigger asChild>
        <TaskList.SectionTrigger>
          <ChevronRight size={14} />
          {`${label} (${tasks.length})`}
        </TaskList.SectionTrigger>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <TaskList.SectionContent>
          {tasks.map((task, index) => (
            <TaskRow key={task.id} task={task} index={index} />
          ))}
        </TaskList.SectionContent>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function TasksPanel() {
  const t = useTranslations("tasks");
  const hydrated = useTasksHydrated();
  const open = usePanels((s) => s.open === Panel.Tasks);
  const close = usePanels((s) => s.close);
  const tasks = useTasksStore((s) => s.tasks);

  const today = tasks.filter((task) => !task.completed && task.today);
  const later = tasks.filter((task) => !task.completed && !task.today);
  const done = tasks.filter((task) => task.completed);

  return (
    <SidePanel open={open} onClose={close} title={t("title")}>
      <VStack h="full" w="full" gap="3" align="stretch">
        <QuickAdd />

        {hydrated && (
          <ScrollArea flex="1" minH="0" w="full">
            <TaskList.Root>
              {tasks.length === 0 ? (
                <TaskList.Empty>{t("empty")}</TaskList.Empty>
              ) : (
                <>
                  {today.map((task, index) => (
                    <TaskRow key={task.id} task={task} index={index} />
                  ))}

                  <FoldedSection label={t("later")} tasks={later} />
                  <FoldedSection label={t("done")} tasks={done} />
                </>
              )}
            </TaskList.Root>
          </ScrollArea>
        )}
      </VStack>
    </SidePanel>
  );
}
