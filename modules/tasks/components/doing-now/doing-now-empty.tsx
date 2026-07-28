"use client";

import { useState } from "react";
import { ArrowRight } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { Button, Input } from "@/components/ui/primitives";
import { estimateEta } from "@/modules/ai";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { DEFAULT_ETA, useCreateTask, useUpdateTask } from "@/services/tasks";

export function DoingNowEmpty() {
  const t = useTranslations("home.doingNow"); const createTask = useCreateTask(); const updateTask = useUpdateTask(); const changeSpace = useSpace((state) => state.changeSpace); const [draft, setDraft] = useState("");
  const begin = () => { const body = draft.trim(); if (body) { setDraft(""); createTask.mutate({ body }, { onSuccess: (task) => { updateTask.mutate({ id: task.id, patch: { isDoingNow: true } }); void estimateEta(body).then((eta) => { if (eta !== null && task.eta === DEFAULT_ETA) updateTask.mutate({ id: task.id, patch: { eta } }); }); } }); } changeSpace(Space.Focus); };
  return <section className="rounded-panel border border-sage-300 bg-base-100 p-4 sm:p-5"><div className="flex flex-wrap items-center gap-3"><span aria-hidden className="size-2 rounded-full bg-sage-500" /><Input autoFocus className="min-w-44 flex-1 border-0 bg-transparent px-0 focus:outline-none" onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") begin(); }} placeholder={t("intentionPlaceholder")} value={draft} /><Button onClick={begin} size="sm"><span>{t("enterFocus")}</span><ArrowRight className="size-4" /></Button></div><p className="mt-3 text-sm text-sage-700">{t("beginHint")}</p></section>;
}
