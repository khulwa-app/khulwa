"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { usePanels, Panel } from "@/modules/panels";
import { useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";

// Quiet caption for the Focus space: whispers which task the session is for.
// The line is always rendered (reserved height) so the timer and controls
// never shift when the task appears, changes, or is cleared — and there is
// deliberately no continuous motion: a single fade when the task changes.
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
          // Remounting on task change re-runs the fade — the swap reads as a
          // soft crossfade instead of text snapping.
          key={currentTask.id}
          as="button"
          textStyle="sm"
          color="fg.subtle"
          maxW="md"
          lineClamp={1}
          cursor="pointer"
          title={currentTask.body}
          aria-label={t("changeTask")}
          transitionProperty="color"
          transitionDuration="fast"
          _hover={{ color: "fg.muted" }}
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
