"use client";

import { Button, HStack, Presence, Text, VStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import { useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";

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

  if (!hydrated) return null;

  if (!currentTask) {
    return (
      <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
        <Button
          visual="ghost"
          size="md"
          shape="pill"
          layerStyle="raised"
          rounded="lg"
          paddingInline="5"
          onClick={openTasksPanel}
        >
          {t("choose")}
          <ArrowRight size={16} />
        </Button>
      </Presence>
    );
  }

  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <VStack
        w="full"
        maxW="md"
        align="stretch"
        gap="4"
        layerStyle="raised"
        rounded="lg"
        paddingInline="6"
        paddingBlock="5"
      >
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
