"use client";

import { Button, VStack } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui";
import { useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";
import { TaskRow } from "./tasks-row";

function TasksForm() {
  const t = useTranslations("tasks");
  const hydrated = useTasksHydrated();
  const { tasks, addTask } = useTasksStore();
  const lastTask = tasks[tasks.length - 1];

  if (!hydrated) return null;

  return (
    <VStack h="full" w="full" gap="0" align="stretch">
      <ScrollArea flex="1" minH="0" maxH="64" w="full">
        <VStack gap={2} align="stretch">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} autoFocus={task.id === lastTask?.id && task.body === ""} />
          ))}
        </VStack>
      </ScrollArea>
      <Button mt={4} flexShrink="0" size="sm" w="full" visual={"solid"} onClick={addTask}>
        <Plus />
        {t("addTask")}
      </Button>
    </VStack>
  );
}

export default TasksForm;
