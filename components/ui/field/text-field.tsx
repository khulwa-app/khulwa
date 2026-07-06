"use client";

import { Input, type InputProps } from "@chakra-ui/react";
import { Field, type FieldProps } from "./field";

export interface TextFieldProps extends InputProps {
  label?: React.ReactNode;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  surface?: "panel" | "glass";
  fieldProps?: Omit<FieldProps, "label" | "error" | "helperText" | "surface" | "required">;
}

export function TextField({
  label,
  error,
  helperText,
  surface = "panel",
  required,
  fieldProps,
  ...inputProps
}: TextFieldProps) {
  return (
    <Field label={label} error={error} helperText={helperText} surface={surface} required={required} {...fieldProps}>
      <Input variant={surface === "glass" ? "glass" : "outline"} {...inputProps} />
    </Field>
  );
}
