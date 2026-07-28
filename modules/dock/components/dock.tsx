"use client";

import { Calendar, ChecklistMinimalistic, FullScreen, HomeSmile, Moon, PenNewSquare, Settings, Soundwave, Target } from "@solar-icons/react";
import { useTranslations } from "next-intl";
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
import { cn } from "@/lib/cn";
import type { Glyph } from "@/components/ui/icon";

function DockButton({ icon: Glyph, label, active, playing, onClick }: { icon: Glyph; label: string; active?: boolean; playing?: boolean; onClick: () => void }) {
  return <button aria-current={active ? "page" : undefined} aria-label={label} aria-pressed={active} className={cn("relative grid size-11 place-items-center rounded-control border transition-colors duration-200 motion-reduce:transition-none", active ? "border-sage-800 bg-sage-800 text-sage-100" : "border-sage-300 bg-base-100 text-sage-800 hover:border-sage-500 hover:bg-sage-100")} onClick={onClick} title={label} type="button"><Glyph className="size-5" weight={active ? "Bold" : "Linear"} />{playing ? <span className="absolute right-2 top-2 size-1.5 rounded-full bg-sage-600" /> : null}</button>;
}

export function DockNav() {
  const tDest = useTranslations("dock.destinations"); const tTools = useTranslations("dock.tools"); const tChrome = useTranslations("dock.chrome"); const tAria = useTranslations("dock.aria");
  const active = useSpace((state) => state.activeSpace); const changeSpace = useSpace((state) => state.changeSpace); const open = usePanels((state) => state.open); const toggle = usePanels((state) => state.toggle); const playing = useSounds((state) => Object.values(state.playing).some(Boolean));
  const fullscreen = () => { if (document.fullscreenElement) void document.exitFullscreen(); else void document.documentElement.requestFullscreen?.(); };
  const tools = [[Panel.Tasks, ChecklistMinimalistic, tTools("tasks")], [Panel.Notes, PenNewSquare, tTools("notes")], [Panel.Music, Soundwave, tTools("music")], [Panel.Rhythm, Calendar, tTools("rhythm")]] as const;
  const spaces = [[Space.Ambient, Moon, tDest("ambient")], [Space.Home, HomeSmile, tDest("home")], [Space.Focus, Target, tDest("focus")]] as const;
  return <><div aria-label={tAria("tools")} className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-4 z-20 flex gap-2 sm:left-6 lg:left-10" role="toolbar">{tools.map(([panel, icon, label]) => <DockButton active={open === panel} icon={icon} key={panel} label={label} onClick={() => toggle(panel)} playing={panel === Panel.Music && playing} />)}</div><div aria-label={tAria("controls")} className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-20 flex gap-2 sm:right-6 lg:right-10" role="toolbar"><nav className="flex gap-2" aria-label={tAria("nav")}>{spaces.map(([space, icon, label]) => <DockButton active={active === space} icon={icon} key={space} label={label} onClick={() => changeSpace(space)} />)}</nav><span className="mx-1 hidden h-8 self-center border-l border-sage-300 sm:block" /><DockButton active={open === Panel.Settings} icon={Settings} label={tChrome("settings")} onClick={() => toggle(Panel.Settings)} /><DockButton icon={FullScreen} label={tChrome("fullscreen")} onClick={fullscreen} /></div><TasksPanel /><NotesPanel /><RhythmPanel /><ProgressPanel /><SoundsPanel /><SettingsPanel /></>;
}
