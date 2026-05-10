import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
} from 'react-native';

import { ClearIcon, type ClearIconVariant } from './icons/ClearIcon';
import { ErrorIcon } from './icons/ErrorIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

type SearchBarState = 'default' | 'focused' | 'disabled' | 'error' | 'loading';

type SearchBarProps = Omit<
    TextInputProps,
    'value' | 'onChangeText' | 'editable' | 'style'
> & {
    value: string;
    onChangeText: (text: string) => void;
    visualState?: SearchBarState;
    showClearButton?: boolean;
    clearIconVariant?: ClearIconVariant;
    onClear?: () => void;
    className?: string;
    inputClassName?: string;
    inputStyle?: StyleProp<TextStyle>;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
    classes.filter(Boolean).join(' ');

export function SearchBar({
    value,
    onChangeText,
    visualState = 'default',
    showClearButton,
    clearIconVariant,
    onClear,
    placeholder = 'Search',
    className,
    inputClassName,
    inputStyle,
    onFocus,
    onBlur,
    ...props
}: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false);

    const isDisabled = visualState === 'disabled';
    const isError = visualState === 'error';
    const isLoading = visualState === 'loading';

    const currentState: SearchBarState =
        visualState !== 'default' ? visualState : isFocused ? 'focused' : 'default';

    const shouldShowClearButton =
        !isDisabled &&
        !isError &&
        !isLoading &&
        (showClearButton ?? value.length > 0);

    const effectiveClearIconVariant: ClearIconVariant =
        clearIconVariant ?? 'subtle';

    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };

    return (
        <View
            className={cn(
                'h-11 w-full flex-row items-center rounded-lg border px-3',
                stateClasses[currentState],
                isDisabled && 'opacity-90',
                className,
            )}
        >
            <Search
                size={22}
                color={searchIconColors[currentState]}
                strokeWidth={2.25}
            />

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderColors[currentState]}
                editable={!isDisabled && !isLoading}
                onFocus={event => {
                    setIsFocused(true);
                    onFocus?.(event);
                }}
                onBlur={event => {
                    setIsFocused(false);
                    onBlur?.(event);
                }}
                className={cn(
                    'ml-2 flex-1 p-0 text-[16px] font-semibold leading-[20px]',
                    inputTextClasses[currentState],
                    inputClassName,
                )}
                style={[
                    {
                        includeFontPadding: false,
                        paddingVertical: 0,
                        textAlignVertical: 'center',
                    },
                    inputStyle,
                ]}
                {...props}
            />

            {shouldShowClearButton && (
                <ClearIcon
                    variant={effectiveClearIconVariant}
                    onPress={handleClear}
                />
            )}

            {isError && <ErrorIcon />}

            {isLoading && <LoadingSpinner />}
        </View>
    );
}

const stateClasses: Record<SearchBarState, string> = {
    default: 'border-neutral-400 bg-white',
    focused: 'border-blue-500 bg-blue-50',
    disabled: 'border-neutral-400 bg-neutral-200',
    error: 'border-red-600 bg-red-50',
    loading: 'border-neutral-400 bg-white',
};

const inputTextClasses: Record<SearchBarState, string> = {
    default: 'text-neutral-800',
    focused: 'text-neutral-800',
    disabled: 'text-neutral-500',
    error: 'text-neutral-800',
    loading: 'text-neutral-800',
};

const searchIconColors: Record<SearchBarState, string> = {
    default: '#999999',
    focused: '#727272',
    disabled: '#949494',
    error: '#393939',
    loading: '#9e9e9e',
};

const placeholderColors: Record<SearchBarState, string> = {
    default: '#999999',
    focused: '#727272',
    disabled: '#949494',
    error: '#949494',
    loading: '#727272',
};