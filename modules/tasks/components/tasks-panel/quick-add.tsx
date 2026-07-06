"use client";

import { useState } from "react";
import { IconButton, Input, InputGroup } from "@chakra-ui/react";
import { AddCircle } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { estimateEta } from "@/modules/ai";
import { DEFAULT_ETA, useCreateTask, useUpdateTask } from "@/services/tasks";

export function QuickAdd() {
  const t = useTranslations("tasks");
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const [draft, setDraft] = useState("");

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    setDraft("");

    createTask.mutate(
      { body },
      {
        onSuccess: (task) => {
          void estimateEta(body).then((eta) => {
            if (eta !== null && task.eta === DEFAULT_ETA) updateTask.mutate({ id: task.id, patch: { eta } });
          });
        },
      },
    );
  };

  return (
    <InputGroup
      flexShrink="0"
      endElement={
        <IconButton
          variant="ghost.primary"
          size="sm"
          aria-label={t("addTask")}
          disabled={draft.trim() === ""}
          onClick={submit}
        >
          <Icon icon={AddCircle} />
        </IconButton>
      }
      endElementProps={{ paddingInline: "1" }}
    >
      <Input
        variant="glass"
        size="lg"
        value={draft}
        placeholder={t("placeholder")}
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
      />
    </InputGroup>
  );
}
