import React from "react";
import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";

type PillVariant = "filled" | "outline";

export type PillProps = PressableProps & {
  label: string;
  color?: string;
  textColor?: string;
  variant?: PillVariant;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Pill({
  label,
  color = "#9E9E9E",
  textColor,
  variant = "filled",
  selected = false,
  disabled = false,
  className = "",
  textClassName = "",
  style,
  textStyle,
  ...props
}: PillProps) {
  const isFilled = variant === "filled" || selected;

  return (
    <Pressable
      disabled={disabled}
      style={[
        {
          backgroundColor: isFilled ? color : "transparent",
          borderColor: color,
          alignSelf: "flex-start",
        },
        style,
      ]}
      className={`
        items-center justify-center rounded-full border-2 px-8 py-2
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      <Text
        style={[
          {
            color: textColor ?? (isFilled ? "#FFFFFF" : "#222222"),
          },
          textStyle,
        ]}
        className={`${textClassName}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}