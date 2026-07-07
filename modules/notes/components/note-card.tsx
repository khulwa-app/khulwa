"use client";

import { Box, HStack, Input, Textarea } from "@chakra-ui/react";
import { IconButton } from "@/components/ui";
import { TrashBinMinimalistic } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { useDeleteNote, useUpdateNote, type Note } from "@/services/notes";

export function NoteCard({ note }: { note: Note }) {
  const t = useTranslations("notes");
  const update = useUpdateNote();
  const remove = useDeleteNote();

  const saveTitle = (raw: string) => {
    const next = raw.trim() || null;
    if (next !== (note.title ?? null)) update.mutate({ id: note.id, patch: { title: next } });
  };

  const saveContent = (raw: string) => {
    if (raw !== note.content) update.mutate({ id: note.id, patch: { content: raw } });
  };

  return (
    <Box bg="bg.subtle" borderWidth="1px" borderColor="border.subtle" rounded="md" paddingInline="3" paddingBlock="2">
      <HStack gap="1" align="center">
        <Input
          variant="plain"
          size="sm"
          defaultValue={note.title ?? ""}
          placeholder={t("titlePlaceholder")}
          fontWeight="medium"
          color="fg"
          aria-label={t("titlePlaceholder")}
          onBlur={(e) => saveTitle(e.target.value)}
        />
        <IconButton
          variant="ghost.panel"
          size="sm"
          color="fg.disabled"
          aria-label={t("delete")}
          onClick={() => remove.mutate(note.id)}
          _hover={{ color: "fg.error" }}
        >
          <Icon icon={TrashBinMinimalistic} boxSize="3.5" />
        </IconButton>
      </HStack>
      <Textarea
        defaultValue={note.content}
        placeholder={t("contentPlaceholder")}
        aria-label={t("contentPlaceholder")}
        onBlur={(e) => saveContent(e.target.value)}
        border="0"
        bg="transparent"
        paddingInline="0"
        paddingBlock="1"
        minH="3.25rem"
        resize="none"
        textStyle="body-sm"
        color="fg"
        _placeholder={{ color: "fg.muted" }}
        _focusVisible={{ outline: "none", boxShadow: "none" }}
      />
    </Box>
  );
}
