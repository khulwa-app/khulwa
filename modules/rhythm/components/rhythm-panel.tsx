"use client";

import { Check } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { dayKey } from "@/modules/progress";
import { RHYTHMS } from "../rhythms";
import { useRhythmHydrated, useRhythmStore } from "../hooks";

const EMPTY = {};
export function RhythmPanel() { const t = useTranslations("rhythm"); const hydrated = useRhythmHydrated(); const open = usePanels((state) => state.open === Panel.Rhythm); const close = usePanels((state) => state.close); const byDate = useRhythmStore((state) => state.byDate); const toggle = useRhythmStore((state) => state.toggle); const key = dayKey(); const today = byDate[key] ?? EMPTY; const doneCount = hydrated ? RHYTHMS.filter((rhythm) => today[rhythm.id]).length : 0; return <SidePanel onClose={close} open={open} title={t("title")}><div className="flex h-full w-full flex-col gap-3"><p className="text-sm text-sage-700" suppressHydrationWarning>{t("progress", { done: doneCount, total: RHYTHMS.length })}</p><ScrollArea className="min-h-0 w-full flex-1"><div className="grid gap-2">{RHYTHMS.map((rhythm) => { const done = hydrated && !!today[rhythm.id]; const Glyph = rhythm.icon; return <button aria-pressed={done} className="flex min-h-12 items-center gap-3 rounded-control border border-sage-300 bg-base-100 px-3 text-left hover:border-sage-500 hover:bg-sage-100" key={rhythm.id} onClick={() => toggle(key, rhythm.id)} type="button"><span className={done ? "grid size-5 place-items-center rounded-sm bg-sage-800 text-sage-100" : "size-5 rounded-sm border border-sage-400"}>{done ? <Check className="size-3" weight="Bold" /> : null}</span><Glyph className="size-5 text-sage-700" /><span className={done ? "font-semibold text-sage-1000" : "text-sage-800"}>{t(`items.${rhythm.id}`)}</span></button>; })}</div></ScrollArea></div></SidePanel>; }
