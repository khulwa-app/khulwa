"use client";

import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/shadcn/collapsible";
import type { Task } from "@/services/tasks";
import { TaskRow } from "./task-row";

export function TaskSection({ label, tasks }: { label: string; tasks: Task[] }) {
  if (!tasks.length) return null;

  return (
    <Collapsible className="group/section">
      <CollapsibleTrigger className="flex h-10 w-full items-center gap-1.5 rounded-md px-1 text-xs font-medium text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        <ChevronRight className="size-3.5 transition-transform motion-reduce:transition-none group-data-[state=open]/section:rotate-90" />
        {label}
        <span className="tabular">({tasks.length})</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
