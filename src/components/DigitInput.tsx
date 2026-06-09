import React, { useRef, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  View,
} from 'react-native';

type DigitInputProps = {
  value?: string;
  focused?: boolean;
  error?: boolean;
  secure?: boolean;
  disabled?: boolean;
  className?: string;
};

export function DigitInput({
  value = '',
  focused = false,
  error = false,
  secure = false,
  disabled = false,
  className = '',
}: DigitInputProps) {
  const hasValue = value.length > 0;

  return (
    <View
      className={[
        'h-16 w-16 items-center justify-center rounded-xl border bg-white',
        focused ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
        error ? 'border-red-500 bg-red-50' : '',
        disabled ? 'opacity-50' : '',
        className,
      ].join(' ')}
    >
      <Text className="text-2xl font-semibold text-gray-900">
        {hasValue ? (secure ? '•' : value) : focused ? '|' : ''}
      </Text>
    </View>
  );
}

type DigitInputGroupProps = {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  secure?: boolean;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  boxClassName?: string;
};

export function DigitInputGroup({
  length = 4,
  value: controlledValue,
  onChange,
  onComplete,
  secure = true,
  error = false,
  disabled = false,
  className = '',
  boxClassName = '',
}: DigitInputGroupProps) {
  const inputRef = useRef<TextInput>(null);
  const [internalValue, setInternalValue] = useState('');

  const value = controlledValue ?? internalValue;
  const focusedIndex = Math.min(value.length, length - 1);

  const updateValue = (nextValue: string) => {
    const cleanedValue = nextValue.replace(/\D/g, '').slice(0, length);

    if (controlledValue === undefined) {
      setInternalValue(cleanedValue);
    }

    onChange?.(cleanedValue);

    if (cleanedValue.length === length) {
      onComplete?.(cleanedValue);
      inputRef.current?.blur();
    }
  };

  const handleChangeText = (text: string) => {
    updateValue(text);
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      updateValue(value.slice(0, -1));
    }
  };

  const focusInput = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  return (
    <Pressable
      onPress={focusInput}
      disabled={disabled}
      className={['flex-row gap-3', className].join(' ')}
    >
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        editable={!disabled}
        caretHidden
        className="absolute h-0 w-0 opacity-0"
      />

      {Array.from({ length }).map((_, index) => (
        <DigitInput
          key={index}
          value={value[index] ?? ''}
          focused={!disabled && index === focusedIndex && value.length < length}
          secure={secure}
          error={error}
          disabled={disabled}
          className={boxClassName}
        />
      ))}
    </Pressable>
  );
}
