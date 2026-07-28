"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button, Dialog, Drawer, IconButton, Input, Pill } from "@/components/ui";
import { cn } from "@/lib/cn";

type Destination = "home" | "focus" | "ambient" | "progress";
type IconName = "home" | "focus" | "ambient" | "progress" | "search" | "sound" | "more" | "play" | "pause" | "settings" | "arrow";

const destinations: Array<{ id: Destination; label: string; detail: string; icon: IconName }> = [
  { id: "home", label: "Home", detail: "Your day at a glance", icon: "home" },
  { id: "focus", label: "Focus", detail: "A clear place to work", icon: "focus" },
  { id: "ambient", label: "Ambient", detail: "Sound for your environment", icon: "ambient" },
  { id: "progress", label: "Progress", detail: "A quieter view of momentum", icon: "progress" },
];

function Glyph({ name, className }: { name: IconName; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.7 };
  const paths: Record<IconName, ReactNode> = {
    home: <><path {...common} d="m3.5 10.5 8.5-7 8.5 7v9a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19.5v-9Z" /><path {...common} d="M9 21v-6h6v6" /></>,
    focus: <><circle {...common} cx="12" cy="12" r="8.5" /><circle {...common} cx="12" cy="12" r="3" /><path {...common} d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" /></>,
    ambient: <><path {...common} d="M7.2 5.1A7.6 7.6 0 1 0 18.9 16.8 8.5 8.5 0 1 1 7.2 5.1Z" /><path {...common} d="M16.2 4.2v3M14.7 5.7h3M18.5 9v2M17.5 10h2" /></>,
    progress: <><path {...common} d="M4 19.5V10M10 19.5V4.5M16 19.5v-7M22 19.5H2" /><path {...common} d="m15.5 7.2 2.1-2.1 2.1 2.1" /></>,
    search: <><circle {...common} cx="10.8" cy="10.8" r="6.3" /><path {...common} d="m16 16 4.2 4.2" /></>,
    sound: <><path {...common} d="M4 14.8h3.6l4.8 3.5V5.7L7.6 9.2H4v5.6Z" /><path {...common} d="M16 9.2a4 4 0 0 1 0 5.6M18.7 6.5a7.8 7.8 0 0 1 0 11" /></>,
    more: <><circle fill="currentColor" cx="5" cy="12" r="1.35" /><circle fill="currentColor" cx="12" cy="12" r="1.35" /><circle fill="currentColor" cx="19" cy="12" r="1.35" /></>,
    play: <path fill="currentColor" d="M8 5.5v13l10-6.5-10-6.5Z" />,
    pause: <><path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></>,
    settings: <><circle {...common} cx="12" cy="12" r="3" /><path {...common} d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a8.7 8.7 0 0 0-1.7-1L14.5 3h-5l-.3 3a8.7 8.7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .3 0 .7.1 1l-2 1.6 2 3.4 2.4-1a8.7 8.7 0 0 0 1.7 1l.3 3h5l.3-3a8.7 8.7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6c.1-.3.1-.7.1-1Z" /></>,
    arrow: <path {...common} d="m9 5 7 7-7 7" />,
  };
  return <svg aria-hidden="true" className={cn("size-5 shrink-0", className)} viewBox="0 0 24 24">{paths[name]}</svg>;
}

function Mark() {
  return <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl bg-sage-1000 text-base-100"><span className="block size-3 rounded-[4px] border-2 border-current" /></span>;
}

