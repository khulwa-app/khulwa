"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { usePanels, Panel } from "@/modules/panels";
import { useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";

export function DoingNowCaption() {
  const t = useTranslations("home.doingNow");
  const hydrated = useTasksHydrated();
  const tasks = useTasksStore((s) => s.tasks);
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);

  const currentTask = tasks.find((task) => task.isDoingNow);

  return (
    <Box minH="6" display="flex" alignItems="center" justifyContent="center" aria-live="polite">
      {hydrated && currentTask && (
        <Text
          key={currentTask.id}
          as="button"
          textStyle="sm"
          color="fg.onMeshMuted"
          maxW="md"
          lineClamp={1}
          cursor="pointer"
          title={currentTask.body}
          aria-label={t("changeTask")}
          transitionProperty="color"
          transitionDuration="fast"
          _hover={{ color: "fg.onMesh" }}
          animationName="fade-in"
          animationDuration="moderate"
          animationTimingFunction="ease-out"
          _motionReduce={{ animationName: "none" }}
          onClick={() => {
            if (openPanel !== Panel.Tasks) togglePanel(Panel.Tasks);
          }}
        >
          {currentTask.body}
        </Text>
      )}
    </Box>
  );
}
