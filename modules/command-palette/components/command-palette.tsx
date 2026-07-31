"use client";

import { useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { useTranslations } from "next-intl";
import { useHotkey } from "@/modules/shortcuts";
import { useUiPrefsStore } from "@/modules/ui-prefs";
import { CMD_PALETTE_HINT_ID } from "../constants";
import { useCommands } from "../commands";

export function CommandPalette() {
  const t = useTranslations("palette");
  const [open, setOpen] = useState(false);
  const groups = useCommands();
  const dismissHint = useUiPrefsStore((s) => s.dismissHint);

  const restoreRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const openPalette = () => {
    restoreRef.current = (document.activeElement as HTMLElement) ?? null;
    setOpen(true);

    dismissHint(CMD_PALETTE_HINT_ID);
  };
  const close = () => setOpen(false);

  useEffect(() => {
    if (open) return;
    restoreRef.current?.focus?.();
    restoreRef.current = null;
  }, [open]);

  useHotkey("mod+k", () => (open ? close() : openPalette()), { allowInInput: true });

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
    <div
      role="presentation"
      onClick={close}
      className="fixed inset-0 z-50 flex items-start justify-center bg-canvas/70 px-4 pt-[16vh] backdrop-blur-[2px]"
    >
      <div
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
        className="w-full max-w-[520px] overflow-hidden rounded-xl border border-hairline bg-surface-veil shadow-panel backdrop-blur-[10px]"
      >
        <Command
          label={t("label")}
          loop
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-foreground-muted"
        >
          <div className="border-b border-hairline focus-within:border-ring">
            <Command.Input
              autoFocus
              placeholder={t("search")}
              aria-label={t("label")}
              className="h-14 w-full bg-transparent px-4 text-sm outline-none placeholder:text-foreground-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            />
          </div>
          <Command.List className="max-h-[440px] overflow-y-auto p-1.5">
            <Command.Empty className="px-3 py-6 text-center text-sm text-foreground-muted">
              {t("empty")}
            </Command.Empty>
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
                    className="flex h-11 cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-3 text-sm text-foreground-secondary data-[selected=true]:border-primary/40 data-[selected=true]:bg-primary/12 data-[selected=true]:text-foreground"
                  >
                    <span>{command.label}</span>
                    {command.hint ? (
                      <kbd className="rounded-full border border-hairline px-1.5 py-0.5 text-xs text-foreground-muted">
                        {command.hint}
                      </kbd>
                    ) : null}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
