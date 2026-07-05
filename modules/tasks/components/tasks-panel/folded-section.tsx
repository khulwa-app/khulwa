"use client";

import { AltArrowRight } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { Collapsible } from "@/components/ui";
import type { Task } from "@/services/tasks";
import { TaskList } from "./task-list";
import { TaskRow } from "./tasks-row";

export function FoldedSection({ label, tasks }: { label: string; tasks: Task[] }) {
  if (!tasks.length) return null;
  return (
    <Collapsible
      trigger={
        <TaskList.SectionTrigger>
          <Icon icon={AltArrowRight} boxSize="3.5" />
          {`${label} (${tasks.length})`}
        </TaskList.SectionTrigger>
      }
    >
      <TaskList.SectionContent>
        {tasks.map((task, index) => (
          <TaskRow key={task.id} task={task} index={index} />
        ))}
      </TaskList.SectionContent>
    </Collapsible>
  );
}
