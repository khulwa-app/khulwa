"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/shadcn/progress";
import { AnchoredPanel, usePanels, Panel } from "@/modules/panels";
import { dayKey } from "@/modules/progress";
import { RHYTHMS } from "../rhythms";
import { useRhythmHydrated, useRhythmStore } from "../hooks";

const EMPTY = {};

export function RhythmPanel() {
  const t = useTranslations("rhythm");
  const hydrated = useRhythmHydrated();
  const open = usePanels((s) => s.open === Panel.Rhythm);
  const close = usePanels((s) => s.close);
  const byDate = useRhythmStore((s) => s.byDate);
  const toggle = useRhythmStore((s) => s.toggle);

  const key = dayKey();
  const today = byDate[key] ?? EMPTY;
  const doneCount = hydrated ? RHYTHMS.filter((r) => today[r.id]).length : 0;

  return (
    <AnchoredPanel anchor="tool" width={360} open={open} onClose={close} title={t("title")}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-foreground-muted" suppressHydrationWarning>
            {t("progress", { done: doneCount, total: RHYTHMS.length })}
          </p>
          <Progress value={(doneCount / RHYTHMS.length) * 100} className="h-1" />
        </div>

        <ul className="flex flex-col">
          {RHYTHMS.map(({ id, icon: Icon }) => {
            const done = hydrated && !!today[id];
            return (
              <li key={id}>
                <button
                  type="button"
                  aria-pressed={done}
                  onClick={() => toggle(key, id)}
                  className="-mx-4 flex h-11 w-[calc(100%+2rem)] items-center gap-3 px-4 text-left transition-colors hover:bg-surface-elevated focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                >
                  <span
                    data-checked={done || undefined}
                    className="flex size-[18px] shrink-0 items-center justify-center rounded-[6px] border border-border text-transparent transition-colors data-[checked]:border-success data-[checked]:bg-success data-[checked]:text-canvas"
                  >
                    <Check className="size-3" />
                  </span>
                  <Icon
                    className={cn("size-4 shrink-0", done ? "text-success" : "text-foreground-muted")}
                    aria-hidden
                  />
                  <span className={cn("text-sm", done ? "text-foreground-muted line-through" : "text-foreground")}>
                    {t(`items.${id}`)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </AnchoredPanel>
  );
}
