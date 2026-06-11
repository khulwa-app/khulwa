"use client";

import { Box, Collapsible, Text, VStack } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";
import { QuickAdd } from "./quick-add";
import { TaskRow } from "./tasks-row";

export function TasksPanel() {
  const t = useTranslations("tasks");
  const hydrated = useTasksHydrated();
  const open = usePanels((s) => s.open === Panel.Tasks);
  const close = usePanels((s) => s.close);
  const tasks = useTasksStore((s) => s.tasks);

  const active = tasks.filter((task) => !task.completed);
  const done = tasks.filter((task) => task.completed);

  return (
    <SidePanel open={open} onClose={close} title={t("title")}>
      <VStack h="full" w="full" gap="3" align="stretch">
        <QuickAdd />

        {hydrated && (
          <ScrollArea flex="1" minH="0" w="full">
            {active.length === 0 && done.length === 0 ? (
              <Text textStyle="sm" color="fg.muted" textAlign="center" paddingBlock="8">
                {t("empty")}
              </Text>
            ) : (
              <VStack gap="1" align="stretch">
                {active.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}

                {done.length > 0 && (
                  <Collapsible.Root>
                    <Collapsible.Trigger asChild>
                      <Box
                        as="button"
                        display="flex"
                        alignItems="center"
                        gap="1"
                        w="full"
                        marginTop="2"
                        paddingInline="2"
                        paddingBlock="1"
                        cursor="pointer"
                        color="fg.muted"
                        textStyle="label-md"
                        css={{ "&[data-state=open] svg": { transform: "rotate(90deg)" } }}
                      >
                        <ChevronRight size={14} style={{ transition: "transform 0.15s ease" }} />
                        {`${t("done")} (${done.length})`}
                      </Box>
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                      <VStack gap="1" align="stretch" paddingTop="1">
                        {done.map((task) => (
                          <TaskRow key={task.id} task={task} />
                        ))}
                      </VStack>
                    </Collapsible.Content>
                  </Collapsible.Root>
                )}
              </VStack>
            )}
          </ScrollArea>
        )}
      </VStack>
    </SidePanel>
  );
}
