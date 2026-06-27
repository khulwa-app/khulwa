"use client";

import { Show, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Collapsible, ScrollArea } from "@/components/ui";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { useTasks, type Task } from "@/services/tasks";
import { QuickAdd } from "./quick-add";
import { TaskList } from "./task-list";
import { TaskRow } from "./tasks-row";
import { ChevronRight } from "lucide-react";

function FoldedSection({ label, tasks }: { label: string; tasks: Task[] }) {
  if (!tasks.length) return null;
  return (
    <Collapsible
      trigger={
        <TaskList.SectionTrigger>
          <ChevronRight size={14} />
          {`${label} (${tasks.length})`}
        </TaskList.SectionTrigger>
      }
    >
      <TaskList.SectionContent>
        {tasks.map((task, index) => (
          <TaskRow key={task.id} task={task} index={index} />
        ))}
      </TaskList.SectionContent>
    </Collapsible>
  );
}

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
      <VStack h="full" w="full" gap="3" align="stretch">
        <QuickAdd />

        {!isPending && (
          <ScrollArea flex="1" minH="0" w="full">
            <TaskList.Root>
              <Show when={hasTasks} fallback={<TaskList.Empty>{t("empty")}</TaskList.Empty>}>
                <>
                  {today.map((task, index) => (
                    <TaskRow key={task.id} task={task} index={index} />
                  ))}

                  <FoldedSection label={t("later")} tasks={later} />
                  <FoldedSection label={t("done")} tasks={done} />
                </>
              </Show>
            </TaskList.Root>
          </ScrollArea>
        )}
      </VStack>
    </SidePanel>
  );
}
