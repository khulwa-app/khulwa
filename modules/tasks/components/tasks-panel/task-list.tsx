"use client";

import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { InlineEdit, type InlineEditProps } from "@/components/ui";

const Div = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={className} {...props} />;
const Action = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("grid size-8 place-items-center rounded-control text-sage-700 hover:bg-sage-100 hover:text-sage-1000 data-[danger]:hover:bg-error/10 data-[danger]:hover:text-error", className)} type="button" {...props} />;
export const TaskList = {
  Root: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("grid gap-2", className)} {...props} />,
  Item: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("rounded-control border border-sage-300 bg-base-100 p-3 data-[active]:border-sage-500", className)} {...props} />,
  Row: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("flex items-start gap-2", className)} {...props} />,
  Meta: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("ml-auto flex shrink-0 items-center gap-1 text-xs text-sage-700", className)} {...props} />,
  Actions: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("ml-auto flex shrink-0 items-center gap-0.5", className)} {...props} />,
  Steps: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("mt-3 grid gap-2 border-t border-sage-300 pt-3", className)} {...props} />,
  StepRow: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("flex items-start gap-2", className)} {...props} />,
  AddStepRow: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("flex items-center gap-2", className)} {...props} />,
  Action,
  AiAction: ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("btn min-h-9 h-9 rounded-control border-sage-300 bg-sage-100 px-3 text-xs font-semibold text-sage-800 hover:border-sage-500", className)} type="button" {...props} />,
  Editable: ({ className, ...props }: InlineEditProps) => <InlineEdit className={cn("min-w-0 flex-1 break-words text-sm leading-6 text-sage-900 data-[completed]:text-sage-600 data-[completed]:line-through data-[tone=muted]:text-sage-700", className)} {...props} />,
  Eta: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => <p className={cn("whitespace-nowrap text-xs text-sage-700", className)} {...props} />,
  Counter: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => <p className={cn("text-xs text-sage-700", className)} {...props} />,
  AddStepInput: ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => <input className={cn("input min-h-9 h-9 flex-1 rounded-control border-sage-300 bg-base-100 px-3 text-sm", className)} {...props} />,
  SectionTrigger: ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("flex min-h-10 w-full items-center gap-2 rounded-control px-2 text-left text-sm font-semibold text-sage-700 hover:bg-sage-100", className)} type="button" {...props} />,
  SectionContent: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <Div className={cn("mt-1 grid gap-2", className)} {...props} />,
  Empty: ({ children }: { children: ReactNode }) => <p className="rounded-control border border-dashed border-sage-300 p-5 text-sm text-sage-700">{children}</p>,
};
