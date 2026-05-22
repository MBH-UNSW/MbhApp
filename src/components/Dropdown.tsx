import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View, type ViewStyle } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { Body1, Caption } from './Typography';

export type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type DropdownProps = {
  value?: string;
  placeholder?: string;
  options: DropdownOption[];
  onChange: (value: string, option: DropdownOption) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  style?: ViewStyle;
};

export function Dropdown({
  value,
  placeholder = 'Select an item',
  options,
  onChange,
  disabled = false,
  error,
  className = '',
  style,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value);
  }, [options, value]);

  const hasValue = Boolean(selectedOption);

  const handleToggle = () => {
    if (disabled) return;
    setOpen(prev => !prev);
  };

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;

    onChange(option.value, option);
    setOpen(false);
  };

  return (
    <View
      style={style}
      className={`w-full overflow-hidden rounded-xl border bg-white border-gray-300 ${
        error ? 'border-red-500' : ''
      } ${className}`}
    >
      <Pressable
        disabled={disabled}
        onPress={handleToggle}
        className={`flex-row items-center justify-between px-4 ${
          disabled ? 'opacity-50' : ''
        } ${open ? 'border-b border-gray-300' : ''}`}
      >
        <Body1
          className={`py-3 font-semibold ${
            hasValue ? 'text-zinc-700' : 'text-zinc-300'
          }`}
        >
          {selectedOption?.label ?? placeholder}
        </Body1>

        {open ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
      </Pressable>

      {open ? (
        <FlatList
          data={options}
          keyExtractor={item => item.value}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const selected = item.value === value;

            return (
              <Pressable
                disabled={item.disabled}
                onPress={() => handleSelect(item)}
                className={`justify-center border-b border-gray-300 px-4 last:border-b-0 ${
                  selected ? 'bg-slate-100 border border-blue-500' : 'bg-white'
                } ${item.disabled ? 'opacity-40' : ''}`}
              >
                <Body1 className="py-3 font-semibold">
                  {item.label}
                </Body1>
              </Pressable>
            );
          }}
        />
      ) : null}

      {error ? (
        <Caption color="alert" className="px-4 pb-3">{error}</Caption>
      ) : null}
    </View>
  );
}
