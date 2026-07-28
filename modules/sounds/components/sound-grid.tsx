"use client";

import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const SoundGrid = {
  Root: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn("grid gap-3 sm:grid-cols-2", className)} {...props} />,
  Tile: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn("rounded-control border border-sage-300 bg-base-100 p-3", className)} {...props} />,
  Toggle: ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("flex min-h-12 w-full items-center gap-3 rounded-control px-2 text-left text-sage-800 hover:bg-sage-100 data-[active]:bg-sage-100 data-[active]:text-sage-1000", className)} type="button" {...props} />,
  Icon: ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => <span className={cn("grid size-9 place-items-center rounded-control bg-sage-100 text-sage-700 data-[active]:bg-sage-800 data-[active]:text-sage-100", className)} {...props} />,
  Title: ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => <span className={cn("text-sm font-semibold", className)} {...props} />,
};
