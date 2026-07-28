"use client";

import { useTasks } from "@/services/tasks";
import { DoingNowActive } from "./doing-now-active";
import { DoingNowEmpty } from "./doing-now-empty";

export function DoingNowCard() { const { data: tasks, isPending } = useTasks(); if (isPending) return <span aria-label="Loading" className="loading loading-spinner loading-sm text-sage-700" />; const currentTask = tasks?.find((task) => task.isDoingNow); return currentTask ? <DoingNowActive task={currentTask} /> : <DoingNowEmpty />; }
