import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "primary" | "success" | "warning" | "error";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "border-sage-300 bg-sage-100 text-sage-800",
  primary: "border-sage-1000 bg-sage-1000 text-sage-100",
  success: "border-success bg-success text-success-content",
  warning: "border-warning bg-warning text-warning-content",
  error: "border-error bg-error text-error-content",
};

export function Pill({ className, tone = "neutral", children, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span className={cn("badge h-6 rounded-full border px-2.5 text-xs font-semibold", badgeTones[tone], className)} {...props}>
      {children}
    </span>
  );
}

export function Progress({ className, value, max = 100, label }: { className?: string; value: number; max?: number; label: string }) {
  return <progress aria-label={label} className={cn("progress progress-primary h-2 bg-sage-100", className)} max={max} value={value} />;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("grid justify-items-start gap-3 rounded-panel border border-dashed border-sage-300 bg-sage-100/50 p-6", className)}>
      <div>
        <h2 className="text-lg font-semibold tracking-normal text-sage-1000">{title}</h2>
        <p className="mt-1 max-w-prose leading-6 text-sage-700">{description}</p>
      </div>
      {action}
    </section>
  );
}
