"use client";

import { useState } from "react";
import { IconButton, Input, InputGroup } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTasksStore } from "../hooks/use-tasks-store.hook";

export function QuickAdd() {
  const t = useTranslations("tasks");
  const addTask = useTasksStore((s) => s.addTask);
  const [draft, setDraft] = useState("");

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    addTask(body);
    setDraft("");
  };

  return (
    <InputGroup
      flexShrink="0"
      endElement={
        <IconButton
          visual="ghost"
          size="sm"
          aria-label={t("addTask")}
          disabled={draft.trim() === ""}
          onClick={submit}
        >
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
