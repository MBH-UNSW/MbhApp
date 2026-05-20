import React from 'react';
import { Pressable, View } from 'react-native';
import { Body1 } from './Typography';

////////////////////////////////////////
//               RADIO                //
////////////////////////////////////////
type RadioProps = {
  selected: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
};

export function Radio({ selected, onPress, label, disabled }: RadioProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className="flex-row items-center gap-3"
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
    >
      <View
        className={`h-5 w-5 items-center justify-center rounded-full border ${
          selected ? 'border-blue-600' : 'border-gray-400'
        }`}
      >
        {selected && <View className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
      </View>

      {label && (
        <Body1 className={disabled ? 'text-gray-400' : 'text-gray-900'}>
          {label}
        </Body1>
      )}
    </Pressable>
  );
}

////////////////////////////////////////
//             RADIO GROUP            //
////////////////////////////////////////
type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  disabled?: boolean;
};

export function RadioGroup({
  value,
  onChange,
  options,
  disabled,
}: RadioGroupProps) {
  return (
    <View className="gap-1">
      {options.map(option => (
        <Radio
          key={option.value}
          label={option.label}
          selected={value === option.value}
          disabled={disabled || option.disabled}
          onPress={() => onChange(option.value)}
        />
      ))}
    </View>
  );
}
