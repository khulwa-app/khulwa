"use client";

import { useState } from "react";
import { Box, Button, HStack, Input, Presence, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, Repeat } from "lucide-react";
import { useTranslations } from "next-intl";
import { estimateEta } from "@/modules/ai";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import { DEFAULT_ETA, useTasksStore } from "../hooks/use-tasks-store.hook";
import { useTasksHydrated } from "../hooks/use-tasks-hydrated.hook";

export function DoingNowCard() {
  const t = useTranslations("home.doingNow");
  const hydrated = useTasksHydrated();
  const tasks = useTasksStore((s) => s.tasks);
  const quickStart = useTasksStore((s) => s.quickStart);
  const changeSpace = useSpace((s) => s.changeSpace);
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);
  const [draft, setDraft] = useState("");

  const currentTask = tasks.find((task) => task.isDoingNow);
  const openTasksPanel = () => {
    if (openPanel !== Panel.Tasks) togglePanel(Panel.Tasks);
  };

  // Enter Focus is always one action: with an intention typed, capture it as the
  // doing-now task first (AI eta fills in later, same contract as quick-add);
  // empty is fine too — you just step into Focus.
  const begin = () => {
    const body = draft.trim();
    if (body) {
      const id = quickStart(body);
      setDraft("");
      void estimateEta(body).then((eta) => {
        if (eta === null) return;
        const { tasks: latest, updateTask } = useTasksStore.getState();
        const task = latest.find((candidate) => candidate.id === id);
        if (task && task.eta === DEFAULT_ETA) updateTask(id, { eta });
      });
    }
    changeSpace(Space.Focus);
  };

  if (!hydrated) return null;

  // Empty — a single unified bar: leading mark, intention input, attached action.
  if (!currentTask) {
    return (
      <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
        <VStack w="full" maxW="sm" gap="3">
          <HStack
            w="full"
            layerStyle="raised"
            rounded="controlWide"
            gap="3"
            paddingInlineStart="4"
            paddingInlineEnd="1.5"
            paddingBlock="1.5"
            transitionProperty="border-color"
            transitionDuration="enter"
            transitionTimingFunction="enter"
            _focusWithin={{ borderColor: "border.focus" }}
          >
            <Box
              boxSize="2"
              rounded="full"
              borderWidth="1.5px"
              borderColor="fg.subtle"
              flexShrink="0"
              aria-hidden
            />
            <Input
              variant="bare"
              flex="1"
              minW="0"
              height="9"
              value={draft}
              placeholder={t("intentionPlaceholder")}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") begin();
              }}
            />
            <Button visual="solid" size="sm" flexShrink="0" onClick={begin}>
              {t("enterFocus")}
              <ArrowRight size={14} />
            </Button>
          </HStack>
          <Text textStyle="overline" color="fg.faint">
            {t("beginHint")}
          </Text>
        </VStack>
      </Presence>
    );
  }

  // Doing now — recedes to one quiet resume line so the greeting stays the hero.
  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <HStack gap="2.5" maxW="lg" paddingInline="2" align="center">
        <Box boxSize="1.5" rounded="full" bg="primary.default" flexShrink="0" aria-hidden />
        <Text
          aria-live="polite"
          textStyle="body-sm"
          color="fg.muted"
          lineClamp={1}
          minW="0"
          title={currentTask.body}
        >
          {currentTask.body}
        </Text>
        <Text textStyle="overline" color="fg.faint" flexShrink="0" whiteSpace="nowrap">
          {t("etaShort", { eta: currentTask.eta })}
        </Text>
        <Button visual="solid" size="sm" flexShrink="0" onClick={() => changeSpace(Space.Focus)}>
          {t("enterFocus")}
          <ArrowRight size={14} />
        </Button>
        <Button
          visual="ghost"
          size="sm"
          flexShrink="0"
          paddingInline="2"
          aria-label={t("changeTask")}
          onClick={openTasksPanel}
        >
          <Repeat size={15} />
        </Button>
      </HStack>
    </Presence>
  );
}
