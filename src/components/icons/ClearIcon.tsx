import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export type ClearIconVariant = 'subtle' | 'neutral' | 'primary';

type ClearIconProps = {
    variant?: ClearIconVariant;
    onPress: () => void;
};

const colours = {
    white: '#FFFFFF',
    dark: '#1F2933',
};

export default function ClearIcon({
    variant = 'neutral',
    onPress,
}: ClearIconProps) {
    const isSubtle = variant === 'subtle';
    const isPrimary = variant === 'primary';

    const containerClassName = [
        'h-6 w-6 items-center justify-center rounded-full',
        isPrimary ? 'bg-blue-600' : 'bg-neutral-400',
    ]
        .filter(Boolean)
        .join(' ');

    const xColour = isSubtle || isPrimary ? colours.white : colours.dark;

    return (
        <Pressable
            onPress={onPress}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            className={containerClassName}
        >
            <View
                style={[
                    styles.line,
                    styles.lineOne,
                    { backgroundColor: xColour },
                ]}
            />
            <View
                style={[
                    styles.line,
                    styles.lineTwo,
                    { backgroundColor: xColour },
                ]}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    line: {
        position: 'absolute',
        width: 12,
        height: 2,
        borderRadius: 1,
    },
    lineOne: {
        transform: [{ rotate: '45deg' }],
    },
    lineTwo: {
        transform: [{ rotate: '-45deg' }],
    },
});