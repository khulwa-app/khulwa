"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonTone = "primary" | "secondary" | "quiet" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const toneClasses: Record<ButtonTone, string> = {
  primary: "border-riwaq-primary bg-riwaq-primary text-riwaq-text hover:border-riwaq-primary-hover hover:bg-riwaq-primary-hover",
  secondary: "border-riwaq-border-strong bg-riwaq-elevated text-riwaq-text hover:border-riwaq-primary hover:bg-sage-700",
  quiet: "border-transparent bg-transparent text-riwaq-muted hover:border-riwaq-border hover:bg-riwaq-elevated hover:text-riwaq-text",
  danger: "border-error bg-error text-error-content hover:brightness-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 h-11 px-3 text-sm",
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
        "btn rounded-control border font-bold shadow-none transition-colors duration-200 disabled:opacity-45 motion-reduce:transition-none",
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
        "btn btn-square rounded-control border shadow-none transition-colors duration-200 disabled:opacity-45 motion-reduce:transition-none",
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
