"use client";

import {
  Calendar,
  ChecklistMinimalistic,
  FullScreen,
  HomeSmile,
  Moon,
  PenNewSquare,
  Settings,
  Soundwave,
  Target,
} from "@solar-icons/react";
import { Icon, type Glyph } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import { Dock } from "@/theme/slot-recipes/dock";
import { TasksPanel } from "@/modules/tasks/components/tasks-panel";
import SoundsPanel from "@/modules/sounds/sounds-panel";
import { useSounds } from "@/modules/sounds";
import { RhythmPanel } from "@/modules/rhythm";
import { ProgressPanel } from "@/modules/progress";
import { SettingsPanel } from "@/modules/settings";
import { NotesPanel } from "@/modules/notes";

export function DockNav() {
  const tDest = useTranslations("dock.destinations");
  const tTools = useTranslations("dock.tools");
  const tChrome = useTranslations("dock.chrome");
  const tAria = useTranslations("dock.aria");
  const activeSpace = useSpace((s) => s.activeSpace);
  const changeSpace = useSpace((s) => s.changeSpace);
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);
  const ambientPlaying = useSounds((s) => Object.values(s.playing).some(Boolean));

  const navItem = (space: Space, icon: Glyph, label: string) => {
    const isActive = activeSpace === space;
    return (
      <Dock.Item
        key={space}
        type="button"
        aria-label={label}
        title={label}
        aria-current={isActive ? "page" : undefined}
        onClick={() => changeSpace(space)}
      >
        <Dock.ItemIcon>
          <Icon icon={icon} weight={isActive ? "Bold" : "Linear"} />
        </Dock.ItemIcon>
      </Dock.Item>
    );
  };

  const toggleItem = (panel: Panel, icon: Glyph, label: string, playing?: boolean) => {
    const isActive = openPanel === panel;
    return (
      <Dock.Item
        key={panel}
        type="button"
        aria-label={label}
        title={label}
        aria-pressed={isActive}
        data-playing={playing || undefined}
        onClick={() => togglePanel(panel)}
      >
        <Dock.ItemIcon>
          <Icon icon={icon} weight={isActive ? "Bold" : "Linear"} />
        </Dock.ItemIcon>
      </Dock.Item>
    );
  };

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };

  return (
    <>
      <Dock.Root side="start" role="toolbar" aria-label={tAria("tools")}>
        {toggleItem(Panel.Tasks, ChecklistMinimalistic, tTools("tasks"))}
        {toggleItem(Panel.Notes, PenNewSquare, tTools("notes"))}
        {toggleItem(Panel.Music, Soundwave, tTools("music"), ambientPlaying)}
        {toggleItem(Panel.Rhythm, Calendar, tTools("rhythm"))}
      </Dock.Root>

      <TasksPanel />
      <NotesPanel />
      <RhythmPanel />
      <ProgressPanel />
      <SoundsPanel />
      <SettingsPanel />

      <Dock.Root side="end" role="toolbar" aria-label={tAria("controls")}>
        <Dock.Group as="nav" aria-label={tAria("nav")}>
          {navItem(Space.Ambient, Moon, tDest("ambient"))}
          {navItem(Space.Home, HomeSmile, tDest("home"))}
          {navItem(Space.Focus, Target, tDest("focus"))}
        </Dock.Group>

        <Dock.Separator role="separator" aria-orientation="vertical" />

        {toggleItem(Panel.Settings, Settings, tChrome("settings"))}
        <Dock.Item
          type="button"
          aria-label={tChrome("fullscreen")}
          title={tChrome("fullscreen")}
          onClick={toggleFullscreen}
        >
          <Dock.ItemIcon>
            <Icon icon={FullScreen} />
          </Dock.ItemIcon>
        </Dock.Item>
      </Dock.Root>
    </>
  );
}
