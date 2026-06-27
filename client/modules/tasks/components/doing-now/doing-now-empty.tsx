"use client";

import { useState } from "react";
import { Button, Input, Presence } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActiveTask } from "@/theme/slot-recipes/active-task";
import { estimateEta } from "@/modules/ai";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { DEFAULT_ETA, useCreateTask, useUpdateTask } from "@/services/tasks";

export function DoingNowEmpty() {
  const t = useTranslations("home.doingNow");
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const changeSpace = useSpace((s) => s.changeSpace);
  const [draft, setDraft] = useState("");

  const begin = () => {
    const body = draft.trim();
    if (body) {
      setDraft("");
      createTask.mutate(
        { body },
        {
          onSuccess: (task) => {
            updateTask.mutate({ id: task.id, patch: { isDoingNow: true } });
            void estimateEta(body).then((eta) => {
              if (eta !== null && task.eta === DEFAULT_ETA) updateTask.mutate({ id: task.id, patch: { eta } });
            });
          },
        },
      );
    }
    changeSpace(Space.Focus);
  };

  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <ActiveTask.Empty>
        <ActiveTask.Bar>
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
        </ActiveTask.Bar>
        <ActiveTask.Hint>{t("beginHint")}</ActiveTask.Hint>
      </ActiveTask.Empty>
    </Presence>
  );
}
