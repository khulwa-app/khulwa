"use client";

import { House, Lightbulb, TreeDeciduous, ListTodo, Music, Pen, Settings, Expand, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import { Dock } from "@/theme/slot-recipes/dock";

export function DockNav() {
  const tDest = useTranslations("dock.destinations");
  const tTools = useTranslations("dock.tools");
  const tChrome = useTranslations("dock.chrome");
  const tAria = useTranslations("dock.aria");
  const activeSpace = useSpace((s) => s.activeSpace);
  const changeSpace = useSpace((s) => s.changeSpace);
  const openPanel = usePanels((s) => s.open);
  const togglePanel = usePanels((s) => s.toggle);

  const navItem = (space: Space, Icon: LucideIcon, label: string) => (
    <Dock.Item
      key={space}
      type="button"
      aria-label={label}
      title={label}
      aria-current={activeSpace === space ? "page" : undefined}
      onClick={() => changeSpace(space)}
    >
      <Icon size={16} />
    </Dock.Item>
  );

  // Togglers open floating panels (music / tasks / notepad / settings) —
  // not navigation. aria-pressed reflects the open state.
  const toggleItem = (panel: Panel, Icon: LucideIcon, label: string) => (
    <Dock.Item
      key={panel}
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={openPanel === panel}
      onClick={() => togglePanel(panel)}
    >
      <Icon size={16} />
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
        {toggleItem(Panel.Music, Music, tTools("music"))}
        {toggleItem(Panel.Notes, Pen, tTools("notes"))}
      </Dock.Root>

      <Dock.Root side="end" as="nav" aria-label={tAria("nav")}>
        {navItem(Space.Ambient, TreeDeciduous, tDest("ambient"))}
        {navItem(Space.Home, House, tDest("home"))}
        {navItem(Space.Focus, Lightbulb, tDest("focus"))}
        {toggleItem(Panel.Settings, Settings, tChrome("settings"))}
        <Dock.Item type="button" aria-label={tChrome("fullscreen")} title={tChrome("fullscreen")} onClick={toggleFullscreen}>
          <Expand size={16} />
        </Dock.Item>
      </Dock.Root>
    </>
  );
}
