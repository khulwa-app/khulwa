"use client";

import { usePanels, Panel } from "@/modules/panels";
import { usePomodoroStore } from "@/modules/pomodoro";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { useHotkey } from "../use-hotkey.hook";

export function GlobalShortcuts() {
  const activeSpace = useSpace((s) => s.activeSpace);
  const changeSpace = useSpace((s) => s.changeSpace);
  const togglePanel = usePanels((s) => s.toggle);
  const isRunning = usePomodoroStore((s) => s.isRunning);
  const start = usePomodoroStore((s) => s.start);
  const pause = usePomodoroStore((s) => s.pause);

  useHotkey("h", () => changeSpace(Space.Home));
  useHotkey("f", () => changeSpace(Space.Focus));
  useHotkey("a", () => changeSpace(Space.Ambient));

  useHotkey("t", () => togglePanel(Panel.Tasks));
  useHotkey("m", () => togglePanel(Panel.Music));
  useHotkey("n", () => togglePanel(Panel.Notes));

  useHotkey("space", () => (isRunning ? pause() : start()), { enabled: activeSpace === Space.Focus });

  return null;
}
