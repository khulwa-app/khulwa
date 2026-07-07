"use client";

import { MenuDots, Moon, StarsMinimalistic, Sun, Target, TrashBinMinimalistic } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { Menu } from "@/components/ui/menu";
import { useTranslations } from "next-intl";
import { useDeleteTask, useUpdateTask, type Task } from "@/services/tasks";
import { TaskList } from "@/theme/slot-recipes/task-list";

interface TaskActionsMenuProps {
  task: Task;
  onBreakIntoSteps: () => void;
}

export function TaskActionsMenu({ task, onBreakIntoSteps }: TaskActionsMenuProps) {
  const t = useTranslations("tasks");
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const onSelect = ({ value }: { value: string }) => {
    switch (value) {
      case "doNow":
        updateTask.mutate({ id: task.id, patch: { isDoingNow: !task.isDoingNow } });
        break;
      case "today":
        updateTask.mutate({ id: task.id, patch: { today: !task.today } });
        break;
      case "break":
        onBreakIntoSteps();
        break;
      case "delete":
        deleteTask.mutate(task.id);
        break;
    }
  };

  return (
    <Menu.Root surface="bright" onSelect={onSelect} positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <TaskList.Action data-overflow aria-label={t("aria.more")}>
          <Icon icon={MenuDots} />
        </TaskList.Action>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="doNow" data-checked={task.isDoingNow || undefined}>
          <Icon icon={Target} />
          {t("menu.doNow")}
        </Menu.Item>
        <Menu.Item value="today">
          <Icon icon={task.today ? Moon : Sun} />
          {task.today ? t("menu.moveToLater") : t("menu.doToday")}
        </Menu.Item>
        <Menu.Item value="break">
          <Icon icon={StarsMinimalistic} />
          {t("breakIntoSteps")}
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item value="delete" data-danger>
          <Icon icon={TrashBinMinimalistic} />
          {t("menu.delete")}
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}
