import React from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type ToggleProps = Omit<PressableProps, 'onPress'> & {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  className?: string;
  thumbClassName?: string;
  style?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
};

export function Toggle({
  value,
  onChange,
  disabled = false,
  activeColor = '#2C7530',
  inactiveColor = '#D9D9D9',
  thumbColor = '#FFFFFF',
  className = '',
  thumbClassName = '',
  style,
  thumbStyle,
  ...props
}: ToggleProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{
        checked: value,
        disabled,
      }}
      style={[
        {
          backgroundColor: value ? activeColor : inactiveColor,
        },
        style,
      ]}
      className={`
        h-[32px] w-[56px] rounded-full p-[3px]
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
      {...props}
    >
      <View
        style={[
          {
            backgroundColor: thumbColor,
          },
          thumbStyle,
        ]}
        className={`
          h-[26px] w-[26px] rounded-full
          ${value ? 'self-end' : 'self-start'}
          ${thumbClassName}
        `}
      />
    </Pressable>
  );
}
