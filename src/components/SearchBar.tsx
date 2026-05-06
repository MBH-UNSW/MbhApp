import React, { useState } from 'react';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import ClearIcon, { type ClearIconVariant } from './icons/ClearIcon';
import ErrorIcon from './icons/ErrorIcon';
import LoadingSpinner from './icons/LoadingSpinner';

export type SearchBarVisualState =
    | 'default'
    | 'disabled'
    | 'focused'
    | 'error'
    | 'loading';

type SearchBarProps = Omit<TextInputProps, 'value' | 'onChangeText' | 'editable'> & {
    value: string;
    onChangeText: (text: string) => void;
    visualState?: SearchBarVisualState;
    showClearButton?: boolean;
    clearIconVariant?: ClearIconVariant;
    onClear?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
};

const colours = {
    mutedText: '#727272',
    disabledText: '#949494',

    icon: '#727272',
    disabledIcon: '#949494',
    focusedIcon: '#393939',
};

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Search',
    visualState,
    showClearButton,
    clearIconVariant,
    onClear,
    containerStyle,
    onFocus,
    onBlur,
    style,
    ...textInputProps
}: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false);

    const currentState: SearchBarVisualState =
        visualState ?? (isFocused ? 'focused' : 'default');

    const isDisabled = currentState === 'disabled';
    const isFocusedStyle = currentState === 'focused';
    const isError = currentState === 'error';
    const isLoading = currentState === 'loading';

    const shouldShowClearButton =
        showClearButton ?? (!isDisabled && !isLoading && isFocusedStyle);

    const effectiveClearIconVariant: ClearIconVariant =
        clearIconVariant ?? (value.length === 0 ? 'subtle' : 'neutral');

    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };

    const searchIconColour = isDisabled
        ? colours.disabledIcon
        : isFocusedStyle
            ? colours.focusedIcon
            : colours.icon;

    const containerClassName = [
        'h-11 w-full flex-row items-center rounded-lg border px-3',
        isDisabled && 'border-neutral-300 bg-neutral-200',
        isFocusedStyle && 'border-blue-500 bg-sky-50',
        isError && 'border-red-700 bg-red-50',
        !isDisabled && !isFocusedStyle && !isError && 'border-neutral-300 bg-white',
    ]
        .filter(Boolean)
        .join(' ');

    const inputClassName = [
        'h-11 flex-1 px-2 text-base font-semibold',
        isDisabled ? 'text-neutral-400' : 'text-neutral-800',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <View className={containerClassName} style={containerStyle}>
            <View className="h-7 w-7 items-center justify-center">
                <SearchIcon colour={searchIconColour} />
            </View>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={isDisabled ? colours.disabledText : colours.mutedText}
                editable={!isDisabled}
                returnKeyType="search"
                multiline={false}
                numberOfLines={1}
                className={inputClassName}
                style={[styles.input, style]}
                onFocus={event => {
                    setIsFocused(true);
                    onFocus?.(event);
                }}
                onBlur={event => {
                    setIsFocused(false);
                    onBlur?.(event);
                }}
                accessibilityLabel="Search input"
                {...textInputProps}
            />

            <View className="h-7 w-7 items-center justify-center">
                {isLoading ? (
                    <LoadingSpinner />
                ) : isError ? (
                    <ErrorIcon />
                ) : shouldShowClearButton ? (
                    <ClearIcon variant={effectiveClearIconVariant} onPress={handleClear} />
                ) : null}
            </View>
        </View>
    );
}

function SearchIcon({ colour }: { colour: string }) {
    return (
        <View className="relative h-6 w-6">
            <View style={[styles.searchIconCircle, { borderColor: colour }]} />
            <View style={[styles.searchIconHandle, { backgroundColor: colour }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 24,
        paddingTop: 0,
        paddingBottom: 0,
        paddingVertical: 0,
        margin: 0,
        fontSize: 16,
        lineHeight: 20,
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    searchIconCircle: {
        position: 'absolute',
        left: 2,
        top: 2,
        width: 14,
        height: 14,
        borderWidth: 2,
        borderRadius: 8,
    },
    searchIconHandle: {
        position: 'absolute',
        left: 15,
        top: 16,
        width: 8,
        height: 2,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
    },
});