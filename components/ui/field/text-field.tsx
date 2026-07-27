"use client";

import { Input, type InputProps } from "@chakra-ui/react";
import { Field, type FieldProps } from "./field";

export interface TextFieldProps extends InputProps {
  label?: React.ReactNode;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  fieldProps?: Omit<FieldProps, "label" | "error" | "helperText" | "required">;
}

export function TextField({ label, error, helperText, required, fieldProps, ...inputProps }: TextFieldProps) {
  return (
    <Field label={label} error={error} helperText={helperText} required={required} {...fieldProps}>
      <Input variant="subtle" {...inputProps} />
    </Field>
  );
}
