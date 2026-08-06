"use client";

import { CalendarPlus, MoreHorizontal, Moon, Target, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/shadcn/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { useDeleteTask, useUpdateTask, type Task } from "@/services/tasks";
import { InlineText } from "./inline-text";

export function TaskRow({ task }: { task: Task }) {
  const t = useTranslations("tasks");
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  return (
    <li
      data-doing-now={task.isDoingNow || undefined}
      // Bled to the panel edge and left square: a floating rounded slab reads as a card the row
      // is not, and the corners fight the panel's own radius.
      className="group relative -mx-4 px-4 data-[doing-now]:bg-primary/10"
    >
      {task.isDoingNow ? (
        <span className="absolute inset-y-0 left-0 w-0.5 bg-primary" aria-hidden />
      ) : null}

      <div className="flex min-h-12 items-center gap-2.5 pr-1">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => updateTask.mutate({ id: task.id, patch: { completed: !task.completed } })}
          aria-label={t("aria.complete")}
          className="size-[18px] shrink-0"
        />

        <InlineText
          value={task.body}
          label={t("aria.editBody")}
          onCommit={(body) => updateTask.mutate({ id: task.id, patch: { body } })}
          className={cn("text-sm", task.completed && "text-foreground-muted line-through")}
        />

        <div className="flex shrink-0 items-center gap-2 text-xs text-foreground-muted">
          <span className="tabular">
            <InlineText
              value={String(task.eta)}
              label={t("aria.eta")}
              inputMode="numeric"
              className="w-6 text-right"
              parse={(raw) => {
                const parsed = Number.parseInt(raw, 10);
                return Number.isNaN(parsed) ? null : String(Math.max(0, parsed));
              }}
              onCommit={(eta) => updateTask.mutate({ id: task.id, patch: { eta: Number(eta) } })}
            />
            {t("minutesShort")}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={t("aria.more")}
                className="flex size-7 items-center justify-center rounded-full opacity-0 transition-opacity hover:bg-surface-elevated hover:text-foreground focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring group-hover:opacity-100 group-focus-within:opacity-100 data-[state=open]:opacity-100"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-44">
              <DropdownMenuItem
                onSelect={() => updateTask.mutate({ id: task.id, patch: { isDoingNow: !task.isDoingNow } })}
              >
                <Target />
                {t("aria.doingNow")}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => updateTask.mutate({ id: task.id, patch: { today: !task.today } })}>
                {task.today ? <Moon /> : <CalendarPlus />}
                {task.today ? t("aria.defer") : t("aria.doToday")}
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={() => deleteTask.mutate(task.id)}>
                <Trash2 />
                {t("aria.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </li>
  );
}
