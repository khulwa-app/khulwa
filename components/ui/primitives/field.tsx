import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Field({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid gap-2", className)}>{children}</div>;
}

export function FieldLabel({ children, htmlFor, required }: { children: ReactNode; htmlFor?: string; required?: boolean }) {
  return (
    <label className="text-sm font-medium text-sage-900" htmlFor={htmlFor}>
      {children}
      {required ? <span aria-hidden className="ml-1 text-error">*</span> : null}
    </label>
  );
}

export function FieldDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-6 text-sage-700">{children}</p>;
}

export function FieldError({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-6 text-error" role="alert">{children}</p>;
}

const controlClassName =
  "w-full border-sage-300 bg-base-100 text-sage-900 shadow-none placeholder:text-sage-600 disabled:cursor-not-allowed disabled:border-sage-200 disabled:bg-sage-100 disabled:text-sage-700";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return <input className={cn("input min-h-12 rounded-control", controlClassName, className)} ref={ref} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, ...props },
  ref,
) {
  return <textarea className={cn("textarea min-h-28 rounded-control", controlClassName, className)} ref={ref} {...props} />;
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, ...props },
  ref,
) {
  return <select className={cn("select min-h-12 rounded-control", controlClassName, className)} ref={ref} {...props} />;
});

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Checkbox(
  { className, ...props },
  ref,
) {
  return <input className={cn("checkbox checkbox-primary size-5 rounded-sm", className)} ref={ref} type="checkbox" {...props} />;
});
