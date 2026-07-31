"use client";

import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/tooltip";

interface DockButtonProps extends Omit<ComponentProps<"button">, "children"> {
  icon: ElementType<{ className?: string }>;
  label: string;
  active?: boolean;
  /** Renders a quiet indicator without changing the active treatment (used for playing sounds). */
  indicator?: boolean;
}

/**
 * 36px visual button inside a 44px hit area. State is expressed by the container, never by
 * swapping icon families or stroke weights.
 */
export function DockButton({ icon: Icon, label, active, indicator, className, ...props }: DockButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          data-active={active || undefined}
          className={cn(
            "relative flex size-9 shrink-0 items-center justify-center rounded-full text-foreground-secondary",
            "transition-[background-color,color,transform] duration-[var(--duration-press)] ease-out",
            "after:absolute after:-inset-1 after:content-['']",
            "hover:bg-surface-elevated hover:text-foreground",
            "active:scale-[0.97] motion-reduce:active:scale-100",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            "data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:hover:bg-primary-hover",
            className,
          )}
          {...props}
        >
          <Icon className="size-[18px]" />
          {indicator ? (
            <span className="absolute right-1 bottom-1 size-1.5 rounded-full bg-success" aria-hidden />
          ) : null}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}
