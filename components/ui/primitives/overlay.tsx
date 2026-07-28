"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconButton } from "./button";

function CloseMark() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function useDialogState(open: boolean, onOpenChange: (open: boolean) => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => onOpenChange(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onOpenChange]);

  return ref;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useDialogState(open, onOpenChange);
  const titleId = useId();
  return (
    <dialog
      aria-labelledby={titleId}
      className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-panel border border-riwaq-border-strong bg-riwaq-surface p-0 text-riwaq-text shadow-none backdrop:bg-sage-1000/55"
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
      ref={ref}
    >
      <section className={cn("p-5", className)}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-normal text-sage-1000" id={titleId}>{title}</h2>
          <IconButton aria-label="Close dialog" onClick={() => onOpenChange(false)} size="sm">
            <CloseMark />
          </IconButton>
        </div>
        <div className="mt-5">{children}</div>
      </section>
    </dialog>
  );
}

export function Drawer({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useDialogState(open, onOpenChange);
  const titleId = useId();
  return (
    <dialog
      aria-labelledby={titleId}
      className="m-0 ml-auto h-dvh w-[min(32rem,calc(100vw-1rem))] max-w-none border-y-0 border-r-0 border-l border-riwaq-border-strong bg-riwaq-surface p-0 text-riwaq-text shadow-none backdrop:bg-sage-1000/55"
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      ref={ref}
    >
      <aside className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-riwaq-border px-5 py-4">
          <h2 className="text-xl font-semibold tracking-normal text-sage-1000" id={titleId}>{title}</h2>
          <IconButton aria-label="Close panel" onClick={() => onOpenChange(false)} size="sm">
            <CloseMark />
          </IconButton>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </dialog>
  );
}

export function FloatingPanel({
  open,
  onOpenChange,
  title,
  children,
  className,
  anchor = "start",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
  anchor?: "start" | "end";
}) {
  const ref = useDialogState(open, onOpenChange);
  const titleId = useId();
  return (
    <dialog
      aria-labelledby={titleId}
      className={cn("fixed bottom-[calc(env(safe-area-inset-bottom)+4.25rem)] m-0 h-[min(36rem,calc(100dvh-7rem))] w-[min(28rem,calc(100vw-2rem))] max-w-none rounded-panel border border-riwaq-border-strong bg-riwaq-surface p-0 text-riwaq-text shadow-none backdrop:bg-transparent", anchor === "start" ? "left-4 sm:left-6 lg:left-10" : "right-4 sm:right-6 lg:right-10", className)}
      onCancel={(event) => { event.preventDefault(); onOpenChange(false); }}
      onClick={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}
      ref={ref}
    >
      <aside className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-riwaq-border px-5 py-3">
          <h2 className="text-base font-semibold tracking-normal text-sage-1000" id={titleId}>{title}</h2>
          <IconButton aria-label="Close panel" onClick={() => onOpenChange(false)} size="sm"><CloseMark /></IconButton>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </dialog>
  );
}
