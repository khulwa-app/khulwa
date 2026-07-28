"use client";

import { Calendar, ChecklistMinimalistic, FullScreen, HomeSmile, Moon, PenNewSquare, Settings, Soundwave, Target, WidgetAdd } from "@solar-icons/react";
import { useState } from "react";
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
import { Drawer } from "@/components/ui/primitives";

function DockButton({ icon: Glyph, label, active, playing, onClick }: { icon: Glyph; label: string; active?: boolean; playing?: boolean; onClick: () => void }) {
  return <button aria-current={active ? "page" : undefined} aria-label={label} aria-pressed={active} className={cn("relative grid size-11 place-items-center rounded-control border transition-colors duration-200 motion-reduce:transition-none", active ? "border-sage-800 bg-sage-800 text-sage-100" : "border-sage-300 bg-base-100 text-sage-800 hover:border-sage-500 hover:bg-sage-100")} onClick={onClick} title={label} type="button"><Glyph className="size-5" weight={active ? "Bold" : "Linear"} />{playing ? <span className="absolute right-2 top-2 size-1.5 rounded-full bg-sage-600" /> : null}</button>;
}

export function DockNav() {
  const tDest = useTranslations("dock.destinations"); const tTools = useTranslations("dock.tools"); const tChrome = useTranslations("dock.chrome"); const tAria = useTranslations("dock.aria");
  const active = useSpace((state) => state.activeSpace); const changeSpace = useSpace((state) => state.changeSpace); const open = usePanels((state) => state.open); const toggle = usePanels((state) => state.toggle); const playing = useSounds((state) => Object.values(state.playing).some(Boolean));
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const fullscreen = () => { if (document.fullscreenElement) void document.exitFullscreen(); else void document.documentElement.requestFullscreen?.(); };
  const tools = [[Panel.Tasks, ChecklistMinimalistic, tTools("tasks")], [Panel.Notes, PenNewSquare, tTools("notes")], [Panel.Music, Soundwave, tTools("music")], [Panel.Rhythm, Calendar, tTools("rhythm")]] as const;
  const spaces = [[Space.Ambient, Moon, tDest("ambient")], [Space.Home, HomeSmile, tDest("home")], [Space.Focus, Target, tDest("focus")]] as const;
  const selectTool = (panel: Panel) => { toggle(panel); setMobileToolsOpen(false); };
  return <><div aria-label={tAria("tools")} className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-4 z-20 hidden gap-2 lg:flex lg:left-10" role="toolbar">{tools.map(([panel, icon, label]) => <DockButton active={open === panel} icon={icon} key={panel} label={label} onClick={() => toggle(panel)} playing={panel === Panel.Music && playing} />)}</div><div aria-label={tAria("controls")} className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-20 flex gap-2 sm:right-6 lg:right-10" role="toolbar"><nav aria-label={tAria("nav")} className="flex gap-2">{spaces.map(([space, icon, label]) => <DockButton active={active === space} icon={icon} key={space} label={label} onClick={() => changeSpace(space)} />)}</nav><span className="mx-1 hidden h-8 self-center border-l border-sage-300 lg:block" /><DockButton icon={WidgetAdd} label={tChrome("more")} onClick={() => setMobileToolsOpen(true)} /><DockButton active={open === Panel.Settings} icon={Settings} label={tChrome("settings")} onClick={() => toggle(Panel.Settings)} /><span className="hidden lg:contents"><DockButton icon={FullScreen} label={tChrome("fullscreen")} onClick={fullscreen} /></span></div><Drawer onOpenChange={setMobileToolsOpen} open={mobileToolsOpen} title={tChrome("more")}><div className="grid gap-2">{tools.map(([panel, Glyph, label]) => <button className="flex min-h-12 items-center gap-3 rounded-control border border-sage-300 px-4 text-left font-semibold text-sage-900 hover:border-sage-500 hover:bg-sage-100" key={panel} onClick={() => selectTool(panel)} type="button"><Glyph className="size-5 text-sage-700" /><span>{label}</span>{panel === Panel.Music && playing ? <span className="ml-auto size-2 rounded-full bg-sage-600" /> : null}</button>)}</div></Drawer><TasksPanel /><NotesPanel /><RhythmPanel /><ProgressPanel /><SoundsPanel /><SettingsPanel /></>;
}
