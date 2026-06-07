"use client";

import { Button, HStack, Icon, Presence, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

interface UpNextCardProps {
  taskTitle: string;
  focusMin: number;
  breakMin: number;
  onStart?: () => void;
  onChange?: () => void;
}

export function UpNextCard({ taskTitle, focusMin, breakMin, onStart, onChange }: UpNextCardProps) {
  const t = useTranslations("home.upNext");

  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <HStack w="full" maxW="xl" gap="4" align="center" bg="bg.elevated" rounded="xl" boxShadow="sm" paddingInline="5" paddingBlock="3">
        <VStack align="start" gap="0.5" flex="1" minW="0">
          <Text textStyle="label-md" color="primary.default">
            {`${t("eyebrow")} · ${t("duration", { focus: focusMin, break: breakMin })}`}
          </Text>
          <Text textStyle="heading-h5" color="fg.default" lineClamp={1} title={taskTitle}>
            {taskTitle}
          </Text>
        </VStack>

        <HStack gap="1" flexShrink="0">
          <Button visual="ghost" size="sm" shape="pill" onClick={onChange}>
            {t("changeTask")}
          </Button>
          <Button visual="ink" size="md" shape="pill" onClick={onStart}>
            {t("startFocus")}
            <Icon as={ArrowRight} boxSize="4" />
          </Button>
        </HStack>
      </HStack>
    </Presence>
  );
}
