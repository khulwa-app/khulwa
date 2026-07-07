"use client";

import { Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui";
import { AddCircle } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui";
import { Panel, SidePanel, usePanels } from "@/modules/panels";
import { useCreateNote, useNotes } from "@/services/notes";
import { NoteCard } from "./note-card";

export function NotesPanel() {
  const t = useTranslations("notes");
  const open = usePanels((s) => s.open === Panel.Notes);
  const close = usePanels((s) => s.close);
  const { data: notes } = useNotes();
  const create = useCreateNote();

  return (
    <SidePanel open={open} title={t("title")} onClose={close}>
      <VStack h="full" w="full" gap="3" align="stretch">
        <Button
          variant="surface.panel"
          size="sm"
          flexShrink="0"
          loading={create.isPending}
          onClick={() => create.mutate({})}
        >
          <Icon icon={AddCircle} boxSize="4" />
          {t("newNote")}
        </Button>

        <ScrollArea flex="1" minH="0" w="full">
          <VStack gap="2" align="stretch">
            {notes === undefined ? null : notes.length === 0 ? (
              <Text textStyle="body-sm" color="fg.muted" textAlign="center" paddingBlock="6">
                {t("empty")}
              </Text>
            ) : (
              notes.map((note) => <NoteCard key={note.id} note={note} />)
            )}
          </VStack>
        </ScrollArea>
      </VStack>
    </SidePanel>
  );
}
