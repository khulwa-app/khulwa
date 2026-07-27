"use client";

import { HStack, Input, Text, type InputProps } from "@chakra-ui/react";

interface NumberFieldProps extends Omit<InputProps, "value" | "onChange" | "type"> {
  label: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  onValueChange: (value: number) => void;
}

export function NumberField({ label, value, min, max, unit, onValueChange, ...rest }: NumberFieldProps) {
  return (
    <HStack justify="space-between" align="center">
      <Text textStyle="body-sm" color="fg">
        {label}
      </Text>
      <HStack gap="2.5" align="center">
        <Input
          variant="subtle"
          size="sm"
          type="number"
          min={min}
          max={max}
          w="16"
          textAlign="center"
          value={value}
          aria-label={label}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            if (Number.isNaN(parsed)) return;
            let next = parsed;
            if (min !== undefined) next = Math.max(min, next);
            if (max !== undefined) next = Math.min(max, next);
            onValueChange(next);
          }}
          {...rest}
        />
        {unit ? (
          <Text textStyle="body-sm" color="fg.muted" minW="3.25rem">
            {unit}
          </Text>
        ) : null}
      </HStack>
    </HStack>
  );
}
