"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Command } from "cmdk";
import { useTranslations } from "next-intl";
import { Palette } from "@/theme/slot-recipes/command-palette";
import { useHotkey } from "@/modules/shortcuts";
import { useUiPrefsStore } from "@/modules/ui-prefs";
import { CMD_PALETTE_HINT_ID } from "../constants";
import { useCommands } from "../commands";

export function CommandPalette() {
  const t = useTranslations("palette");
  const [open, setOpen] = useState(false);
  const groups = useCommands();
  const dismissHint = useUiPrefsStore((s) => s.dismissHint);

  // Element to return focus to when the modal closes (restore focus).
  const restoreRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const openPalette = () => {
    restoreRef.current = (document.activeElement as HTMLElement) ?? null;
    setOpen(true);
    // First open retires the discoverability nudge for good.
    dismissHint(CMD_PALETTE_HINT_ID);
  };
  const close = () => setOpen(false);

  // Restore focus to the trigger once the dialog has unmounted.
  useEffect(() => {
    if (open) return;
    restoreRef.current?.focus?.();
    restoreRef.current = null;
  }, [open]);

  // allowInInput so ⌘K still works while the home intention field is focused.
  useHotkey("mod+k", () => (open ? close() : openPalette()), { allowInInput: true });

  // Minimal focus trap: keep Tab/Shift+Tab cycling within the dialog so focus
  // can't escape to the page behind it.
  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = contentRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null);
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  return (
    <Palette.Positioner onClick={close} role="presentation">
      <Palette.Content
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("label")}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            close();
            return;
          }
          trapTab(e);
        }}
      >
        <Command label={t("label")} loop>
          <Box borderBottomWidth="1px" borderColor="border.subtle">
            <Command.Input autoFocus placeholder={t("search")} />
          </Box>
          <Command.List>
            <Command.Empty>{t("empty")}</Command.Empty>
            {groups.map((group) => (
              <Command.Group key={group.id} heading={group.heading}>
                {group.commands.map((command) => (
                  <Command.Item
                    key={command.id}
                    value={command.label}
                    onSelect={() => {
                      command.run();
                      close();
                    }}
                  >
                    <span>{command.label}</span>
                    {command.hint ? <Palette.Kbd>{command.hint}</Palette.Kbd> : null}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </Palette.Content>
    </Palette.Positioner>
  );
}
