"use client";

import { useMemo, useState } from "react";
import { Button, Dialog, IconButton, Input, Pill } from "@/components/ui";
import { cn } from "@/lib/cn";

type Item = { id: number; label: string; minutes: number; done: boolean; now?: boolean };

const initialItems: Item[] = [
  { id: 1, label: "Shape the new workspace shell", minutes: 25, done: false, now: true },
  { id: 2, label: "Review the Sanctuary Dusk foundation", minutes: 15, done: false },
  { id: 3, label: "Plan the mobile focus flow", minutes: 20, done: false },
  { id: 4, label: "Clear the release notes", minutes: 10, done: true },
];

function Check({ checked }: { checked: boolean }) {
  return <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24"><path d="m5 12 4.2 4L19 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" style={{ visibility: checked ? "visible" : "hidden" }} /></svg>;
}

function Arrow() {
  return <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}

export function HomeDemo() {
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState("");
  const [focusOpen, setFocusOpen] = useState(false);
  const completeCount = useMemo(() => items.filter((item) => item.done).length, [items]);
  const active = items.find((item) => item.now && !item.done);

  const toggle = (id: number) => setItems((current) => current.map((item) => item.id === id ? { ...item, done: !item.done, now: item.done ? item.now : false } : item));
  const add = () => {
    const label = draft.trim();
    if (!label) return;
    setItems((current) => [...current, { id: Date.now(), label, minutes: 15, done: false }]);
    setDraft("");
  };

  return <main className="khulwa-foundation min-h-dvh bg-base-200 px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6" data-theme="khulwa">
    <div className="mx-auto min-h-[calc(100dvh-1.5rem)] max-w-[1320px] overflow-hidden rounded-shell border border-sage-300 bg-base-100 sm:min-h-[calc(100dvh-2.5rem)]">
      <header className="flex min-h-[76px] items-center justify-between gap-4 border-b border-sage-300 px-5 sm:px-8"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Phase 4 · Home workspace</p><p className="mt-1 text-sm font-semibold text-sage-1000">khulwa</p></div><Pill tone="success">Tuesday · 28 July</Pill></header>
      <div className="grid min-h-[calc(100dvh-6.25rem)] lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="p-5 sm:p-8 lg:p-12">
          <p className="text-sm font-medium text-sage-700">Good afternoon, Mohamed</p>
          <h1 className="mt-3 max-w-[12ch] text-[clamp(2.65rem,6vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.06em] text-sage-1000">A quieter plan for today.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-sage-800 sm:text-lg sm:leading-8">Home holds your single intention and the few things that support it. Everything else waits out of sight.</p>
          <section className="mt-10 rounded-panel border border-sage-300 bg-sage-100 p-5 sm:p-7" aria-labelledby="intention-title">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Your intention</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-sage-1000 sm:text-3xl" id="intention-title">Ship a calmer workspace.</h2><p className="mt-2 text-sm leading-6 text-sage-800">One meaningful outcome for the day.</p></div><Button className="w-full sm:w-auto" onClick={() => setFocusOpen(true)}>Begin focus <Arrow /></Button></div>
          </section>
          <section className="mt-10" aria-labelledby="momentum-title"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Momentum</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-sage-1000" id="momentum-title">Small proof, clearly seen.</h2></div><span className="khulwa-numeric text-3xl font-medium tracking-[-0.06em] text-sage-1000">{completeCount}/4</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-sage-200"><div className="h-full rounded-full bg-sage-600 transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${(completeCount / 4) * 100}%` }} /></div></section>
        </section>
        <aside className="border-t border-sage-300 bg-base-200/45 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Today</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-sage-1000">Keep it small.</h2></div><Pill>{items.length} items</Pill></div>
          <div className="mt-6 divide-y divide-sage-300 border-y border-sage-300">{items.map((item) => <div className="flex items-center gap-3 py-4" key={item.id}><button aria-label={`${item.done ? "Mark incomplete" : "Complete"} ${item.label}`} className={cn("grid size-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 motion-reduce:transition-none", item.done ? "border-sage-800 bg-sage-800 text-sage-100" : "border-sage-500 bg-transparent text-transparent hover:border-sage-800")} onClick={() => toggle(item.id)} type="button"><Check checked={item.done} /></button><div className="min-w-0 flex-1"><p className={cn("truncate text-sm font-semibold", item.done ? "text-sage-600 line-through" : "text-sage-1000")}>{item.label}</p><p className="mt-1 text-xs text-sage-700">{item.minutes} min {item.now && !item.done ? "· doing now" : ""}</p></div>{item.now && !item.done ? <span className="size-2 rounded-full bg-sage-600" title="Doing now" /> : null}</div>)}</div>
          <form className="mt-5 flex gap-2" onSubmit={(event) => { event.preventDefault(); add(); }}><label className="sr-only" htmlFor="home-task">Add a task</label><Input id="home-task" onChange={(event) => setDraft(event.target.value)} placeholder="Add a small next step" value={draft} /><IconButton aria-label="Add task" tone="secondary" type="submit"><span aria-hidden className="text-xl leading-none">+</span></IconButton></form>
          <div className="mt-8 rounded-panel border border-sage-300 bg-base-100 p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Doing now</p><p className="mt-2 text-sm font-semibold text-sage-1000">{active?.label ?? "Choose one task when you are ready."}</p><p className="mt-2 text-sm leading-6 text-sage-800">{active ? `${active.minutes} minutes is enough to begin.` : "No task needs your attention yet."}</p></div>
        </aside>
      </div>
    </div>
    <Dialog onOpenChange={setFocusOpen} open={focusOpen} title="Focus is ready">
      <p className="text-xl font-semibold tracking-[-0.04em] text-sage-1000">{active?.label ?? "Choose a task first."}</p>
      <p className="mt-3 text-sm leading-6 text-sage-800">The next phase will connect this moment to the preserved Pomodoro state and session logging.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => setFocusOpen(false)}>Continue</Button><Button onClick={() => setFocusOpen(false)} tone="quiet">Not now</Button></div>
    </Dialog>
  </main>;
}
