"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonTone = "primary" | "secondary" | "quiet" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const toneClasses: Record<ButtonTone, string> = {
  primary: "btn-primary",
  secondary: "border-sage-400 bg-sage-100 text-sage-900 hover:border-sage-600 hover:bg-sage-200",
  quiet: "border-transparent bg-transparent text-sage-800 hover:bg-sage-100 hover:text-sage-1000",
  danger: "border-error bg-error text-error-content hover:brightness-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 h-10 px-3 text-sm",
  md: "min-h-12 h-12 px-5 text-sm",
  lg: "min-h-14 h-14 px-6 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, tone = "primary", size = "md", loading = false, disabled, children, type = "button", ...props },
  ref,
) {
  return (
    <button
      className={cn(
        "btn rounded-control border shadow-none transition-colors duration-200 motion-reduce:transition-none",
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || loading}
      ref={ref}
      type={type}
      {...props}
    >
      {loading ? <span aria-hidden className="loading loading-spinner loading-xs" /> : null}
      {children}
    </button>
  );
});

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  "aria-label": string;
  children: ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, tone = "quiet", size = "md", children, type = "button", ...props },
  ref,
) {
  return (
    <button
      className={cn(
        "btn btn-square rounded-control border shadow-none transition-colors duration-200 motion-reduce:transition-none",
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});
