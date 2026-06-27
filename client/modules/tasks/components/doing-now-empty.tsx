"use client";

import { useState } from "react";
import { Button, Input, Presence, VStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActiveTask } from "@/theme/slot-recipes/active-task";
import { estimateEta } from "@/modules/ai";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { DEFAULT_ETA, useTasksStore } from "../hooks/use-tasks-store.hook";

export function DoingNowEmpty() {
  const t = useTranslations("home.doingNow");
  const quickStart = useTasksStore((s) => s.quickStart);
  const changeSpace = useSpace((s) => s.changeSpace);
  const [draft, setDraft] = useState("");

  const begin = () => {
    const body = draft.trim();
    if (body) {
      const id = quickStart(body);
      setDraft("");
      void estimateEta(body).then((eta) => {
        if (eta === null) return;
        const { tasks, updateTask } = useTasksStore.getState();
        const task = tasks.find((candidate) => candidate.id === id);
        if (task && task.eta === DEFAULT_ETA) updateTask(id, { eta });
      });
    }
    changeSpace(Space.Focus);
  };

  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <VStack w="full" maxW="sm" gap="3">
        <ActiveTask.Empty>
          <ActiveTask.Mark aria-hidden />
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
          <Button variant="primary" size="sm" flexShrink="0" onClick={begin}>
            {t("enterFocus")}
            <ArrowRight size={14} />
          </Button>
        </ActiveTask.Empty>
        <ActiveTask.Hint>{t("beginHint")}</ActiveTask.Hint>
      </VStack>
    </Presence>
  );
}
