import { useTranslations } from "next-intl";
import { Task, useTasksStore } from "../hooks/use-tasks-store.hook";
import { Checkbox, HStack, IconButton, Input, InputGroup } from "@chakra-ui/react";
import { Target, Trash2 } from "lucide-react";

export function TaskRow({ task, autoFocus }: { task: Task; autoFocus?: boolean }) {
  const t = useTranslations("tasks");
  const { updateTask, removeTask, toggleCompleted, setDoingNow } = useTasksStore();

  return (
    <HStack gap="2">
      <Checkbox.Root
        size="sm"
        checked={task.completed}
        onCheckedChange={() => toggleCompleted(task.id)}
        aria-label={t("aria.complete")}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
      </Checkbox.Root>

      <Input
        variant="subtle"
        size="sm"
        flex="1"
        value={task.body}
        placeholder={t("placeholder")}
        autoFocus={autoFocus}
        onChange={(e) => updateTask(task.id, { body: e.target.value })}
        textDecoration={task.completed ? "line-through" : undefined}
        color={task.completed ? "fg.subtle" : undefined}
      />

      <InputGroup w="20" flexShrink="0" endElement={t("minutesShort")}>
        <Input
          variant="subtle"
          size="sm"
          type="number"
          min={0}
          step={5}
          value={task.eta}
          aria-label={t("aria.eta")}
          onChange={(e) => updateTask(task.id, { eta: Math.max(0, Number(e.target.value) || 0) })}
        />
      </InputGroup>

      <IconButton
        visual="ghost"
        size="sm"
        aria-label={t("aria.doingNow")}
        aria-pressed={task.isDoingNow}
        color={task.isDoingNow ? "primary.default" : "fg.subtle"}
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
