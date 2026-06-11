"use client";

import { Checkbox, HStack, IconButton, Text } from "@chakra-ui/react";
import { Target, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { InlineEdit } from "@/components/ui";
import { Task, useTasksStore } from "../hooks/use-tasks-store.hook";

function EditableBody({ task }: { task: Task }) {
  const t = useTranslations("tasks");
  const updateTask = useTasksStore((s) => s.updateTask);

  return (
    <InlineEdit
      value={task.body}
      onCommit={(body) => updateTask(task.id, { body })}
      flex="1"
      minW="0"
      textStyle="sm"
      // Long titles stay one line and scroll inside their own slot (caret can
      // travel while editing); the hidden scrollbar keeps the row clean.
      whiteSpace="nowrap"
      overflowX="auto"
      css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
      aria-label={t("aria.editBody")}
      color={task.completed ? "fg.subtle" : "fg.default"}
      textDecoration={task.completed ? "line-through" : undefined}
    />
  );
}

function EtaChip({ task }: { task: Task }) {
  const t = useTranslations("tasks");
  const updateTask = useTasksStore((s) => s.updateTask);

  return (
    <Text flexShrink="0" textStyle="sm" color="fg.muted" fontVariantNumeric="tabular-nums" cursor="text">
      <InlineEdit
        as="span"
        value={String(task.eta)}
        parse={(raw) => {
          const parsed = parseInt(raw, 10);
          return Number.isNaN(parsed) ? null : String(Math.max(0, parsed));
        }}
        onCommit={(eta) => updateTask(task.id, { eta: Number(eta) })}
        inputMode="numeric"
        aria-label={t("aria.eta")}
      />
      {t("minutesShort")}
    </Text>
  );
}

export function TaskRow({ task }: { task: Task }) {
  const t = useTranslations("tasks");
  const { removeTask, toggleCompleted, setDoingNow } = useTasksStore();

  return (
    <HStack
      gap="2"
      paddingInline="2"
      paddingBlock="1"
      rounded="lg"
      _hover={{ bg: "surface.muted" }}
      transitionProperty="background-color"
      transitionDuration="0.15s"
    >
      <Checkbox.Root
        size="sm"
        checked={task.completed}
        onCheckedChange={() => toggleCompleted(task.id)}
        aria-label={t("aria.complete")}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
      </Checkbox.Root>

      <EditableBody task={task} />

      <EtaChip task={task} />

      <IconButton
        visual="ghost"
        size="sm"
        aria-label={t("aria.doingNow")}
        aria-pressed={task.isDoingNow}
        color={task.isDoingNow ? "fg.inverse" : "fg.subtle"}
        bg={task.isDoingNow ? "primary.default" : undefined}
        _hover={task.isDoingNow ? { bg: "primary.hover" } : undefined}
        onClick={() => setDoingNow(task.id)}
      >
        <Target size={16} />
      </IconButton>

      <IconButton
        visual="ghost"
        size="sm"
        aria-label={t("aria.delete")}
        color="fg.subtle"
        _hover={{ color: "status.danger" }}
        onClick={() => removeTask(task.id)}
      >
        <Trash2 size={16} />
      </IconButton>
    </HStack>
  );
}
