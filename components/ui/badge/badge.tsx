import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary";
type Emphasis = "solid" | "subtle" | "muted";

const styles: Record<Tone, Record<Emphasis, string>> = {
  neutral: {
    solid: "border-sage-800 bg-sage-800 text-sage-100",
    subtle: "border-sage-300 bg-sage-100 text-sage-800",
    muted: "border-sage-200 bg-transparent text-sage-700",
  },
  primary: {
    solid: "border-sage-1000 bg-sage-1000 text-sage-100",
    subtle: "border-sage-400 bg-sage-200 text-sage-1000",
    muted: "border-sage-300 bg-transparent text-sage-800",
  },
};

function Root({ className, tone = "neutral", emphasis = "subtle", ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: Tone; emphasis?: Emphasis }) {
  return <span className={cn("inline-flex min-h-6 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold", styles[tone][emphasis], className)} {...props} />;
}

function Icon({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden className={cn("inline-flex size-1.5 rounded-full bg-current", className)} {...props} />;
}

function Label(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} />;
}

export const Badge = { Root, Icon, Label };
