"use client";

import { Button, HStack, Presence, Text, VStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import { useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";

// Same translucent material as the dock — the card belongs to the chrome
// family floating over the photo, not a second opaque surface.
const glass = {
  bg: "bg.elevated/55",
  backdropFilter: "blur(8px)",
  boxShadow: "sm",
  rounded: "2xl",
} as const;

export function DoingNowCard() {
  const t = useTranslations("home.doingNow");
  const hydrated = useTasksHydrated();
  const tasks = useTasksStore((s) => s.tasks);
  const changeSpace = useSpace((s) => s.changeSpace);
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);

  const currentTask = tasks.find((task) => task.isDoingNow);
  const openTasksPanel = () => {
    if (openPanel !== Panel.Tasks) togglePanel(Panel.Tasks);
  };

  // Tasks rehydrate from localStorage after mount; rendering only afterwards
  // avoids flashing the empty prompt before the real task arrives.
  if (!hydrated) return null;

  if (!currentTask) {
    return (
      <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
        <Button visual="ghost" size="md" shape="pill" {...glass} paddingInline="5" onClick={openTasksPanel}>
          {t("choose")}
          <ArrowRight size={16} />
        </Button>
      </Presence>
    );
  }

  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <VStack w="full" maxW="md" align="stretch" gap="4" {...glass} paddingInline="6" paddingBlock="5">
        <VStack align="start" gap="1" minW="0">
          <Text textStyle="label-md" color="primary.default">
            {`${t("eyebrow")} · ${t("eta", { eta: currentTask.eta })}`}
          </Text>
          <Text aria-live="polite" textStyle="heading-h5" color="fg.default" lineClamp={1} title={currentTask.body}>
            {currentTask.body}
          </Text>
        </VStack>

        <HStack gap="2">
          <Button visual="solid" size="md" shape="pill" onClick={() => changeSpace(Space.Focus)}>
            {t("enterFocus")}
            <ArrowRight size={16} />
          </Button>
          <Button visual="ghost" size="md" shape="pill" onClick={openTasksPanel}>
            {t("changeTask")}
          </Button>
        </HStack>
      </VStack>
    </Presence>
  );
}
