"use client";

import { Field as ChakraField } from "@chakra-ui/react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
}

export function Field({ label, error, helperText, required, children, ...rootProps }: FieldProps) {
  return (
    <ChakraField.Root invalid={!!error} required={required} {...rootProps}>
      {label ? (
        <ChakraField.Label>
          {label}
          {required ? <ChakraField.RequiredIndicator /> : null}
        </ChakraField.Label>
      ) : null}
      {children}
      {error ? <ChakraField.ErrorText>{error}</ChakraField.ErrorText> : null}
      {helperText ? <ChakraField.HelperText>{helperText}</ChakraField.HelperText> : null}
    </ChakraField.Root>
  );
}
