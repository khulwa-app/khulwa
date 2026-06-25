"use client";

import { usePanels, Panel } from "@/modules/panels";
import { usePomodoroStore } from "@/modules/pomodoro";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { useHotkey } from "../use-hotkey.hook";

/**
 * App-wide keyboard navigation (Phase 2 foundation). Mounted once in the
 * dashboard layout. Single-letter keys are intentional for a focus app — they
 * never fire while a text field is focused (see useHotkey). The ⌘K command
 * palette is mounted separately (modules/command-palette).
 */
export function GlobalShortcuts() {
  const activeSpace = useSpace((s) => s.activeSpace);
  const changeSpace = useSpace((s) => s.changeSpace);
  const togglePanel = usePanels((s) => s.toggle);
  const isRunning = usePomodoroStore((s) => s.isRunning);
  const start = usePomodoroStore((s) => s.start);
  const pause = usePomodoroStore((s) => s.pause);

  // Spaces
  useHotkey("h", () => changeSpace(Space.Home));
  useHotkey("f", () => changeSpace(Space.Focus));
  useHotkey("a", () => changeSpace(Space.Ambient));

  // Panels
  useHotkey("t", () => togglePanel(Panel.Tasks));
  useHotkey("m", () => togglePanel(Panel.Music));
  useHotkey("n", () => togglePanel(Panel.Notes));

  // Session — Space toggles the timer, but only in Focus space so it never
  // hijacks the spacebar elsewhere.
  useHotkey("space", () => (isRunning ? pause() : start()), { enabled: activeSpace === Space.Focus });

  return null;
}
