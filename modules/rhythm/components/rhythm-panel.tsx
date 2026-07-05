"use client";

import { Text, VStack } from "@chakra-ui/react";
import { Check, Icon } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui";
import { RhythmList } from "@/theme/slot-recipes/rhythm-list";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { dayKey } from "@/modules/progress";
import { RHYTHMS } from "../rhythms";
import { useRhythmHydrated, useRhythmStore } from "../hooks";

const EMPTY = {};

export function RhythmPanel() {
  const t = useTranslations("rhythm");
  const hydrated = useRhythmHydrated();
  const open = usePanels((s) => s.open === Panel.Rhythm);
  const close = usePanels((s) => s.close);
  const byDate = useRhythmStore((s) => s.byDate);
  const toggle = useRhythmStore((s) => s.toggle);

  const key = dayKey();
  const today = byDate[key] ?? EMPTY;
  const doneCount = hydrated ? RHYTHMS.filter((r) => today[r.id]).length : 0;

  return (
    <SidePanel open={open} onClose={close} title={t("title")}>
      <VStack h="full" w="full" gap="3" align="stretch">
        <Text textStyle="label-md" color="fg.subtle" suppressHydrationWarning>
          {t("progress", { done: doneCount, total: RHYTHMS.length })}
        </Text>

        <ScrollArea flex="1" minH="0" w="full">
          <RhythmList.Root>
            {RHYTHMS.map((r) => {
              const done = hydrated && !!today[r.id];
              return (
                <RhythmList.Item key={r.id} onClick={() => toggle(key, r.id)} aria-pressed={done}>
                  <RhythmList.Check data-checked={done || undefined}>
                    {done && <Icon icon={Check} boxSize="3" />}
                  </RhythmList.Check>
                  <Icon icon={r.icon} boxSize="4" />
                  <RhythmList.Label data-checked={done || undefined}>{t(`items.${r.id}`)}</RhythmList.Label>
                </RhythmList.Item>
              );
            })}
          </RhythmList.Root>
        </ScrollArea>
      </VStack>
    </SidePanel>
  );
}
