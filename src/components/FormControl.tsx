import React from "react";
import { View } from "react-native";
import { Body1, Caption } from "./Typography";

type FormControlProps = {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export function FormControl({
  label,
  helperText,
  error,
  required,
  disabled,
  children,
}: FormControlProps) {
  return (
    <View className={`w-full gap-2 ${disabled ? "opacity-50" : ""}`}>
      {label && (
        <Body1>
          {label}
          {required && <Body1 color="alert"> *</Body1>}
        </Body1>
      )}

      <View /*className={disabled ? "opacity-50" : undefined}*/>
        {children}
      </View>

      {error ? (
        <Caption color="alert">{error}</Caption>
      ) : helperText ? (
        <Caption color="secondary">{helperText}</Caption>
      ) : null}
    </View>
  );
}