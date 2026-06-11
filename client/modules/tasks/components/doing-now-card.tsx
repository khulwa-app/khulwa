"use client";

import { Button, HStack, Presence, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useTasksStore } from "../hooks/use-tasks-store.hook";

interface DoingNowCardProps {
  onChange?: () => void;
}

export function DoingNowCard({ onChange }: DoingNowCardProps) {
  const t = useTranslations("home.doingNow");
  const { tasks } = useTasksStore();
  const currentTask = tasks.find((task) => task.isDoingNow);

  if (!currentTask) return null;

  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <HStack w="full" maxW="xl" gap="4" align="center" bg="bg.elevated" rounded="xl" boxShadow="sm" paddingInline="5" paddingBlock="3">
        <VStack align="start" gap="0.5" flex="1" minW="0">
          <Text textStyle="label-md" color="primary.default">
            {`${t("eyebrow")} · ${t("eta", { eta: currentTask.eta })}`}
          </Text>
          <Text textStyle="heading-h5" color="fg.default" lineClamp={1} title={currentTask.body}>
            {currentTask.body}
          </Text>
        </VStack>

        <HStack gap="1" flexShrink="0">
          <Button visual="solid" size="sm" shape="pill" onClick={onChange}>
            {t("changeTask")}
          </Button>
        </HStack>
      </HStack>
    </Presence>
  );
}
