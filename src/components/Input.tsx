import { Minus, Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Pressable,
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
} from 'react-native';

import { ErrorIcon } from './icons/ErrorIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

type InputState =
    | 'default'
    | 'focused'
    | 'error'
    | 'loading'
    | 'disabled';

type InputType = 'text' | 'email' | 'phone' | 'numeric';
type NumericControl = 'increment' | 'decrement';

type InputProps = Omit<
    TextInputProps,
    'value' | 'onChangeText' | 'editable' | 'style'
> & {
    value: string;
    onChangeText: (text: string) => void;
    visualState?: InputState;
    inputType?: InputType;
    showNumericControls?: boolean;
    activeNumericControl?: NumericControl;
    numericStep?: number;
    numericMin?: number;
    numericMax?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    className?: string;
    inputClassName?: string;
    inputStyle?: StyleProp<TextStyle>;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
    classes.filter(Boolean).join(' ');

export function Input({
    value,
    onChangeText,
    visualState = 'default',
    inputType = 'text',
    showNumericControls = false,
    activeNumericControl,
    numericStep = 1,
    numericMin = 0,
    numericMax,
    onIncrement,
    onDecrement,
    placeholder = 'Enter text',
    multiline,
    className,
    inputClassName,
    inputStyle,
    onFocus,
    onBlur,
    inputMode,
    maxLength,
    autoCapitalize,
    autoCorrect,
    autoComplete,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const isDisabled = visualState === 'disabled';
    const isError = visualState === 'error';
    const isLoading = visualState === 'loading';
    const hasNumericControls = inputType === 'numeric' && showNumericControls;

    const currentState: InputState =
        visualState !== 'default'
            ? visualState
            : isFocused
                ? 'focused'
                : 'default';

    const resolvedInputMode = inputMode ?? inputModeByInputType[inputType];

    const resolvedMaxLength = maxLength ?? maxLengthByInputType[inputType];

    const resolvedAutoCapitalise =
        autoCapitalize ?? (inputType === 'email' ? 'none' : 'sentences');

    const resolvedAutoCorrect =
        autoCorrect ??
        (inputType === 'email' || inputType === 'phone' ? false : true);

    const resolvedAutoComplete =
        autoComplete ?? autoCompleteByInputType[inputType];

    const clampNumericValue = (numberValue: number) => {
        if (numericMax !== undefined && numberValue > numericMax) {
            return numericMax;
        }

        if (numericMin !== undefined && numberValue < numericMin) {
            return numericMin;
        }

        return numberValue;
    };

    const getNumericValue = () => {
        const parsedValue = Number(value);

        return Number.isFinite(parsedValue) ? parsedValue : 0;
    };

    const handleIncrement = () => {
        const nextValue = clampNumericValue(getNumericValue() + numericStep);

        onChangeText(String(nextValue));
        onIncrement?.();
    };

    const handleDecrement = () => {
        const nextValue = clampNumericValue(getNumericValue() - numericStep);

        onChangeText(String(nextValue));
        onDecrement?.();
    };

    return (
        <View
            className={cn(
                multiline ? 'min-h-[72px]' : 'h-11',
                'w-full flex-row items-center rounded-[8px] border px-3',
                stateClasses[currentState],
                isDisabled && 'opacity-90',
                className,
            )}
        >
            {hasNumericControls && (
                <NumericControlButton
                    type="increment"
                    disabled={isDisabled || isLoading}
                    active={activeNumericControl === 'increment'}
                    onPress={handleIncrement}
                />
            )}

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderColors[currentState]}
                editable={!isDisabled && !isLoading}
                multiline={multiline}
                inputMode={resolvedInputMode}
                maxLength={resolvedMaxLength}
                autoCapitalize={resolvedAutoCapitalise}
                autoCorrect={resolvedAutoCorrect}
                autoComplete={resolvedAutoComplete}
                onFocus={event => {
                    setIsFocused(true);
                    onFocus?.(event);
                }}
                onBlur={event => {
                    setIsFocused(false);
                    onBlur?.(event);
                }}
                className={cn(
                    'flex-1 p-0 text-[16px] font-semibold leading-[20px]',
                    hasNumericControls && 'mx-2',
                    multiline && 'py-3',
                    inputTextClasses[currentState],
                    inputClassName,
                )}
                style={[
                    {
                        includeFontPadding: false,
                        paddingVertical: multiline ? undefined : 0,
                        textAlignVertical: multiline ? 'top' : 'center',
                    },
                    inputStyle,
                ]}
                {...props}
            />

            {isError && (
                <View className={cn('ml-2', hasNumericControls && 'mr-2')}>
                    <ErrorIcon />
                </View>
            )}

            {isLoading && (
                <View className={cn('ml-2', hasNumericControls && 'mr-2')}>
                    <LoadingSpinner color="#727272" />
                </View>
            )}

            {hasNumericControls && (
                <NumericControlButton
                    type="decrement"
                    disabled={isDisabled || isLoading}
                    active={activeNumericControl === 'decrement'}
                    onPress={handleDecrement}
                />
            )}
        </View>
    );
}

type NumericControlButtonProps = {
    type: NumericControl;
    active?: boolean;
    disabled?: boolean;
    onPress?: () => void;
};

function NumericControlButton({
    type,
    active,
    disabled,
    onPress,
}: NumericControlButtonProps) {
    const Icon = type === 'increment' ? Plus : Minus;

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={type === 'increment' ? 'Increase value' : 'Decrease value'}
        >
            {({ pressed }) => {
                const isSelected = active || pressed;

                return (
                    <View
                        className={cn(
                            'h-[22px] w-[22px] items-center justify-center rounded-md',
                            isSelected
                                ? 'border border-blue-500 bg-white'
                                : 'bg-neutral-300',
                            disabled && 'border-0 bg-neutral-300',
                        )}
                    >
                        <Icon
                            size={13}
                            strokeWidth={3}
                            color='#000000'
                        />
                    </View>
                );
            }}
        </Pressable>
    );
}

const stateClasses: Record<InputState, string> = {
    default: 'border-neutral-400 bg-white',
    focused: 'border-blue-500 bg-blue-50',
    error: 'border-red-600 bg-red-50',
    loading: 'border-neutral-400 bg-white',
    disabled: 'border-neutral-400 bg-neutral-200',
};

const inputTextClasses: Record<InputState, string> = {
    default: 'text-neutral-800',
    focused: 'text-neutral-800',
    error: 'text-neutral-900',
    loading: 'text-neutral-900',
    disabled: 'text-neutral-500',
};

const placeholderColors: Record<InputState, string> = {
    default: '#999999',
    focused: '#727272',
    error: '#949494',
    loading: '#727272',
    disabled: '#949494',
};

const inputModeByInputType: Record<InputType, TextInputProps['inputMode']> = {
    text: 'text',
    email: 'email',
    phone: 'tel',
    numeric: 'numeric',
};

const maxLengthByInputType: Partial<Record<InputType, number>> = {
    phone: 12, // just to allow for the preceding '+' for now
};

const autoCompleteByInputType: Partial<
    Record<InputType, TextInputProps['autoComplete']>
> = {
    email: 'email',
    phone: 'tel',
};