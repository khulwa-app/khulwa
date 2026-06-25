"use client";

import { useCallback, useState } from "react";
import { Box, Menu, Portal, chakra } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { CATEGORIES, type CategoryId } from "../categories";
import { useProgressHydrated, useProgressStore } from "../hooks";

export function CategoryChip() {
  const t = useTranslations("khulwa.categories");
  const hydrated = useProgressHydrated();
  const selected = useProgressStore((s) => s.selected);
  const setCategory = useProgressStore((s) => s.setCategory);
  const current = hydrated ? CATEGORIES.find((c) => c.id === selected) : undefined;

  const [open, setOpen] = useState(false);
  const onSelect = useCallback(
    (d: { value: string }) => setCategory(d.value === "none" ? null : (d.value as CategoryId)),
    [setCategory],
  );

  return (
    <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)} onSelect={onSelect}>
      <Menu.Trigger asChild>
        <chakra.button
          type="button"
          display="inline-flex"
          alignItems="center"
          gap="2"
          h="8"
          paddingInline="3"
          rounded="controlWide"
          bg="surface.muted"
          color="fg.muted"
          fontSize="sm"
          fontWeight="medium"
          cursor="pointer"
          transitionProperty="background-color, color"
          transitionDuration="enter"
          transitionTimingFunction="enter"
          _hover={{ bg: "bg.emphasized", color: "fg.default" }}
          _open={{ bg: "bg.emphasized", color: "fg.default" }}
          suppressHydrationWarning
        >
          <Box boxSize="2" rounded="full" bg={current ? current.color : "fg.subtle"} />
          <chakra.span color={current ? "fg.default" : "fg.muted"}>
            {current ? t(current.id) : t("none")}
          </chakra.span>
          <ChevronDown size={14} />
        </chakra.button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {CATEGORIES.map((c) => (
              <Menu.Item key={c.id} value={c.id}>
                <Box boxSize="2" rounded="full" bg={c.color} />
                {t(c.id)}
              </Menu.Item>
            ))}
            <Menu.Item value="none" color="fg.muted">
              {t("none")}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
