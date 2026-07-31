"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AudioLines,
  CalendarDays,
  Ellipsis,
  House,
  Maximize,
  Minimize,
  Moon,
  NotebookPen,
  ListChecks,
  Settings,
  Target,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePanels, Panel } from "@/modules/panels";
import { TasksPanel } from "@/modules/tasks/components/tasks-panel";
import SoundsPanel from "@/modules/sounds/sounds-panel";
import { useSounds } from "@/modules/sounds";
import { RhythmPanel } from "@/modules/rhythm";
import { ProgressPanel } from "@/modules/progress";
import { SettingsPanel } from "@/modules/settings";
import { NotesPanel } from "@/modules/notes";
import { DockButton } from "./dock-button";
import { DockCapsule } from "./dock-capsule";

/** Tooltips wait long enough that sweeping across the dock stays quiet — plan section 6.1. */
const TOOLTIP_DELAY_MS = 450;

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    sync();
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }, []);

  return { isFullscreen, toggle };
}

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
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();

  const spaceProps = (space: Space, label: string) => ({
    label,
    active: activeSpace === space,
    "aria-current": (activeSpace === space ? "page" : undefined) as "page" | undefined,
    onClick: () => changeSpace(space),
  });

  const panelProps = (panel: Panel, label: string) => ({
    label,
    active: openPanel === panel,
    "aria-expanded": openPanel === panel,
    onClick: () => togglePanel(panel),
  });

  const fullscreenLabel = tChrome(isFullscreen ? "exitFullscreen" : "fullscreen");

  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <TasksPanel />
      <NotesPanel />
      <RhythmPanel />
      <ProgressPanel />
      <SoundsPanel />
      <SettingsPanel />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 hidden justify-between px-6 pb-6 md:flex lg:px-8">
        <DockCapsule role="toolbar" aria-label={tAria("tools")}>
          <DockButton icon={ListChecks} {...panelProps(Panel.Tasks, tTools("tasks"))} />
          <DockButton icon={NotebookPen} {...panelProps(Panel.Notes, tTools("notes"))} />
          <DockButton icon={AudioLines} indicator={ambientPlaying} {...panelProps(Panel.Music, tTools("music"))} />
          <DockButton icon={CalendarDays} {...panelProps(Panel.Rhythm, tTools("rhythm"))} />
        </DockCapsule>

        <div className="flex items-center gap-2">
          <DockCapsule role="navigation" aria-label={tAria("nav")}>
            <DockButton icon={Moon} {...spaceProps(Space.Ambient, tDest("ambient"))} />
            <DockButton icon={House} {...spaceProps(Space.Home, tDest("home"))} />
            <DockButton icon={Target} {...spaceProps(Space.Focus, tDest("focus"))} />
          </DockCapsule>

          <DockCapsule role="toolbar" aria-label={tAria("controls")}>
            <DockButton icon={Settings} {...panelProps(Panel.Settings, tChrome("settings"))} />
            <DockButton
              icon={isFullscreen ? Minimize : Maximize}
              label={fullscreenLabel}
              onClick={toggleFullscreen}
            />
          </DockCapsule>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.875rem)] z-30 flex justify-center px-3 md:hidden">
        <DockCapsule role="toolbar" aria-label={tAria("controls")}>
          <DockButton icon={ListChecks} {...panelProps(Panel.Tasks, tTools("tasks"))} />
          <DockButton icon={AudioLines} indicator={ambientPlaying} {...panelProps(Panel.Music, tTools("music"))} />
          <DockButton icon={Moon} {...spaceProps(Space.Ambient, tDest("ambient"))} />
          <DockButton icon={House} {...spaceProps(Space.Home, tDest("home"))} />
          <DockButton icon={Target} {...spaceProps(Space.Focus, tDest("focus"))} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={tChrome("more")}
                className="relative flex size-9 shrink-0 items-center justify-center rounded-full text-foreground-secondary transition-colors after:absolute after:-inset-1 after:content-[''] hover:bg-surface-elevated hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[state=open]:bg-surface-elevated data-[state=open]:text-foreground"
              >
                <Ellipsis className="size-[18px]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="min-w-44">
              <DropdownMenuItem onSelect={() => togglePanel(Panel.Notes)}>
                <NotebookPen />
                {tTools("notes")}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => togglePanel(Panel.Rhythm)}>
                <CalendarDays />
                {tTools("rhythm")}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => togglePanel(Panel.Settings)}>
                <Settings />
                {tChrome("settings")}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={toggleFullscreen}>
                {isFullscreen ? <Minimize /> : <Maximize />}
                {fullscreenLabel}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DockCapsule>
      </div>
    </TooltipProvider>
  );
}
