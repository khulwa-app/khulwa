"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/theme/slot-recipes/card";
import { formatPomodoro } from "@/modules/clock";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePomodoro } from "../hooks/use-pomodoro.hook";
import { usePomodoroHydrated } from "../hooks/use-pomodoro-hydrated.hook";

export function ResumeSessionCard() {
  const t = useTranslations("khulwa");
  const hydrated = usePomodoroHydrated();
  const { minutes, seconds, phase, hasStarted } = usePomodoro();
  const changeSpace = useSpace((s) => s.changeSpace);

  if (!hydrated || !hasStarted) return null;

  return (
    <Card.Root layerStyle="card-anchor" rounded="surface">
      <Card.Header>
        <Card.Title>{t("resume.title")}</Card.Title>
      </Card.Header>
      <Card.Body>
        <HStack justify="space-between" align="center" gap="4">
          <HStack gap="3" minW="0">
            <Box
              boxSize="10"
              rounded="full"
              bg="primary.subtle"
              color="primary.default"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              flexShrink="0"
              aria-hidden
            >
              <Play size={16} fill="currentColor" />
            </Box>
            <VStack align="start" gap="0" minW="0">
              <Text textStyle="label-md" color="fg.muted">
                {t(`eyebrow.${phase}`)}
              </Text>
              <Text textStyle="numeric-sm" color="fg.default" suppressHydrationWarning>
                {formatPomodoro(minutes, seconds)}
              </Text>
            </VStack>
          </HStack>

          <Button visual="solid" size="sm" flexShrink="0" onClick={() => changeSpace(Space.Focus)}>
            {t("actions.resume")}
          </Button>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
