"use client";

import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { InlineEdit, type InlineEditProps } from "@/components/ui";

const Div = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={className} {...props} />;
const Action = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("grid size-9 place-items-center rounded-control text-riwaq-muted transition-colors hover:bg-riwaq-elevated hover:text-riwaq-text data-[danger]:hover:bg-error/10 data-[danger]:hover:text-error", className)} type="button" {...props} />;
export const TaskList = {
  Root: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("grid gap-2", className)} {...props} />,
  Item: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("rounded-control border border-riwaq-border bg-riwaq-surface p-3.5 data-[active]:border-riwaq-primary data-[active]:bg-riwaq-elevated", className)} {...props} />,
  Row: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("flex min-h-11 items-center gap-2", className)} {...props} />,
  Meta: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("ml-auto flex shrink-0 items-center gap-1 self-center text-xs text-riwaq-muted", className)} {...props} />,
  Actions: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("ml-auto flex shrink-0 items-center gap-1", className)} {...props} />,
  Steps: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("mt-3 grid gap-2 border-t border-riwaq-border pt-3", className)} {...props} />,
  StepRow: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("flex min-h-10 items-center gap-2", className)} {...props} />,
  AddStepRow: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("flex min-h-10 items-center gap-2", className)} {...props} />,
  Action,
  AiAction: ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("btn min-h-10 h-10 rounded-control border-riwaq-border bg-riwaq-elevated px-3 text-xs font-bold text-riwaq-lilac hover:border-riwaq-primary", className)} type="button" {...props} />,
  Editable: ({ className, ...props }: InlineEditProps) => <InlineEdit className={cn("min-w-0 flex-1 break-words text-sm font-semibold leading-6 text-riwaq-text data-[completed]:text-riwaq-muted data-[completed]:line-through data-[tone=muted]:text-riwaq-muted", className)} {...props} />,
  Eta: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => <p className={cn("whitespace-nowrap text-xs font-bold text-riwaq-muted", className)} {...props} />,
  Counter: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => <p className={cn("text-xs text-riwaq-muted", className)} {...props} />,
  AddStepInput: ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => <input className={cn("input min-h-10 h-10 flex-1 rounded-control border-riwaq-border bg-riwaq-surface px-3 text-sm text-riwaq-text", className)} {...props} />,
  SectionTrigger: ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("flex min-h-11 w-full items-center gap-2 rounded-control px-2 text-left text-sm font-bold text-riwaq-muted hover:bg-riwaq-elevated hover:text-riwaq-text", className)} type="button" {...props} />,
  SectionContent: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("mt-1 grid gap-2", className)} {...props} />,
  Empty: ({ children }: { children: ReactNode }) => <p className="rounded-control border border-dashed border-riwaq-border p-5 text-sm text-riwaq-muted">{children}</p>,
};
