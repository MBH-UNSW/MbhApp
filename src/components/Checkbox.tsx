import React from "react";
import { Pressable, View } from "react-native";
import { Body1, Caption } from "./Typography";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
}: CheckboxProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!checked)}
      className="flex-row items-center gap-3"
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <View
        className={`h-5 w-5 items-center justify-center rounded border ${
          checked
            ? "border-blue-600 bg-blue-600"
            : "border-gray-400 bg-white"
        }`}
      >
        {checked && <Caption className="text-white">✓</Caption>}
      </View>

      {label && (
        <Body1>{label}</Body1>
      )}
    </Pressable>
  );
}