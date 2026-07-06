"use client";

import { Button, IconButton, Presence } from "@chakra-ui/react";
import { ArrowRight, Repeat } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { ActiveTask } from "@/theme/slot-recipes/active-task";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import type { Task } from "@/services/tasks";

export function DoingNowActive({ task }: { task: Task }) {
  const t = useTranslations("home.doingNow");
  const changeSpace = useSpace((s) => s.changeSpace);
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);

  const openTasksPanel = () => {
    if (openPanel !== Panel.Tasks) togglePanel(Panel.Tasks);
  };

  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <ActiveTask.Root>
        <ActiveTask.Dot aria-hidden />
        <ActiveTask.Task aria-live="polite" title={task.body}>
          {task.body}
        </ActiveTask.Task>
        <ActiveTask.Eta>{t("etaShort", { eta: task.eta })}</ActiveTask.Eta>
        <Button variant="solid" size="sm" flexShrink="0" onClick={() => changeSpace(Space.Focus)}>
          {t("enterFocus")}
          <Icon icon={ArrowRight} boxSize="3.5" />
        </Button>
        <IconButton
          variant="subtle"
          size="sm"
          flexShrink="0"
          aria-label={t("changeTask")}
          onClick={openTasksPanel}
        >
          <Icon icon={Repeat} />
        </IconButton>
      </ActiveTask.Root>
    </Presence>
  );
}
