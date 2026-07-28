"use client";

import { useTranslations } from "next-intl";
import { formatDuration, type CategoryId } from "../categories";

export function CategoryBar({ id, color, seconds, max }: { id: CategoryId; color: string; seconds: number; max: number }) { const t = useTranslations("khulwa.categories"); const pct = max > 0 ? Math.max(3, Math.round((seconds / max) * 100)) : 0; return <div className="grid grid-cols-[auto_minmax(4rem,1fr)_auto] items-center gap-2"><span className="size-2.5 rounded-full" style={{ backgroundColor: color }} /><span className="text-sm text-sage-800">{t(id)}</span><span className="text-xs tabular-nums text-sage-700">{formatDuration(seconds)}</span><span className="col-span-3 h-1.5 overflow-hidden rounded-full bg-sage-200"><span className="block h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none" style={{ backgroundColor: color, width: `${pct}%` }} /></span></div>; }