export function ShellDemo() {
  const [active, setActive] = useState<Destination>("home");
  const [commandOpen, setCommandOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [running, setRunning] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [seconds, setSeconds] = useState(24 * 60 + 38);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const chooseDestination = (destination: Destination) => {
    setActive(destination);
    setCommandOpen(false);
    setMoreOpen(false);
  };
  const activeDestination = destinations.find((destination) => destination.id === active)!;

  return (
    <div className="khulwa-foundation min-h-dvh bg-base-200 p-3 sm:p-5 lg:p-6" data-theme="khulwa">
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 rounded-control bg-sage-1000 px-4 py-3 text-sm font-semibold text-base-100" href="#shell-main">Skip to workspace</a>
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1600px] overflow-hidden rounded-shell border border-sage-300 bg-base-100 sm:min-h-[calc(100dvh-2.5rem)]">
        <aside className="hidden w-[264px] shrink-0 flex-col border-r border-sage-300 bg-sage-100/55 p-5 lg:flex">
          <div className="flex items-center gap-3 px-2">
            <Mark />
            <span className="text-lg font-semibold tracking-[-0.04em] text-sage-1000">riwaq</span>
          </div>
          <nav aria-label="Workspace destinations" className="mt-10 grid gap-1">
            {destinations.map((destination) => <NavigationItem active={active === destination.id} destination={destination} key={destination.id} onClick={() => chooseDestination(destination.id)} />)}
          </nav>
          <div className="mt-auto border-t border-sage-300 pt-4">
            <button className="flex min-h-12 w-full items-center gap-3 rounded-control px-3 text-left text-sm font-medium text-sage-800 transition-colors duration-200 hover:bg-base-100 hover:text-sage-1000 motion-reduce:transition-none" type="button">
              <Glyph name="settings" /> Settings
            </button>
            <div className="mt-4 flex items-center gap-3 px-3">
              <span className="grid size-9 place-items-center rounded-full bg-sage-300 text-sm font-semibold text-sage-1000">SM</span>
              <div className="min-w-0"><p className="truncate text-sm font-semibold text-sage-1000">S. Mohamed</p><p className="truncate text-xs text-sage-700">Your quiet workspace</p></div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-[76px] items-center justify-between gap-3 border-b border-sage-300 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden"><Mark /><span className="text-lg font-semibold tracking-[-0.04em] text-sage-1000">riwaq</span></div>
            <p className="hidden text-sm font-medium text-sage-700 lg:block">Tuesday, 28 July</p>
            <div className="ml-auto flex items-center gap-2">
              <button aria-label="Open command palette" className="hidden min-h-11 items-center gap-3 rounded-control border border-sage-300 bg-base-100 px-3 text-sm text-sage-700 transition-colors duration-200 hover:border-sage-500 hover:text-sage-1000 sm:flex motion-reduce:transition-none" onClick={() => setCommandOpen(true)} type="button">
                <Glyph name="search" className="size-4" /><span>Find anything</span><kbd className="ml-5 rounded-md border border-sage-300 bg-sage-100 px-1.5 py-0.5 font-mono text-[11px] text-sage-700">⌘ K</kbd>
              </button>
              <button aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"} className={cn("relative grid size-11 place-items-center rounded-control border transition-colors duration-200 motion-reduce:transition-none", soundOn ? "border-sage-400 bg-sage-100 text-sage-1000" : "border-sage-300 bg-base-100 text-sage-700 hover:border-sage-500")} onClick={() => setSoundOn(!soundOn)} type="button">
                <Glyph name="sound" className="size-[18px]" />{soundOn ? <span aria-label="Ambient sound is playing" className="absolute right-2 top-2 size-1.5 rounded-full bg-sage-700" /> : null}
              </button>
              <button aria-label={running ? "Pause focus timer" : "Resume focus timer"} className="khulwa-numeric flex h-11 items-center gap-2 rounded-control border border-sage-300 bg-base-100 px-3 text-sm font-semibold text-sage-1000 transition-colors duration-200 hover:border-sage-500 motion-reduce:transition-none" onClick={() => setRunning(!running)} type="button">
                <span className={cn("size-2 rounded-full", running ? "bg-sage-700" : "border border-sage-600 bg-transparent")} /><span>{time}</span>
              </button>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto px-4 py-8 pb-[calc(env(safe-area-inset-bottom)+6.5rem)] sm:px-6 lg:px-8 lg:py-10 lg:pb-10" id="shell-main">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div><p className="text-sm font-medium text-sage-700">Good afternoon, Mohamed</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.055em] text-sage-1000 sm:text-5xl">Make space for what matters.</h1></div>
                <Pill tone="success">3 day rhythm</Pill>
              </div>

              <section aria-labelledby="next-focus" className="mt-10 grid gap-5 rounded-panel border border-sage-300 bg-sage-100/55 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Next focus</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-sage-1000 sm:text-3xl" id="next-focus">Shape the new workspace shell</h2><p className="mt-3 max-w-xl text-base leading-7 text-sage-800">One clear intention, a visible clock, and the tools you need close by—not competing for attention.</p></div>
                <Button className="w-full sm:w-auto" onClick={() => chooseDestination("focus")}>Enter focus <Glyph name="arrow" className="size-4" /></Button>
              </section>

              <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
                <section className="rounded-panel border border-sage-300 bg-base-100 p-5 sm:p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Today</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-sage-1000">A deliberate, lighter plan</h2></div><button className="text-sm font-semibold text-sage-800 underline decoration-sage-400 underline-offset-4 hover:text-sage-1000" onClick={() => setCommandOpen(true)} type="button">View all</button></div><div className="mt-6 divide-y divide-sage-300 border-y border-sage-300"><Task label="Write the first shell review" meta="Focus · 25 min" /><Task label="Set the motion constraints" meta="Design · 15 min" /><Task label="Review mobile navigation" meta="Review · 20 min" /></div></section>
                <section className="rounded-panel border border-sage-300 bg-base-100 p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Environment</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-sage-1000">Rain room</h2><p className="mt-2 text-sm leading-6 text-sage-800">Ambient audio stays with you as you move through the workspace.</p><div className="mt-6 flex items-center gap-3"><IconButton aria-label={soundOn ? "Pause Rain room" : "Play Rain room"} onClick={() => setSoundOn(!soundOn)} tone="secondary"><Glyph name={soundOn ? "pause" : "play"} className="size-4" /></IconButton><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sage-100"><div className="h-full w-[62%] rounded-full bg-sage-600" /></div><span className="khulwa-numeric text-xs text-sage-700">62%</span></div></section>
              </div>
              <p aria-live="polite" className="sr-only">{activeDestination.label} selected. Timer {running ? "running" : "paused"}. Ambient sound {soundOn ? "playing" : "paused"}.</p>
            </div>
          </main>
        </div>
      </div>

      <nav aria-label="Mobile workspace destinations" className="fixed inset-x-3 bottom-3 z-20 flex min-h-[68px] items-center justify-around rounded-panel border border-sage-300 bg-base-100 px-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:hidden sm:inset-x-5 sm:bottom-5">
        {destinations.slice(0, 3).map((destination) => <button aria-current={active === destination.id ? "page" : undefined} className={cn("flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-control px-2 text-[11px] font-semibold transition-colors duration-200 motion-reduce:transition-none", active === destination.id ? "bg-sage-100 text-sage-1000" : "text-sage-700 hover:text-sage-1000")} key={destination.id} onClick={() => chooseDestination(destination.id)} type="button"><Glyph name={destination.icon} className="size-[18px]" />{destination.label}</button>)}
        <button aria-expanded={moreOpen} className="flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-control px-2 text-[11px] font-semibold text-sage-700 transition-colors duration-200 hover:text-sage-1000 motion-reduce:transition-none" onClick={() => setMoreOpen(true)} type="button"><Glyph name="more" className="size-[18px]" />More</button>
      </nav>

      <Dialog onOpenChange={setCommandOpen} open={commandOpen} title="Find anything">
        <div className="grid gap-4"><label className="sr-only" htmlFor="command-search">Search workspace</label><Input autoFocus id="command-search" placeholder="Search spaces, tasks, and actions" /><p className="text-sm text-sage-700">Quick destinations</p><div className="grid gap-1">{destinations.map((destination) => <button className="flex min-h-12 items-center gap-3 rounded-control px-3 text-left transition-colors duration-200 hover:bg-sage-100 motion-reduce:transition-none" key={destination.id} onClick={() => chooseDestination(destination.id)} type="button"><Glyph name={destination.icon} /><span className="min-w-0"><span className="block text-sm font-semibold text-sage-1000">{destination.label}</span><span className="block truncate text-xs text-sage-700">{destination.detail}</span></span><Glyph name="arrow" className="ml-auto size-4 text-sage-600" /></button>)}</div></div>
      </Dialog>
      <Drawer onOpenChange={setMoreOpen} open={moreOpen} title="Workspace">
        <div className="grid gap-2">{destinations.slice(3).map((destination) => <NavigationItem active={active === destination.id} destination={destination} key={destination.id} onClick={() => chooseDestination(destination.id)} />)}<button className="mt-3 flex min-h-12 items-center gap-3 rounded-control px-3 text-left text-sm font-medium text-sage-800 transition-colors duration-200 hover:bg-sage-100 hover:text-sage-1000 motion-reduce:transition-none" onClick={() => setCommandOpen(true)} type="button"><Glyph name="search" />Find anything</button><button className="flex min-h-12 items-center gap-3 rounded-control px-3 text-left text-sm font-medium text-sage-800 transition-colors duration-200 hover:bg-sage-100 hover:text-sage-1000 motion-reduce:transition-none" type="button"><Glyph name="settings" />Settings</button></div>
      </Drawer>
    </div>
  );
}

function NavigationItem({ active, destination, onClick }: { active: boolean; destination: (typeof destinations)[number]; onClick: () => void }) {
  return <button aria-current={active ? "page" : undefined} className={cn("flex min-h-12 w-full items-center gap-3 rounded-control px-3 text-left transition-colors duration-200 motion-reduce:transition-none", active ? "bg-base-100 text-sage-1000" : "text-sage-800 hover:bg-base-100 hover:text-sage-1000")} onClick={onClick} type="button"><Glyph name={destination.icon} /><span className="text-sm font-semibold">{destination.label}</span></button>;
}

function Task({ label, meta }: { label: string; meta: string }) {
  return <div className="flex items-center gap-3 py-4"><span aria-hidden="true" className="size-4 rounded-full border border-sage-500" /><div className="min-w-0"><p className="truncate text-sm font-semibold text-sage-1000">{label}</p><p className="mt-1 text-xs text-sage-700">{meta}</p></div></div>;
}
