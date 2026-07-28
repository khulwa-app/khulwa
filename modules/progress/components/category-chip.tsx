"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CATEGORIES } from "../categories";
import { useProgressHydrated, useProgressStore } from "../hooks";

export function CategoryChip() {
  const t = useTranslations("khulwa.categories");
  const hydrated = useProgressHydrated();
  const selected = useProgressStore((state) => state.selected);
  const setCategory = useProgressStore((state) => state.setCategory);
  const [open, setOpen] = useState(false);
  const current = hydrated ? CATEGORIES.find((item) => item.id === selected) : undefined;
  return <div className="relative"><button aria-expanded={open} className="flex h-10 items-center gap-2 rounded-control border border-sage-300 bg-base-100 px-3 text-sm font-semibold text-sage-800 hover:border-sage-500" onClick={() => setOpen(!open)} type="button"><span className="size-2 rounded-full" style={{ backgroundColor: current?.color ?? "#A99B89" }} />{current ? t(current.id) : t("none")}<svg aria-hidden className="size-3" fill="none" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg></button>{open ? <div className="absolute left-1/2 z-20 mt-2 w-48 -translate-x-1/2 rounded-panel border border-sage-300 bg-base-100 p-1.5">{CATEGORIES.map((item) => <button className="flex min-h-10 w-full items-center gap-2 rounded-control px-3 text-left text-sm text-sage-800 hover:bg-sage-100" key={item.id} onClick={() => { setCategory(item.id); setOpen(false); }} type="button"><span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{t(item.id)}</button>)}<button className="min-h-10 w-full rounded-control px-3 text-left text-sm text-sage-700 hover:bg-sage-100" onClick={() => { setCategory(null); setOpen(false); }} type="button">{t("none")}</button></div> : null}</div>;
}
