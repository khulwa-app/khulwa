"use client";

import { useTranslations } from "next-intl";
import { usePanels, Panel } from "@/modules/panels";
import { canResetPomodoro, shouldResumePomodoro, usePomodoro } from "@/modules/pomodoro";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";

export type Command = {
  id: string;
  label: string;

  hint?: string;
  run: () => void;
};

export type CommandGroup = {
  id: string;
  heading: string;
  commands: Command[];
};

export function useCommands(): CommandGroup[] {
  const t = useTranslations("palette");
  const { phase, isRunning, hasStarted, start, pause, reset, skip } = usePomodoro();
  const changeSpace = useSpace((s) => s.changeSpace);
  const togglePanel = usePanels((s) => s.toggle);
  const sessionCommands: Command[] = [
    {
      id: "session-toggle",
      label: isRunning
        ? t("commands.pause")
        : shouldResumePomodoro(phase, hasStarted)
          ? t("commands.resume")
          : t("commands.begin"),
      hint: "Space",
      run: () => (isRunning ? pause() : start()),
    },
    { id: "session-skip", label: t("commands.skip"), run: skip },
  ];

  if (canResetPomodoro(phase)) {
    sessionCommands.splice(1, 0, { id: "session-reset", label: t("commands.reset"), run: reset });
  }

  return [
    {
      id: "session",
      heading: t("groups.session"),
      commands: sessionCommands,
    },
    {
      id: "navigate",
      heading: t("groups.navigate"),
      commands: [
        { id: "go-home", label: t("commands.home"), hint: "H", run: () => changeSpace(Space.Home) },
        { id: "go-focus", label: t("commands.focus"), hint: "F", run: () => changeSpace(Space.Focus) },
        { id: "go-ambient", label: t("commands.ambient"), hint: "A", run: () => changeSpace(Space.Ambient) },
      ],
    },
    {
      id: "panels",
      heading: t("groups.panels"),
      commands: [
        { id: "panel-tasks", label: t("commands.tasks"), hint: "T", run: () => togglePanel(Panel.Tasks) },
        { id: "panel-music", label: t("commands.music"), hint: "M", run: () => togglePanel(Panel.Music) },
        { id: "panel-notes", label: t("commands.notes"), hint: "N", run: () => togglePanel(Panel.Notes) },
        { id: "panel-settings", label: t("commands.settings"), run: () => togglePanel(Panel.Settings) },
      ],
    },
  ];
}
