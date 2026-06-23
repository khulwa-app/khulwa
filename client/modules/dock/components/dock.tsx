"use client";

import { Flame, House, Lightbulb, TreeDeciduous, ListTodo, Music, Pen, Settings, Expand, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import { Dock } from "@/theme/slot-recipes/dock";
import { TasksPanel } from "@/modules/tasks/components/tasks-panel";
import SoundsPanel from "@/modules/sounds/sounds-panel";
import { useSounds } from "@/modules/sounds";
import { BackgroundsPanel } from "@/modules/spaces/components/backgrounds-panel";

export function DockNav() {
  const tDest = useTranslations("dock.destinations");
  const tTools = useTranslations("dock.tools");
  const tChrome = useTranslations("dock.chrome");
  const tAria = useTranslations("dock.aria");
  const tBadge = useTranslations("components.badge");
  const activeSpace = useSpace((s) => s.activeSpace);
  const changeSpace = useSpace((s) => s.changeSpace);
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);
  const ambientPlaying = useSounds((s) => Object.values(s.playing).some(Boolean));

  const streakCount = 0;

  const navItem = (space: Space, Icon: LucideIcon, label: string) => (
    <Dock.GroupItem
      key={space}
      type="button"
      aria-label={label}
      title={label}
      aria-current={activeSpace === space ? "page" : undefined}
      onClick={() => changeSpace(space)}
    >
      <Dock.ItemIcon>
        <Icon />
      </Dock.ItemIcon>
    </Dock.GroupItem>
  );

  const toggleItem = (panel: Panel, Icon: LucideIcon, label: string, playing?: boolean) => (
    <Dock.Item
      key={panel}
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={openPanel === panel}
      data-playing={playing || undefined}
      onClick={() => togglePanel(panel)}
    >
      <Dock.ItemIcon>
        <Icon />
      </Dock.ItemIcon>
    </Dock.Item>
  );

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };

  return (
    <>
      <Dock.Root side="start" role="toolbar" aria-label={tAria("tools")}>
        {toggleItem(Panel.Tasks, ListTodo, tTools("tasks"))}
        {toggleItem(Panel.Music, Music, tTools("music"), ambientPlaying)}
        {toggleItem(Panel.Notes, Pen, tTools("notes"))}
      </Dock.Root>

      <TasksPanel />
      <SoundsPanel />
      <BackgroundsPanel />

      <Dock.Root side="end" role="toolbar" aria-label={tAria("controls")}>
        <Dock.Streak title={tBadge("streak", { count: streakCount })} aria-label={tBadge("streak", { count: streakCount })}>
          <Flame aria-hidden />
          <span>{streakCount}</span>
        </Dock.Streak>

        <Dock.Group as="nav" aria-label={tAria("nav")}>
          {navItem(Space.Ambient, TreeDeciduous, tDest("ambient"))}
          {navItem(Space.Home, House, tDest("home"))}
          {navItem(Space.Focus, Lightbulb, tDest("focus"))}
        </Dock.Group>

        {toggleItem(Panel.Settings, Settings, tChrome("settings"))}
        <Dock.Item
          type="button"
          aria-label={tChrome("fullscreen")}
          title={tChrome("fullscreen")}
          onClick={toggleFullscreen}
        >
          <Dock.ItemIcon>
            <Expand />
          </Dock.ItemIcon>
        </Dock.Item>
      </Dock.Root>
    </>
  );
}
