"use client";

import { cloneElement, createContext, isValidElement, useContext, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const MenuCloseContext = createContext<(() => void) | null>(null);

export function Menu({ label, trigger, children }: { label: string; trigger: ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void; onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void; "aria-expanded"?: boolean; "aria-haspopup"?: "menu" }>; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handlePointerDown = (event: MouseEvent | globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open]);

  const enhancedTrigger = isValidElement(trigger)
    ? cloneElement(trigger, {
        "aria-expanded": open,
        "aria-haspopup": "menu",
        onClick: (event: MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(event);
          if (!event.defaultPrevented) setOpen((value) => !value);
        },
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
          trigger.props.onKeyDown?.(event);
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        },
      })
    : trigger;

  return (
    <div className="relative inline-block" ref={ref}>
      {enhancedTrigger}
      <MenuCloseContext.Provider value={() => setOpen(false)}>
        {open ? (
          <div aria-label={label} className="absolute right-0 z-30 mt-2 w-56 rounded-panel border border-sage-300 bg-base-100 p-1.5 shadow-none" role="menu">
            {typeof children === "string" ? <span>{children}</span> : children}
          </div>
        ) : null}
      </MenuCloseContext.Provider>
    </div>
  );
}

export function MenuItem({ children, className, onSelect, destructive = false }: { children: ReactNode; className?: string; onSelect?: () => void; destructive?: boolean }) {
  const close = useContext(MenuCloseContext);
  return (
    <button
      className={cn("min-h-11 w-full rounded-control px-3 text-left text-sm font-medium text-sage-800 hover:bg-sage-100", destructive && "text-error hover:bg-error/10", className)}
      onClick={() => {
        onSelect?.();
        close?.();
      }}
      role="menuitem"
      type="button"
    >
      {children}
    </button>
  );
}
