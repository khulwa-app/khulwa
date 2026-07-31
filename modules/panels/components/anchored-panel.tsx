"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { usePresence } from "../hooks/use-presence.hook";

/** Desktop exit duration in ms; must stay in sync with `--duration-exit`. */
const EXIT_MS = 130;

export type PanelAnchor = "tool" | "utility" | "header";

/**
 * Desktop panels clear the dock: it sits 24px off the bottom (`pb-6`) and its capsule is 44px tall,
 * so its top edge is at 68px. `bottom-20` (80px) leaves a 12px gap — anything below 68px overlaps it.
 */
const ANCHOR_POSITION: Record<PanelAnchor, string> = {
  tool: "md:right-auto md:bottom-20 md:left-6 md:origin-bottom-left",
  utility: "md:left-auto md:right-6 md:bottom-20 md:origin-bottom-right",
  header: "md:top-16 md:bottom-auto md:left-auto md:right-6 md:origin-top-right",
};

interface AnchoredPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  anchor?: PanelAnchor;
  /** Desktop width in px; mobile always uses the full-width sheet. */
  width?: number;
  maxHeight?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function AnchoredPanel({
  open,
  onClose,
  title,
  anchor = "tool",
  width = 360,
  maxHeight = "min(65vh, 560px)",
  footer,
  children,
}: AnchoredPanelProps) {
  const tAria = useTranslations("panels.aria");
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const { mounted, state } = usePresence(open, EXIT_MS);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const first = panel?.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();

    return () => {
      // Only pull focus back if it is still inside the closing panel; otherwise the user has
      // already moved on and stealing focus would be disorienting.
      const active = document.activeElement;
      if (active && panel?.contains(active)) restoreFocusRef.current?.focus();
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={title}
      data-state={state}
      style={{ "--panel-width": `${width}px`, "--panel-max-height": maxHeight } as React.CSSProperties}
      className={cn(
        "fixed z-40 flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface-veil text-foreground shadow-panel backdrop-blur-[10px]",
        "inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] max-h-[70dvh]",
        "md:inset-x-auto md:w-(--panel-width) md:max-h-(--panel-max-height)",
        ANCHOR_POSITION[anchor],
        "origin-bottom transition-[opacity,transform] ease-out motion-reduce:transition-none",
        "duration-[var(--duration-enter)] data-[state=closed]:duration-[var(--duration-exit)]",
        "data-[state=open]:translate-y-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
        "data-[state=closed]:translate-y-2 data-[state=closed]:scale-[0.98] data-[state=closed]:opacity-0",
      )}
    >
      <header className="flex h-12 shrink-0 items-center justify-between gap-2 px-4">
        <h2 className="text-sm leading-5 font-semibold">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={tAria("close")}
          className="relative flex size-8 items-center justify-center rounded-full text-foreground-muted transition-colors after:absolute after:-inset-1.5 after:content-[''] hover:bg-surface-elevated hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X className="size-4" />
        </button>
      </header>

      {/* pt-1.5 is load-bearing: this is a scroll container on both axes, and outward-drawn focus
          rings are ink overflow that gets clipped rather than scrolled into view. The panel focuses
          its first child on open, so without it the clipped state is the default state. */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-1.5 pb-4">{children}</div>

      {footer ? <div className="shrink-0 border-t border-hairline px-4 py-3">{footer}</div> : null}
    </div>
  );
}
