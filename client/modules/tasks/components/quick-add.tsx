"use client";

import { useState } from "react";
import { IconButton, Input, InputGroup } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { estimateEta } from "@/modules/ai";
import { DEFAULT_ETA, useTasksStore } from "../hooks/use-tasks-store.hook";

export function QuickAdd() {
  const t = useTranslations("tasks");
  const addTask = useTasksStore((s) => s.addTask);
  const [draft, setDraft] = useState("");

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    const id = addTask(body);
    setDraft("");

    void estimateEta(body).then((eta) => {
      if (eta === null) return;
      const { tasks, updateTask } = useTasksStore.getState();
      const task = tasks.find((candidate) => candidate.id === id);
      if (task && task.eta === DEFAULT_ETA) updateTask(id, { eta });
    });
  };

  return (
    <InputGroup
      flexShrink="0"
      endElement={
        <IconButton variant="ghost" size="sm" aria-label={t("addTask")} disabled={draft.trim() === ""} onClick={submit}>
          <Plus size={16} />
        </IconButton>
      }
      endElementProps={{ paddingInline: "1" }}
    >
      <Input
        variant="subtle"
        size="md"
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
