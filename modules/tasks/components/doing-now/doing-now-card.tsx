"use client";

import { useTasks } from "@/services/tasks";
import { DoingNowActive } from "./doing-now-active";
import { DoingNowEmpty } from "./doing-now-empty";
import { Spinner } from "@chakra-ui/react";

export function DoingNowCard() {
  const { data: tasks, isPending } = useTasks();

  if (isPending) return <Spinner />;
  const currentTask = tasks?.find((task) => task.isDoingNow);
  return currentTask ? <DoingNowActive task={currentTask} /> : <DoingNowEmpty />;
}
